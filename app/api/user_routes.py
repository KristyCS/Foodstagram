from flask import Blueprint, request
from flask.wrappers import Request
from flask_login import login_required
from app.models import db, User

user_routes = Blueprint('users', __name__)


@user_routes.route('')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    data = request.json
    user = User.query.get(id)
    user.update(*data)
    db.session.add(user)
    db.session.commit()
    return user.to_dict()
