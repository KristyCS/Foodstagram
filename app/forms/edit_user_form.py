from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, BooleanField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def email_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

class EditUserForm(FlaskForm):
    full_name = StringField('full_name')
    username = StringField('username', validators=[username_exists])
    email = EmailField('email', validators=[Email(), email_exists])
    profile_photo = StringField('profile_photo')
    private = BooleanField('private')
    about = StringField('about')
    password = PasswordField('password')
