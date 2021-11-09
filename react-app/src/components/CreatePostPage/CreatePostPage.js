import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/posts";
// import ".CreatePostPage.css"
function CreateNewPostPage({setShowCreatePostModal}) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);
  const createPostHandler = (e) => {
    e.preventDefault();
    const payload = {
      userId: user.id,
      description,
      images,
    };
    dispatch(createPost(payload));
    setShowCreatePostModal(false)
  };

  return (
    <div className="createPostForm">
      {console.log(images)}
      <h3>Create new post</h3>
      {images && (
        <div className="view_image">
          {images.map((image) => (
            <div key={images.name}>hi</div>
          ))}
        </div>
      )}
      <form onSubmit={createPostHandler}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type="file"
          onChange={(e) => setImages([...images, e.target.files])}
          accept="image/*"
          multiple={true}
          required
        />

        <textarea
          placeholder="Write a caption..."
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateNewPostPage;
