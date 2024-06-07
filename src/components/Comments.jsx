import React, { useState, useEffect, useContext } from "react";
import { TextField, Button } from "@mui/material";
import { PostContext } from "../context/PostContextProvider";

const Comments = ({ postId }) => {
  const { onePost, getOnePost, addComment } = useContext(PostContext);
  console.log(onePost);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getOnePost(postId);
  }, [postId]);

  const handleAddComment = () => {
    if (!newComment) {
      alert("Введите комментарий!");
      return;
    }
    addComment(postId, { text: newComment });
    setNewComment("");
  };

  return (
    <div>
      <div>
        {onePost.comments &&
          onePost.comments.map((comment, index) => (
            <p key={index}>{comment.text}</p>
          ))}
      </div>
      <TextField
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
        label="Новый комментарий"
        variant="outlined"
      />
      <Button onClick={handleAddComment} variant="contained">
        Добавить комментарий
      </Button>
    </div>
  );
};

export default Comments;
