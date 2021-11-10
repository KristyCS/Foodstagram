import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../store/posts";
import { Modal } from "../../context/Modal";
import { ImHeart, ImBubble2 } from "react-icons/im";
import "./SinglePostCard.css";
import PostDetailPage from "../PostDetailPage/PostDetailPage"

const SinglePostCard = ({ singlePost }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [imageIndex] = useState(0);
  const [postDetailModal, setPostDetailModal] = useState(false);
  const [showMore, setShowMore] = useState(false)
  const [inputComment, setinputComment] = useState('')
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const number_of_all_comments = singlePost.comments.length;


  useEffect(() => {
    fetch(`/api/posts/${singlePost.id}/comments`)
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
        })
  }, [number_of_all_comments, singlePost.id])

  const correspondingComments = () => {
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let sessionComments = []
      for (const comment in items) {
        if (sessionComments.length > 0) {
          break
        }
        if (items[comment].user.id === user.id) {
          sessionComments.push(items[comment])
        }
      }
      if (sessionComments.length) {
        return (
          sessionComments.map((comment) => {
            return (
              <div key={comment.id}>
                {!showMore && hideShowComment(false, comment)}
                {showMore && hideShowComment(true, comment)}
              </div>
            )
          })
        )
      } else {
        const commentId = Object.keys(items)
        const firstComment = items[commentId[0]]
        // let shortener = ''
        if (firstComment.content.length > 50) {
          // shortener = firstComment.content.slice(0, 50) + '...'
        }
        return (
          <div>
            {!showMore && hideShowComment(false, firstComment)}
            {showMore && hideShowComment(true, firstComment)}
          </div>
        )
      }
    }
  }

  const hideShowComment = (show, comment) => {
    if (comment.content.length < 50) {
      return (
        <>
          {comment.user.username}:  {comment.content}
        </>
      )
    }
    if (show) {
      return (
        <>
          {comment.user.username}:  {comment.content} <button onClick={(event) => setShowMore(false)}>Less</button>
        </>
      )
    } else {
      let shortener = ''
      if (comment.content.length >= 50) {
        shortener = comment.content.slice(0, 50) + '...'
      }
      return (
        <>
          {comment.user.username}:  {shortener} <button onClick={(event) => setShowMore(true)}>Show</button>
        </>
      )
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
        <ImHeart /> <ImBubble2 onClick={() => test} />
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
          <PostDetailPage setPostDetailModal={setPostDetailModal} singlePost={singlePost} />
        </Modal>
      )}
    </div>
  );
};

export default SinglePostCard;
