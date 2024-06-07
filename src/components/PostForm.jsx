import { Button } from "@mui/material";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { PostContext } from "../context/PostContextProvider";

const PostForm = ({ title, img, author, content, id }) => {
  const { deletePost } = useContext(PostContext);
  return (
    <div>
      <h3>{title}</h3>
      <h4>{author}</h4>
      <img src={img} width={"200"} height={"200"} />
      <h5>{content}</h5>
      <Button onClick={() => deletePost(id)} variant="contained" color="error">
        DELETE
      </Button>
      <NavLink to={`/edit/${id}`}>
        <Button variant="contained">EDIT</Button>
      </NavLink>
    </div>
  );
};

export default PostForm;
