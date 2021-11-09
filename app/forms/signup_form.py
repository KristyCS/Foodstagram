from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, PasswordField
from wtforms.validators import DataRequired, Email
from app.validators import email_exists, username_exists


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = EmailField('email', validators=[DataRequired(), Email(granular_message=True), email_exists])
    password = PasswordField('password', validators=[DataRequired()])
