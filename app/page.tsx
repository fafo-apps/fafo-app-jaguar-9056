import Link from "next/link";
import { getRecentPosts } from "@/app/db/repositories/PostsRepository";

export default async function Home() {
  const posts = await getRecentPosts(24);
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Canada Travel Blog</h1>
          <p className="mt-1 text-zinc-600">Stories and photos from the trip.</p>
        </div>
        <Link
          href="/new"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Add Post
        </Link>
      </header>

      {posts.length === 0 ? (
        <p className="text-zinc-600">No posts yet. Be the first to add one!</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="group overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
              <Link href={`/posts/${post.slug}`}>
                {post.cover_image_url ? (
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="h-44 w-full object-cover transition-transform group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-44 w-full items-center justify-center bg-zinc-100 text-zinc-400">
                    No image
                  </div>
                )}
                <div className="p-4">
                  <h2 className="line-clamp-2 text-lg font-semibold leading-snug">{post.title}</h2>
                  {(post.location || post.visited_on) && (
                    <p className="mt-1 text-sm text-zinc-600">
                      {[post.location, post.visited_on && new Date(post.visited_on).toLocaleDateString()].filter(Boolean).join(" • ")}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
