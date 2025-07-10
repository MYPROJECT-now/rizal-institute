  "use server";

  import { auth } from "@clerk/nextjs/server";
  import { eq } from "drizzle-orm";
  import { db } from "../../db/drizzle";
import { staffClerkUserTable } from "@/src/db/schema";


  
  
    export const getStaffId = async (): Promise<string | null> => {
      const { userId } = await auth();
      if (!userId) return null;
  
      const clerkRecord = await db
        .select()
        .from(staffClerkUserTable)
        .where(eq(staffClerkUserTable.clerkId, userId))
        .limit(1);
  
      const staffID = clerkRecord[0];
      if (!staffID) return null;
      console.log(staffID);
  
    return staffID?.clerkId ?? null;
    };
  