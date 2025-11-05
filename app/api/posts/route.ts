import { NextResponse, type NextRequest } from "next/server";
import {
  createPost,
  getRecentPosts,
  type CreatePostInput,
} from "@/app/db/repositories/PostsRepository";

export async function GET(_req: NextRequest) {
  try {
    const posts = await getRecentPosts(24);
    return NextResponse.json({ posts });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to load posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<CreatePostInput>;
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Title and story are required" },
        { status: 400 }
      );
    }
    const post = await createPost({
      title: body.title,
      content: body.content,
      coverImageUrl: body.coverImageUrl ?? null,
      location: body.location ?? null,
      visitedOn: body.visitedOn ?? null,
    });
    return NextResponse.json({ post }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
