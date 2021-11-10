from flask import Blueprint, jsonify, request
from app.models import Comment, db

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:comment_id>', methods=['GET', 'PUT', 'DELETE'])
def get_some_comments(comment_id):
    comment = Comment.query.get(comment_id)
    if request.method == 'PUT':
        content = request.get_json()
        comment.content = next(iter(content.values()))
        db.session.commit()
    if request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()
        return 'Success'

    return comment.to_dict()
