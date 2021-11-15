import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../store/posts";
import { Modal } from "../../context/Modal";
// import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import {
  IoHeartOutline,
  IoHeartSharp,
  IoChatbubbleOutline,
} from "react-icons/io5";
import "./SinglePostCard.css";
import PostDetailPage from "../PostDetailPage/PostDetailPage";

const SinglePostCard = ({
  singlePostId,
  photoFeed,
  userGallery,
  setUpdateLikes,
  updateLikes,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const singlePost = useSelector((state) => state.posts.allPosts[singlePostId]);
  const [imageIndex] = useState(0);
  const [postDetailModal, setPostDetailModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [inputComment, setinputComment] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [updateCommentLikes, setUpdateCommentLikes] = useState(false);
  const [items, setItems] = useState([]);
  const number_of_all_comments = singlePost.comments.length;

  useEffect(() => {
    fetch(`/api/posts/${singlePost.id}/comments`)
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
        setIsLoaded(true);
      });
  }, [number_of_all_comments, singlePost.id, updateCommentLikes]);

  const userLikes = () => {
    for (const like of singlePost.likes) {
      if (like.user_id === user.id)
        return (
          <div
            className={`single_post_user_btn liked`}
            id={`${like.id}`}
            onClick={handleLikes}
          >
            <IoHeartSharp />
          </div>
        );
    }
    return (
      <div className={`single_post_user_btn`} id={0} onClick={handleLikes}>
        <IoHeartOutline />
      </div>
    );
  };

  const handleLikes = async (e) => {
    e.stopPropagation();
    const id = Number(e.currentTarget.id);
    if (id > 0) {
      await fetch(`/api/likes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      setUpdateLikes(!updateLikes);
      return;
    }
    await fetch(`/api/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        post_id: singlePost.id,
      }),
    });
    setUpdateLikes(!updateLikes);
    return;
  };

  const correspondingComments = () => {
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let sessionComments = [];
      for (const comment in items) {
        if (sessionComments.length > 0) {
          break;
        }
        if (items[comment].user.id === user.id) {
          sessionComments.push(items[comment]);
        }
      }
      if (sessionComments.length) {
        return sessionComments.map((comment) => {
          return (
            <div key={comment.id}>
              {!showMore && hideShowComment(false, comment)}
              {showMore && hideShowComment(true, comment)}
            </div>
          );
        });
      } else {
        const commentId = Object.keys(items);
        const firstComment = items[commentId[0]];
        if (!firstComment) {
          return null;
        }
        if (firstComment.content.length > 50) {
        }
        return (
          <div className="view_all_comments_container">
            {!showMore && hideShowComment(false, firstComment)}
            {showMore && hideShowComment(true, firstComment)}
          </div>
        );
      }
    }
  };

  const hideShowComment = (show, comment) => {
    if (comment.content.length < 50) {
      return (
        <>
          <span
            className="usernames-link"
            onClick={(event) => toProfile(comment.user.username)}
          >
            {comment.user.username}
          </span>{" "}
          {comment.content}
        </>
      );
    }
    if (show) {
      return (
        <>
          <span
            className="usernames-link"
            onClick={(event) => toProfile(comment.user.username)}
          >
            {comment.user.username}
            &nbsp;
          </span>{" "}
          {comment.content}{" "}
          <button
            className="more-less-btn"
            onClick={(event) => setShowMore(false)}
          >
            Less
          </button>
        </>
      );
    } else {
      let shortener = "";
      if (comment.content.length >= 50) {
        shortener = comment.content.slice(0, 50) + "...";
      }
      return (
        <>
          <span
            className="usernames-link"
            onClick={(event) => toProfile(comment.user.username)}
          >
            {comment.user.username}
          </span>
          &nbsp; {shortener}{" "}
          <button
            className="more-less-btn"
            onClick={(event) => setShowMore(true)}
          >
            Show
          </button>
        </>
      );
    }
  };

  const isThereAnyComments = () => {
    if (number_of_all_comments) {
      return `View all ${number_of_all_comments} comments`;
    } else {
      return `View post details`;
    }
  };

  const handleCommentSubmit = async (event) => {
    const payload = {
      user_id: user.id,
      post_id: singlePost.id,
      content: inputComment,
    };
    dispatch(createComment(payload));
    setinputComment("");
    return null;
  };

  const toProfile = (username) => {
    history.push(`/users/dashboard/${username}`);
  };

  return (
<>
      {photoFeed &&
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
        {userLikes()}{" "}
        <div className={`single_post_user_btn`} id={0}>
          <IoChatbubbleOutline onClick={() => setPostDetailModal(true)} />
        </div>
      </div>
      <div className="likes">
        <p>{`${singlePost.likes.length} likes`}</p>
      </div>
      <div className="description">

        <p className="description_content">
          <NavLink  to={`/users/dashboard/${singlePost.user.username}`} className="description_user_name">
            {singlePost.user.username}
          </NavLink>{" "}
          {singlePost.description}
        </p>
      </div>
      <div className="view_all_comments">
        <span onClick={() => setPostDetailModal(true)}>
          {isThereAnyComments()}
        </span>
      </div>
      <div>{number_of_all_comments ? correspondingComments() : null}</div>
      <div>
        <input
          className="comment-input-bar"
          placeholder="Add a comment..."
          value={inputComment}
          onChange={(event) => {
            setinputComment(event.target.value);
          }}
        ></input>
        <button
          className="comment-submit-btn"
          disabled={!inputComment}
          onClick={(event) => handleCommentSubmit()}
        >
          Post
        </button>
      </div>
      {postDetailModal && (
        <Modal type="edit" onClose={() => setPostDetailModal(false)}>
          <PostDetailPage
            setPostDetailModal={setPostDetailModal}
            singlePostId={singlePost.id}
            comments={items}
            inputComment={inputComment}
            setinputComment={setinputComment}
            updateLikes={updateLikes}
            setUpdateLikes={setUpdateLikes}
            updateCommentLikes={updateCommentLikes}
            setUpdateCommentLikes={setUpdateCommentLikes}
          />
        </Modal>

      )}
      </div>
      }

      {userGallery &&
        <div className="user_img_cont">
          <div className="user_img">
            <img
              src={singlePost.photos[imageIndex].photo_url}
              alt="display_image"
              className="u-g-i"
            />
          </div>
          <div className="gal-img-info" onClick={() => setPostDetailModal(true)}>
            <ul>
              <li className="gal-img-likes">
                <i className="fas fa-heart"></i> {singlePost.likes.length}
              </li>
              <li className="gal-img-com">
                <i className="fas fa-comment"></i> {singlePost.comments.length}
              </li>
            </ul>
          </div>
          {postDetailModal && (
            <Modal type="edit" onClose={() => setPostDetailModal(false)}>
              <PostDetailPage
                setPostDetailModal={setPostDetailModal}
                singlePostId={singlePost.id}
                comments={items}
                inputComment={inputComment}
                setinputComment={setinputComment}
                updateLikes={updateLikes}
                setUpdateLikes={setUpdateLikes}
                updateCommentLikes={updateCommentLikes}
                setUpdateCommentLikes={setUpdateCommentLikes}
              />
            </Modal>
          )}
        </div>


}
</>
  )

}


export default SinglePostCard;
