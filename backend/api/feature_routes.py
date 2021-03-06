from flask import Blueprint, request
from flask_login import login_required, current_user
from backend.models import User, Project, Feature, Route, UserStory, db

feature_routes = Blueprint('features', __name__)


@feature_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_feature(id):
    feature = Feature.query.get(id)

    # TODO: JOIN LOAD
    project_id = feature.project_id
    project = Project.query.get(project_id)
    if current_user.id != project.user_id:
        return {'errors':['Post forbidden']}, 403


    db.session.delete(feature)
    db.session.commit()

    return {'project_id':project_id, 'id':id}

@feature_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_feature(id):
    feature = Feature.query.get(id)
    
    # TODO: JOIN LOAD
    project_id = feature.project_id
    project = Project.query.get(project_id)
    if current_user.id != project.user_id:
        return {'errors':['Post forbidden']}, 403

    name = request.json['name']

    if name.strip() == '':
        return {'errors':['Name is required.']}, 400
    
    feature.name = name
    
    db.session.commit()

    return feature.to_dict()

@feature_routes.route('/<int:id>/routes', methods=['POST'])
@login_required
def post_route(id):
    project_id = request.json['project_id']

    project = Project.query.get(project_id)
    if current_user.id != project.user_id:
        return {'errors':['Post forbidden']}, 403
    
    type = request.json['type']
    method = None
    if type == 'API':
        method =  request.json['method']
    path = request.json['path']
    label = request.json['label']

    route = Route(type=type, method=method, path=path, label=label, project_id=project_id, feature_id=id)
    
    db.session.add(route)
    db.session.commit()

    return route.to_dict()

@feature_routes.route('/<int:id>/user-stories', methods=['POST'])
@login_required
def post_user_story(id):
    project_id = request.json['project_id']
    project = Project.query.get(project_id)

    if current_user.id != project.user_id:
        return {'errors':['Post forbidden']}, 403

    op = request.json['operation']
    operation = op if op else None 
    story     = request.json['story']

    user_story = UserStory(operation=operation, story=story, project_id=project_id, feature_id=id)
    db.session.add(user_story)
    db.session.commit()
    
    return user_story.to_dict()

@feature_routes.errorhandler(500)
def error_handler(e):
    return {'errors':['Interal Server Error']}, 500
