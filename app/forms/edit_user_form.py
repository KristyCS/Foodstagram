from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, BooleanField, PasswordField
from wtforms.validators import Email
from app.validators import email_exists, username_exists


class EditUserForm(FlaskForm):
    full_name = StringField('full_name')
    username = StringField('username', validators=[username_exists])
    email = EmailField('email', validators=[Email(granular_message=True), email_exists])
    profile_photo = StringField('profile_photo')
    private = BooleanField('private')
    about = StringField('about')
    password = PasswordField('password')
