import { NextResponse } from "next/server";
import useAuth from "@/hooks/useAuth";
import client from "@/app/helpers/api";
import { TokenResponse } from "@/models/TokenResponse";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const success = await client.post<TokenResponse>("/auth/signup", {
    name,
    email,
    password,
  });

  if (success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
