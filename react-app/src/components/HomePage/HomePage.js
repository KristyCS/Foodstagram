import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SinglePostCard from "../SinglePostCard/SinglePostCard";
import { getPosts } from "../../store/posts";

const HomePage = () => {
  const despatch = useDispatch();
  const postsObjs = useSelector((state) => state.posts.allPosts);
  const postLists = Object.values(postsObjs).reverse();
  const photoFeed = true;
  const userGallery = false;
  const [updateLikes, setUpdateLikes] = useState(true)

  useEffect(() => {
    despatch(getPosts());
  }, [despatch, updateLikes]);



  return (
    <>

      {postLists && (
        <div className="posts_containers">
          {postLists.map((post) => (
            <SinglePostCard
              key={post.id}
              singlePostId={post.id}
              photoFeed={photoFeed}
              userGallery={userGallery}
              setUpdateLikes={setUpdateLikes}
              updateLikes={updateLikes}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
