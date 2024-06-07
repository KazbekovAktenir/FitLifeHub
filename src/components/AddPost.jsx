import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postContext } from "../context/PostContextProvider";

const AddPost = () => {
  const { addPost } = useContext(postContext);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    if (!title || !img || !author || !content) {
      alert("Заполните поля!");
      return;
    }
    let newPost = {
      title,
      img,
      author,
      content,
    };
    addPost(newPost);
    navigate("/");
  };
  return (
    <div>
      <TextField
        onChange={(e) => setTitle(e.target.value)}
        id="outlined-basic"
        label="title"
        variant="outlined"
      />
      <TextField
        onChange={(e) => setImg(e.target.value)}
        id="outlined-basic"
        label="img"
        variant="outlined"
      />
      <TextField
        onChange={(e) => setAuthor(e.target.value)}
        id="outlined-basic"
        label="author"
        variant="outlined"
      />
      <TextField
        onChange={(e) => setContent(e.target.value)}
        id="outlined-basic"
        label="content"
        variant="outlined"
      />
      <Button onClick={handleClick} variant="contained">
        ADD POST
      </Button>
    </div>
  );
};

export default AddPost;
