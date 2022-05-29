from flask import Blueprint, request
from flask_login import login_required, current_user
from backend.models import User, Project, Feature, Route, db

route_routes = Blueprint('routes', __name__)

@route_routes.route('<int:id>', methods=['PUT'])
@login_required
def put_route(id):
    route = Route.query.get(id)

    route.type   = request.json['type']
    route.method = request.json['method']
    route.path   = request.json['path']
    route.label  = request.json['label']

    db.session.commit()

    return route.to_dict()

@route_routes.route('<int:id>', methods=['DELETE'])
@login_required
def delete_route(id):
    route = Route.query.get(id)
    
    id = id
    project_id = route.project_id
    feature_id = route.feature_id

    db.session.delete(route)
    db.session.commit()

    return {"id":id, 
            "project_id":project_id, 
            "feature_id":feature_id }
