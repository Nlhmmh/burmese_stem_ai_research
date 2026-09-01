import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "Session retrieval is not implemented" }, { status: 501 });
}

export async function PATCH() {
  return NextResponse.json({ error: "Session updates are not implemented" }, { status: 501 });
}
