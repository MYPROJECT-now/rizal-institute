import dns from "dns/promises";

export const runtime = "nodejs";

export async function GET() {
  try {
    const result = await dns.resolveMx("gmail.com");
    console.log("MX result:", result);
    return Response.json({ ok: true, result });
  } catch (err) {
    console.log("MX error:", err);
    return Response.json({ ok: false, error: String(err) });
  }
}
