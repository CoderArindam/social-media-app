import React, { useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";

const FollowButton = ({ username }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/follow/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          credentials: "include", // Ensure cookies are sent
        }
      );

      if (!response.ok) {
        throw new Error("Error following user");
      }

      setIsFollowing(true); // Toggle following status
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <button
      onClick={() => handleFollow(username)}
      className={`flex items-center justify-center gap-1 py-1 px-3 text-sm rounded-md border transition-all duration-200 ${
        isFollowing
          ? "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500"
          : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
      }`}
      disabled={isFollowing}
    >
      {isFollowing ? (
        <>
          <FaCheck className="text-xs" /> Following
        </>
      ) : (
        <>
          <FaPlus className="text-xs" /> Follow
        </>
      )}
    </button>
  );
};

export default FollowButton;
