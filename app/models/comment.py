from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    content = db.Column(db.String(2200), nullable=False)

    post = db.relationship("Post", back_populates="comments")
    user = db.relationship("User", back_populates="comments")
    likes = db.relationship("Like", back_populates="comment", cascade = 'all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_simple_dict(),
            'post': self.post.to_simple_dict(),
            'content': self.content
        }

    def to_simple_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id
        }
