// LikeButton.js
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

const LikeButton = ({ postId, initialLikeCount, onLikeCountUpdate }) => {
  const [likes, setLikes] = useState(initialLikeCount);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/like`,
        { postId },
        { withCredentials: true }
      );

      if (response.data.message === "Post liked") {
        setLiked(true);
        setLikes(likes + 1);
        onLikeCountUpdate(likes + 1); // Update the parent component's like count
      } else {
        setLiked(false);
        setLikes(likes - 1);
        onLikeCountUpdate(likes - 1); // Update the parent component's like count
      }
    } catch (err) {
      console.error("Error liking/unliking post:", err);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition"
    >
      {liked ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaRegHeart className="text-gray-700" />
      )}
      <span>{likes}</span>
    </button>
  );
};

export default LikeButton;
