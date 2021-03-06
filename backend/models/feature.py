from .db import db
from sqlalchemy.sql import func

class Feature(db.Model):
    __tablename__ = 'features'

    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(80), nullable=False)
    project_id  = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)
    created_at  = db.Column(db.DateTime(timezone = True), server_default = func.now())

    routes       = db.relationship('Route', cascade='all, delete')
    user_stories = db.relationship('UserStory', cascade='all, delete')

    def to_dict(self):
        return {
                'id': self.id,
                'name': self.name,
                'project_id': self.project_id,
                'created_at': self.created_at,
                'routes': {route.id: route.to_dict() for route in self.routes},
                'user_stories': {user_story.id: user_story.to_dict() for user_story in self.user_stories}
                }
