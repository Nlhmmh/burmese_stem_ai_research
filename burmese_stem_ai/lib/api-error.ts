import { NextResponse } from "next/server";

export type ApiErrorEnvelope = {
  error: {
    code: string;
    message: string;
  };
};

export function apiError(
  code: string,
  message: string,
  status: number,
  metadata: Record<string, unknown> = {}
): NextResponse {
  return NextResponse.json(
    {
      ...metadata,
      error: { code, message }
    },
    { status }
  );
}
