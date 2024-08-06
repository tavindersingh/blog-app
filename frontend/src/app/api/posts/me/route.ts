import client from "@/app/helpers/api";
import { Post } from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({ success: false, posts: [] }, { status: 401 });
  }

  const response = await client.get<Post[]>("/posts/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    const posts = response.data;
    return NextResponse.json({ success: true, posts });
  } else {
    return NextResponse.json({ success: false, posts: [] }, { status: 401 });
  }
}
