
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './FollowButton.css'

const FollowButton = ({selectedUserId}) => {
    const user = useSelector(state => state.session.user);
    const { username } = useParams();

    const [followingList, setfollowingList] = useState([]);
    const [followersList, setfollowersList] = useState([]);
    const [requests, setRequests] = useState([]);
    const [followingId, setfollowingId] = useState(0);
    const [unfollowId, setunfollowId] = useState(0);

    useEffect(() => {

        (async () => {
            const response = await fetch(`/api/users/${user.username}/following`);
            const fetchedUsers = await response.json();
            setfollowingList(fetchedUsers.following);
        })();

        (async () => {
            const response = await fetch(`/api/users/${user.username}/followers`);
            const fetchedUsers = await response.json();
            setfollowersList(fetchedUsers.followers);
        })();

        (async () => {
            const response = await fetch(`/api/users/${username}/followRequests`);
            const fetchedUsers = await response.json();
            setRequests(fetchedUsers.followers);
        })();

    }, [username]);


    useEffect(() => {
        if(followingId !== 0) {
          (async () => {
            const response = await fetch(`/api/follows/addFollow`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user_id: followingId,
                follower_id: user.id,
                confirmed: false
              })
            });

            if (response.ok) {
              const data = await response.json();
              setfollowingId(0);
            };
         })();
        }
    }, [followingId]);

    useEffect(() => {
        if(unfollowId !== 0) {
          (async () => {
            const response = await fetch(`/api/follows/unfollow`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user_id: unfollowId,
                follower_id: user.id,
                confirmed: true
              })
            });

            if (response.ok) {
              const data = await response.json();
              setunfollowId(0);
            };
         })();
        }
    }, [unfollowId]);


    let inFollowing = followingList.filter(following => following.username === username)
    let inFollowers = followersList.filter(follower => follower.username === username)
    let inRequests = requests.filter(request => request.username === user.username)


    let buttonType;

    const followUser = (e) => {
        e.preventDefault();

      };

    const editUser = (e) => {
        e.preventDefault();

      };

    const unfollowUser = (e) => {
        e.preventDefault();

      };

    const followRequest = (e) => {
        e.preventDefault();

      };


    if(inFollowing.length) {

        if(username === inFollowing[0].username) {
           return buttonType = (
                <button className="follow-btn" onClick={() =>
                    setunfollowId(selectedUserId)
                }>Unfollow</button>
            )
        }
    } else if (inRequests.length) {
        if(user.username === inRequests[0].username) {
            return buttonType = (
                 <button className="edit-btn" onClick={followRequest}>Requested</button>
             )
        }
    } else if (inFollowers.length) {
        if(username === inFollowers[0].username) {
            return buttonType = (
                 <button className="follow-btn" onClick={followUser}>Follow Back</button>
             )
        }
    } else {
        if(user.username === username) {
            return buttonType = (
                 <button className="edit-btn" onClick={editUser}>Edit Profile</button>
        )} else {
            return buttonType = (
                <button className="follow-btn" onClick={ () =>
                    setfollowingId(selectedUserId)
                }>Follow</button>
            )
        }
    }


    return (
        <>
            {buttonType}
        </>
    );

}

export default FollowButton;
