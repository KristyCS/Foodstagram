from flask import Blueprint, jsonify, request
from app.models import Comment, db

comment_routes = Blueprint('comments', __name__)


# this section will be added to /api/post/:id/comments
@comment_routes.route('/<int:id>', methods=['GET', 'POST'])
def get_some_comments(id):
    if request.method == 'GET':
        comments = Comment.query.filter_by(post_id=id).limit(6).all()
        return {comment.id: comment.to_dict() for comment in comments}
    if request.method == 'POST':
        payload = request.get_json()
        new_comment = Comment(
            post_id=id,
            user_id=payload['user_id'],
            content=payload['content']
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()


# @comment_routes.route('/<int:comment_id>', methods=['GET', 'PUT', 'DELETE'])
# def get_some_comments(comment_id):
#     comment = Comment.query.get(comment_id)
#     if request.method == 'PUT':
#         content = request.get_json()
#         print(content.values(), '---------------------')
#         comment.content = next(iter(content.values()))
#         db.session.commit()
#     if request.method == 'DELETE':
#         db.session.delete(comment)
#         db.session.commit()
#         return 'Success'

#     return comment.to_dict()
