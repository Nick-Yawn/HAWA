from flask import Blueprint, request
from flask_login import login_required, current_user
from backend.models import User, Project, Feature, Route, UserStory, db

user_story_routes = Blueprint('user-stories', __name__)

@user_story_routes.route('<int:id>', methods=['PUT'])
@login_required
def put_user_story(id):
    user_story = UserStory.query.get(id)

    op = request.json['operation']
    user_story.operation = op if op else None 
    user_story.story     = request.json['story']

    db.session.commit()

    return user_story.to_dict()

@user_story_routes.route('<int:id>', methods=['DELETE'])
@login_required
def delete_user_story(id):
    user_story = UserStory.query.get(id)

    db.session.delete(user_story)
    db.session.commit()

    return user_story.to_dict()
