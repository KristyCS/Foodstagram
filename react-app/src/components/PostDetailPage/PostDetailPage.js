import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import EditPostPage from "../EditPostPage/EditPostPage";
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
  IoHeartOutline,
  IoHeartSharp,
} from "react-icons/io5";
import { deletePost } from "../../store/posts";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import "./PostDetailPage.css";
import { createComment, destroyComment } from "../../store/posts";

function PostDetailPage({
  setPostDetailModal,
  singlePostId,
  comments,
  inputComment,
  setinputComment,
  updateLikes,
  setUpdateLikes,
  updateCommentLikes,
  setUpdateCommentLikes,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const singlePost = useSelector((state) => state.posts.allPosts[singlePostId]);
  const [imageIdx, setImageIdx] = useState(0);
  const [showPreImgIcon, setShowPreImgIcon] = useState(false);
  const [showNxtImgIcon, setShowNxtImgIcon] = useState(true);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [photoList, setPhotoList] = useState([...singlePost.photos]);
  const deletePostHandler = () => {
    dispatch(deletePost(singlePost.id));
    setPostDetailModal(false);
  };

  useEffect(() => {
    const newPhotoList = [];
    for (let i = 0; i < singlePost.photos.length; i++) {
      newPhotoList.push(singlePost.photos[i]);
    }
    setPhotoList([...singlePost.photos]);
    setImageIdx(0);
    setShowNxtImgIcon(true);
    setShowPreImgIcon(true);
    if (imageIdx === singlePost.photos.length - 1) {
      setShowNxtImgIcon(false);
    }
    if (imageIdx === 0) {
      setShowPreImgIcon(false);
    }
  }, [singlePost]);

  useEffect(() => {
    setShowNxtImgIcon(true);
    setShowPreImgIcon(true);
    if (imageIdx === photoList.length - 1) {
      setShowNxtImgIcon(false);
    }
    if (imageIdx === 0) {
      setShowPreImgIcon(false);
    }
  }, [imageIdx, photoList.length]);

  const handleLikes = async (e, comment_id) => {
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
      setUpdateCommentLikes(!updateCommentLikes);
      return;
    }
    await fetch(`/api/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        comment_id: comment_id,
      }),
    });
    setUpdateLikes(!updateLikes);
    setUpdateCommentLikes(!updateCommentLikes);
    return;
  };

  const userLikes = (comment) => {
    if (comment.likes) {
      for (const like of comment.likes) {
        if (like.user_id === user.id)
          return (
            <div
              className={`single_post_user_btn liked`}
              id={`${like.id}`}
              onClick={(e) => {
                handleLikes(e, comment.id);
              }}
            >
              <IoHeartSharp />
            </div>
          );
      }
    }
    return (
      <div
        className={`single_post_user_btn`}
        id={0}
        onClick={(e) => {
          handleLikes(e, comment.id);
        }}
      >
        <IoHeartOutline />
      </div>
    );
  };

  const commentLoader = (comments) => {
    if (Object.keys(comments).length) {
      const commentsArr = Object.values(comments);
      return commentsArr.map((comment, idx) => {
        if (comment.user.id === user.id) {
          return (
            <li key={idx} className="single-comment">
              <div className="comment-container">
                <img
                  className="comment-pfp"
                  src={`${comment.user.profile_photo ? comment.user.profile_photo : "https://res.cloudinary.com/lpriya/image/upload/v1636533183/Foodstagram/default_dp_dcd3ao.png"}`}
                  alt=""
                />
                <div>
                  <span
                    className="usernames-link"
                    onClick={(event) => toProfile(comment.user.username)}
                  >
                    {comment.user.username}
                  </span>
                  &nbsp;&nbsp;{comment.content}
                </div>
                {userLikes(comment)}
              </div>
              <div></div>
              <button
                className="comments-delete-btn"
                onClick={(event) => {
                  handleDelete(comment.id, comment.post.id);
                }}
              >
                Delete
              </button>
            </li>
          );
        }
        return (
          <li key={idx} className="single-comment">
            <div className="comment-container">
              <img
                className="comment-pfp"
                src={`${comment.user.profile_photo}`}
                alt=""
              />
              <div>
                <span
                  className="usernames-link"
                  onClick={(event) => toProfile(comment.user.username)}
                >
                  {comment.user.username}
                </span>
                &nbsp;&nbsp;{comment.content}
              </div>
              {userLikes(comment)}
            </div>
          </li>
        );
      });
    }
  };
  const handleSubmit = async (event) => {
    const payload = {
      user_id: user.id,
      post_id: singlePost.id,
      content: inputComment,
    };
    dispatch(createComment(payload));
    setinputComment("");
    return null;
  };
  const handleDelete = async (commentId, postId) => {
    const payload = {
      commentId,
      postId,
    };
    dispatch(destroyComment(payload));
    return null;
  };

  const toProfile = (username) => {
    history.push(`/users/dashboard/${username}`);
  };

  return (
    <div className="post_detail_container">
      <div className="images_container">
        <img
          className="images_review"
          src={photoList[imageIdx].photo_url}
          alt="images_review"
        />
        <div className="imageArrow">
          <div
            style={{ visibility: showPreImgIcon ? "visible" : "hidden" }}
            className="preArrow"
          >
            <IoArrowBackCircleOutline
              onClick={() => setImageIdx(imageIdx - 1)}
            />
          </div>
          <div
            style={{ visibility: showNxtImgIcon ? "visible" : "hidden" }}
            className="nxtArrow"
          >
            <IoArrowForwardCircleOutline
              onClick={() => setImageIdx(imageIdx + 1)}
            />
          </div>
        </div>
      </div>
      <div className="post_info">
        <div className="user_info">
          <img
            className="profile_image"
            src={singlePost.user.profile_photo}
            alt=""
          />
          <NavLink to={`/users/dashboard/${singlePost.user.username}`}>
            {singlePost.user.username}
          </NavLink>
          <p> {"  ·  "} </p>
          <p>following</p>
          {singlePost.user.id === user.id && (
            <>
              <GrEdit onClick={() => setShowEditPostModal(true)} />
              <RiDeleteBin5Line onClick={deletePostHandler} />
            </>
          )}
          {showEditPostModal && (
            <Modal type="edit" onClose={() => setShowEditPostModal(false)}>
              <EditPostPage
                setPostDetailModal={setPostDetailModal}
                setShowEditPostModal={setShowEditPostModal}
                singlePostId={singlePostId}
              />
            </Modal>
          )}
        </div>
        <div className="description_info">
          <img
            className="profile_image"
            src={singlePost.user.profile_photo}
            alt=""
          />
          {/* <NavLink to={`/users/dashboard/${singlePost.user.username}`}>
            {singlePost.user.username}
          </NavLink> */}
          <p className=""><NavLink to={`/users/dashboard/${singlePost.user.username}`}>
            {singlePost.user.username}
          </NavLink> {singlePost.description}</p>
        </div>
        <div className="detailed-comment-area">{commentLoader(comments)}</div>
        <div className="comment-input-container">
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
            onClick={(event) => handleSubmit()}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
