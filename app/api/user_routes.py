from flask import Blueprint, request
from flask.wrappers import Request
from flask_login import login_required
from app.models import db, User
from app.forms import EditUserForm
from app.validators import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def update_user(id):
    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)
        print(form.data)
        user.update(**form.data)
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return "success"


@user_routes.route('/dashboard/<string:username>')
# @login_required
def selected_user(username):
    user = User.query.filter(User.username == username).first()
    return user.to_dict()


@user_routes.route('/<string:username>/followers')
# @login_required
def user_followers(username):
    user = User.query.filter(User.username == username).first()
    followers = user.followers_dict()["followers"]
    followers_list = []
    for follower in followers:
        if follower["confirmed"] == True:
            user = User.query.get(follower["follower_id"])
            follower = user.to_simple_dict()
            followers_list.append(follower)

    return {"followers": followers_list}


@user_routes.route('/<string:username>/following')
# @login_required
def user_following(username):
    user = User.query.filter(User.username == username).first()
    following = user.following_dict()["following"]
    following_list = []
    for follow in following:
        if follow["confirmed"] == True:
            user = User.query.get(follow["user_id"])
            following = user.to_simple_dict()
            following_list.append(following)

    return {"following": following_list}


@user_routes.route('/<string:username>/followRequests')
# @login_required
def follow_requests(username):
    user = User.query.filter(User.username == username).first()
    followers = user.followers_dict()["followers"]
    followers_list = []
    for follower in followers:
        if follower["confirmed"] == False:
            user = User.query.get(follower["follower_id"])
            follower = user.to_simple_dict()
            followers_list.append(follower)

    return {"followers": followers_list}
