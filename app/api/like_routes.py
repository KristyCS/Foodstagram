from flask import Blueprint, request
from app.models import db, Like

like_routes = Blueprint('likes', __name__)

@like_routes.route('')
def likes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}


@like_routes.route("/<int:id>")
def like(id):
    like = Like.query.get(id)
    return like.to_dict()


@like_routes.route('', methods=['POST'])
def post_likes():
    data = request.json
    new_like = Like(**data)
    db.session.add(new_like)
    db.session.commit()
    return new_like

@like_routes.route('/<int:id>', methods=['POST'])
def update_likes(id):
    data = request.json
    like = Like.query.get(id)
    like.update(**data)
    db.session.add(like)
    db.session.commit()
    return "like"
