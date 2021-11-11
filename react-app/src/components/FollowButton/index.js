
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import './FollowButton.css'

const FollowButton = ({selectedUserId, setRerender, rerender}) => {
    let user = useSelector(state => state.session.user);
    const { username } = useParams();

    const [followingList, setfollowingList] = useState([]);
    const [followersList, setfollowersList] = useState([]);
    const [requests, setRequests] = useState([]);
    const [followingId, setfollowingId] = useState(0);
    const [unfollowId, setunfollowId] = useState(0);
    const [followBoolean, setFollowBoolean] = useState(false);

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

    }, [username, followBoolean, user.username]);


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
              // const data = await response.json();
              setfollowingId(0);
              setRerender(!rerender);
              setFollowBoolean(!followBoolean);
            };
         })();
        }
    }, [followingId, user.id, followBoolean, rerender, setRerender]);

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
              // const data = await response.json();
              setunfollowId(0);
              setRerender(!rerender);
              setFollowBoolean(!followBoolean);
            };
         })();
        }
    }, [unfollowId, user.id, followBoolean, rerender, setRerender]);


    let inFollowing = followingList.filter(following => following.username === username)
    let inFollowers = followersList.filter(follower => follower.username === username)
    let inRequests = requests.filter(request => request.username === user.username)


    let buttonType;


    const editUser = (e) => {
        e.preventDefault();

      };



    if(inFollowing.length) {
        //checks if the logged in user is following a user
        if(username === inFollowing[0].username) {
           return buttonType = (
                <button className="follow-btn" onClick={() =>
                    setunfollowId(selectedUserId)
                }>Unfollow</button>
            )
        }
    } else if (inRequests.length) {
        //checks if the logged in user has requested to follow a user
        if(user.username === inRequests[0].username) {
            return buttonType = (
                 <button className="edit-btn" onClick={() =>
                    setunfollowId(selectedUserId)
                }>Requested</button>
             )
        }
    } else if (inFollowers.length) {
        //checks if the user is a follower of the logged in user
        if(username === inFollowers[0].username) {
            return buttonType = (
                 <button className="follow-btn" onClick={() =>
                    setfollowingId(selectedUserId)
                }>Follow Back</button>
             )
        }
    } else {
        //checks if the user is the logged in user
        if(user.username === username) {
            return buttonType = (
                 <button className="edit-btn" onClick={editUser}>Edit Profile</button>
        )} else {
            //if the user is not the logged in user/follower/followings/requested follows
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
