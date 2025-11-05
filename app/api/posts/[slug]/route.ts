import { NextResponse } from "next/server";
import { getPostBySlug } from "@/app/db/repositories/PostsRepository";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getPostBySlug(params.slug);
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
