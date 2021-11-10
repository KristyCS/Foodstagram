const SET_POSTS = "SET_ALLPOSTS";
const ADD_POST = "ADD_NEWPOST";
const REMOVE_POST = "DELETE_POST";
const UPDATE_POST = "UPDATE_POST";
const setPosts = (posts) => ({
  type: SET_POSTS,
  posts,
});

const setPost = (post) => ({
  type: UPDATE_POST,
  post,
});
const removePost = (postId) => ({
  type: REMOVE_POST,
  postId,
});
const addPost = (post) => ({
  type: ADD_POST,
  post,
});

export const createPost = (post) => async (dispatch) => {
  const { userId, description, images } = post;
  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("description", description);
  if (images) {
    for (const list of images) {
      for (let i = 0; i < list.length; i++) {
        formData.append("images", list[i]);
      }
    }
  }
  try {
    const res = await fetch("/api/posts/", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw res;
    const post = await res.json();
    if (!post.errors) {
      dispatch(addPost(post));
    }
    return post;
  } catch (e) {
    return e;
  }
};

export const editPost = (post) => async (dispatch) => {
  const {
    description,
    existImages,
    postId,
    userId,
    existImageCheckIn,
    newAddedImages,
  } = post;
  for (let idx = 0; idx < existImageCheckIn.length; idx++) {
    if (!existImageCheckIn[idx]) {
      await fetch(`/api/photos/${existImages[idx].id}`, {
        method: "DELETE",
      });
    }
  }

  const formData = new FormData();
  formData.append("description", description);
  formData.append("post_id", postId);
  formData.append("user_id", userId);
  console.log(newAddedImages+"!!!!*************************")
  if (newAddedImages) {
    for (const list of newAddedImages) {
      for (let i = 0; i < list.length; i++) {
        formData.append("images", list[i]);
      }
    }
  }
  try {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: formData,
    });
    if (!res.ok) throw res;
    const post = await res.json();
    if (!post.errors) {
      dispatch(setPost(post));
    }
    return post;
  } catch (e) {
    return e;
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw res;
    const post = await res.json();
    if (!post.errors) {
      dispatch(removePost(postId));
    }
    return post;
  } catch (e) {
    return e;
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const res = await fetch(`/api/posts`);
    if (!res.ok) throw res;
    const posts = await res.json();
    dispatch(setPosts(posts));
    return posts;
  } catch (e) {
    return e;
  }
};

const initialState = {
  allPosts: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, allPosts: { ...action.posts } };
    case UPDATE_POST:
      newAllPosts = { ...state.allPosts };
      for (const post in newAllPosts) {
        if (post.id === action.post.id) {
          post = action.post;
        }
      }
      return { ...state, allPosts: newAllPosts };

    case ADD_POST:
      return {
        ...state,
        allPosts: { ...state.allPosts, [action.post.id]: action.post },
      };
    case REMOVE_POST:
      const newAllPosts = { ...state.allPosts };
      delete newAllPosts[action.postId];
      return {
        ...state,
        allPosts: { ...newAllPosts },
      };
    default:
      return state;
  }
}
