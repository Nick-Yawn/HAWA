from .db import db
from sqlalchemy.sql import func

class Feature(db.Model):
    __tablename__ = 'features'

    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(80), nullable=False)
    project_id  = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)
    created_at  = db.Column(db.DateTime(timezone = True), server_default = func.now())

    def to_dict(self):
        return {
                'id': self.id,
                'name': self.name,
                'project_id': self.project_id,
                'created_at': self.created_at
                }
