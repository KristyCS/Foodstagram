from .db import db

class Follow(db.Model):
    __tablename__ = 'follows'

    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    confirmed = db.Column(db.Boolean, nullable=False, default=False)

    @classmethod
    def create(cls, follower_id, followed_id, confirmed):
        follow = cls(follower_id=follower_id, followed_id=followed_id, confirmed=confirmed)
        db.session.add(follow)
        db.session.commit()
        return follow


