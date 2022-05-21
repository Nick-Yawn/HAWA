from flask import Blueprint, request
from flask_login import login_required, current_user
from backend.models import User, Project, Feature, db

feature_routes = Blueprint('features', __name__)


@feature_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_feature(id):
    feature = Feature.query.get(id)

    project_id = feature.project_id

    # TODO: CHECK PERMISSIONS

    db.session.delete(feature)
    db.session.commit()

    return {'project_id':project_id, 'id':id}

@feature_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_feature(id):
    feature = Feature.query.get(id)

    name = request.json['name']

    if name.strip() == '':
        return {'errors':['Name is required.']}, 400
    
    feature.name = name
    
    db.session.commit()

    return feature.to_dict()

@feature_routes.errorhandler(500)
def error_handler(e):
    return {'errors':['Interal Server Error']}, 500
