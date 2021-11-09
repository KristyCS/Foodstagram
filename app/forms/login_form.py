from flask_wtf import FlaskForm
from wtforms import EmailField, PasswordField
from wtforms.validators import DataRequired, Email
from app.validators import password_matches, user_exists


class LoginForm(FlaskForm):
    email = EmailField('email', validators=[DataRequired(), Email(Email(granular_message=True)), user_exists])
    password = PasswordField('password', validators=[DataRequired(), password_matches])
