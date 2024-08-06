import { NextResponse } from "next/server";
import useAuth from "@/hooks/useAuth";
import client from "@/app/helpers/api";
import { TokenResponse } from "@/models/TokenResponse";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const tokenResponse = await client.post<TokenResponse>("/auth/signup", {
    name,
    email,
    password,
  });

  if (tokenResponse) {
    const response = NextResponse.json({
      success: true,
      accessToken: tokenResponse.data.accessToken,
    });

    response.cookies.set("accessToken", tokenResponse.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return response;
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
