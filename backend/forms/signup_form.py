from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from backend.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address already in use.')

"""
def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
"""

class SignUpForm(FlaskForm):
    name     = StringField('name', validators=[DataRequired(message="Name required.")])
    email    = StringField('email', validators=[DataRequired(message="Email required."), user_exists, Email(message="Please provide a valid email address.")])
    password = StringField('password', validators=[DataRequired()])
