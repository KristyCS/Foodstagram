
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './FollowButton.css'

const FollowButton = () => {
    const user = useSelector(state => state.session.user);
    const { username } = useParams();

    const [followingList, setfollowingList] = useState([]);
    const [followersList, setfollowersList] = useState([]);
    const [requests, setRequests] = useState([]);

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
                <button className="follow-btn" onClick={unfollowUser}>Unfollow</button>
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
                <button className="follow-btn" onClick={followUser}>Follow</button>
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
