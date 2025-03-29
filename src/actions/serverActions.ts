"use server"
import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { documentsTable, educationalBackgroundTable, guardianAndParentsTable, studentsInformationTable, paymentReceiptTable, applicationStatusTable  } from "../db/schema";
import { revalidatePath } from "next/cache";


export const addTodo = async (
    // students table
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


   // Insert all data **in parallel** using Promise.all()
   await Promise.all([
    db.insert(studentsInformationTable).values({
        lrn,
        studentsLastName,
        studentsFirstName,
        studentsMiddleName,
        studentsSuffix,
        dateOfBirth: dateOfBirth.toISOString().split('T')[0],
        age,
        gender,
        civilStatus,
        nationality,
        religion
    }),

    db.insert(guardianAndParentsTable).values({
        guardiansLastName,
        guardiansFirstName,
        guardiansMiddleName,
        guardiansSuffix,
        fullAddress,
        mobileNumber,
        email
    }),

    db.insert(educationalBackgroundTable).values({
        admissionStatus,
        prevSchool,
        schoolAddress,
        schoolType,
        gradeLevel,
        schoolYear
    }),

    db.insert(documentsTable).values({
        birthCert,
        reportCard,
        goodMoral,
        idPic,
        studentExitForm
    }),

    db.insert(paymentReceiptTable).values({
        receipt,
        mop
    })
]);

// Revalidate paths after all inserts are completed
revalidatePath("/");
revalidatePath("/enrollment");
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
  

  export const getRecentEnrollee = async () => {
    const recentEnrollees = await db.select({
      lrn: studentsInformationTable.lrn,
      lastName: studentsInformationTable.studentsLastName,
      firstName: studentsInformationTable.studentsFirstName,
      middleName: studentsInformationTable.studentsMiddleName,
      gradeLevel: educationalBackgroundTable.gradeLevel,
      applicationStatus: applicationStatusTable.applicationStatus,
      dateOfApplication: applicationStatusTable.dateOfApplication,
    })
    .from(studentsInformationTable)
    .leftJoin(educationalBackgroundTable, eq(studentsInformationTable.id, educationalBackgroundTable.id))
    .leftJoin(applicationStatusTable, eq(studentsInformationTable.id, applicationStatusTable.id))
    
  
    console.log("Fetched Enrollees:", recentEnrollees);
    
    return recentEnrollees ;
  };
