from app.models import db, Post
import json


# Adds a demo user, you can add other users here if you want
def seed_posts():
    new_posts = []
    with open('./app/seeds/dataJson/post_data.json') as f:
        data = json.load(f)
        for relationship in data:
            new_post = Post(**relationship)
            new_posts.append(new_post)

    db.session.add_all(new_posts)
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
