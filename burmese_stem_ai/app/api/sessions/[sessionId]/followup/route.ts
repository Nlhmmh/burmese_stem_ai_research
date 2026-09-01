import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Follow-up handling is not implemented" }, { status: 501 });
}
