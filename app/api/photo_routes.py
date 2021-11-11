from flask import Blueprint, request
from app.models import db, Photo

photo_routes = Blueprint('photos', __name__)
@photo_routes.route('/<int:id>', methods=["DELETE"])
def delete_photo(id):
    photo = Photo.query.get(id)
    db.session.delete(photo)
    db.session.commit()
    return {"message": "Delete Successful"}