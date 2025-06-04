"use server"
import { db } from "../db/drizzle";
import { revalidatePath } from "next/cache";
import { applicantsInformationTable, documentsTable, educationalBackgroundTable, guardianAndParentsTable, reservationFeeTable } from "../db/schema";
import { eq } from "drizzle-orm";


export const addNewApplicant = async (
    // applicants table
    applicantsLastName:string, 
    applicantsFirstName: string, 
    applicantsMiddleName: string, 
    applicantsSuffix: string, 
    dateOfBirth: Date, 
    age: number, 
    gender: string, 
    mobileNumber: string, 
    email: string,
    lrn: string,

    guardiansLastName: string,
    guardiansFirstName: string,
    guardiansMiddleName: string,
    guardiansSuffix: string,
    emergencyContact: string,
    emergencyEmail: string,
    fullAddress: string,

    gradeLevel: string,
    schoolYear: string,
    schoolType: string,
    prevSchool: string,
    schoolAddress: string,

    birthCert: string,
    reportCard: string,
    goodMoral: string,
    idPic: string,
    studentExitForm: string,

    mop: string,
    reservationReceipt: string,

) => {

      const existingLrn = await db
        .select()
        .from(applicantsInformationTable)
        .where(eq(applicantsInformationTable.lrn, lrn))
        .limit(1);

    if (existingLrn.length > 0) {
        throw new Error("This LRN is already submitted an application. wait for approval or contact the school registrar.");
    }


   // Insert all data **in parallel** using Promise.all()
   await Promise.all([
    db.insert(applicantsInformationTable).values({
        applicantsLastName,
        applicantsFirstName,
        applicantsMiddleName,
        applicantsSuffix,
        dateOfBirth: dateOfBirth.toISOString().split('T')[0],
        age,
        gender,
        mobileNumber,
        email,
        lrn
    }),
    
    db.insert(guardianAndParentsTable).values({
        guardiansLastName,
        guardiansFirstName,
        guardiansMiddleName,
        guardiansSuffix,
        emergencyContact,
        emergencyEmail,
        fullAddress,
    }),

    db.insert(educationalBackgroundTable).values({
        gradeLevel,
        schoolYear,
        schoolType,
        prevSchool,
        schoolAddress
    }),

    db.insert(documentsTable).values({
        birthCert,
        reportCard,
        goodMoral,
        idPic,
        studentExitForm
    }),

    db.insert(reservationFeeTable).values({
        mop,
        reservationReceipt
    })

]);

// Revalidate paths after all inserts are completed
revalidatePath("/");
revalidatePath("/enrollment");
};

export  const existingLrn = async(lrn: string) => {
    await db
        .select()
        .from(applicantsInformationTable)
        .where(eq(applicantsInformationTable.lrn, lrn))
        .limit(1);
}