import { useContext, useEffect, useState } from "react";
import { PostContext } from "../context/PostContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";

const PostDetails = () => {
  const { id } = useParams();
  const { getOnePost, onePost } = useContext(PostContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        await getOnePost(id);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, getOnePost]);

  if (loading) {
    return (
      <div className="container">
        <p>Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p>Произошла ошибка: {error.message}</p>
      </div>
    );
  }

  if (!onePost || !onePost.id) {
    return (
      <div className="container">
        <p>Пост не найден</p>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h3>{onePost.title}</h3>
      <h4>{onePost.author}</h4>
      <img src={onePost.img} width={"200"} height={"200"} alt={onePost.title} />
      <h5>{onePost.content}</h5>
      <Button onClick={handleBackClick} variant="outlined">
        BACK
      </Button>
    </div>
  );
};

export default PostDetails;
