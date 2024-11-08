import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegComment } from "react-icons/fa";

const CommentSection = ({ postId, onCommentCountUpdate }) => {
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [commentsToShow, setCommentsToShow] = useState(3); // Initially show 3 comments
  const [isLoading, setIsLoading] = useState(false); // Loading state for comments

  // Fetch comments for the post when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true); // Set loading to true while fetching comments
        const response = await axios.get(
          `http://localhost:5000/api/posts/${postId}/comments`,
          { withCredentials: true }
        );

        // Reverse the order to make the most recent comment come first
        const reversedComments = response.data.comments.reverse();

        setAllComments(reversedComments); // Set fetched comments in reversed order
        setCommentCount(reversedComments.length); // Set comment count
        setIsLoading(false); // Set loading to false once comments are fetched
      } catch (err) {
        console.error("Error fetching comments:", err);
        setIsLoading(false); // Set loading to false even if an error occurs
      }
    };

    fetchComments(); // Fetch comments on component load
  }, [postId]);

  // Handle the comment submission
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return; // Do not submit empty comments

    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/comment`,
        { postId, comment: newComment },
        { withCredentials: true }
      );

      // Prepend the new comment to the list of all comments (show it at the top)
      setAllComments([response.data.comment, ...allComments]);
      setNewComment(""); // Clear the input field
      setCommentCount(commentCount + 1); // Update comment count
      onCommentCountUpdate(commentCount + 1); // Update the parent component's comment count
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  // Load more comments
  const handleLoadMoreComments = () => {
    setCommentsToShow((prev) => prev + 3); // Load 3 more comments
  };

  // Show less comments
  const handleShowLessComments = () => {
    setCommentsToShow(3); // Reset to show 3 comments
  };

  return (
    <div className="mt-4">
      {/* Comment Input */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded-lg text-sm"
          placeholder="Add a comment..."
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 text-white p-2 rounded-lg text-sm"
        >
          Post
        </button>
      </div>

      {/* Display Comments */}
      <div className="mt-4">
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading comments...</p>
        ) : (
          <>
            {allComments.slice(0, commentsToShow).map((comment) => (
              <div
                key={comment.commentId}
                className="flex items-start mb-3 space-x-3"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                  <img
                    src="/Default-avatar.jpg"
                    alt={comment.username}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; // Prevents infinite loop if fallback also fails
                      e.target.src = "/Default-avatar.jpg"; // Path to fallback image in public folder
                    }}
                  />
                </div>
                <div>
                  <p className="font-medium">{comment.username}</p>
                  <p className="text-sm">{comment.comment}</p>
                </div>
              </div>
            ))}

            {/* Buttons Container */}
            <div className="flex justify-between mt-3">
              {/* "Load More" Button */}
              {allComments.length > commentsToShow &&
                commentsToShow <= allComments.length && (
                  <button
                    onClick={handleLoadMoreComments}
                    className="text-blue-500 text-sm"
                  >
                    Load More Comments
                  </button>
                )}

              {/* "Show Less" Button */}
              {commentsToShow > 3 && (
                <button
                  onClick={handleShowLessComments}
                  className="text-blue-500 text-sm"
                >
                  Show Less
                </button>
              )}
            </div>
          </>
        )}

        {allComments.length === 0 && !isLoading && (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
