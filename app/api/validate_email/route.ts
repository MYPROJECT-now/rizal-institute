import { NextResponse } from "next/server";
import { db } from "@/src/db/drizzle";
import { applicantsInformationTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Basic syntax check
    if (!email || !email.includes("@")) {
      return NextResponse.json({
        valid: false,
        message: "Invalid email format."
      });
    }

    // Check if already exists
    const existing = await db
      .select()
      .from(applicantsInformationTable)
      .where(eq(applicantsInformationTable.email, email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({
        valid: false,
        message: "This email is already in use. Please use another email."
      });
    }

    // DOMAIN VALIDATION (No MX — works everywhere)
    // const domain = email.split("@")[1];

    // try {
    //   // This checks A/AAAA records → Always allowed
    //   await dns.resolve(domain);
    // } catch (err) {
    //   return NextResponse.json({
    //     valid: false,
    //     message:
    //       "Email domain does not exist or cannot be reached. Please check for typos."
    //   });
    // }

    return NextResponse.json({ valid: true });

  } catch (err) {
    console.error("Validation server error:", err);
    return NextResponse.json({
      valid: false,
      message: "Server error validating email."
    });
  }
}
