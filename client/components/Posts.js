import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

// Assuming we pass 'initialLikeStatus' to know whether the post is already liked
const Posts = ({ post, onFollow, isFollowing }) => {
  const {
    content,
    image,
    caption,
    username,
    created_at,
    likeCount,
    commentCount,
    postId,
    initialIsLiked, // New prop: whether the post is liked initially
  } = post;

  const [isLiked, setIsLiked] = useState(initialIsLiked); // State to track like status
  const [likes, setLikes] = useState(likeCount); // Track the like count

  useEffect(() => {
    // Whenever like count changes, update local state
    setLikes(likeCount);
  }, [likeCount]);

  const formattedTime = created_at
    ? formatDistanceToNow(new Date(created_at), { addSuffix: true })
    : "Unknown time";

  const handleLike = async () => {
    try {
      // Make an API call to like/unlike the post
      const response = await fetch(`http://localhost:5000/api/posts/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // JWT Token
        },
        credentials: "include",
        body: JSON.stringify({ postId }), // Sending the postId in the request body
      });

      const result = await response.json();

      if (response.ok) {
        // Toggle the like status
        setIsLiked((prevState) => !prevState);
        setLikes((prevState) => (isLiked ? prevState - 1 : prevState + 1)); // Update like count
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error in liking/unliking post:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden mr-4">
          <img
            src={`/profile-pictures/${username}.jpg`}
            alt={username}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-lg">{username}</h3>
          <p className="text-gray-500 text-sm">{formattedTime}</p>
        </div>
        <div className="ml-auto">
          <button
            onClick={() => onFollow(username)}
            className={`text-sm px-4 py-2 rounded-full ${
              isFollowing
                ? "bg-gray-300 text-gray-800"
                : "bg-blue-500 text-white"
            } hover:bg-blue-600`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-800">{content}</p>
        {image && image !== "" && (
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

      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center">
          <span className="mr-4">Likes: {likes}</span>
          <span>Comments: {commentCount}</span>
        </div>
        <button
          onClick={handleLike}
          className={`text-blue-500 hover:text-blue-700 ${
            isLiked ? "font-bold" : ""
          }`}
        >
          {isLiked ? "Unlike" : "Like"}
        </button>
      </div>
    </div>
  );
};

export default Posts;
