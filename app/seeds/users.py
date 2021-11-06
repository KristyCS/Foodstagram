from app.models import db, User
import json


# Adds a demo user, you can add other users here if you want
def seed_users():
    new_users = []
    with open('./app/seeds/dataJson/user_data.json') as f:
        data = json.load(f)
        for user in data:
            new_user = User(**user)
            new_users.append(new_user)

    db.session.add_all(new_users)
    db.session.commit()


# def seed_follows():
#     with open('./app/seeds/dataJson/user_followers.json') as f:
#         data = json.load(f)
#         for relationship in data:
#             print("FOLLOW SEED DATA", type(relationship["follower_id"]))
#             print("FOLLOW SEED DATA", relationship["follower_id"])
#             follower_user = User.query.get(relationship["follower_id"])
#             followed_user = User.query.get(relationship["followed_id"])
#             print("TESTING FOLLOWER", User.query.get(1).followers)
#             if not followed_user.followers:
#                 followed_user.followers = [follower_user]
#             else:
#                 followed_user.followers.append(follower_user)

#             if not follower_user.following:
#                 follower_user.following = [followed_user]
#             else:
#                 follower_user.following.append(followed_user)

#     db.session.commit()

# def seed_follows_confirmed():
#     with open('./app/seeds/dataJson/user_followers.json') as f:
#         data = json.load(f)

#         for relationship in data:
#             curr_rel = follows


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()


# def undo_follows():
#     db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
#     db.session.commit()
