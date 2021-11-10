import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/posts";
import "./CreatePostPage.css";
function CreateNewPostPage({ setShowCreatePostModal, singlePost }) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const initImages = singlePost ? singlePost.photos : [];
  const [images, setImages] = useState(initImages);
  const [errors, setErrors] = useState([]);
  const [src, setSrc] = useState("");
  const user = useSelector((state) => state.session.user);
  console.log(images, "!!!!!!!!!!!");
  const createPostHandler = (e) => {
    e.preventDefault();
    const payload = {
      userId: user.id,
      description,
      images,
    };
    dispatch(createPost(payload));
    setShowCreatePostModal(false);
  };

  return (
    <div className="createPostForm">
      <h3>{singlePost ? "Edit Post" : "Create new post"}</h3>
      {images && (
        <div className="view_image">
          <div className="existing_images">
            <h4>Existing Photos</h4>
            {images.map((image, idx) => (
              <div key={idx}>
                <p>{image.id}</p>
              </div>
            ))}
          </div>
          <div className="new_images">
            <h4>New photos</h4>
            <img className="small" src={src} />
          </div>
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
          onChange={(e) => setSrc(URL.createObjectURL(e.target.files[0]))}
          // onChange={(e) => setImages([...images, e.target.files])}
          accept="image/*"
          multiple={true}
          required
        />
        <textarea
          name="description"
          placeholder="Write a caption..."
          defaultValue={singlePost ? singlePost.description : ""}
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

export default CreateNewPostPage;
