from app.models import db, Comment
import json


# Adds a demo user, you can add other users here if you want
def seed_comments():
    new_comments = []
    with open('./app/seeds/dataJson/comments_data.json') as f:
        data = json.load(f)
        for relationship in data:
            new_comment = Comment(**relationship)
            new_comments.append(new_comment)

    db.session.add_all(new_comments)
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
