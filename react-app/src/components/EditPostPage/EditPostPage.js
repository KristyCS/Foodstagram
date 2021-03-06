import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../../store/posts";
import "./EditPostPage.css";
function EditPostPage({
  setShowEditPostModal,
  setPostDetailModal,
  singlePostId,
}) {
  const dispatch = useDispatch();
  const singlePost = useSelector((state) => state.posts.allPosts[singlePostId]);

  const [description, setDescription] = useState(singlePost.description);
  const [existImages] = useState(singlePost.photos);
  const [newAddedImages, setNewAddedImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [src, setSrc] = useState([]);
  const user = useSelector((state) => state.session.user);

  const checks = [];
  for (const image in existImages) {
    checks.push(true);
  }

  const [existImageCheckIn, setExistImageCheckIn] = useState(checks);

  const editPostHandler = (e) => {
    e.preventDefault();
    if (!(existImageCheckIn.includes(true) || newAddedImages.length > 0)) {
      setErrors(["Please choose at least one photo."]);
    } else {
      setErrors(["no error"]);
      const payload = {
        userId: user.id,
        postId: singlePost.id,
        description,
        existImages,
        existImageCheckIn,
        newAddedImages,
      };
      dispatch(editPost(payload));
      setShowEditPostModal(false);
    }
  };
  const changeCheckInHandler = (e) => {
    const newCheckIn = [...existImageCheckIn];
    newCheckIn[e.target.id] = !newCheckIn[e.target.id];
    setExistImageCheckIn(newCheckIn);
    if (newCheckIn.includes(true) || newAddedImages.length > 0) {
      setErrors([]);
    }
  };

  return (
    <div className="createPostForm-container">
      <h3>Edit Post</h3>
      <div className="view_image">
        <h4>Existing Photos</h4>
        <div className="create-post-image-container">
          {existImages.map((image, idx) => (
            <div className="create-post-single-image-container" key={idx}>
              <img className="small" src={image.photo_url} alt={idx} />
              <input
                id={idx}
                name="check_image"
                type="checkbox"
                checked={existImageCheckIn[idx]}
                onChange={changeCheckInHandler}
              />
            </div>
          ))}
        </div>
        <h4>New photos</h4>
        <div className="create-post-image-container">
          {newAddedImages.map((image, idx) => (
            <div className="create-post-single-image-container" key={idx}>
              <p>{image.id}</p>
              <img className="small" key={idx} src={src[idx]} alt="" />
            </div>
          ))}
        </div>
      </div>
      <form className="createPostForm" onSubmit={editPostHandler}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files.length !== 0) {
              setSrc([...src, URL.createObjectURL(e.target.files[0])]);
            }
            setNewAddedImages([...newAddedImages, e.target.files]);
          }}
          accept="image/*"
          multiple={true}
        />
        <textarea
          name="description"
          placeholder="Write a caption..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="10"
          cols="50"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditPostPage;
