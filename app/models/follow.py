from .db import db

class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    confirmed = db.Column(db.Boolean, nullable=False, default=False)


    # child = db.relationship("User", back_populates="follows")
    # parent = db.relationship("User", back_populates="follows")

    child = db.relationship("User", foreign_keys=[follower_id])
    parent = db.relationship("User", foreign_keys=[followed_id])
