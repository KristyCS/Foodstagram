from flask import Blueprint, request
from app.models import db, Follow

follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/addFollow', methods=['POST'])
def add_follow():
    data = request.json
    new_follow = Follow(**data)
    print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", new_follow)
    db.session.add(new_follow)
    db.session.commit()
    return {"message": "Follow added"}


@follow_routes.route('/confirmRequest', methods=['PUT'])
def confirm_requests():
    data = request.json
    confirm_request = Follow.query.filter(Follow.user_id == data["user_id"]).filter(Follow.follower_id == data["follower_id"]).first()
    confirm_request.confirmed = True
    db.session.add(confirm_request)
    db.session.commit()
    return {"message": "Follow request confirmed"}


@follow_routes.route('/unfollow', methods=['DELETE'])
def unfollow():
    data = request.json
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", data)
    remove_follow = Follow.query.filter(Follow.user_id == data["user_id"]).filter(Follow.follower_id == data["follower_id"]).first()
    db.session.delete(remove_follow)
    db.session.commit()
    return {"message": "Unfollowed user"}
