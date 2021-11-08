
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './UserProfile.css';


const UserProfile = () => {
    const user = useSelector(state => state.session.user);
    const { username } = useParams();
    const [selectedUser, setselectedUser] = useState({});
    const [postsCount, setpostsCount] = useState(0);
    const [followersCount, setfollowersCount] = useState(0);
    const [followingCount, setfollowingCount] = useState(0);

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/dashboard/${username}`);
            const fetchedUser = await response.json();
            setselectedUser(fetchedUser);

            const userPosts = fetchedUser.posts.length;
            setpostsCount(userPosts);

            const userfollowers = fetchedUser.followers.length;
            setfollowersCount(userfollowers);

            const userfollowing = fetchedUser.following.length;
            setfollowingCount(userfollowing);


        })();
    }, [username]);

    console.log(selectedUser)

    return (
        <div className = "prof-cont">
            <div className = "dis-pic-cont">
                <img id = "dis-pic" src = {selectedUser.profile_photo} />
            </div>
            <div className = "prof-details">
                <div>
                    <p>{selectedUser.username}</p>
                </div>
                <div className="tot-count">
                    <p>
                        {postsCount} posts
                    </p>
                    <p>
                        {followersCount} followers
                    </p>
                    <p>
                        {followingCount} following
                    </p>
                </div>
                <div>

                </div>

            </div>
        </div>
    );

}

export default UserProfile;
