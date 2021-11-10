from flask import Blueprint, jsonify,request
from flask_login import login_required
from ..forms import PostForm
from ..models import db, Post, Photo
from ..aws_s3 import upload_file_to_s3
from ..config import Config

post_routes = Blueprint('posts', __name__)

@post_routes.route("/<int:id>",methods=["DELETE"])
def deletePost(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return {"message": "Delete Successful"}

@post_routes.route('/')
def get_all_posts():
    posts = Post.query.limit(20).all()
    return {post.id: post.to_dict() for post in posts}

@post_routes.route('/<int:id>')
def get_single_post(id):
    post = Post.query.get(id)
    return post.to_dict()

@post_routes.route('/', methods=["POST"])
def create_new_post():
    photos = request.files.getlist('images')
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post()
        form.populate_obj(post)
        db.session.add(post)
        db.session.commit()
        createImagesByPostId(photos, post.id)
        return post.to_dict()
    return "error~!!!!!!!!!!!!!!!!!!!"
    # return {'errors': validation_errors_to_error_messages(form.errors)}

def createImagesByPostId(photos, postId):
    if photos:
        for photo in photos:
        # image.filename = get_unique_filename(image.filename)
            photo_url = upload_file_to_s3(photo, 'foodstagramdev')
            photo_url = "https://foodstagramdev.s3.amazonaws.com/"+photo.filename    
            photo = Photo( post_id=postId, photo_url=photo_url)
            db.session.add(photo)
            db.session.commit()

@post_routes.route('/<int:id>', methods=["PUT"])
def updatePost(id):
    photos = request.files.getlist('images')
    post = Post.query.get(id)
    print("Before populate@@@@@@@@@@@")
    print(post)
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(post)
        print("After populate@@@@@@@@@@@")
        print(post)

        db.session.commit()
        # createImagesByPostId(photos, post_id)
        return post.id
    return "error~!!!!!!!!!!!!!!!!!!!"
            
         
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
