import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SinglePostCard from "../SinglePostCard/SinglePostCard";
import { getPosts, deletePost} from "../../store/posts";
import { Modal } from "../../contex/Modal";
import {AiOutlinePlusSquare} from "react-icons/ai";
import CreatePostPage from "../CreatePostPage/CreatePostPage";
const HomePage = () => {
  const despatch = useDispatch();
  const postsObjs = useSelector((state) => state.posts.allPosts);
  const postLists = Object.values(postsObjs);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  useEffect(() => {
    despatch(getPosts());
  }, []);
  const deletePostHandler = (id = 5) => {
    despatch(deletePost(id));
  };
  
  return (
    <>
      <AiOutlinePlusSquare onClick={() => setShowCreatePostModal(true)}>
      </AiOutlinePlusSquare>
      <button onClick={deletePostHandler}>Delte</button>
      {showCreatePostModal && (
        <Modal  onClose={() => setShowCreatePostModal(false)}>
          <CreatePostPage setShowCreatePostModal={setShowCreatePostModal} />
        </Modal>
      )}
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
