
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import FollowersModal from '../FollowersModal';
import FollowingModal from '../FollowingModal';
import './UserProfile.css';


const UserProfile = () => {
    const user = useSelector(state => state.session.user);
    const { username } = useParams();
    const [selectedUser, setselectedUser] = useState({});
    const [postsCount, setpostsCount] = useState(0);
    const [followersList, setfollowersList] = useState([]);
    const [followingList, setfollowingList] = useState([]);
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
            setfollowersList(followers)
            for (let i = 0; i < followers.length; i++) {
                let follower = followers[i];
                if(follower.confirmed === true) userfollowers++;
            }
            setfollowersCount(userfollowers);

            const following = fetchedUser.following;
            setfollowingList(following);
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
                <div>
                    <p>{selectedUser.username}</p>
                </div>
                <div className="tot-count">
                    <p>
                        {postsCount} posts
                    </p>
                    <p>
                        <FollowersModal
                            followersCount={followersCount}
                            followersList={followersList}
                        />
                    </p>
                    <p>
                        <FollowingModal
                            followingCount={followingCount}
                            followingList={followingList}
                        />
                    </p>
                </div>
                <div>

                </div>

            </div>
        </div>
    );

}

export default UserProfile;
