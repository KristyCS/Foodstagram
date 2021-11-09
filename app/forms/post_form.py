from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from wtforms import TextAreaField, IntegerField


class PostForm(FlaskForm):
    user_id = IntegerField(validators=[DataRequired()])
    description = TextAreaField(validators=[DataRequired()])
