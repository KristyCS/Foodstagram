
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './FollowButton.css'

const FollowButton = () => {
    const user = useSelector(state => state.session.user);
    const { username } = useParams();

    const [followingList, setfollowingList] = useState([]);

    useEffect(() => {

        (async () => {
            const response = await fetch(`/api/users/${user.username}/following`);
            const fetchedUsers = await response.json();
            setfollowingList(fetchedUsers.following);
        })();

    }, [username]);

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
        }

        let inFollowing = followingList.filter(following => following.username === username)

        if(username === inFollowing[0].username) {
           return buttonType = (
                <button className="follow-btn" onClick={unfollowUser}>Unfollow</button>
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
