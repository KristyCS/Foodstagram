import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../store/posts";
import { Modal } from "../../context/Modal";
import { ImHeart } from "react-icons/im";
import "./SinglePostCard.css";
import PostDetailPage from "../PostDetailPage/PostDetailPage"
const SinglePostCard = ({ singlePost }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [imageIndex, setImageIndex] = useState(0);
  const [postDetailModal, setPostDetailModal] = useState(false);

  const [inputComment, setinputComment] = useState('')
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const number_of_all_comments = singlePost.comments.length;


  useEffect(() => {
    const res = fetch(`/api/posts/${singlePost.id}/comments`)
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
        })
  }, [number_of_all_comments])

  const correspondingComments = () => {
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let sessionComments = []
      for (const comment in items) {
        if (sessionComments.length > 3) {
          break
        }
        if (items[comment].user.id === user.id) {
          sessionComments.push(items[comment])
        }
      }
      if (sessionComments.length) {
        return (
          sessionComments.map((comment) => {
            let shortener = ''
            if (comment.content.length > 50) {
              shortener = comment.content.slice(0, 50) + '...'
            }
            return (
              <div id={comment.id}>
                {comment.user.username}: {shortener ? shortener : comment.content}
              </div>
            )
          })
        )
      } else {
        const commentId = Object.keys(items)
        const firstComment = items[commentId[0]]
        let shortener = ''
        if (firstComment.content.length > 50) {
          shortener = firstComment.content.slice(0, 50) + '...'
        }
        return (
          <div>
            {firstComment.user.username} : {shortener ? shortener : firstComment.content}
          </div>
        )
      }
    }
  }



  const isThereAnyComments = () => {
    if (number_of_all_comments) {
      return `View all ${number_of_all_comments} comments`
    } else {
      return `View post details`
    }
  }

  const handleSubmit = async (event) => {
    const payload = {
      user_id: user.id,
      post_id: singlePost.id,
      content: inputComment
    };
    dispatch(createComment(payload))
    setinputComment('')
    return null
  }


  return (
    <div className="single_post_container">
      <div className="single_post_user">
        <img
          src={singlePost.user.profile_photo}
          alt="profile_photo"
          className="profile_photo"
        />
        <p className="user_name">{singlePost.user.username}</p>
      </div>
      <div className="main_post_image">
        <img
          src={singlePost.photos[imageIndex].photo_url}
          alt="display_image"
          className="display_image"
        />
      </div>
      <div className="operation">
        <ImHeart />
        {/* <img src={Like} alt="empty heart"className="empty_heart"/> */}
      </div>
      <div className="likes">
        <p>3 likes</p>
      </div>
      <div className="description">
        <NavLink to="" className="description_user_name">
          <p>{singlePost.user.username}</p>
        </NavLink>
        <p className="description_content">{singlePost.description}</p>
      </div>
      <div className="view_all_comments">
        <span onClick={() => setPostDetailModal(true)}>
          {isThereAnyComments()}
        </span>
      </div>
      <div>
        {number_of_all_comments && correspondingComments()}
      </div>
      <div>
        <input placeholder='Add a comment...' value={inputComment} onChange={(event) => { setinputComment(event.target.value) }}>
        </input>
        <button disabled={!inputComment} onClick={(event) => handleSubmit()}>
          Post
        </button>
      </div>
      {postDetailModal && (
        <Modal onClose={() => setPostDetailModal(false)}>
          <PostDetailPage singlePost={singlePost} />
        </Modal>
      )}
    </div>
  );
};

export default SinglePostCard;
