import NewPostForm from "@/app/components/NewPostForm";
import Link from "next/link";

export const metadata = {
  title: "New Post • Canada Travel Blog",
};

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Back to posts
      </Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">New Post</h1>
      <p className="mt-2 text-zinc-600">Share a story, add a photo, and log your location.</p>
      <div className="mt-6 rounded-lg bg-white p-4 shadow-sm">
        <NewPostForm />
      </div>
    </div>
  );
}
