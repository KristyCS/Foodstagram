from app.models import db, Like
import json


# Adds a demo user, you can add other users here if you want
def seed_likes():
    new_likes = []
    with open('./app/seeds/dataJson/likes_data.json') as f:
        data = json.load(f)
        for relationship in data:
            new_like = Like(**relationship)
            new_likes.append(new_like)

    db.session.add_all(new_likes)
    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
