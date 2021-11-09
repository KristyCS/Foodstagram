import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";
import "./PostDetailPage.css";
function PostDetailPage({ singlePost }) {
  const dispatch = useDispatch();
  const [imageIdx, setImageIdx] = useState(0);
  const [showPreImgIcon, setShowPreImgIcon] = useState(false);
  const [showNxtImgIcon, setShowNxtImgIcon] = useState(true);
  const [errors, setErrors] = useState([]);
  let photoObjs = singlePost.photos;
  let photoList = Object.values(photoObjs);

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
  }, [imageIdx]);
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
          <p> · </p>
          <p>following</p>
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
      </div>
    </div>
  );
}

export default PostDetailPage;
