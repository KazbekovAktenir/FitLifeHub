import React from "react";
import { Route, Routes } from "react-router-dom";
import AddPost from "../components/AddPost";
import HomePage from "../components/HomePage";
import EditPost from "../components/EditPost";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/add" element={<AddPost />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/edit/:id" element={<EditPost />} />
    </Routes>
  );
};

export default MainRoutes;
