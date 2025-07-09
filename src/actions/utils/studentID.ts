  // app/actions/utils/getStudentId.ts
  "use server";

  import { auth } from "@clerk/nextjs/server";
  import { eq } from "drizzle-orm";
  import { db } from "../../db/drizzle";
  import { ClerkUserTable, StudentInfoTable } from "../../db/schema";



  export const getStudentId = async (): Promise<number | null> => {
    const { userId } = await auth();
    if (!userId) return null;

    const clerkRecord = await db
      .select()
      .from(ClerkUserTable)
      .where(eq(ClerkUserTable.clerkId, userId))
      .limit(1);

    const applicant = clerkRecord[0];
    if (!applicant) return null;

    const studentInfo = await db
      .select({ student_id: StudentInfoTable.student_id })
      .from(StudentInfoTable)
      .where(eq(StudentInfoTable.applicants_id, applicant.applicants_id));

    return studentInfo[0]?.student_id ?? null;
  };
