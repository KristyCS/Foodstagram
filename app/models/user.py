from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .follow import Follow
# follows = db.Table(
#     "follows",
#     db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
#     db.Column("followed_id", db.Integer, db.ForeignKey("users.id")),
#     db.Column("confirmed", db.Boolean, nullable=False, default=False)
# )
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=True)
    about = db.Column(db.String(),nullable=True)
    profile_photo = db.Column(db.String(), nullable=True, default="https://res.cloudinary.com/lpriya/image/upload/v1636533183/Foodstagram/default_dp_dcd3ao.png")
    private = db.Column(db.Boolean(),nullable = False, default= False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)


    followers = db.relationship('Follow', primaryjoin=id==Follow.user_id )
    following = db.relationship('Follow', primaryjoin=id==Follow.follower_id )
    posts = db.relationship("Post", back_populates="user", cascade = 'all, delete')
    comments = db.relationship("Comment", back_populates="user", cascade = 'all, delete')
    likes = db.relationship("Like", back_populates="user", cascade = 'all, delete')

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
            "posts": [post.to_simple_dict() for post in self.posts],
            "comments": [comment.to_simple_dict() for comment in self.comments],
            "likes": [like.to_simple_dict() for like in self.likes],
            "followers": [follow.to_dict() for follow in self.followers],
            "following": [follow.to_dict() for follow in self.following],
            'profile_photo':self.profile_photo,
            'full_name':self.full_name,
            'about':self.about,
            'private':self.private
        }

    def to_simple_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'full_name': self.full_name,
            'email': self.email,
            'profile_photo': self.profile_photo,
            'about': self.about,
            'private': self.private
        }

    def update(self, username=None, email=None, full_name=None, about=None, profile_photo=None, private=None, password=None, **kwargs):
        self.username = username if username else self.username
        self.email = email if email else self.email
        self.full_name = full_name if full_name else self.full_name
        self.about = about if about else self.about
        self.profile_photo = profile_photo if profile_photo else self.profile_photo
        self.private = private if private else self.private
        self.password = password if password else self.password
        return self






    def followers_dict(self):
        return {
            "followers": [follow.to_dict() for follow in self.followers]
        }


    def following_dict(self):
        return {
            "following": [follow.to_dict() for follow in self.following]
        }


    @classmethod
    def create(cls, username, email, full_name, profile_photo, about, private, hashed_password):
        user = cls(username=username, email=email,  hashed_password=hashed_password, \
            full_name=full_name, profile_photo=profile_photo, about=about, \
            private=private)
        db.session.add(user)
        db.session.commit()
        return user
