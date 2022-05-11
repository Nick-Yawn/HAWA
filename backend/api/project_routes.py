from flask import Blueprint
from flask_login import current_user, login_required
from backend.models import User, Project, db

project_routes = Blueprint('projects', __name__)



@project_routes.route('/', methods = ['GET'])
@login_required
def get_user_projects():
    return current_user.projects_to_dict();


