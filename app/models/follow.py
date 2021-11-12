from .db import db

class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    confirmed = db.Column(db.Boolean, nullable=False, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'follower_id': self.follower_id,
            'confirmed': self.confirmed
        }

    def update(self, confirmed=None):
        self.confirmed = confirmed if confirmed else self.confirmed
        return self

    @classmethod
    def create(cls, user_id, follower_id, confirmed):
        follow = cls(user_id=user_id, follower_id=follower_id, confirmed=confirmed)
        db.session.add(follow)
        db.session.commit()
        return follow
