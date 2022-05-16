from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class ProjectForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
