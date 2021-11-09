import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
    <div className="single_post_wrapper">
      <div className="single_post_container">
        <div className="single_post_left">
          {user && <img src={post.photos[0].photo_url}></img>}
        </div>
        <div className="single_post_right">
          <div className="single_post_right_header"></div>
          <div className="single_post_right_body"></div>
          <div className="single_post_right_footer"></div>
        </div>
      </div>
    </div>
  );
}
