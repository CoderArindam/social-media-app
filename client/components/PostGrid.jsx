const PostGrid = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-gray-600">
        <p>No posts available. Start posting something!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => {
        // Convert the createdAt field to a JavaScript Date object
        const postDate = new Date(post.created_at);

        // Check if the date is valid, if not, return a fallback string
        const formattedDate = isNaN(postDate)
          ? "Invalid Date"
          : postDate.toLocaleString();

        return (
          <div key={post.postId} className="border rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                <img
                  src={post.profileImage || "/Default-avatar.jpg"}
                  alt={post.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{post.username}</p>
                <p className="text-sm text-gray-500">{formattedDate}</p>
              </div>
            </div>
            {post.image && (
              <img
                src={post.image}
                alt="Post content"
                className="w-full h-64 object-cover mb-4"
              />
            )}
            <p>{post.content}</p>
            <div className="flex justify-between mt-4">
              <div className="text-sm text-gray-500">
                Likes: {post.likeCount}
              </div>
              <div className="text-sm text-gray-500">
                Comments: {post.commentCount}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostGrid;
