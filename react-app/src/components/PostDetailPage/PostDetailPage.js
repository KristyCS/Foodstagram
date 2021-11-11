import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal"
import EditPostPage from "../EditPostPage/EditPostPage";
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";
import { deletePost } from "../../store/posts";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import "./PostDetailPage.css";
import { createComment, destroyComment } from "../../store/posts";

function PostDetailPage({ setPostDetailModal, singlePostId, comments, inputComment, setinputComment }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const singlePost = useSelector((state) => state.posts.allPosts[singlePostId]);
  const [imageIdx, setImageIdx] = useState(0);
  const [showPreImgIcon, setShowPreImgIcon] = useState(false);
  const [showNxtImgIcon, setShowNxtImgIcon] = useState(true);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  // const [errors, setErrors] = useState([]);
  const [photoList, setPhotoList] = useState([...singlePost.photos]);
  const deletePostHandler = () => {
    dispatch(deletePost(singlePost.id));
    setPostDetailModal(false);
  };

  // const refactorArrow = () => {
  //   setShowNxtImgIcon(true);
  //   setShowPreImgIcon(true);
  //   if (imageIdx === photoList.length - 1) {
  //     setShowNxtImgIcon(false);
  //   }
  //   if (imageIdx === 0) {
  //     setShowPreImgIcon(false);
  //   }
  // };

  useEffect(() => {
    console.log("singlePost会render吗");
    console.log(singlePost.photos, "singlePost会render吗");
    const newPhotoList=[]
    for(let i=0; i< singlePost.photos.length;i++){
      newPhotoList.push(singlePost.photos[i])
    }

    setPhotoList([...singlePost.photos]);
    console.log(photoList.length+ "&*&*&*&*&*&");
    setImageIdx(0);
    setShowNxtImgIcon(true);
    setShowPreImgIcon(true);
    if (imageIdx === singlePost.photos.length - 1) {
      setShowNxtImgIcon(false);
    }
    if (imageIdx === 0) {
      setShowPreImgIcon(false);
    }
  }, [singlePost, imageIdx, photoList.length]);

  useEffect(() => {
    console.log(imageIdx);
    setShowNxtImgIcon(true);
    setShowPreImgIcon(true);
    if (imageIdx === photoList.length - 1) {
      setShowNxtImgIcon(false);
    }
    if (imageIdx === 0) {
      setShowPreImgIcon(false);
    }
  }, [imageIdx, photoList.length]);


  const commentLoader = (comments) => {
    if (Object.keys(comments).length) {
      const commentsArr = Object.values(comments)
      return (

        commentsArr.map((comment,idx) => {
          if (comment.user.id == user.id) {

            return (
              <li key={idx} className='single-comment'>
                <div className='comment-container'>
                  <img className='comment-pfp' src={`${comment.user.profile_photo}`} alt=""/>
                  <div>
                    <span className='usernames-link' onClick={(event) => toProfile(comment.user.username)}>{comment.user.username}</span>
                    &nbsp;&nbsp;{comment.content}
                  </div>
                </div>
                <div>
                </div>
                <button className='comments-delete-btn' onClick={(event) => { handleDelete(comment.id, comment.post.id) }}>Delete</button>
              </li>
            )
          }
          return (
            <li className='single-comment'>
              <div className='comment-container'>
                <img className='comment-pfp' src={`${comment.user.profile_photo}`} alt=""/>
                <div>
                  <span className='usernames-link' onClick={(event) => toProfile(comment.user.username)}>{comment.user.username}</span>
                  &nbsp;&nbsp;{comment.content}
                </div>
              </div>
            </li>
          )
        })
      )
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
  const handleDelete = async (commentId, postId) => {
    const payload = {
      commentId,
      postId
    }
    dispatch(destroyComment(payload))
    return null
  }

  const toProfile = (username) => {
    history.push(`/users/dashboard/${username}`)
  }

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
          <NavLink to="">{singlePost.user.username}</NavLink>
          <p> {"  ·  "} </p>
          <p>following</p>
          {singlePost.user.id === user.id && (
            <>
              <GrEdit onClick={() => setShowEditPostModal(true)} />
              <RiDeleteBin5Line onClick={deletePostHandler} />
            </>
          )}
          {showEditPostModal && (
            <Modal type='edit' onClose={() => setShowEditPostModal(false)}>
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
          <NavLink to="">{singlePost.user.username}</NavLink>
          <p className="">{singlePost.description}</p>
        </div>
        <div className='detailed-comment-area'>
          {commentLoader(comments)}
        </div>
        <div className="comment-input-container">
          <input className='comment-input-bar' placeholder='Add a comment...' value={inputComment} onChange={(event) => { setinputComment(event.target.value) }}>
          </input>
          <button className='comment-submit-btn' disabled={!inputComment} onClick={(event) => handleSubmit()}>Post</button>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
