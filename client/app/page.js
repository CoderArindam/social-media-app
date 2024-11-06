import Header from "../components/Header";
import PostFeed from "../components/PostFeed";
import { getPosts } from "../lib/api";

export default async function Home() {
  const posts = await getPosts();
  return (
    <div>
      <Header />
      <main className="mt-6">
        <PostFeed posts={posts} />
      </main>
    </div>
  );
}
