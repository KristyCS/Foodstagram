from app.models import db, Follow
import json


# Adds a demo user, you can add other users here if you want
def seed_follows():
    new_follows = []
    with open('./app/seeds/dataJson/user_followers.json') as f:
        data = json.load(f)
        for relationship in data:
            new_follow = Follow(**relationship)
            new_follows.append(new_follow)

    db.session.add_all(new_follows)
    db.session.commit()


def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()
