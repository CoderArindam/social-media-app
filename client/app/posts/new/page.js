import NewPostForm from "./NewPostForm";

export default function NewPostPage() {
  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <NewPostForm />
    </div>
  );
}
