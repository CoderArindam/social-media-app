export default function PostCard({ post }) {
  return (
    <div className="p-4 bg-white rounded shadow-md mb-4">
      <h2 className="text-xl font-semibold">{post.caption}</h2>
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.caption}
          className="mt-2 w-full rounded"
        />
      )}
      <div className="mt-2">
        <p className="text-sm text-gray-500">Posted by User {post.user_id}</p>
        <p className="text-sm text-gray-400">
          {new Date(post.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
