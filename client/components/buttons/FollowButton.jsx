import { getCookie } from "@/utils/auth"; // Import getCookie to retrieve the username
import React, { useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";

const FollowButton = ({ username, isFollowing: initialIsFollowing }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing); // Set initial state to the prop value

  const handleFollow = async () => {
    try {
      const followerUsername = getCookie("username"); // Get follower's username from cookie

      if (!followerUsername) {
        console.error("No username found in cookies");
        return; // Exit if no username found in cookies
      }

      const response = await fetch(
        `http://localhost:5000/api/user/follow/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`, // Get token from cookie
          },
          body: JSON.stringify({ followerUsername }), // Include follower's username in request body
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Error following user");
      }

      setIsFollowing(true); // Update state after successful follow
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/unfollow/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`, // Get token from cookie
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Error unfollowing user");
      }

      setIsFollowing(false); // Update state after successful unfollow
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <button
      onClick={isFollowing ? handleUnfollow : handleFollow}
      className={`flex items-center justify-center gap-1 py-1 px-3 text-sm rounded-md border transition-all duration-200 ${
        isFollowing
          ? "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500"
          : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
      }`}
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
