from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from enum import Enum
from datetime import datetime

class RoleEnum(Enum):
    user = 1
    admin = 2

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id              = db.Column(db.Integer, primary_key=True)
    name            = db.Column(db.String(40), nullable=False)
    email           = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    role            = db.Column(db.Enum(RoleEnum), nullable=False, default="user")
    last_login      = db.Column(db.DateTime(timezone = True))
    last_export     = db.Column(db.DateTime(timezone = True))

    projects = db.relationship('Project', back_populates='user')

    def updateLastLogin(self):
        self.last_login = datetime.now()
        db.session.commit()

    def updateLastExport(self):
        self.last_export = datetime.now()
        db.session.commit()
    
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email
        }

    def projects_to_dict(self):
        return {
            'projects': [p.to_dict() for p in self.projects]
                }
