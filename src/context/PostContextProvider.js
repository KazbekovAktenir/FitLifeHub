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
  const addComment = async (postID, comment) => {
    await axios.post(`${API}/${postID}/comments`, comment);
    getComments(postID);
  };

  const getComments = async (postID) => {
    try {
      const url = `${API}/${postID}/comments`;

      const { data } = await axios.get(url);
      // dispatch({ type: actionTypes.SET_COMMENTS, payload: data });
    } catch (error) {}
  };

  const values = {
    addPost,
    posts: state.posts,
    getPosts,
    deletePost,
    getOnePost,
    onePost: state.onePost,
    editPost,
    addComment,
    getComments,
  };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
