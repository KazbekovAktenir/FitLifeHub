import React, { useContext, useEffect } from "react";
import PostForm from "./PostForm";
import { PostContext } from "../context/PostContextProvider";

const PostList = () => {
  const { posts, getPosts } = useContext(PostContext);
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="postList">
      {posts.map((elem) => (
        <PostForm key={elem.id} {...elem} />
      ))}
    </div>
  );
};

export default PostList;
