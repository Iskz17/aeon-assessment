export async function POST(request) {
  const { username, encryptedPassword } = await request.json();
  // This mock simply returns success for any input.
  return new Response(JSON.stringify({ message: "Login successful" }), {
    headers: { "Content-Type": "application/json" },
  });
}
