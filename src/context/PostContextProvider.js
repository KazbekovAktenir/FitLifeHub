import axios from "axios";
import { createContext, useState } from "react";
import { API } from "../helpers/const";

export const postContext = createContext();
const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [onePost, setOnePost] = useState({});
  //!CREATE
  const addPost = async (post) => {
    await axios.post(API, post);
  };
  //!get
  const getPosts = async () => {
    const { data } = await axios(API);
    setPosts(data);
  };
  const deletePost = async (id) => {
    await axios.delete(`${API}/${id}`);
    getPosts();
  };

  //! getOnePost
  const getOnePost = async (id) => {
    const { data } = await axios(`${API}/${id}`);
    setOnePost(data);
  };
  const editPost = async (id, editedPost) => {
    await axios.patch(`${API}/${id}`, editedPost);
  };
  const values = {
    addPost,
    posts,
    getPosts,
    deletePost,
    getOnePost,
    onePost,
    editPost,
  };
  return <postContext.Provider value={values}>{children}</postContext.Provider>;
};
export default PostContextProvider;
