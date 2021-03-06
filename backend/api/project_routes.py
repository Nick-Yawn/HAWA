from flask import Blueprint, request
from flask_login import current_user, login_required
from backend.models import User, Project, db, Feature
from backend.forms.project_form import ProjectForm
from backend.conversion import generateConversions

project_routes = Blueprint('projects', __name__)


# get all projects
@project_routes.route('/', methods = ['GET'])
@login_required
def get_user_projects():
    print('<<<<<<')
    statement = db.select(Project) \
                    .options(db.joinedload('*')) \
                    .where(Project.user_id == current_user.id)
    projects = db.session.execute(statement).unique().scalars()
    print('>>>>>>')
    return {'projects': [p.to_dict() for p in projects]}

# create project
@project_routes.route('/', methods = ['POST'])
@login_required
def post_project():
    form = ProjectForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        project = Project( title=form.data['title'], user_id=current_user.id)
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# delete
@project_routes.route('/<int:id>', methods = ['DELETE'])
@login_required
def delete_project(id):
    project = Project.query.get(id)

    if project.user_id != current_user.id:
        return {'errors': ["Access Denied"]}, 403

    db.session.delete(project)
    db.session.commit()

    return {'id':id, 'message':'delete successful'}

# update
@project_routes.route('/<int:id>', methods = ['PUT'])
@login_required
def update_project(id):
    project = Project.query.get(id)

    if project.user_id != current_user.id:
        return {'errors': ["Access Denied"]}, 403

    project.title = request.json['title'] 

    db.session.commit()
    return project.to_dict()

# post feature
@project_routes.route('/<int:id>/features', methods = ['POST'])
@login_required
def post_feature(id):
  project = Project.query.get(id)

  if project.user_id != current_user.id:
      return {'errors': ["Access Denied"]}, 403
  
  name = request.json['name']  

  if name.strip() == '':
    return {'errors':['Name is required.']}, 400

  feature = Feature( project_id=int(id), name=name )
  db.session.add(feature)
  db.session.commit()
  return feature.to_dict()

# get conversions
@project_routes.route('/<int:id>/conversions', methods = ['GET'])
@login_required
def get_conversions(id):
    statement = db.select(Project) \
                    .options(db.joinedload('*')) \
                    .where(Project.id == id)
    project = db.session.execute(statement).unique().scalar() #notice singular 'scalar'; it returns first result
   
    if project is None:
        return {'errors':['Project not found']}, 404

    project.user.updateLastExport()
    db.session.commit()
    
    conversions = generateConversions(project)

    return {'conversions':conversions}


@project_routes.errorhandler(500)
def internal_server_error(e):
    return {'errors': ["Internal Server Error"]}, 500
