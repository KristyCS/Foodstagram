from flask import Blueprint, request
from app.models import db, Follow

follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/addFollow', methods=['POST'])
def add_follow():
    data = request.json
    new_follow = Follow(**data)
    db.session.add(new_follow)
    db.session.commit()
    return {"message": "Success"}


@follow_routes.route('/confirmRequest', methods=['PUT'])
def confirm_requests():
    data = request.json
    confirm_request = Follow.query.filter(Follow.user_id == data["user_id"]).filter(Follow.follower_id == data["follower_id"]).first()
    confirm_request.confirmed = True
    db.session.add(confirm_request)
    db.session.commit()
    return {"message": "Success"}
