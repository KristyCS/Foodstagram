import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./SinglePostDetails.css";

import React from "react";

export default function SinglePostDetails() {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const { postId } = useParams();

  useEffect(async () => {
    const res = await fetch(`/api/posts/${postId}`);
    const data = await res.json();
    setPost(data);
  }, []);

  useEffect(async () => {
    if (post) {
      const res = await fetch(`/api/users/${post.user.id}`);
      const data = await res.json();
      setUser(data);
    }
  }, [post]);

  return (
    <div className="single_post_wrapper2">
      <div className="single_post_container2">
        <div className="single_post_left2">
          {user && <img src={post.photos[0].photo_url}></img>}
        </div>
        <div className="single_post_right2">
          <div className="single_post_right_header2">
            {user && <img src={post.user.profile_photo} className="single_post_right_photo2" />}
            <p>{user && post.user.username}</p>
          </div>
          <div className="single_post_right_body2"></div>
          <div className="single_post_right_footer2"></div>
        </div>
      </div>
    </div>
  );
}
