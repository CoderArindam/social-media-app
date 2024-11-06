import PostCard from "./PostCard";
import { getPosts } from "../../lib/api";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="mt-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </div>
  );
}
