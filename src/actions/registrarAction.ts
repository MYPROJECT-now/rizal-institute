  "use server"

  import { desc, eq, or, and, like } from "drizzle-orm";
  import { db } from "../db/drizzle";
  import { AcademicYearTable, AdmissionStatusTable, applicantsInformationTable, applicationStatusTable, auditTrailsTable, documentsTable, educationalBackgroundTable, GradeLevelTable, guardianAndParentsTable, MonthsInSoaTable, Registrar_remaks_table, StudentGradesTable, StudentInfoTable, SubjectTable } from "../db/schema";
  import { revalidatePath } from "next/cache";
  import { sql } from "drizzle-orm";
  import { requireStaffAuth } from "./utils/staffAuth";
  import { getAcademicYearID, getSelectedAcademicYear } from "./utils/academicYear";
import { getStaffCredentials } from "./utils/staffID";

    export const getRecentApplicants = async () => {
      await requireStaffAuth(["registrar"]); // gatekeeper
      const selectedAcademicYear = await getSelectedAcademicYear();

      if (!selectedAcademicYear) {
        console.warn("❌ No academic year selected");
        return [];
      }

      const recentEnrollees = await db.select({
        lrn: applicantsInformationTable.lrn,
        lastName: applicantsInformationTable.applicantsLastName,
        firstName: applicantsInformationTable.applicantsFirstName,
        middleName: applicantsInformationTable.applicantsMiddleName,
        gradeLevel: educationalBackgroundTable.gradeLevel,
        applicationFormReviewStatus: applicationStatusTable.applicationFormReviewStatus,
        dateOfApplication: applicationStatusTable.dateOfApplication,
      })
      .from(applicantsInformationTable)
      .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.applicants_id))
      .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
      .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
      .where(
        and(
          or(
            eq(applicationStatusTable.applicationFormReviewStatus, "Pending"),
            eq(applicationStatusTable.reservationPaymentStatus, "Pending")
          ), 
          eq(AdmissionStatusTable.academicYear_id, selectedAcademicYear)
        )
      )
      .orderBy(desc(applicationStatusTable.dateOfApplication))
      .limit(5);
      
    
      console.log("Fetched Enrollees:", recentEnrollees);
      
      return recentEnrollees ;
    };


      export const getAllEnrollees_registrar = async () => {
        await requireStaffAuth(["registrar"]); // gatekeeper
        const selectedAcademicYear = await getSelectedAcademicYear();

        if (!selectedAcademicYear) {
          console.warn("❌ No academic year selected");
          return [];
        }
        console.log("Academic Year:", selectedAcademicYear);

        const allEnrollees = await db.select({
          admission_id: AdmissionStatusTable.admission_id,
          id: applicantsInformationTable.applicants_id,
          lrn: applicantsInformationTable.lrn,
          lastName: applicantsInformationTable.applicantsLastName,
          firstName: applicantsInformationTable.applicantsFirstName,
          middleName: applicantsInformationTable.applicantsMiddleName,
          gradeLevel: educationalBackgroundTable.gradeLevel,
          applicationFormReviewStatus: applicationStatusTable.applicationFormReviewStatus,
          reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus, 
          dateApprovedByRegistrar: applicationStatusTable.dateApprovedByRegistrar,
          isActive: AcademicYearTable.isActive,

        })
        .from(applicantsInformationTable)
        .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.applicants_id))
        .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
        .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
        .leftJoin(AcademicYearTable, eq(AdmissionStatusTable.academicYear_id, AcademicYearTable.academicYear_id))
        .where(and(
          eq(AdmissionStatusTable.academicYear_id, selectedAcademicYear),
          eq(applicationStatusTable.academicYear_id, selectedAcademicYear)
        ))
      
        console.log("Fetched Enrollees:", allEnrollees);
        
        return allEnrollees ;
      };

    //   export const acceptStudentsApplication = async (id: number, applicationStatus: string) => {
    //   await db
    //   .update(applicationStatusTable)
    //   .set({
    //     applicationFormReviewStatus: applicationStatus,
    //   })
    //   .where(eq(applicationStatusTable.application_status_id, id));
    //   revalidatePath("/");
    // };

    export const acceptStudentsAddmission = async (id: number, admissionStatus: string) => {
      await requireStaffAuth(["registrar"]); // gatekeeper

      await db
      .update(AdmissionStatusTable)
      .set({
        admissionStatus: admissionStatus,
      })
      .where(eq(applicationStatusTable.application_status_id, id));
      revalidatePath("/");
    };

    export const getInfoByLrn = async (lrn: string) => {
      await requireStaffAuth(["registrar"]); // gatekeeper

      const selectedAcademicYear = await getSelectedAcademicYear();

      if (!selectedAcademicYear) {
        console.warn("❌ No academic year selected");
        return [];
      }

        const latestRemark = db
          .select({
            applicants_id: Registrar_remaks_table.applicants_id,
            reg_remarks: Registrar_remaks_table.reg_remarks,
            dateOfRemarks: Registrar_remaks_table.dateOfRemarks,
          })
          .from(Registrar_remaks_table)
          .where(eq(Registrar_remaks_table.academicYear_id, selectedAcademicYear))
          .orderBy(desc(Registrar_remaks_table.dateOfRemarks))
          .as("latest_remark");

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
        studentType: educationalBackgroundTable.studentType,
        schoolYear: educationalBackgroundTable.schoolYear,
        schoolType: educationalBackgroundTable.schoolType,
        prevSchool: educationalBackgroundTable.prevSchool,
        schoolAddress: educationalBackgroundTable.schoolAddress,

        birthCert: documentsTable.birthCert,
        reportCard: documentsTable.reportCard,
        goodMoral: documentsTable.goodMoral,
        idPic: documentsTable.idPic,
        studentExitForm: documentsTable.studentExitForm,

        reg_remarks: latestRemark.reg_remarks,
        dateOfRemarks: latestRemark.dateOfRemarks,

      })
      .from(applicantsInformationTable)
      .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.applicants_id))
      .leftJoin(guardianAndParentsTable, eq(applicantsInformationTable.applicants_id, guardianAndParentsTable.applicants_id))
      .leftJoin(documentsTable, eq(applicantsInformationTable.applicants_id, documentsTable.applicants_id))
      .leftJoin(latestRemark, eq(applicantsInformationTable.applicants_id, latestRemark.applicants_id))
      .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
      .leftJoin(AcademicYearTable, eq(AdmissionStatusTable.academicYear_id, AcademicYearTable.academicYear_id))
      .where(eq(applicantsInformationTable.lrn, lrn))
      .limit(1);

      console.log("Fetched Enrollees:", info);

      return info ;
    };




    export const get_ReservedApplicants = async () => {
      await requireStaffAuth(["registrar"]); // gatekeeper
      
      const selectedAcademicYear = await getSelectedAcademicYear();

      if (!selectedAcademicYear) {
        console.warn("❌ No academic year selected");
        return [];
      }

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
        confirmationStatus: AdmissionStatusTable.confirmationStatus,
        isActive: AcademicYearTable.isActive,

      })
      .from(applicantsInformationTable)
      .leftJoin(educationalBackgroundTable, eq(applicantsInformationTable.applicants_id, educationalBackgroundTable.applicants_id))
      .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
      .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
      .leftJoin(AcademicYearTable, eq(AdmissionStatusTable.academicYear_id, AcademicYearTable.academicYear_id))
      .where(
        and(
            eq(applicationStatusTable.reservationPaymentStatus, "Reserved"),
            eq(applicationStatusTable.applicationFormReviewStatus, "Reserved"),
            eq(AdmissionStatusTable.academicYear_id, selectedAcademicYear),
            eq(applicationStatusTable.academicYear_id, selectedAcademicYear),
        )
      )
      
    
      console.log("Fetched Enrollees:", allReserved);
      
      return allReserved ;
    };


    export const getEnrolledStudent = async () => {
      await requireStaffAuth(["registrar"]); // gatekeeper
      const selectedAcademicYear = await getSelectedAcademicYear();

      if (!selectedAcademicYear) {
        console.warn("❌ No academic year selected");
        return [];
      }
    
      const allStudent = await db
        .selectDistinctOn([StudentInfoTable.lrn], {
          lrn: StudentInfoTable.lrn,
          studentLastName: StudentInfoTable.studentLastName,
          studentFirstName: StudentInfoTable.studentFirstName,
          studentMiddleName: StudentInfoTable.studentMiddleName,
          status: AdmissionStatusTable.admissionStatus,
          gradeLevelName: GradeLevelTable.gradeLevelName,
        })
        .from(StudentInfoTable)
        .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
        .leftJoin(StudentGradesTable, eq(StudentInfoTable.student_id, StudentGradesTable.student_id))
        .leftJoin(GradeLevelTable, eq(StudentGradesTable.gradeLevel_id, GradeLevelTable.gradeLevel_id))
        .where(eq(AdmissionStatusTable.academicYear_id, selectedAcademicYear));

      console.log("Fetched Enrollees:", allStudent);
      return allStudent;
    };


  export const doTransferStudent = async ( lrn: string) => {
    await requireStaffAuth(["registrar"]); // gatekeeper

    const getId = await db
      .select({
        applicants_id: applicantsInformationTable.applicants_id
      })
      .from(applicantsInformationTable)
      .where(eq(applicantsInformationTable.lrn, lrn))
      .limit(1);
    
    const id = getId[0].applicants_id;
    console.log("ID:", id);

    const credentials = await getStaffCredentials();
     
    if (!credentials) return null;

    const username = credentials?.clerk_username;
    const userType = credentials?.userType;
    await db
      .update(AdmissionStatusTable)
      .set({
        admissionStatus: "Transferred",
      })
      .where(eq(AdmissionStatusTable.applicants_id, id));

      await db
      .insert(auditTrailsTable)
      .values({
       username: username,
       usertype: userType,
       actionTaken: "Transfer a Student",
       dateOfAction: new Date().toISOString(),
       actionTakenFor: lrn,
       academicYear_id: await getAcademicYearID(),
      }) ;

  }

  export const doDropferStudent = async ( lrn: string) => {
    await requireStaffAuth(["registrar"]); // gatekeeper

    const getId = await db
      .select({
        applicants_id: applicantsInformationTable.applicants_id
      })
      .from(applicantsInformationTable)
      .where(eq(applicantsInformationTable.lrn, "109856585654"))
      .limit(1);

    // if (!getId || getId.length === 0) {
    //   console.log(`No applicant found for LRN: ${lrn}`);
    //   return 0; // or throw an error depending on your use case
    // }
    
    const id = getId[0].applicants_id;


    const credentials = await getStaffCredentials();
     
    if (!credentials) return null;

    const username = credentials?.clerk_username;
    const userType = credentials?.userType;

    await db
      .update(AdmissionStatusTable)
      .set({
        admissionStatus: "Dropped",
      })
      .where(eq(AdmissionStatusTable.applicants_id, id));

      await db
      .insert(auditTrailsTable)
      .values({
       username: username,
       usertype: userType,
       actionTaken: "Dropped a Student",
       dateOfAction: new Date().toISOString(),
       actionTakenFor: lrn,
       academicYear_id: await getAcademicYearID(),
      }) ;
  }

  // export const getEnrolledStudentsInfo = async (lrn: string) => {
  export const getEnrolledStudentsInfo = async (lrn: string) => {
    await requireStaffAuth(["registrar"]); // gatekeeper

    const allStudentsInfo = await db.select({
      lrn: StudentInfoTable.lrn,
      studentLastName: StudentInfoTable.studentLastName,
      studentFirstName: StudentInfoTable.studentFirstName,
      studentMiddleName: StudentInfoTable.studentMiddleName,
      studentSuffix: StudentInfoTable.studentSuffix,
      studentGender: StudentInfoTable.studentGender,
      studentBirthDate: StudentInfoTable.studentBirthDate,
      age: StudentInfoTable.studentAge,
      fullAddress: StudentInfoTable.fullAddress,

      guardiansLastName: guardianAndParentsTable.guardiansLastName,
      guardiansFirstName: guardianAndParentsTable.guardiansFirstName,
      guardiansMiddleName: guardianAndParentsTable.guardiansMiddleName,
      guardiansSuffix: guardianAndParentsTable.guardiansSuffix,
      emergencyContact: guardianAndParentsTable.emergencyContact,
      emergencyEmail: guardianAndParentsTable.emergencyEmail,
    })
    .from(StudentInfoTable)
    .leftJoin(guardianAndParentsTable, eq(StudentInfoTable.applicants_id, guardianAndParentsTable.applicants_id))
    .where(eq(StudentInfoTable.lrn, lrn));

  
    console.log("Fetched Enrollees:", allStudentsInfo);
    
    return allStudentsInfo;
  };

  // export const updateStudentInfo = async (lrn: string) => {
  //   await requireStaffAuth(["registrar"]); // gatekeeper

  //   const updateStudentInfo = await db
  //     .update(StudentInfoTable)
  //     .set({
  //       studentLastName: StudentInfoTable.studentLastName,
  //       studentFirstName: StudentInfoTable.studentFirstName,
  //       studentMiddleName: StudentInfoTable.studentMiddleName,
  //       studentSuffix: StudentInfoTable.studentSuffix,
  //       studentGender: StudentInfoTable.studentGender,
  //       studentBirthDate: StudentInfoTable.studentBirthDate,
  //       studentAge: StudentInfoTable.studentAge,
  //       fullAddress: StudentInfoTable.fullAddress,
  //     })
  //     .where(eq(StudentInfoTable.lrn, lrn));
    
  //   return updateStudentInfo;
  // }

  export const updateStudentInfo = async (
  lrn: string,
  values: {
    studentLastName: string;
    studentFirstName: string;
    studentMiddleName: string;
    suffix: string;
    studentGender: string;
    studentBirthDate: string;
    studentAge: number;
    fullAddress: string;

    guardiansLastName: string;
    guardiansFirstName: string;
    guardiansMiddleName: string;
    guardiansSuffix: string;
    emergencyContact: string;
    emergencyEmail: string;
  }
) => {
  await requireStaffAuth(["registrar"]);

  const get_id = await db
    .select({
      applicants_id: applicantsInformationTable.applicants_id
    })
    .from(applicantsInformationTable)
    .where(eq(applicantsInformationTable.lrn, lrn))
  
    const id = get_id[0].applicants_id;

  await db
    .update(StudentInfoTable)
    .set({
      studentLastName: values.studentLastName,
      studentFirstName: values.studentFirstName,
      studentMiddleName: values.studentMiddleName,
      studentSuffix: values.suffix,
      studentGender: values.studentGender,
      studentBirthDate: values.studentBirthDate,
      studentAge: values.studentAge,
      fullAddress: values.fullAddress,
    })
    .where(eq(StudentInfoTable.applicants_id, id));

  await db
    .update(guardianAndParentsTable)
    .set({
      guardiansLastName: values.guardiansLastName,
      guardiansFirstName: values.guardiansFirstName,
      guardiansMiddleName: values.guardiansMiddleName,
      guardiansSuffix: values.guardiansSuffix,
      emergencyContact: values.emergencyContact,
      emergencyEmail: values.emergencyEmail,
    })
    .where(eq(guardianAndParentsTable.applicants_id, id));

  return { success: true };};

  export const getTotalStudents = async () => {
    await requireStaffAuth(["registrar"]); // gatekeeper


    const totalStudents = await db
      .select({ count: sql<number>`count(*)` })
      .from(StudentInfoTable);
    
    return totalStudents[0].count;
  };

  export const getGenderCounts = async () => {
      await requireStaffAuth(["registrar"]); // gatekeeper


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
      await requireStaffAuth(["registrar"]); // gatekeeper



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
      await requireStaffAuth(["registrar"]); // gatekeeper


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

    
  export const getStudentsGrade = async () => {
    await requireStaffAuth(["registrar"]); // gatekeeper

    const studentsGrade = await db
    .select({
        id: StudentInfoTable.student_id,
        lrn: StudentInfoTable.lrn,
        studentLastName: StudentInfoTable.studentLastName,
        studentFirstName: StudentInfoTable.studentFirstName,
        studentMiddleName: StudentInfoTable.studentMiddleName,
        studentSuffix: StudentInfoTable.studentSuffix
    })
    .from(StudentInfoTable)
    return studentsGrade;
  }

  // NEW server function
export const getStudentGradesByLRN = async (lrn: string) => {
  await requireStaffAuth(["registrar"]);

  const grades = await db
    .select({
      subject: SubjectTable.subjectName,
      gradeLevel: GradeLevelTable.gradeLevelName,
      finalGrade: StudentGradesTable.finalGrade,
    })
    .from(StudentGradesTable)
    .leftJoin(StudentInfoTable, eq(StudentGradesTable.student_id, StudentInfoTable.student_id))
    .leftJoin(SubjectTable, eq(StudentGradesTable.subject_id, SubjectTable.subject_id))
    .leftJoin(GradeLevelTable, eq(StudentGradesTable.gradeLevel_id, GradeLevelTable.gradeLevel_id))
    .where(eq(StudentInfoTable.lrn, lrn));

    console.log("Grades:", grades);
  return grades;
};



// export const getEnrolledCountPerGradeLevel = async () => {
//   await requireStaffAuth(["registrar"]);

//   const selectedAcademicYear = await getSelectedAcademicYear();

//   if (!selectedAcademicYear) {
//     console.warn("❌ No academic year selected");
//     return [];
//   }

//   const result = await db
//     .select({
//       gradeLevel: GradeLevelTable.gradeLevelName,
//       count: count(StudentInfoTable.student_id), // will group by this below
//     })
//     .from(StudentGradesTable)
//     .leftJoin(GradeLevelTable, eq(StudentGradesTable.gradeLevel_id, GradeLevelTable.gradeLevel_id))
//     .leftJoin(StudentInfoTable, eq(StudentGradesTable.student_id, StudentInfoTable.student_id))
//     .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
//     .where(
//       and(
//         eq(StudentGradesTable.academicYear_id, selectedAcademicYear),
//         eq(AdmissionStatusTable.admissionStatus, "Enrolled"),
//         eq(AdmissionStatusTable.academicYear_id, selectedAcademicYear)
//       )
//     )
//     .groupBy(GradeLevelTable.gradeLevelName);

//   console.log("📊 Enrolled per grade level:", result);

//   return result;
// };


export const getEnrolledCountPerGradeLevel = async () => {
  await requireStaffAuth(["registrar"]);

  const selectedAcademicYear = await getSelectedAcademicYear();

  if (!selectedAcademicYear) {
    console.warn("❌ No academic year selected");
    return [];
  }

  const result = await db
    .select({
      gradeLevel: GradeLevelTable.gradeLevelName,
      count: sql<number>`COUNT(DISTINCT ${StudentGradesTable.student_id})`,
    })
    .from(StudentGradesTable)
    .leftJoin(GradeLevelTable, eq(StudentGradesTable.gradeLevel_id, GradeLevelTable.gradeLevel_id))
    .leftJoin(StudentInfoTable, eq(StudentGradesTable.student_id, StudentInfoTable.student_id))
    .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
    .where(
      and(
        eq(StudentGradesTable.academicYear_id, selectedAcademicYear),
        eq(AdmissionStatusTable.admissionStatus, "Enrolled"),
        eq(AdmissionStatusTable.academicYear_id, selectedAcademicYear)
      )
    )
    .groupBy(GradeLevelTable.gradeLevelName);

  console.log("📊 Enrolled per grade level (deduplicated):", result);

  return result;
};



export const getEnrollmentTrend = async () => {
  await requireStaffAuth(["registrar"]);  

   const Trend = await db
   .select({
      count: sql<number>`COUNT (${AdmissionStatusTable.admission_id})`,
      academicYear: AcademicYearTable.academicYear,
    })
    .from(AdmissionStatusTable)
    .leftJoin(AcademicYearTable, eq(AcademicYearTable.academicYear_id, AdmissionStatusTable.academicYear_id))
    .where(eq(AdmissionStatusTable.admissionStatus, "Enrolled"))
    .groupBy(AcademicYearTable.academicYear)
    .orderBy(desc(AcademicYearTable.academicYear))
    .limit(4); // get latest 4

    console.log("📊 Enrollment Trend:", Trend);
    return Trend;
};


export const getAdmittedStudents = async () => {
  await requireStaffAuth(["registrar"]);

  const year = await getSelectedAcademicYear();

  if (!year) {
    console.warn("❌ No academic year selected");
    return null;
  }

  const admittedStudents = await db
  .selectDistinctOn([StudentInfoTable.lrn],{
    lrn: StudentInfoTable.lrn,
    lastName: StudentInfoTable.studentLastName,
    firstName: StudentInfoTable.studentFirstName,
    middleName: StudentInfoTable.studentMiddleName,
    suffix: StudentInfoTable.studentSuffix,
    gradeLevelName: GradeLevelTable.gradeLevelName,
  })
  .from(StudentInfoTable)
  .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
  .leftJoin(StudentGradesTable, eq(StudentInfoTable.student_id, StudentGradesTable.student_id))
  .leftJoin(GradeLevelTable, eq(StudentGradesTable.gradeLevel_id, GradeLevelTable.gradeLevel_id))
  .where(and(eq(AdmissionStatusTable.academicYear_id, year), eq(AdmissionStatusTable.admissionStatus, "Enrolled")));
  if (admittedStudents.length === 0) {
    console.log("❌ No admitted students found");
  }
  console.log("Admitted Students:", admittedStudents);
  return admittedStudents;

}

// export const getAmountPaid = async () => {
//   await requireStaffAuth(["registrar"]);

//   const amountPaid = await db
//   .select({
//     lrn: StudentInfoTable.lrn,
//     lastName: StudentInfoTable.studentLastName,
//     firstName: StudentInfoTable.studentFirstName,
//     middleName: StudentInfoTable.studentMiddleName,
//     suffix: StudentInfoTable.studentSuffix,
//     monthlyDue: MonthsInSoaTable.monthlyDue,
//     amountPaid: MonthsInSoaTable.amountPaid
//   })
//   .from(StudentInfoTable)
//   .leftJoin(MonthsInSoaTable, eq(StudentInfoTable.student_id, MonthsInSoaTable.student_id));

//   console.log("Amount Paid:", amountPaid);
//   return amountPaid;
// }

// export const getAmountPaid = async () => {
//   await requireStaffAuth(["registrar"]);

//   const year = await getSelectedAcademicYear();

//   if (!year) {
//     console.warn("❌ No academic year selected");
//     return null;

//   }
//   // Get current date
//   const today = new Date();
//   const currentMonth = today.toLocaleString("default", { month: "long" });
//   console.log("Current month:", currentMonth);

//   // Get current month_id from DB
//   const currentMonthRow = await db
//     .select({
//       month_id: MonthsInSoaTable.month_id,
//       month: MonthsInSoaTable.month,
//     })
//     .from(MonthsInSoaTable)
//     .where(
//       and(
//         like(MonthsInSoaTable.month, `${currentMonth}%`),
//         eq(MonthsInSoaTable.academicYear_id, year)
//       )
//     );

//   if (currentMonthRow.length === 0) {
//     console.warn("No current month found in DB, returning empty chart data.");
//     return[];
//   }

//   const currentMonthId = currentMonthRow[0].month_id;
//   console.log("Current month ID:", currentMonthId);


//   const amountPaid = await db
//     .select({
//       lrn: StudentInfoTable.lrn,
//       lastName: StudentInfoTable.studentLastName,
//       firstName: StudentInfoTable.studentFirstName,
//       middleName: StudentInfoTable.studentMiddleName,
//       suffix: StudentInfoTable.studentSuffix,
//       totalDue: sql<number>`SUM(${MonthsInSoaTable.monthlyDue})`,
//       totalPaid: sql<number>`SUM(${MonthsInSoaTable.amountPaid})`,
//     })
//     .from(StudentInfoTable)
//     .leftJoin(MonthsInSoaTable,eq(StudentInfoTable.student_id, MonthsInSoaTable.student_id))
//     .where(eq(AdmissionStatusTable.academicYear_id, year))
//     .groupBy(
//       StudentInfoTable.student_id,
//       StudentInfoTable.lrn,
//       StudentInfoTable.studentLastName,
//       StudentInfoTable.studentFirstName,
//       StudentInfoTable.studentMiddleName,
//       StudentInfoTable.studentSuffix
//     );

//   console.log("Totals:", amountPaid);
//   return amountPaid;
// };

export const getAmountPaid = async () => {
  await requireStaffAuth(["registrar"]);

  const year = await getSelectedAcademicYear();

  if (!year) {
    console.warn("❌ No academic year selected");
    return null;

  }
  // Get current date
  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  console.log("Current month:", currentMonth);

  // Get current month_id from DB
  const currentMonthRow = await db
    .select({
      month_id: MonthsInSoaTable.month_id,
      month: MonthsInSoaTable.month,
    })
    .from(MonthsInSoaTable)
    .where(
      and(
        like(MonthsInSoaTable.month, `${currentMonth}%`),
        eq(MonthsInSoaTable.academicYear_id, year)
      )
    );

  if (currentMonthRow.length === 0) {
    console.warn("No current month found in DB, returning empty chart data.");
    return[];
  }

  const currentMonthId = currentMonthRow[0].month_id;
  console.log("Current month ID:", currentMonthId);


  const amountPaid = await db
    .select({
      lastName: StudentInfoTable.studentLastName,
      firstName: StudentInfoTable.studentFirstName,
      middleName: StudentInfoTable.studentMiddleName,
      suffix: StudentInfoTable.studentSuffix,
      totalDue: sql<number>`
        SUM(CASE 
          WHEN ${MonthsInSoaTable.month_id} <= ${currentMonthId} 
          THEN ${MonthsInSoaTable.monthlyDue} 
          ELSE 0 
        END)
      `,
      totalPaid: sql<number>`
        SUM(CASE 
          WHEN ${MonthsInSoaTable.month_id} <= ${currentMonthId} 
          THEN ${MonthsInSoaTable.amountPaid} 
          ELSE 0 
        END)
      `,
    })
    .from(StudentInfoTable)
    .leftJoin(MonthsInSoaTable,eq(StudentInfoTable.student_id, MonthsInSoaTable.student_id))
    .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
    .where(eq(AdmissionStatusTable.academicYear_id, year))
    .groupBy(
      StudentInfoTable.student_id,
      StudentInfoTable.lrn,
      StudentInfoTable.studentLastName,
      StudentInfoTable.studentFirstName,
      StudentInfoTable.studentMiddleName,
      StudentInfoTable.studentSuffix
    );

  console.log("Totals:", amountPaid);
  return amountPaid;
};