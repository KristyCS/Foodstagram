from .db import db

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    photo_url = db.Column(db.String(),nullable = False)

    post = db.relationship("Post", back_populates="photos")

    def to_dict(self):
        return {
            'id': self.id,
            'post': self.post.to_simple_dict(),
            'photo_url': self.photo_url,
        }

    def to_simple_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'photo_url': self.photo_url
        }

    def update(self, photo_url=None):
        self.photo_url = photo_url if photo_url else self.photo_url
        return self
