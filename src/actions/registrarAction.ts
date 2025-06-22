"use server"

import { desc, eq, or, and } from "drizzle-orm";
import { db } from "../db/drizzle";
import { AdmissionStatusTable, applicantsInformationTable, applicationStatusTable, documentsTable, educationalBackgroundTable, guardianAndParentsTable, StudentInfoTable } from "../db/schema";
import { revalidatePath } from "next/cache";
import { sql } from "drizzle-orm";

  export const getRecentApplicants = async () => {
    const recentEnrollees = await db.select({
      lrn: applicantsInformationTable.lrn,
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      gradeLevel: educationalBackgroundTable.gradeLevel,
      applicationStatus: applicationStatusTable.applicationFormReviewStatus,
      dateOfApplication: applicationStatusTable.dateOfApplication,
    })
    .from(applicantsInformationTable)
    .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.applicants_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
    .where(or(eq(applicationStatusTable.applicationFormReviewStatus, "Pending"),eq(applicationStatusTable.reservationPaymentStatus, "Pending")))
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
      applicationFormReviewStatus: applicationStatusTable.applicationFormReviewStatus,
      reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus, 
    })
    .from(applicantsInformationTable)
    .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.applicants_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
    .where(or(eq(applicationStatusTable.applicationFormReviewStatus, "Pending"),eq(applicationStatusTable.reservationPaymentStatus, "Pending")))
    
  
    console.log("Fetched Enrollees:", allEnrollees);
    
    return allEnrollees ;
  };

    export const acceptStudentsApplication = async (id: number, applicationStatus: string) => {
    await db
    .update(applicationStatusTable)
    .set({
      applicationFormReviewStatus: applicationStatus,
    })
    .where(eq(applicationStatusTable.application_status_id, id));
    revalidatePath("/");
  };

      export const acceptStudentsAddmission = async (id: number, admissionStatus: string) => {
    await db
    .update(AdmissionStatusTable)
    .set({
      admissionStatus: admissionStatus,
    })
    .where(eq(applicationStatusTable.application_status_id, id));
    revalidatePath("/");
  };

  export const getInfoByLrn = async (lrn: string) => {
    const info = await db.select({
      applicantsLastName: applicantsInformationTable.applicantsLastName,
      applicantsFirstName: applicantsInformationTable.applicantsFirstName,
      applicantsMiddleName: applicantsInformationTable.applicantsMiddleName,
      applicantsSuffix: applicantsInformationTable.applicantsSuffix,
      dateOfBirth: applicantsInformationTable.dateOfBirth,
      age: applicantsInformationTable.age,  
      gender: applicantsInformationTable.gender,
      mobileNumber: applicantsInformationTable.mobileNumber,
      email: applicantsInformationTable.email,

      guardiansLastName: guardianAndParentsTable.guardiansLastName,
      guardiansFirstName: guardianAndParentsTable.guardiansFirstName,
      guardiansMiddleName: guardianAndParentsTable.guardiansMiddleName,
      guardiansSuffix: guardianAndParentsTable.guardiansSuffix,
      emergencyContact: guardianAndParentsTable.emergencyContact,
      emergencyEmail: guardianAndParentsTable.emergencyEmail,
      fullAddress: guardianAndParentsTable.fullAddress,

      gradeLevel: educationalBackgroundTable.gradeLevel,
      schoolYear: educationalBackgroundTable.schoolYear,
      schoolType: educationalBackgroundTable.schoolType,
      prevSchool: educationalBackgroundTable.prevSchool,
      schoolAddress: educationalBackgroundTable.schoolAddress,

      birthCert: documentsTable.birthCert,
      reportCard: documentsTable.reportCard,
      goodMoral: documentsTable.goodMoral,
      idPic: documentsTable.idPic,
      studentExitForm: documentsTable.studentExitForm,

    })
    .from(applicantsInformationTable)
    .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.applicants_id))
    .leftJoin(guardianAndParentsTable, eq(applicantsInformationTable.applicants_id, guardianAndParentsTable.applicants_id))
    .leftJoin(documentsTable, eq(applicantsInformationTable.applicants_id, documentsTable.applicants_id))
    .where(eq(applicantsInformationTable.lrn, lrn))
    .limit(1);

    console.log("Fetched Enrollees:", info);

    return info ;
  };

  export const get_ReservedApplicants = async () => {
    const allReserved = await db.select({
      id: applicantsInformationTable.applicants_id,
      lrn: applicantsInformationTable.lrn,
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      gradeLevel: educationalBackgroundTable.gradeLevel,
      applicationStatus: applicationStatusTable.applicationFormReviewStatus,
      reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus,
      admissionStatus: AdmissionStatusTable.admissionStatus,

    })
    .from(applicantsInformationTable)
    .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.applicants_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
    .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
    .where(
      and(
        eq(applicationStatusTable.reservationPaymentStatus, "Reserved"),
        eq(applicationStatusTable.applicationFormReviewStatus, "Reserved"),
        eq(AdmissionStatusTable.admissionStatus, "Pending")
      )
    )
    
  
    console.log("Fetched Enrollees:", allReserved);
    
    return allReserved ;
  };


  export const getEnrolledStudent = async () => {
    const allStudent = await db.select({
      lrn: StudentInfoTable.lrn,
      studentLastName: StudentInfoTable.studentLastName,
      studentFirstName: StudentInfoTable.studentFirstName,
      studentMiddleName: StudentInfoTable.studentMiddleName,
      // studentSuffix: StudentInfoTable.studentSuffix,
      // studentGender: StudentInfoTable.studentGender,
      // studentBirthDate: StudentInfoTable.studentBirthDate,
      // studentAge: StudentInfoTable.studentAge,
      // fullAddress: StudentInfoTable.fullAddress,
    
    })
    .from(StudentInfoTable)
  
    console.log("Fetched Enrollees:", allStudent);
    
    return allStudent;
  };

    // export const getEnrolledStudentsInfo = async (lrn: string) => {
export const getEnrolledStudentsInfo = async () => {
    const allStudentsInfo = await db.select({
      lrn: StudentInfoTable.lrn,
      studentLastName: StudentInfoTable.studentLastName,
      studentFirstName: StudentInfoTable.studentFirstName,
      studentMiddleName: StudentInfoTable.studentMiddleName,
      studentSuffix: StudentInfoTable.studentSuffix,
      studentGender: StudentInfoTable.studentGender,
      studentBirthDate: StudentInfoTable.studentBirthDate,
      studentAge: StudentInfoTable.studentAge,
      fullAddress: StudentInfoTable.fullAddress,
    
    })
    .from(StudentInfoTable)
  
    console.log("Fetched Enrollees:", allStudentsInfo);
    
    return allStudentsInfo;
  };

export const getTotalStudents = async () => {
  const totalStudents = await db
    .select({ count: sql<number>`count(*)` })
    .from(StudentInfoTable);
  
  return totalStudents[0].count;
};

export const getGenderCounts = async () => {
  const genderCounts = await db
    .select({
      gender: StudentInfoTable.studentGender,
      count: sql<number>`count(*)`
    })
    .from(StudentInfoTable)
    .groupBy(StudentInfoTable.studentGender);
  
  return genderCounts;
};

export const getTotalApplicants = async () => {
  const totalApplicants = await db
    .select({ count: sql<number>`count(*)` })
    .from(applicantsInformationTable)
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
    .where(
      and(
        or(
          eq(applicationStatusTable.reservationPaymentStatus, "Pending"),
          eq(applicationStatusTable.applicationFormReviewStatus, "Pending")
        )
      )
    );
  
  return totalApplicants[0].count;
};

export const getTotalReserved = async () => {
  const totalReserved = await db
    .select({ count: sql<number>`count(*)` })
    .from(applicantsInformationTable)
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
    .where(
      and(
        eq(applicationStatusTable.reservationPaymentStatus, "Reserved"),
        eq(applicationStatusTable.applicationFormReviewStatus, "Reserved")
      )
    );
  
  return totalReserved[0].count;
};

  