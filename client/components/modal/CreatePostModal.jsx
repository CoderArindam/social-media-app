import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CreatePostModal = ({ closeModal }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!content && !image) {
      toast.error("Content or image is required to create a post.");
      setLoading(false);
      return;
    }

    try {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      const response = await fetch("http://localhost:5000/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ content, image, caption }),
      });

      if (response.ok) {
        toast.success("Post created successfully!");
        closeModal();
      } else {
        const data = await response.json();
        toast.error(data.message || "Error creating post.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-300">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Create a New Post
        </h2>
        <form onSubmit={handlePostSubmit} className="space-y-5">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-4 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-32 bg-gray-100 placeholder-gray-500"
          />
          <input
            type="url"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-4 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-100 placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="#tags (optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-4 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-100 placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 text-white font-semibold rounded-md transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Posting..." : "Post"}
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="w-full py-3 px-6 mt-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
