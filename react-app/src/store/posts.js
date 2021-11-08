const SET_POSTS = "posts/SET_ALLPOSTS";

const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    posts,
  };
};

export const getPosts = () => async (dispatch) => {
  console.log("!!!@@@@@");
  try {
    const res = await fetch(`/api/posts`);
    if (!res.ok) throw res;
    const posts = await res.json();
    console.log("!!!@@@@@");
    dispatch(setPosts(posts))
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
      return {...state, allPosts:{...action.posts}}
    default:
      return state;
  }
}
