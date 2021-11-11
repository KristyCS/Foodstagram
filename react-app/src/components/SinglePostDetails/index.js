import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./SinglePostDetails.css";

export default function SinglePostDetails() {
  const currentUser = useSelector((state) => state.session.user);
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { postId } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/posts/${postId}`);
      const data = await res.json();
      setPost(data);
      console.log({ Post: post });
    })();
  }, [postId, refresh]);

  useEffect(() => {
    (async () => {
      if (post) {
        const res = await fetch(`/api/users/${post.user.id}`);
        const data = await res.json();
        setUser(data);
        console.log({ User: user });
      }
    })();
  }, [post, refresh]);

  const isFollowing = () => {
    for (const user of currentUser.following) {
      if (user.follower_id === post.user.id && user.confirmed === true)
        return "Following";
      if (user.follower_id === post.userid) return "Requested";
    }
    return "Follow";
  };

  const handleFollow = async (e) => {
    if (e.target.id === "Following" || e.target.id === "Requested") {
      console.log("ping");
      await fetch(`/api/follows/unfollow`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: post.user.id,
          follower_id: currentUser.id,
        }),
      });
    }

    if (e.target.id === "Follow") {
      console.log("ping Follow");
      await fetch(`/api/follows/addFollow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: post.user.id,
          follower_id: currentUser.id,
        }),
      });
    }

    setRefresh(!refresh);
  };

  if (!user) return "loading...";

  return (
    <div className="single_post_wrapper2">
      <div className="single_post_container2">
        <div className="single_post_left2">
          <img
            src={post.photos[0].photo_url}
            className="single_post_left2_img"
            alt=""
          />
        </div>
        <div className="single_post_right2">
          <div className="single_post_right_header2">
            <img
              src={post.user.profile_photo}
              className="single_post_right_photo2"
              alt=""
            />
            <p>{post.user.username}</p>
            <div
              className="single_post_right2_follow_btn"
              id={isFollowing()}
              onClick={(e) => handleFollow(e)}
            >
              {isFollowing()}
            </div>
          </div>
          <div className="single_post_right_body2"></div>
          <div className="single_post_right_footer2"></div>
        </div>
      </div>
    </div>
  );
}
