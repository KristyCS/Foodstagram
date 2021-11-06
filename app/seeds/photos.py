from app.models import db, Photo
import json


# Adds a demo user, you can add other users here if you want
def seed_photos():
    new_photos = []
    with open('./app/seeds/dataJson/photos_data.json') as f:
        data = json.load(f)
        for relationship in data:
            new_photo = Photo(**relationship)
            new_photos.append(new_photo)

    db.session.add_all(new_photos)
    db.session.commit()

def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
