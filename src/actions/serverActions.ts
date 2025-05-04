"use server"
import { eq, and, or, desc} from "drizzle-orm";
import { db } from "../db/drizzle";
import { documentsTable, educationalBackgroundTable, guardianAndParentsTable, studentsInformationTable, paymentReceiptTable, applicationStatusTable, reservationStatusTable, tuitionFeeTable  } from "../db/schema";
import { revalidatePath } from "next/cache";
import { StudentUpdateData } from "../type/re_applicationType";


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
    .orderBy(desc(applicationStatusTable.dateOfApplication))
    .limit(5);
    
  
    console.log("Fetched Enrollees:", recentEnrollees);
    
    return recentEnrollees ;
  };


  export const getAllEnrollees_registrar = async () => {
    const allEnrollees = await db.select({
      id: studentsInformationTable.id,
      lrn: studentsInformationTable.lrn,
      lastName: studentsInformationTable.studentsLastName,
      firstName: studentsInformationTable.studentsFirstName,
      middleName: studentsInformationTable.studentsMiddleName,
      gradeLevel: educationalBackgroundTable.gradeLevel,
      applicationStatus: applicationStatusTable.applicationStatus,
      reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus, 
    })
    .from(studentsInformationTable)
    .leftJoin(educationalBackgroundTable, eq(studentsInformationTable.id, educationalBackgroundTable.id))
    .leftJoin(applicationStatusTable, eq(studentsInformationTable.id, applicationStatusTable.id))
    
  
    console.log("Fetched Enrollees:", allEnrollees);
    
    return allEnrollees ;
  };

  
  export const getAllEnrollees_cashier = async () => {
    const allEnrollees = await db.select({
      id: studentsInformationTable.id,
      lrn: studentsInformationTable.lrn,
      lastName: studentsInformationTable.studentsLastName,
      firstName: studentsInformationTable.studentsFirstName,
      middleName: studentsInformationTable.studentsMiddleName,
      gradeLevel: educationalBackgroundTable.gradeLevel,
      reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus,
      applicationStatus: applicationStatusTable.applicationStatus
    })
    .from(studentsInformationTable)
    .where(or(eq(applicationStatusTable.applicationStatus, "Pending"), eq(applicationStatusTable.applicationStatus, "Declined"), eq(applicationStatusTable.applicationStatus, "Ongoing")))
    .leftJoin(educationalBackgroundTable, eq(studentsInformationTable.id, educationalBackgroundTable.id))
    .leftJoin(applicationStatusTable, eq(studentsInformationTable.id, applicationStatusTable.id))
    
  
    console.log("Fetched Enrollees:", allEnrollees);
    
    return allEnrollees ;
  };

  export const getAllReservedSlot_cashier = async () => {
    const allEnrollees = await db.select({
      id: studentsInformationTable.id,
      lrn: studentsInformationTable.lrn,
      lastName: studentsInformationTable.studentsLastName,
      firstName: studentsInformationTable.studentsFirstName,
      middleName: studentsInformationTable.studentsMiddleName,
      gradeLevel: educationalBackgroundTable.gradeLevel,
      admissionStatus: reservationStatusTable.admissionStatus
    })
    .from(studentsInformationTable)
    .where(and(eq(applicationStatusTable.applicationStatus, "Reserved"), eq(applicationStatusTable.reservationPaymentStatus, "Reserved")))
    .leftJoin(educationalBackgroundTable, eq(studentsInformationTable.id, educationalBackgroundTable.id))
    .leftJoin(applicationStatusTable, eq(studentsInformationTable.id, applicationStatusTable.id))
    .leftJoin(reservationStatusTable, eq(studentsInformationTable.id, reservationStatusTable.id))
    
  
    console.log("Fetched Enrollees:", allEnrollees);
    
    return allEnrollees ;
  };



  export const updateStudentStatus = async (id: number, applicationStatus: string) => {
    await db
      .update(applicationStatusTable)
      .set({
        applicationStatus: applicationStatus,
      })
      .where(eq(applicationStatusTable.id, id));
    revalidatePath("/");
  };

  // export const acceptStudentsApplication = async (id: number, applicationStatus: string) => {
  //   await db
  //   .update(applicationStatusTable)
  //   .set({
  //     applicationStatus: applicationStatus,
  //   })
  //   .where(eq(applicationStatusTable.id, id));
  //   revalidatePath("/");
  // };

  // export const acceptStudentsReservationPayment= async (id: number, reservationPaymentStatus: string) => {
  //   await db
  //   .update(applicationStatusTable)
  //   .set({
  //     reservationPaymentStatus: reservationPaymentStatus,
  //   })
  //   .where(eq(applicationStatusTable.id, id));
  //   revalidatePath("/");
  // };


  export const acceptStudentsApplication = async (id: number) => {
    const student = await db
      .select()
      .from(applicationStatusTable)
      .where(eq(applicationStatusTable.id, id))
      .then((res) => res[0]);
  
    const reservationStatus = student?.reservationPaymentStatus;
    
    if (reservationStatus === "Ongoing") {
      // Both statuses will be updated to Reserved if reservationStatus is Ongoing
      await db
        .update(applicationStatusTable)
        .set({
          applicationStatus: "Reserved",
          reservationPaymentStatus: "Reserved",
        })
        .where(eq(applicationStatusTable.id, id));
    } else {
      // Only applicationStatus will be updated to Ongoing if reservationStatus is Pending
      await db
        .update(applicationStatusTable)
        .set({
          applicationStatus: "Ongoing",
        })
        .where(eq(applicationStatusTable.id, id));
    }
  
    revalidatePath("/");
  };
  


export const acceptStudentsReservationPayment = async (id: number) => {
  const student = await db
    .select()
    .from(applicationStatusTable)
    .where(eq(applicationStatusTable.id, id))
    .then((res) => res[0]);

  const applicationStatus = student?.applicationStatus;

  if (applicationStatus === "Ongoing") {
    // Both statuses will be updated to Reserved if applicationStatus is Ongoing
    await db
      .update(applicationStatusTable)
      .set({
        reservationPaymentStatus: "Reserved",
        applicationStatus: "Reserved",
      })
      .where(eq(applicationStatusTable.id, id));
  } else {
    // Only reservationPaymentStatus will be updated to Ongoing if applicationStatus is Pending
    await db
      .update(applicationStatusTable)
      .set({
        reservationPaymentStatus: "Ongoing",
      })
      .where(eq(applicationStatusTable.id, id));
  }

  revalidatePath("/");
};




  export const acceptStudentsInititialPayment= async (id: number, admissionStatus: string) => {
    await db
    .update(reservationStatusTable)
    .set({
      admissionStatus: admissionStatus,
    })
    .where(eq(reservationStatusTable.id, id));
    revalidatePath("/");
  };
    
  // reapplication
  export const getStudentDataByTrackingId = async (trackingId: string) => {
    try {
        const student = await db
            .select({
              id: studentsInformationTable.id,
              lrn: studentsInformationTable.lrn,
              studentsFirstName: studentsInformationTable.studentsFirstName,
              studentsMiddleName: studentsInformationTable.studentsMiddleName,
              studentsLastName: studentsInformationTable.studentsLastName,
              studentsSuffix: studentsInformationTable.studentsSuffix,
              dateOfBirth: studentsInformationTable.dateOfBirth,
              age: studentsInformationTable.age,
              gender: studentsInformationTable.gender,
              civilStatus: studentsInformationTable.civilStatus,
              nationality: studentsInformationTable.nationality,
              religion: studentsInformationTable.religion,

              guardiansLastName: guardianAndParentsTable.guardiansLastName,
              guardiansFirstName: guardianAndParentsTable.guardiansFirstName,
              guardiansMiddleName: guardianAndParentsTable.guardiansMiddleName,
              guardiansSuffix: guardianAndParentsTable.guardiansSuffix,
              fullAddress: guardianAndParentsTable.fullAddress,
              mobileNumber: guardianAndParentsTable.mobileNumber,
              email: guardianAndParentsTable.email,

              admissionStatus: educationalBackgroundTable.admissionStatus,
              prevSchool: educationalBackgroundTable.prevSchool,
              schoolAddress: educationalBackgroundTable.schoolAddress,
              schoolType: educationalBackgroundTable.schoolType,
              gradeLevel: educationalBackgroundTable.gradeLevel,
              schoolYear: educationalBackgroundTable.schoolYear,

              birthCert: documentsTable.birthCert,
              reportCard: documentsTable.reportCard,
              goodMoral: documentsTable.goodMoral,
              idPic: documentsTable.idPic,
              studentExitForm: documentsTable.studentExitForm

           })
            .from(studentsInformationTable)
            .innerJoin(applicationStatusTable, eq(studentsInformationTable.id, applicationStatusTable.id))
            .innerJoin(guardianAndParentsTable, eq(studentsInformationTable.id, guardianAndParentsTable.id))
            .innerJoin(educationalBackgroundTable, eq(studentsInformationTable.id, educationalBackgroundTable.id))
            .innerJoin(documentsTable, eq(studentsInformationTable.id, documentsTable.id))
            .where(eq(applicationStatusTable.trackingId, trackingId))
            .limit(1);

        if (student.length === 0) {
            throw new Error("No student data found.");
        }

        return student[0];
    } catch (error) {
        console.error("Error fetching student data:", error);
        throw error;
    }
};





export const updateStudentData = async (lrn: string, updatedData: StudentUpdateData) => {
  try {
    // Extract student and guardian data separately
    const {
      studentsFirstName,
      studentsMiddleName,
      studentsLastName,
      studentsSuffix,
      dateOfBirth,
      age,
      gender,
      civilStatus,
      nationality,
      religion,

      guardiansFirstName,
      guardiansMiddleName,
      guardiansLastName,
      guardiansSuffix,
      fullAddress,
      mobileNumber,
      email,

      admissionStatus,
      prevSchool,
      schoolAddress,
      schoolType,
      gradeLevel,
      schoolYear,

      birthCert,
      reportCard,
      goodMoral,
      idPic,
      studentExitForm


      


    } = updatedData;

    // Update studentsInformationTable
    const updatedStudent = await db
      .update(studentsInformationTable)
      .set({
        studentsFirstName,
        studentsMiddleName,
        studentsLastName,
        studentsSuffix,
        dateOfBirth,
        age,
        gender,
        civilStatus,
        nationality,
        religion,
      })
      .where(eq(studentsInformationTable.lrn, lrn))
      .returning();

    const updatedGuardian = await db
      .update(guardianAndParentsTable)
      .set({
        guardiansFirstName,
        guardiansMiddleName,
        guardiansLastName,
        guardiansSuffix,
        fullAddress,
        mobileNumber,
        email,
      })
      .where(eq(guardianAndParentsTable.id, updatedStudent[0]?.id))
      .returning();

    const updatedEducationalBackground = await db
      .update(educationalBackgroundTable)
      .set({
        admissionStatus,
        prevSchool,
        schoolAddress,
        schoolType,
        gradeLevel,
        schoolYear,
      })
      .where(eq(educationalBackgroundTable.id, updatedStudent[0]?.id))
      .returning();

    const updatedDocument = await db
      .update(documentsTable)
      .set({
        birthCert,
        reportCard,
        goodMoral,
        idPic,
        studentExitForm
      })
      .where(eq(documentsTable.id, updatedStudent[0]?.id))
      .returning();



        //educational Background table

    return {
      student: updatedStudent[0],
      guardian: updatedGuardian[0],
      educationalBackground: updatedEducationalBackground[0],
      document: updatedDocument[0]
    };
  } catch (error) {
    console.error("Error updating student data:", error);
    throw new Error("Failed to update student and guardian data.");
  }
};







export const addTuition = async (
  lrn: string,
  tuitionFee: number,
   soa: string, 
  siNumber: string
) => {
  try {
     // First, find the student by lrn
     const student = await db
     .select()
     .from(studentsInformationTable)
     .where(eq(studentsInformationTable.lrn, lrn))
     .limit(1);

   // If student not found, handle this scenario
   if (!student || student.length === 0) {
     throw new Error("Student not found");
   }

    await db.insert(tuitionFeeTable).values({ tuitionFee, soa, siNumber });
  } catch (error) {
    console.error("Error adding tuition:", error);
  }
};