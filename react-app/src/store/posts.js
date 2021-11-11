const SET_POSTS = "SET_ALLPOSTS";
const ADD_POST = "ADD_NEWPOST";
const REMOVE_POST = "DELETE_POST";
const ADD_COMMENT = 'ADD_NEWCOMMENT'
const DELETE_COMMENT = 'DELETE_OLDCOMMENT'
const setPosts = (posts) => ({
  type: SET_POSTS,
  posts,
});
const removePost = (postId) => ({
  type: REMOVE_POST,
  postId,
});
const addPost = (post) => ({
  type: ADD_POST,
  post,
});
const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});
const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  id
})

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

export const createComment = (comment) => async (dispatch) => {
  const { post_id } = comment;

  try {
    const res = await fetch(`/api/posts/${post_id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
    if (res.ok) {
      const data = await res.json()
      dispatch(addComment(data))
    } else {
      throw console.error('Creation error!');
    }
  } catch (event) {
    return event
  }
}
export const destroyComment = (id) => async (dispatch) => {
  const { commentId } = id
  try {
    const res = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      dispatch(deleteComment(id))
    } else {
      throw console.error('Deletion error!')
    }
  } catch (event) {
    return event
  }
}

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
    case ADD_POST:
      return {
        ...state,
        allPosts: { ...state.allPosts, [action.post.id]: action.post },
      };
    case REMOVE_POST:
      const newAllPosts = { ...state.allPosts }
      delete newAllPosts[action.postId]
      return {
        ...state,
        allPosts: { ...newAllPosts },
      };
    case ADD_COMMENT:
      state.allPosts[action.comment.post.id].comments.push({ content: action.comment.content, id: action.comment.id })
      return {
        ...state,
        allPosts: { ...state.allPosts }
      };
    case DELETE_COMMENT:
      let commentsArr = state.allPosts[action.id.postId].comments
      let found = 0
      for (let i = 0; i < commentsArr.length; i++) {
        let comment = commentsArr[i]
        if (comment.id == action.id.commentId) {
          found = 1
        }
        if (found && commentsArr[i + 1]) {
          commentsArr[i] = commentsArr[i + 1]
        }
        if (found && !commentsArr[i + 1]) {
          commentsArr.pop()
        }
      }
      state.allPosts[action.id.postId].comments = [...commentsArr]
      return {
        ...state,
        allPosts: { ...state.allPosts }
      };
    default:
      return state;
  }
}
