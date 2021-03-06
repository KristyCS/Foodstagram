from .db import db
import datetime

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    description = db.Column(db.String(2200), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user = db.relationship("User", back_populates="posts")
    photos = db.relationship("Photo", back_populates="post", cascade = 'all, delete , delete-orphan')
    comments = db.relationship("Comment", back_populates="post", cascade = 'all, delete')
    likes = db.relationship("Like", back_populates="post", cascade = 'all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_simple_dict(),
            'description': self.description,
            "photos": [photo.to_simple_dict() for photo in self.photos],
            "comments": [comment.to_simple_dict() for comment in self.comments],
            "likes": [like.to_simple_dict() for like in self.likes]
        }

    def to_simple_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'likes': len(self.likes)
        }

    def update(self, description=None):
        self.description = description if description else self.description
        return self
