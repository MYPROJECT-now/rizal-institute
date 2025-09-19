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
  
    // return staffID?.clerkId ?? null;
    return staffID.clerkId;

    };

    export const getUid = async () => {
      const { userId } = await auth();
      if (!userId) return null;
  
      const clerkRecord = await db
        .select()
        .from(staffClerkUserTable)
        .where(eq(staffClerkUserTable.clerkId, userId))
        .limit(1);
  
      const staffID = clerkRecord[0];
      if (!staffID) return null;
  
      return staffID.clerk_uid;
    };


    
    export const getStaffCredentials = async () =>
    {
      const { userId } = await auth();
      if (!userId) return null;

      const clerkRecord = await db
        .select({
          clerk_username: staffClerkUserTable.clerk_username,
          userType: staffClerkUserTable.userType
        })
        .from(staffClerkUserTable)
        .where(eq(staffClerkUserTable.clerkId, userId))
        .limit(1);

      const clerk_username = clerkRecord[0].clerk_username;
      const userType = clerkRecord[0].userType;

      return {clerk_username, userType};

    }
  