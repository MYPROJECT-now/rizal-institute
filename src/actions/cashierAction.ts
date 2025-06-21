"use server"

import { and, eq, or } from "drizzle-orm";
import { db } from "../db/drizzle";
import { applicantsInformationTable, applicationStatusTable, educationalBackgroundTable } from "../db/schema";
import { revalidatePath } from "next/cache";

  export const getAllEnrollees_cashier = async () => {
    const allEnrollees = await db.select({
      id: applicantsInformationTable.applicants_id,
      lrn: applicantsInformationTable.lrn,
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      gradeLevel: educationalBackgroundTable.gradeLevel,
      reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus,
      applicationStatus: applicationStatusTable.applicationStatus
    })
    .from(applicantsInformationTable)
    .where(or(eq(applicationStatusTable.applicationStatus, "Pending"), eq(applicationStatusTable.applicationStatus, "Declined"), eq(applicationStatusTable.applicationStatus, "Ongoing")))
    .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.educationalBackground_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.id))
    
  
    console.log("Fetched Enrollees:", allEnrollees);
    
  return allEnrollees ;
  };


    export const getAllReservedSlot_cashier = async () => {
    const allEnrollees = await db.select({
      id: applicantsInformationTable.applicants_id,
      lrn: applicantsInformationTable.lrn,
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      gradeLevel: educationalBackgroundTable.gradeLevel,
    //   admissionStatus: reservationStatusTable.admissionStatus
    })
    .from(applicantsInformationTable)
    .where(and(eq(applicationStatusTable.applicationStatus, "Reserved"), eq(applicationStatusTable.reservationPaymentStatus, "Reserved")))
    .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.educationalBackground_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.id))
    // .leftJoin(reservationStatusTable, eq(studentsInformationTable.id, reservationStatusTable.id))
    
  
    console.log("Fetched Enrollees:", allEnrollees);
    
    return allEnrollees ;
  };


    export const acceptStudentsReservationPayment= async (id: number, reservationPaymentStatus: string) => {
    await db
    .update(applicationStatusTable)
    .set({
      reservationPaymentStatus: reservationPaymentStatus,
    })
    .where(eq(applicationStatusTable.id, id));
    revalidatePath("/");
  };

