import { NextResponse } from "next/server";
import dns from "dns/promises";
import { db } from "@/src/db/drizzle";
import { applicantsInformationTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function POST(req: Request) {
    console.log("Runtime:", process.env.NEXT_RUNTIME);

  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ valid: false, message: "Invalid email format." });
    }
  
    const existing = await db.select().from(applicantsInformationTable).where(eq(applicantsInformationTable.email, email)).limit(1);
      if (existing.length > 0) {
        // throw new Error("This email is already in use. Please use another email.");
        return NextResponse.json({ valid: false, message: "This email is already in use. Please use another email." });
    }


    const domain = email.split("@")[1];

    try {
      const mxRecords = await dns.resolveMx(domain);
      if (!mxRecords || mxRecords.length === 0) {
        return NextResponse.json({
          valid: false,
          message: "The email is invalid and cannot receive email. Please check for typos."
        });
      }

      return NextResponse.json({ valid: true });

    } catch {
      return NextResponse.json({
        valid: false,
        message: "The email is invalid and cannot receive email. Please check for typos."
      });
    }

  } catch {
    return NextResponse.json({
      valid: false,
      message: "Server error validating email."
    });
  }
}
