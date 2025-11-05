import { NextResponse, type NextRequest } from "next/server";
import { getPostBySlug } from "@/app/db/repositories/PostsRepository";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await ctx.params;
    const post = await getPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to load post" },
      { status: 500 }
    );
  }
}
