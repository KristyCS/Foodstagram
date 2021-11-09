const SET_POSTS = "posts/SET_ALLPOSTS";
const ADD_POST = "posts/ADD_NEWPOST";
const setPosts = (posts) => ({
  type: SET_POSTS,
  posts,
});

const addPost = (post) => ({
  type: ADD_POST,
  post,
});

export const createPost = (post) => async (dispatch) => {
  const { userId, description, images } = post;
  console.log(images + "!!!!!!!!!!!!!!");
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

// export const updatePost = (post) => async (dispatch) => {
//   const { title, body, images, postId, userId, communityId } = post;
//   const formData = new FormData();
//   formData.append("title", title);
//   formData.append("body", body);
//   formData.append("user_id", userId);
//   formData.append("community_id", communityId);
//   if (images) {
//     for (const list of images) {
//       for (let i = 0; i < list.length; i++) {
//         formData.append("images", list[i]);
//       }
//     }
//   }

//   try {
//     const res = await fetch(`/api/posts/${postId}`, {
//       method: "PUT",
//       body: formData,
//     });
//     if (!res.ok) throw res;
//     const post = await res.json();
//     if (!post.errors) {
//       dispatch(setPost(post));
//     }
//     return post;
//   } catch (e) {
//     return e;
//   }
// };

// export const deletePost = (postId) => async (dispatch) => {
//   try {
//     const res = await fetch(`/api/posts/${postId}`, {
//       method: "DELETE",
//     });
//     if (!res.ok) throw res;
//     const post = await res.json();
//     if (!post.errors) {
//       dispatch(setPost(post));
//     }
//     return post;
//   } catch (e) {
//     return e;
//   }
// };

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
    case ADD_POST:
      return { ...state, allPosts: { ...state.allPosts, [action.post.id]: action.post } };
    default:
      return state;
  }
}
