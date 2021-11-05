from .db import db
from .user import User

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    photo_url = db.Column(db.String(),nullable = False)

    post = db.relationship("Post", back_populates="photos")

    def to_dict(self):
        return {
            'id': self.id,
            'post': self.post,
            'photo_url': self.photo_url,
        }