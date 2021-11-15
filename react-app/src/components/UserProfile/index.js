
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../store/posts';
import FollowersModal from '../FollowersModal';
import FollowingModal from '../FollowingModal';
import FollowButton from '../FollowButton';
import SinglePostCard from '../SinglePostCard/SinglePostCard';
import './UserProfile.css';


const UserProfile = ({ confirmBoolean }) => {
    const dispatch = useDispatch();
    const { username } = useParams();
    const [rerender, setRerender] = useState(false);
    const [selectedUser, setselectedUser] = useState({});
    const [postsCount, setpostsCount] = useState(0);
    const [followersCount, setfollowersCount] = useState(0);
    const [followingCount, setfollowingCount] = useState(0);
    const postsObjs = useSelector((state) => state.posts.allPosts);
    const postLists = Object.values(postsObjs).reverse();
    const userGallery = true;
    const photoFeed = false;

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);



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

    }, [username, rerender, confirmBoolean]);


    let userPosts = [];
    if(postLists.length){
        userPosts = postLists.filter(post => post.user.id === selectedUser.id)
    }


    return (
        <div className="prof-pg">
            <div className = "prof-cont">
                <div className = "dis-pic-cont">
                    <img id = "dis-pic" src = {selectedUser.profile_photo} alt="user dp"/>
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
                                setRerender={setRerender}
                                rerender={rerender}
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
            {userPosts.length &&
                <div className="user-gallery-cont">
                    {userPosts.map((post) => (
                        <SinglePostCard
                            key={post.id}
                            singlePostId={post.id}
                            userGallery={userGallery}
                            photoFeed={photoFeed}
                        />
                    ))}
                </div>
            }
        </div>
    );

}

export default UserProfile;
