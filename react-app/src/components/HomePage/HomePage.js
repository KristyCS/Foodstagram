import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SinglePostCard from "../SinglePostCard/SinglePostCard";
import { getPosts } from "../../store/posts";
import {Modal} from "../../contex/Modal"
import CreatePostPage from "../CreatePostPage/CreatePostPage";
const HomePage = () => {
  const despatch = useDispatch();
  const postsObjs = useSelector(state=> state.posts.allPosts);
  const postLists = Object.values(postsObjs)
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  useEffect(() => {
    despatch(getPosts());
  },[]);

  return (
    <>
      <button onClick={()=>setShowCreatePostModal(true)}>Create a new Post</button>
      {showCreatePostModal && (
        <Modal onClose={() => setShowCreatePostModal(false)}>
          <CreatePostPage setShowCreatePostModal={setShowCreatePostModal}/>
        </Modal>
      )}
      {postLists && (
        <div className="posts_containers">
          {postLists.map(post => (
            <SinglePostCard key={post.id} singlePost={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
