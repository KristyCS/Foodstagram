from .db import db

class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"))

    post = db.relationship("Post", back_populates="likes")
    user = db.relationship("User", back_populates="likes")
    comment = db.relationship("Comment", back_populates="likes")


    def to_dict(self):
        return {
            'id': self.id,
            'post': self.post.to_simple_dict() if self.post else None,
            'comment': self.comment.to_simple_dict() if self.comment else None,
            'user': self.user.to_simple_dict() if self.user else None
        }

    def to_simple_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "comment_id": self.comment_id
            }

    def update(self, post_id=None, comment_id=None):
        self.post_id = post_id
        self.comment_id = comment_id
        return self
