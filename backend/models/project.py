from .db import db
from sqlalchemy.sql import func

class Project(db.Model):
    __tablename__ = 'projects'

    id        = db.Column(db.Integer, primary_key=True)
    title     = db.Column(db.String(80), nullable=False)
    repo_link = db.Column(db.String(128))
    site_link = db.Column(db.String(128))

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user    = db.relationship('User', back_populates='projects')

    created_at = db.Column(db.DateTime(timezone = True), server_default = func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'repo_link': self.repo_link,
            'site_link': self.site_link,
            'user_id': self.user_id,
            'created_at': self.created_at
                }
