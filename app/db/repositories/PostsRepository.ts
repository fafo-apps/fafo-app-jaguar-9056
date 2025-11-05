import pool from "@/app/db/pool";

export type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string | null;
  location: string | null;
  visited_on: string | null; // ISO date string (YYYY-MM-DD)
  created_at: string;
  updated_at: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function ensureUniqueSlug(base: string): Promise<string> {
  const baseSlug = base || "post";
  const likePattern = `${baseSlug}-%`;
  const { rows } = await pool.query<{ slug: string }>(
    "SELECT slug FROM posts WHERE slug = $1 OR slug LIKE $2 ORDER BY slug ASC",
    [baseSlug, likePattern]
  );
  if (rows.length === 0) return baseSlug;
  const existing = new Set(rows.map((r) => r.slug));
  let i = 1;
  let candidate = `${baseSlug}-${i}`;
  while (existing.has(candidate)) {
    i += 1;
    candidate = `${baseSlug}-${i}`;
  }
  return candidate;
}

export async function getRecentPosts(limit = 20): Promise<Post[]> {
  const { rows } = await pool.query<Post>(
    `SELECT id, title, slug, content, cover_image_url, location, visited_on,
            created_at, updated_at
       FROM posts
   ORDER BY visited_on DESC NULLS LAST, created_at DESC
      LIMIT $1`,
    [limit]
  );
  return rows;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { rows } = await pool.query<Post>(
    `SELECT id, title, slug, content, cover_image_url, location, visited_on,
            created_at, updated_at
       FROM posts
      WHERE slug = $1
      LIMIT 1`,
    [slug]
  );
  return rows[0] || null;
}

export type CreatePostInput = {
  title: string;
  content: string;
  coverImageUrl?: string | null;
  location?: string | null;
  visitedOn?: string | null; // YYYY-MM-DD
};

export async function createPost(input: CreatePostInput): Promise<Post> {
  const baseSlug = slugify(input.title);
  const slug = await ensureUniqueSlug(baseSlug);
  const { rows } = await pool.query<Post>(
    `INSERT INTO posts (title, slug, content, cover_image_url, location, visited_on)
     VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING id, title, slug, content, cover_image_url, location, visited_on, created_at, updated_at`,
    [
      input.title,
      slug,
      input.content,
      input.coverImageUrl ?? null,
      input.location ?? null,
      input.visitedOn ?? null,
    ]
  );
  return rows[0];
}
