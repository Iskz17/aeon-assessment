export async function POST(request) {
  const { username, encryptedPassword } = await request.json();
  return new Response(JSON.stringify({ message: "Login successful" }), {
    headers: { "Content-Type": "application/json" },
  });
}
