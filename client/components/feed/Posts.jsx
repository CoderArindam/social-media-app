"use client";
import React, { useState, memo } from "react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import LikeButton from "../buttons/LikeButton";
import FollowButton from "../buttons/FollowButton";
import CommentSection from "./CommentSection";
import { FaRegComment } from "react-icons/fa";
import { getCookie } from "@/utils/auth"; // Import getCookie

const Posts = memo(({ post }) => {
  const {
    postId,
    content,
    image,
    caption,
    username,
    created_at,
    likeCount,
    commentCount,
  } = post;

  const router = useRouter();
  const [updatedLikeCount, setUpdatedLikeCount] = useState(likeCount);
  const [updatedCommentCount, setUpdatedCommentCount] = useState(commentCount);

  const timeAgo = formatDistanceToNow(new Date(created_at), {
    addSuffix: true,
  });

  // Get the logged-in user's username from cookies
  const loggedInUsername = getCookie("username");

  // Navigate to user's profile on click
  const navigateToProfile = () => {
    router.push(`/profile/${username}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-md mx-auto">
      {/* Header Section: User Info */}
      <div className="flex items-center mb-4 justify-between">
        <div
          className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden mr-4 cursor-pointer"
          onClick={navigateToProfile} // Navigate when profile picture is clicked
        >
          <img
            src={`/profile-pictures/${username}.jpg`}
            alt={username}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/Default-avatar.jpg";
            }}
          />
        </div>
        <div>
          <h3
            className="font-medium text-lg cursor-pointer"
            onClick={navigateToProfile} // Navigate when username is clicked
          >
            {username}
          </h3>
          <p className="text-gray-500 text-sm">{timeAgo}</p>
        </div>
        {/* Conditionally render FollowButton only if it's not the user's own post */}
        {loggedInUsername !== username && <FollowButton username={username} />}
      </div>

      {/* Post Content Section */}
      <div className="mb-4">
        <p className="text-gray-800">{content}</p>
        {image && (
          <div className="mt-4">
            <img
              src={image}
              alt={caption || "Post Image"}
              className="w-full h-auto object-cover rounded-lg"
            />
            {caption && (
              <p className="mt-2 text-sm text-gray-600 italic">{caption}</p>
            )}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-3">
          <LikeButton
            postId={postId}
            initialLikeCount={updatedLikeCount}
            onLikeCountUpdate={setUpdatedLikeCount}
          />
          <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 transition">
            <FaRegComment />
            <span>{updatedCommentCount}</span>
          </button>
        </div>
      </div>

      {/* Comment Section */}
      <CommentSection
        postId={postId}
        onCommentCountUpdate={setUpdatedCommentCount}
      />
    </div>
  );
});

export default Posts;
