import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/posts";
import "./CreatePostPage.css";
function CreateNewPostPage({ setShowCreatePostModal }) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
<<<<<<< HEAD:react-app/src/components/CreateEditPostPage/CreateEditPostPage.js
  const initImages = singlePost? singlePost.photos:[]
  const [images, setImages] = useState(initImages);
  const [errors] = useState([]);
  const user = useSelector((state) => state.session.user);

=======
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [src, setSrc] = useState("");
  const user = useSelector((state) => state.session.user);
  console.log(images, "!!!!!!!!!!!");
>>>>>>> main:react-app/src/components/CreatePostPage/CreatePostPage.js
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
      <h3> Create new post</h3>
      {images && (
        <div className="view_image">
            <img className="small" src={src} />
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
          // onChange={(e) => setSrc(URL.createObjectURL(e.target.files[0]))}
          onChange={(e) => setImages([...images, e.target.files])}
          accept="image/*"
          multiple={true}
          required
        />
        <textarea
          name="description"
          placeholder="Write a caption..."
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
