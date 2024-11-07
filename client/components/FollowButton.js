import React, { useState } from "react";

const FollowButton = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/follow/${userId}`,
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
      onClick={handleFollow}
      className={`py-1 px-4 text-white rounded-lg ${
        isFollowing ? "bg-gray-500" : "bg-blue-500"
      }`}
      disabled={isFollowing}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
