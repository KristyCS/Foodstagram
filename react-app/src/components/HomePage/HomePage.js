import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SinglePostCard from "../SinglePostCard/SinglePostCard";
import { getPosts } from "../../store/posts";

const HomePage = () => {
  const despatch = useDispatch();
  const postsObjs = useSelector((state) => state.posts.allPosts);
  const postLists = Object.values(postsObjs);

  useEffect(() => {
    despatch(getPosts());
  }, [despatch]);

  return (
    <>

      {postLists && (
        <div className="posts_containers">
          {postLists.map((post) => (
            <SinglePostCard key={post.id} singlePost={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
