import React from "react";

const Comment = ({ comment }) => (
  <div className="mt-2 p-2 border-b">
    <p className="text-gray-800">{comment.text}</p>
    <small className="text-gray-600">by {comment.user.username}</small>
  </div>
);

export default Comment;
