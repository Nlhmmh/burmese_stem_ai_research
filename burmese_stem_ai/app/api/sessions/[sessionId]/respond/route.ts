import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Learner response handling is not implemented" },
    { status: 501 }
  );
}
