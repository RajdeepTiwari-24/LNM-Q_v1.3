import React, { useEffect } from "react";
import Post from "../components/Landing/Post";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("USER")) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="FormContainer">
        <Post />
      </div>
    </>
  );
}
