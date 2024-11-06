export default function PostFeed({ posts }) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold">{post.caption}</h2>
          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.caption}
              className="mt-2 rounded"
            />
          )}
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Posted by User {post.user_id}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
