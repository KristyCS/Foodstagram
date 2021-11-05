from .db import db
from .user import User

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    description = db.Column(db.String(2200), nullable=True)

    user = db.relationship("User", back_populates="posts")
    photo = db.relationship("Photo", back_populates="posts")

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user,
            'description': self.email,
            'photo': self.photo 
        }
