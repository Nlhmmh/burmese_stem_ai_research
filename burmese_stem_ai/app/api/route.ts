// Route: /api
// This route serves as a simple API endpoint for testing purposes.
export async function GET() {
  return new Response(JSON.stringify({ message: "Hello from Burmese STEM AI API!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
