from .db import db
from sqlalchemy.sql import func
from enum import Enum

class CRUDEnum(Enum):
    CREATE = 1
    READ   = 2
    UPDATE = 3
    DELETE = 4

class UserStory(db.Model):
    __tablename__ = 'user_stories'

    id          = db.Column(db.Integer, primary_key=True)
    operation   = db.Column(db.Enum(CRUDEnum))
    story       = db.Column(db.String(280), nullable=False) 
    created_at  = db.Column(db.DateTime(timezone = True), server_default = func.now())

    feature_id  = db.Column(db.Integer, db.ForeignKey("features.id"), nullable=False)
    project_id  = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)

    # TODO: project relational map for auth check

    def to_dict(self):
        return {
            'id':         self.id,
            'story':      self.story,
            'created_at': self.created_at,
            'feature_id': self.feature_id,
            'project_id': self.project_id
                }
