import client from "@/app/helpers/api";
import { TokenResponse } from "@/models/TokenResponse";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const tokenResponse = await client.post<TokenResponse>("/auth/login", {
    email,
    password,
  });

  if (tokenResponse.data) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("accessToken", tokenResponse.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return response;
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
