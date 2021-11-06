from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("confirmed", db.Boolean, nullable=False, default=False)
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=True)
    about = db.Column(db.String(),nullable=True)
    profile_photo = db.Column(db.String(), nullable=True)
    private = db.Column(db.Boolean(),nullable = False, default= False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)


    post = db.relationship("Post", back_populates="users")
    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'post': self.post.to_dict(),
            'profile_photo':self.profile_photo,
            'full_name':self.full_name,
            'about':self.about,
            'private':self.private
        }
