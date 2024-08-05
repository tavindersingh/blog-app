import client from "@/app/helpers/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({ success: false, user: null }, { status: 401 });
  }

  const response = await client.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    const user = response.data;
    return NextResponse.json({ success: true, user });
  } else {
    return NextResponse.json({ success: false, user: null }, { status: 401 });
  }
}
