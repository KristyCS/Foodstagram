from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    content = db.Column(db.String(2200), nullable=False)

    post = db.relationship("Post", back_populates="comments")
    user = db.relationship("User", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'post': self.post.to_dict(),
            'content': self.content
        }
