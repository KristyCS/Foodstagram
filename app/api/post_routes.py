from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Post

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def get_all_posts():
    posts = Post.query.limit(20).all()
    return {post.id: post.to_dict() for post in posts}

# @post_routes.route('')
# def get_paginated_posts():
#     page = int(request.args.get('page', 0))
#     community_name = request.args.get('community_name', '')
#     if community_name:
#         community = Community.query.filter(
#             Community.name.ilike(community_name)).first()
#         if community:
#             posts = Post.query.filter(
#                 Post.community_id == community.id).paginate(page=page,
#                                                             per_page=20)
#         else:
#             return {"errors": ["Invalid Community Name."]}
#     else:
#         posts = Post.query.paginate(page=page, per_page=20)
#     return {post.id: post.to_dict() for post in posts.items}

