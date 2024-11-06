export default function Header() {
  return (
    <header className="py-4 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Social Media App</h1>
        <nav>
          <a
            href="/posts/new"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            New Post
          </a>
        </nav>
      </div>
    </header>
  );
}
