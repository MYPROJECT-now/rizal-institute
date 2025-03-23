"use server"
import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { documentsTable, educationalBackgroundTable, guardianAndParentsTable, studentsInformationTable, paymentReceiptTable, applicationStatusTable  } from "../db/schema";
import { revalidatePath } from "next/cache";

export const addTodo = async (
    //students table
    lrn: string, 
    studentsLastName:string, 
    studentsFirstName: string, 
    studentsMiddleName: string, 
    studentsSuffix: string, 
    dateOfBirth: Date, 
    age: number, 
    gender: string, 
    civilStatus: string, 
    nationality: string,
    religion: string,

    // guardian and parents table
    guardiansLastName: string,
    guardiansFirstName: string,
    guardiansMiddleName: string,
    guardiansSuffix: string,
    fullAddress: string,
    mobileNumber: string,
    email: string,

    // schools table
    admissionStatus: string,
    prevSchool: string,
    schoolAddress: string,
    schoolType: string,
    gradeLevel: string,
    schoolYear: string,

    // documents table
    birthCert: string,
    reportCard: string,
    goodMoral: string,
    idPic: string,
    studentExitForm: string,

    // payment receipt table
    mop: string,
    receipt: string,

    
) => {

    //  check if the lrn salready existed
    const existingLrn = await db
        .select()
        .from(studentsInformationTable)
        .where(eq(studentsInformationTable.lrn, lrn))
        .limit(1);

    if (existingLrn.length > 0) {
        throw new Error("This LRN is already submitted an application. wait for approval or contact the school registrar.");
    }


    //adding data to the database if all the validation passes
    await db.insert(studentsInformationTable).values({
        lrn: lrn,
        studentsLastName: studentsLastName,
        studentsFirstName: studentsFirstName,
        studentsMiddleName: studentsMiddleName,
        studentsSuffix: studentsSuffix,
        dateOfBirth: dateOfBirth.toISOString().split('T')[0],
        age: age,
        gender: gender,
        civilStatus: civilStatus,
        nationality: nationality,
        religion: religion
    });

    await db.insert(guardianAndParentsTable).values({
        guardiansLastName: guardiansLastName,
        guardiansFirstName: guardiansFirstName,
        guardiansMiddleName: guardiansMiddleName,
        guardiansSuffix: guardiansSuffix,
        fullAddress: fullAddress,
        mobileNumber: mobileNumber,
        email: email
    });

    await db.insert(educationalBackgroundTable).values({
        admissionStatus: admissionStatus,
        prevSchool: prevSchool,
        schoolAddress: schoolAddress,
        schoolType: schoolType,
        gradeLevel: gradeLevel,
        schoolYear: schoolYear
    });

    await db.insert(documentsTable).values({
        birthCert: birthCert,
        reportCard: reportCard,
        goodMoral: goodMoral,
        idPic: idPic,
        studentExitForm: studentExitForm
    });

    await db.insert(paymentReceiptTable).values({
       receipt: receipt,
       mop: mop
    });


    revalidatePath("/")
    revalidatePath("/enrollment")
  };


  export const getStatusByTrackingId = async (trackingId: string) => {
    const result = await db
      .select()
      .from(applicationStatusTable)
      .where(eq(applicationStatusTable.trackingId, trackingId))
      .limit(1);
  
    if (result.length > 0) {
      return result[0].applicationStatus; // Return actual status from the database
    } else {
      return "No application was found"; // Return a user-friendly message
    }
  };
  