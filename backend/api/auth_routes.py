from flask import Blueprint, jsonify, session, request, redirect, make_response
from backend.models import User, db
from backend.forms import LoginForm
from backend.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
import os
import secrets
import requests

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        current_user.updateLastLogin()
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email'].lower()).first()
        login_user(user)
        user.updateLastLogin()
        return user.to_dict()
    return {'errors': ["Invalid username or password."]}, 400

@auth_routes.route('/demo-login', methods=['GET'])
def demo_login():
    user = User.query.get(1);
    login_user(user);
    user.updateLastLogin()
    return user.to_dict()


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            name=form.data['name'],
            email=form.data['email'].lower(),
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        user.updateLastLogin()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@auth_routes.route('github/callback', methods=['GET'])
def github_callback():
    print('<<<<<<<<<<<<<<<< github callback >>>>>>>>>>>>>>>>>>')
    state       = session.get('github_state')
    param_state = request.args.get('state') 
    if state != param_state:
        return {'errors': "Invalid State"}, 403

    code = request.args.get('code')
    client_id = os.environ.get('GITHUB_CLIENT_ID')
    client_secret = os.environ.get('GITHUB_SECRET')
    url = ( f'https://github.com/login/oauth/access_token?'
            f'client_id={client_id}&'
            f'client_secret={client_secret}&'
            f'code={code}')
    headers = {'Accept':'application/json'}
    
    r1 = requests.post(url, headers=headers) 
    access_token = r1.json().get('access_token')

    r2 = requests.get('https://api.github.com/user', headers={'Authorization': f'token {access_token}'})
    print(r2.json())

    # TODO: LOGIN

    return redirect('/projects')

@auth_routes.route('/github', methods=['GET'])
def redirect_to_github_login():
    client_id = os.environ.get('GITHUB_CLIENT_ID')
    state = secrets.token_urlsafe(64)
    # Flask uses a signed cookie for session, so this should suffice for CSRF protection
    session['github_state'] = state

    response = make_response(redirect(f'https://github.com/login/oauth/authorize?client_id={client_id}&state={state}')) 

    return response 


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
