export async function getPosts() {
  const response = await fetch("http://localhost:5000/api/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}
