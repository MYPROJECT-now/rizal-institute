"use server"

import { desc, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { applicantsInformationTable, applicationStatusTable, educationalBackgroundTable } from "../db/schema";
import { revalidatePath } from "next/cache";

  export const getRecentEnrollee = async () => {
    const recentEnrollees = await db.select({
      lrn: applicantsInformationTable.lrn,
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      gradeLevel: educationalBackgroundTable.gradeLevel,
      applicationStatus: applicationStatusTable.applicationStatus,
      dateOfApplication: applicationStatusTable.dateOfApplication,
    })
    .from(applicantsInformationTable)
    .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.educationalBackground_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.id))
    .orderBy(desc(applicationStatusTable.dateOfApplication))
    .limit(5);
    
  
    console.log("Fetched Enrollees:", recentEnrollees);
    
    return recentEnrollees ;
  };


    export const getAllEnrollees_registrar = async () => {
    const allEnrollees = await db.select({
      id: applicantsInformationTable.applicants_id,
      lrn: applicantsInformationTable.lrn,
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      gradeLevel: educationalBackgroundTable.gradeLevel,
      applicationStatus: applicationStatusTable.applicationStatus,
      reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus, 
    })
    .from(applicantsInformationTable)
    .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.educationalBackground_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.id))
    
  
    console.log("Fetched Enrollees:", allEnrollees);
    
    return allEnrollees ;
  };

    export const acceptStudentsApplication = async (id: number, applicationStatus: string) => {
    await db
    .update(applicationStatusTable)
    .set({
      applicationStatus: applicationStatus,
    })
    .where(eq(applicationStatusTable.id, id));
    revalidatePath("/");
  };