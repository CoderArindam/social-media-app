"use client";
import React, { useState } from "react";
import axios from "../utils/api";

const LikeButton = ({ postId, likes, setLikes }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = async () => {
    try {
      const response = liked
        ? await axios.post(`/posts/${postId}/unlike`)
        : await axios.post(`/posts/${postId}/like`);
      setLikes(response.data.likes);
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  return (
    <button
      onClick={toggleLike}
      className="mt-2 flex items-center space-x-1 text-blue-600"
    >
      <span>{liked ? "Unlike" : "Like"}</span>
      <span>{likes}</span>
    </button>
  );
};

export default LikeButton;
