import { NextResponse, type NextRequest } from "next/server";

const LEARNER_COOKIE = "learnerId";
const LEARNER_HEADER = "x-learner-id";
const ONE_YEAR = 60 * 60 * 24 * 365;

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  // Never trust a learner header supplied by the client.
  requestHeaders.delete(LEARNER_HEADER);

  let learnerId = request.cookies.get(LEARNER_COOKIE)?.value;
  let shouldSetCookie = false;

  if (!learnerId || !isValidLearnerId(learnerId)) {
    learnerId = crypto.randomUUID();
    shouldSetCookie = true;
  }

  // Makes the ID available to the current API request.
  requestHeaders.set(LEARNER_HEADER, learnerId);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  // Makes the ID available to future browser requests.
  if (shouldSetCookie) {
    response.cookies.set(LEARNER_COOKIE, learnerId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ONE_YEAR
    });
  }

  return response;
}

function isValidLearnerId(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export const config = {
  matcher: ["/api/:path*"]
};
