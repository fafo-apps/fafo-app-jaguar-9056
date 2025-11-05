"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [visitedOn, setVisitedOn] = useState("");
  const [location, setLocation] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          visitedOn: visitedOn || null,
          location: location || null,
          coverImageUrl: coverImageUrl || null,
          content,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create post");
      router.push(`/posts/${data.post.slug}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Sunrise over Moraine Lake"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Visited on</label>
          <input
            type="date"
            value={visitedOn}
            onChange={(e) => setVisitedOn(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Banff, Alberta"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Cover image URL</label>
        <input
          type="url"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://images.unsplash.com/..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Story</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={8}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write about your day, highlights, and tips..."
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "Publishing..." : "Publish Post"}
      </button>
    </form>
  );
}
