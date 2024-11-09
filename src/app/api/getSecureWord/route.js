export async function GET() {
  return new Response(JSON.stringify({ secureWord: "secure123" }), {
    headers: { "Content-Type": "application/json" },
  });
}
