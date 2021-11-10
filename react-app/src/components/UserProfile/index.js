
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import FollowersModal from '../FollowersModal';
import FollowingModal from '../FollowingModal';
import FollowButton from '../FollowButton';
import './UserProfile.css';


const UserProfile = () => {
    const user = useSelector(state => state.session.user);
    const { username } = useParams();
    const [selectedUser, setselectedUser] = useState({});
    const [postsCount, setpostsCount] = useState(0);
    const [followersCount, setfollowersCount] = useState(0);
    const [followingCount, setfollowingCount] = useState(0);


    useEffect(() => {
        let userfollowers = 0;
        let userfollowing = 0;

        (async () => {
            const response = await fetch(`/api/users/dashboard/${username}`);
            const fetchedUser = await response.json();
            setselectedUser(fetchedUser);

            const userPosts = fetchedUser.posts.length;
            setpostsCount(userPosts);

            const followers = fetchedUser.followers;
            for (let i = 0; i < followers.length; i++) {
                let follower = followers[i];
                if(follower.confirmed === true) userfollowers++;
            }
            setfollowersCount(userfollowers);

            const following = fetchedUser.following;
            for (let i = 0; i < following.length; i++) {
                let follow = following[i];
                if(follow.confirmed === true) userfollowing++;
            }
            setfollowingCount(userfollowing);


        })();
    }, [username]);



    return (
        <div className = "prof-cont">
            <div className = "dis-pic-cont">
                <img id = "dis-pic" src = {selectedUser.profile_photo} alt="user dp"/>
            </div>
            <div className = "prof-details">
                <div className="name-fol">
                    <p>{selectedUser.username}</p>
                    <FollowButton />
                </div>
                <div className="tot-count">
                    <div>
                        {postsCount} posts
                    </div>
                    <div>
                        <FollowersModal
                            followersCount={followersCount}
                            username={username}
                        />
                    </div>
                    <div>
                        <FollowingModal
                            followingCount={followingCount}
                            username={username}
                        />
                    </div>
                </div>
                <div>

                </div>

            </div>
        </div>
    );

}

export default UserProfile;
