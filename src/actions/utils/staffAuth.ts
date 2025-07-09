// app/actions/utils/requireStaffAuth.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/db/drizzle";
import { eq } from "drizzle-orm";
import { staffClerkUserTable } from "@/src/db/schema";

export const requireStaffAuth = async (allowedRoles: string[] = []) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const staff = await db.select().from(staffClerkUserTable).limit(1).where( eq(staffClerkUserTable.clerkId, userId))

  if (!staff || !staff[0].isActive) {
    throw new Error("Forbidden");
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(staff[0].userType)) {
    throw new Error("Access Denied: Insufficient Permissions");
  }

  return staff; // optionally return staff info
};
