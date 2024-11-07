import Header from "../components/Header";

import { getPosts } from "../lib/api";

export default async function Home() {
  const posts = await getPosts();
  return (
    <div>
      <Header />
      <main className="mt-6"></main>
    </div>
  );
}
