import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "@/app/db/repositories/PostsRepository";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const dateLabel = post.visited_on
    ? new Date(post.visited_on).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : undefined;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Back to posts
      </Link>
      <article className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
        {(post.location || dateLabel) && (
          <p className="mt-2 text-sm text-zinc-600">
            {[post.location, dateLabel].filter(Boolean).join(" • ")}
          </p>
        )}
        {post.cover_image_url && (
          // Use img to avoid remote image config
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="mt-6 aspect-[16/9] w-full rounded-lg object-cover"
          />
        )}
        <div className="prose prose-zinc mt-6 max-w-none whitespace-pre-wrap text-lg leading-8">
          {post.content}
        </div>
      </article>
    </div>
  );
}
