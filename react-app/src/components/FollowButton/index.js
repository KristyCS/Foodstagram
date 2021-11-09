
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './FollowButton.css'

const FollowButton = () => {
    const user = useSelector(state => state.session.user);
    const { username } = useParams();
    console.log(username)

    const [followingList, setfollowingList] = useState([]);
    const [followersList, setfollowersList] = useState([]);

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

    }, [username]);

    let inFollowing = followingList.filter(following => following.username === username)
    let inFollowers = followersList.filter(follower => follower.username === username)

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

    if(user) {
        if(user.username === username) {
           return buttonType = (
                <button className="edit-btn" onClick={editUser}>Edit Profile</button>
            )
        } else if(username === inFollowing[0].username) {
           return buttonType = (
                <button className="follow-btn" onClick={unfollowUser}>Unfollow</button>
            )
        } else if(username === inFollowers[0].username) {
            return buttonType = (
                 <button className="follow-btn" onClick={followUser}>Follow Back</button>
             )
        } else {
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
