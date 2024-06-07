import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";

import { PostContext } from "../context/PostContextProvider";

const EditPost = () => {
  const { id } = useParams();
  const { getOnePost, onePost, editPost } = useContext(PostContext);
  useEffect(() => {
    getOnePost(id);
  }, [id]);
  const [title, setTitle] = useState(onePost.title);
  const [img, setImg] = useState(onePost.img);
  const [author, setAuthor] = useState(onePost.author);
  const [content, setContent] = useState(onePost.content);
  useEffect(() => {
    setTitle(onePost.title);
    setImg(onePost.img);
    setAuthor(onePost.author);
    setContent(onePost.content);
  }, [onePost]);
  const navigate = useNavigate();
  const handleClick = () => {
    if (!title || !img || !author || !content) {
      alert("Заполните поля!");
      return;
    }
    let editedPost = {
      title,
      img,
      author,
      content,
    };
    editPost(id, editedPost);
    navigate("/");
  };
  return (
    <div>
      <TextField
        onChange={(e) => setTitle(e.target.value)}
        id="outlined-basic"
        label="title"
        variant="outlined"
        value={title}
      />
      <TextField
        onChange={(e) => setImg(e.target.value)}
        id="outlined-basic"
        label="img"
        variant="outlined"
        value={img}
      />
      <TextField
        onChange={(e) => setAuthor(e.target.value)}
        id="outlined-basic"
        label="author"
        variant="outlined"
        value={author}
      />
      <TextField
        onChange={(e) => setContent(e.target.value)}
        id="outlined-basic"
        label="content"
        variant="outlined"
        value={content}
      />
      <Button onClick={handleClick} variant="contained">
        SAVE
      </Button>
    </div>
  );
};

export default EditPost;
