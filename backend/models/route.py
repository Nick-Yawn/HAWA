from .db import db
from sqlalchemy.sql import func
from enum import Enum

class TypeEnum(Enum):
    Front_End = "Front-End"
    API       = "API"

valuesCallable = lambda x: [e.value for e in x]
# This is to account for the somewhat silly behavior of SQLAlchemy w/r/t enums, in which the Enum's names are used for the database enums by defualt,
#   as opposed to the values

class MethodEnum(Enum):
    GET     = 1
    POST    = 2
    PUT     = 3
    PATCH   = 4
    DELETE  = 5

class Route(db.Model):
    __tablename__ = 'routes'

    id          = db.Column(db.Integer, primary_key=True)
    type        = db.Column(db.Enum(TypeEnum, values_callable=valuesCallable), nullable=False)
    method      = db.Column(db.Enum(MethodEnum))
    path        = db.Column(db.String(80), nullable=False)
    label       = db.Column(db.String(255))
    created_at  = db.Column(db.DateTime(timezone = True), server_default = func.now())

    feature_id  = db.Column(db.Integer, db.ForeignKey("features.id"), nullable=False)
    project_id  = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)

    def to_dict(self):
        return {
            'id':     self.id,
            'type':   self.type,
            'method': self.method,
            'path':   self.path,
            'label':  self.label,
            'feature_id': self.feature_id,
            'project_id': self.project_id
                }
