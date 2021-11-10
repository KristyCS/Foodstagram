
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import FollowersModal from '../FollowersModal';
import FollowingModal from '../FollowingModal';
import FollowButton from '../FollowButton';
import './UserProfile.css';


const UserProfile = () => {
    const { username } = useParams();
    const [rerender, setRerender] = useState(false);
    const [selectedUser, setselectedUser] = useState({});
    const [postsCount, setpostsCount] = useState(0);
    const [followersCount, setfollowersCount] = useState(0);
    const [followingCount, setfollowingCount] = useState(0);

    let profileDisplay;
    if(selectedUser.profile_photo) {
        profileDisplay = (
        <>
            <img id = "dis-pic" src = {selectedUser.profile_photo} alt="user dp"/>
        </>
        )
    } else {
        profileDisplay = (
        <>
            <img id = "dis-pic"
            src = "https://res.cloudinary.com/lpriya/image/upload/v1636533183/Foodstagram/default_dp_dcd3ao.png"
            alt="user dp"
            />
        </>
        )
    }

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

    }, [username, rerender]);



    return (
        <div className = "prof-cont">
            <div className = "dis-pic-cont">
                { profileDisplay }
            </div>
            <div className = "prof-details">
                <div className="name-fol">
                    <p>{selectedUser.username}</p>
                    <FollowButton
                    selectedUserId={selectedUser.id}
                    setRerender={setRerender}
                    rerender={rerender}
                    />
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
