// import axios from "axios";
// import { createContext, useState } from "react";

// export const postContext = createContext();
// const PostContextProvider = ({ children }) => {
//   const [posts, setPosts] = useState([]);
//   const [onePost, setOnePost] = useState({});
//   const [comments, setComments] = useState([]);
//   //!CREATE
//   const addPost = async (post) => {
//     await axios.post(API, post);
//   };
//   //!get
//   const getPosts = async () => {
//     const { data } = await axios(API);
//     setPosts(data);
//   };
//   const deletePost = async (id) => {
//     await axios.delete(`${API}/${id}`);
//     getPosts();
//   };

//   //! getOnePost
//   const getOnePost = async (id) => {
//     const { data } = await axios(`${API}/${id}`);
//     setOnePost(data);
//   };
//   const editPost = async (id, editedPost) => {
//     await axios.patch(`${API}/${id}`, editedPost);
//   };

//   const addComment = async (productId, comment) => {
//     await axios.post(`${API}/${productId}/comments`, comment);
//     getComments(productId);
//   };

//   const getComments = async (productId) => {
//     const { data } = await axios(`${API}/${productId}/comments`);
//     setComments(data);
//   };
//   const values = {
//     addPost,
//     posts,
//     getPosts,
//     deletePost,
//     getOnePost,
//     onePost,
//     editPost,
//     addComment,
//     comments,
//     getComments,
//   };
//   return <postContext.Provider value={values}>{children}</postContext.Provider>;
// };
// export default PostContextProvider;

import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { API } from "../helpers/const";

export const PostContext = createContext();
export const useProducts = () => useContext(PostContext);

const PostContextProvider = ({ children }) => {
  const INIT_STATE = {
    posts: [],
    onePost: {},
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "GET_POSTS":
        return { ...state, posts: action.payload };
      case "GET_ONE_POST":
        return { ...state, onePost: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const addPost = async (post) => {
    await axios.post(API, post);
    getPosts();
  };

  const getPosts = async () => {
    const { data } = await axios(API);
    dispatch({ type: "GET_POSTS", payload: data });
  };

  const deletePost = async (id) => {
    await axios.delete(`${API}/${id}`);
    getPosts();
  };

  const getOnePost = async (id) => {
    const { data } = await axios(`${API}/${id}`);
    dispatch({ type: "GET_ONE_POST", payload: data });
  };

  const editPost = async (id, editedPost) => {
    await axios.patch(`${API}/${id}`, editedPost);
    getPosts();
  };

  const values = {
    addPost,
    posts: state.posts,
    getPosts,
    deletePost,
    getOnePost,
    onePost: state.onePost,
    editPost,
  };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
