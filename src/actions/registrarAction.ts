  "use server"

  import { desc, eq, or, and, inArray,  } from "drizzle-orm";
  import { db } from "../db/drizzle";
  import { AcademicYearTable, additionalInformationTable, AdmissionStatusTable, applicantsInformationTable, applicationStatusTable, auditTrailsTable, BreakDownTable, documentsTable, educationalBackgroundTable, ESCGranteeTable, GradeLevelTable, guardianAndParentsTable, MonthsInSoaTable, Registrar_remaks_table, staffClerkUserTable, StudentGradesTable, StudentInfoTable, StudentPerGradeAndSection, studentTypeTable, SubjectTable } from "../db/schema";
  import { sql } from "drizzle-orm";
  import { requireStaffAuth } from "./utils/staffAuth";
  import { auth } from "@clerk/nextjs/server";
  import { getSelectedYear } from "./utils/getSelectedYear";


//dashboard functions
// top analytics
  export const getTotalStudents = async (selectedYear: number) => {
    const totalStudents = await db
      .select({ count: sql<number>`count(*)` })
      .from(StudentInfoTable)
      .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
      .where(and(
        eq(AdmissionStatusTable.academicYear_id, selectedYear),
        eq(AdmissionStatusTable.admissionStatus, "Enrolled")
      ));
    return totalStudents[0].count;
  };

  export const getGenderCounts = async (selectedYear: number) => {
    const genderCounts = await db
      .select({
        gender: StudentInfoTable.studentGender,
        count: sql<number>`count(*)`
      })
      .from(StudentInfoTable)
      .groupBy(StudentInfoTable.studentGender)
      .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
      .where(and(
        eq(AdmissionStatusTable.academicYear_id, selectedYear),
        eq(AdmissionStatusTable.admissionStatus, "Enrolled")
      ));
    return genderCounts;
  };

  export const getTotalPendingApplicants = async (selectedYear: number) => {
    const totalApplicants = await db
      .select({ count: sql<number>`count(*)` })
      .from(applicationStatusTable)
      .leftJoin(AdmissionStatusTable, eq(applicationStatusTable.applicants_id, AdmissionStatusTable.applicants_id))
      .where(
        and(
          eq(AdmissionStatusTable.academicYear_id, selectedYear),
          eq(applicationStatusTable.applicationFormReviewStatus, "Pending"),
        )
      )
    
    return totalApplicants[0].count;
  };

  export const getTotalDocuments = async () => {

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return [];
  
    const documents = await db
      .select({ 
        lrn: StudentInfoTable.lrn,
        isActive: AcademicYearTable.isActive,
        hasBirth: documentsTable.hasBirth,
        hasReportCard: documentsTable.hasReportCard,
        hasGoodMoral: documentsTable.hasGoodMoral,
        hasIdPic: documentsTable.hasIdPic,
        hasExitForm: documentsTable.hasExitForm,
        hasForm137: documentsTable.hasForm137,
        hasITR: documentsTable.hasTIR,
        hasEscCert: documentsTable.hasEscCertificate,
        studentType: educationalBackgroundTable.studentType,
        schoolType: educationalBackgroundTable.schoolType,
        escGrantee: additionalInformationTable.escGrantee,
      })
      .from(StudentInfoTable)
      .leftJoin(additionalInformationTable, eq(StudentInfoTable.applicants_id, additionalInformationTable.applicants_id))
      .leftJoin(educationalBackgroundTable, eq(StudentInfoTable.applicants_id, educationalBackgroundTable.applicants_id))
      .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
      .leftJoin(AcademicYearTable, eq(AdmissionStatusTable.academicYear_id, AcademicYearTable.academicYear_id))
      .leftJoin(documentsTable, eq(StudentInfoTable.applicants_id, documentsTable.applicants_id))
      .where(and(
        eq(AdmissionStatusTable.academicYear_id, selectedYear),
        eq(AcademicYearTable.academicYear_id, selectedYear),
        eq(AdmissionStatusTable.admissionStatus, "Enrolled")
      ));

    console.log("Fetched documents:", documents);
    return documents;
  };

  //   export const getTotalApplicants = async (selectedYear: number) => {
  //   const totalApplicants = await db
  //     .select({ count: sql<number>`count(*)` })
  //     .from(applicantsInformationTable)
  //     .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
  //     .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
  //     .where(and(or(
  //           eq(applicationStatusTable.reservationPaymentStatus, "Pending"),
  //           eq(applicationStatusTable.applicationFormReviewStatus, "Pending"),
  //           eq(AdmissionStatusTable.academicYear_id, selectedYear),
  //           eq(AdmissionStatusTable.admissionStatus, "Enrolled")
  //     )));
    
  //   return totalApplicants[0].count;
  // };

  export const getTotalPendingAdmission = async (selectedYear: number) => {
    const totalReserved = await db
      .select({ count: sql<number>`count(*)` })
      .from(applicantsInformationTable)
      .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
      .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
      .where(and(
          eq(applicationStatusTable.reservationPaymentStatus, "Reserved"),
          eq(applicationStatusTable.applicationFormReviewStatus, "Reserved"),
          eq(applicationStatusTable.academicYear_id, selectedYear),
          eq(AdmissionStatusTable.academicYear_id, selectedYear),
          eq(AdmissionStatusTable.admissionStatus, "Pending"),
      ));
    return totalReserved[0].count;
  };

  //graphs
  export const getEnrolledCountPerGradeLevel = async () => {

  const selectedYear = await getSelectedYear();
  if(!selectedYear) return [];

  const result = await db
    .select({
      gradeLevel: GradeLevelTable.gradeLevelName,
      count: sql<number>`COUNT( ${StudentGradesTable.student_id})`,
    })
    .from(StudentInfoTable)
    .leftJoin(StudentGradesTable, eq(StudentGradesTable.student_id, StudentInfoTable.student_id))
    .leftJoin(GradeLevelTable, eq(StudentGradesTable.gradeLevel_id, GradeLevelTable.gradeLevel_id))
    .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
    .where(
      and(
        eq(StudentGradesTable.academicYear_id, selectedYear),
        eq(AdmissionStatusTable.admissionStatus, "Enrolled"),
        eq(AdmissionStatusTable.academicYear_id, selectedYear)
      )
    )
    .groupBy(GradeLevelTable.gradeLevelName);

  console.log("📊 Enrolled per grade level (deduplicated):", result);

  return result;
};



  export const getEnrolledCountPerGradeLevel2 = async () => {
    const selectedYear = await getSelectedYear();
    if (!selectedYear) return [];

    const result = await db
      .select({
        gradeLevel: GradeLevelTable.gradeLevelName,
        studentCount: sql<number>`COUNT(${StudentPerGradeAndSection.spgac_id})`,
        totalBoys: sql<number>` COUNT(CASE WHEN ${StudentInfoTable.studentGender} = 'Male' THEN 1 END) `,
        totalGirls: sql<number>` COUNT(CASE WHEN ${StudentInfoTable.studentGender} = 'Female' THEN 1 END)`,      
      })
      .from(StudentPerGradeAndSection)
      .leftJoin(GradeLevelTable, eq(StudentPerGradeAndSection.gradeLevel_id, GradeLevelTable.gradeLevel_id))
      .leftJoin(StudentInfoTable, eq(StudentPerGradeAndSection.student_id, StudentInfoTable.student_id))
      .where(eq(StudentPerGradeAndSection.academicYear_id, selectedYear))
      .groupBy(GradeLevelTable.gradeLevelName);

    console.log("test", result);

    return result;
  };

export const getDiscountDIstribution = async () => {

  const selectedYear = await getSelectedYear();
  if(!selectedYear) return [];

  const result = await db
    .select({
      New_ESC_Grantee: sql<number>`COUNT(CASE WHEN ${ESCGranteeTable.studentType} = 'Incoming G7' THEN 1 END)`,
      All_Grantees: sql<number>`COUNT(${ESCGranteeTable.applicants_id})`,
      With_Honor : sql<number>`COUNT(CASE WHEN ${BreakDownTable.academic_discount} = 'With Honor' THEN 1 END)`,
      With_High_Honor : sql<number>`COUNT(CASE WHEN ${BreakDownTable.academic_discount} = 'With High Honor' THEN 1 END)`,
      With_Highest_Honor : sql<number>`COUNT(CASE WHEN ${BreakDownTable.academic_discount} = 'With Highest Honor' THEN 1 END)`,
      sibling_discount: sql<number>`COUNT(CASE WHEN ${BreakDownTable.withSibling} = 'Yes' THEN 1 END)`,
    })
    .from(ESCGranteeTable)
    .leftJoin(AcademicYearTable, eq(AcademicYearTable.academicYear_id, ESCGranteeTable.academicYear_id))
    .leftJoin(BreakDownTable, eq(BreakDownTable.applicants_id, ESCGranteeTable.applicants_id))
    .leftJoin(AdmissionStatusTable, eq(BreakDownTable.applicants_id, AdmissionStatusTable.applicants_id))
    .where(and(
      eq(AdmissionStatusTable.academicYear_id, selectedYear),
      eq(BreakDownTable.academicYear_id, selectedYear),
      eq(AdmissionStatusTable.admissionStatus, "Enrolled")
    ));


    console.log("📊 Discount Distribution:", result);
    return result;
}


// export const getEnrollmentTrend = async () => {

//    const Trend = await db
//    .select({
//       count: sql<number>`COUNT (${AdmissionStatusTable.admission_id})`,
//       academicYear: AcademicYearTable.academicYear,
//     })
//     .from(AdmissionStatusTable)
//     .leftJoin(AcademicYearTable, eq(AcademicYearTable.academicYear_id, AdmissionStatusTable.academicYear_id))
//     .where(eq(AdmissionStatusTable.admissionStatus, "Enrolled"))
//     .groupBy(AcademicYearTable.academicYear)
//     .orderBy(desc(AcademicYearTable.academicYear))
//     .limit(4); 

//     console.log("📊 Enrollment Trend:", Trend);
//     return Trend;
// };

export const getEnrollmentTrend = async () => {
  // 1️⃣ Get all years first
  const years = await db
    .select({
      id: AcademicYearTable.academicYear_id,
      name: AcademicYearTable.academicYear,
    })
    .from(AcademicYearTable)
    .orderBy(AcademicYearTable.academicYear_id);

  const result = [];

  // 2️⃣ Loop each year and compute counts using small SQLs
  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const prevYear = years[i - 1];

    // new students → in this year only
    const newStudents = await db.execute(sql`
      SELECT COUNT(DISTINCT a1."applicants_id") AS count
      FROM "AdmissionStatusTable" a1
      WHERE a1."academicYear_id" = ${year.id}
      AND a1."admissionStatus" = 'Enrolled'
      AND NOT EXISTS (
        SELECT 1 FROM "AdmissionStatusTable" a2
        WHERE a2."applicants_id" = a1."applicants_id"
        AND a2."academicYear_id" < ${year.id}
        AND a2."admissionStatus" = 'Enrolled'
      )
    `);

    // returnees → enrolled this year AND last year
    const returnees =
      prevYear
        ? await db.execute(sql`
            SELECT COUNT(DISTINCT a1."applicants_id") AS count
            FROM "AdmissionStatusTable" a1
            WHERE a1."academicYear_id" = ${year.id}
            AND a1."admissionStatus" = 'Enrolled'
            AND EXISTS (
              SELECT 1 FROM "AdmissionStatusTable" a2
              WHERE a2."applicants_id" = a1."applicants_id"
              AND a2."academicYear_id" = ${prevYear.id}
              AND a2."admissionStatus" = 'Enrolled'
            )
          `)
        : { rows: [{ count: 0 }] };

    // not returnees → enrolled last year but not this year
    const notReturnees =
      prevYear
        ? await db.execute(sql`
            SELECT COUNT(DISTINCT a1."applicants_id") AS count
            FROM "AdmissionStatusTable" a1
            WHERE a1."academicYear_id" = ${prevYear.id}
            AND a1."admissionStatus" = 'Enrolled'
            AND NOT EXISTS (
              SELECT 1 FROM "AdmissionStatusTable" a2
              WHERE a2."applicants_id" = a1."applicants_id"
              AND a2."academicYear_id" = ${year.id}
              AND a2."admissionStatus" = 'Enrolled'
            )
          `)
        : { rows: [{ count: 0 }] };

    result.push({
      academicYear: year.name,
      new_enrollees: Number(newStudents.rows[0].count),
      returnees: Number(returnees.rows[0].count),
      not_returnees: Number(notReturnees.rows[0].count),
    });
  }

  return result;
};



  // recent applicants
  export const getRecentApplicants = async () => {
      const selectedYear = await getSelectedYear();
      if(!selectedYear) return [];

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
        eq(AdmissionStatusTable.academicYear_id, selectedYear)
      )
    )
    .orderBy(desc(applicationStatusTable.dateOfApplication))
    .limit(5);
    
  
    console.log("Fetched Enrollees:", recentEnrollees);
    
    return recentEnrollees ;
  };

// get all enrolled students
  export const getEnrolledStudent = async () => {

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return [];
  
    const allStudent = await db
      .select({ 
        lrn: StudentInfoTable.lrn,
        studentLastName: StudentInfoTable.studentLastName,
        studentFirstName: StudentInfoTable.studentFirstName,
        studentMiddleName: StudentInfoTable.studentMiddleName,
        status: AdmissionStatusTable.admissionStatus,
        gradeLevel: studentTypeTable.gradeToEnroll,
        isActive: AcademicYearTable.isActive,
        hasBirth: documentsTable.hasBirth,
        hasReportCard: documentsTable.hasReportCard,
        hasGoodMoral: documentsTable.hasGoodMoral,
        hasIdPic: documentsTable.hasIdPic,
        hasExitForm: documentsTable.hasExitForm,
        hasForm137: documentsTable.hasForm137,
        hasITR: documentsTable.hasTIR,
        hasEscCert: documentsTable.hasEscCertificate,
        studentType: studentTypeTable.studentType,
        schoolType: educationalBackgroundTable.schoolType,
        escGrantee: additionalInformationTable.escGrantee,
      })
      .from(StudentInfoTable)
      .leftJoin(additionalInformationTable, eq(StudentInfoTable.applicants_id, additionalInformationTable.applicants_id))
      .leftJoin(educationalBackgroundTable, eq(StudentInfoTable.applicants_id, educationalBackgroundTable.applicants_id))
      .leftJoin(studentTypeTable, eq(StudentInfoTable.applicants_id, studentTypeTable.applicants_id))
      .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
      .leftJoin(AcademicYearTable, eq(studentTypeTable.academicYear_id, AcademicYearTable.academicYear_id))
      .leftJoin(documentsTable, eq(StudentInfoTable.applicants_id, documentsTable.applicants_id))
      .where(and(
        eq(AdmissionStatusTable.academicYear_id, selectedYear),
        eq(AcademicYearTable.academicYear_id, selectedYear),
        eq(studentTypeTable.academicYear_id, selectedYear),
      ))
      .orderBy(
        sql`CAST(${studentTypeTable.gradeToEnroll} AS INTEGER) ASC`,
        StudentInfoTable.applicants_id
      )
    console.log("Fetched Enrollees:", allStudent);
    return allStudent;
  };

// get info for all enrolled students
  export const getEnrolledStudentsInfo = async (lrn: string) => {
    await requireStaffAuth(["registrar"]); // gatekeeper

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return [];

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

      birthcert: documentsTable.hasBirth,
      reportCard: documentsTable.hasReportCard,
      goodMoral: documentsTable.hasGoodMoral,
      idPic: documentsTable.hasIdPic,
      studentExitForm: documentsTable.hasExitForm,
      form137: documentsTable.hasForm137,
      itr: documentsTable.hasTIR,
      escCert: documentsTable.hasEscCertificate,

      studentType: educationalBackgroundTable.studentType,
      schoolType: educationalBackgroundTable.schoolType,
      escGrantee: additionalInformationTable.escGrantee,

      isActive: AcademicYearTable.isActive, 

    })
    .from(StudentInfoTable)
    .leftJoin(documentsTable, eq(StudentInfoTable.applicants_id, documentsTable.applicants_id))
    .leftJoin(educationalBackgroundTable, eq(StudentInfoTable.applicants_id, educationalBackgroundTable.applicants_id))
    .leftJoin(additionalInformationTable, eq(StudentInfoTable.applicants_id, additionalInformationTable.applicants_id))
    .leftJoin(guardianAndParentsTable, eq(StudentInfoTable.applicants_id, guardianAndParentsTable.applicants_id))
    .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
    .leftJoin(AcademicYearTable, eq(AdmissionStatusTable.academicYear_id, AcademicYearTable.academicYear_id))
   .where(and(
        eq(StudentInfoTable.lrn, lrn),
        eq(AcademicYearTable.academicYear_id, selectedYear)
      )
    );


  
    console.log("Fetched Enrollees:", allStudentsInfo);
    
    return allStudentsInfo;
  };

// update student info

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

    birthcert: boolean;
    reportcard: boolean;
    goodmoral: boolean;
    idpic: boolean;
    exitform: boolean;
    form137: boolean;
    itr: boolean;
    esc: boolean;
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

  await Promise.all([
    db.update(StudentInfoTable)
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
      .where(eq(StudentInfoTable.applicants_id, id)),

    db.update(guardianAndParentsTable)
      .set({
        guardiansLastName: values.guardiansLastName,
        guardiansFirstName: values.guardiansFirstName,
        guardiansMiddleName: values.guardiansMiddleName,
        guardiansSuffix: values.guardiansSuffix,
        emergencyContact: values.emergencyContact,
        emergencyEmail: values.emergencyEmail,
      })
      .where(eq(guardianAndParentsTable.applicants_id, id)),

    db.update(documentsTable)
      .set({
        hasBirth: values.birthcert,
        hasReportCard: values.reportcard,
        hasGoodMoral: values.goodmoral,
        hasIdPic: values.idpic,
        hasExitForm: values.exitform,
        hasForm137: values.form137,
        hasTIR: values.itr,
        hasEscCertificate: values.esc,
      })
      .where(eq(documentsTable.applicants_id, id)),
    ]);


  

  return { success: true };};

// transfer student
  export const doTransferStudent = async ( lrn: string) => {
    await requireStaffAuth(["registrar"]); // gatekeeper
    const { userId } = await auth();
    if (!userId) return null;

    const getIdPromise = db
      .select({
        applicants_id: applicantsInformationTable.applicants_id
      })
      .from(applicantsInformationTable)
      .where(eq(applicantsInformationTable.lrn, lrn))
      .limit(1);
      
    const clerkRecordPromise = db
      .select({
        clerk_username: staffClerkUserTable.clerk_username,
        userType: staffClerkUserTable.userType
      })
      .from(staffClerkUserTable)
      .where(eq(staffClerkUserTable.clerkId, userId))
      .limit(1);

    const academicYearIDPromise = db
        .select()
        .from(AcademicYearTable)
        .where(eq(AcademicYearTable.isActive, true))
        .limit(1);

    const [getId, clerkRecord, academicYearID] = await Promise.all([getIdPromise, clerkRecordPromise, academicYearIDPromise]);

    const id = getId[0].applicants_id;
    const clerk_username = clerkRecord[0].clerk_username;
    const userType = clerkRecord[0].userType;
    const academicYear_id = academicYearID[0].academicYear_id;

    await Promise.all([
      db
      .update(AdmissionStatusTable)
      .set({
        admissionStatus: "Transferred",
      })
      .where(eq(AdmissionStatusTable.applicants_id, id)),

      db
      .insert(auditTrailsTable)
      .values({
        username: clerk_username,
        usertype: userType,
        actionTaken: "Transfer a Student",
        dateOfAction: new Date().toISOString(),
        actionTakenFor: lrn,
        academicYear_id:academicYear_id,
      }) 
    ])
  }

//drop student
  export const doDropferStudent = async ( lrn: string) => {
    await requireStaffAuth(["registrar"]); // gatekeeper
    const { userId } = await auth();
    if (!userId) return null;

    const getIdPromise = db
      .select({
        applicants_id: applicantsInformationTable.applicants_id
      })
      .from(applicantsInformationTable)
      .where(eq(applicantsInformationTable.lrn, lrn))
      .limit(1);
      
    const clerkRecordPromise = db
      .select({
        clerk_username: staffClerkUserTable.clerk_username,
        userType: staffClerkUserTable.userType
      })
      .from(staffClerkUserTable)
      .where(eq(staffClerkUserTable.clerkId, userId))
      .limit(1);

    const academicYearIDPromise = db
        .select()
        .from(AcademicYearTable)
        .where(eq(AcademicYearTable.isActive, true))
        .limit(1);

    const [getId, clerkRecord, academicYearID] = await Promise.all([getIdPromise, clerkRecordPromise, academicYearIDPromise]);

    const id = getId[0].applicants_id;
    const clerk_username = clerkRecord[0].clerk_username;
    const userType = clerkRecord[0].userType;
    const academicYear_id = academicYearID[0].academicYear_id;

  await Promise.all([
    db
      .update(AdmissionStatusTable)
      .set({
        admissionStatus: "Dropped",
      })
      .where(eq(AdmissionStatusTable.applicants_id, id)),

    db
      .insert(auditTrailsTable)
      .values({
       username: clerk_username,
       usertype: userType,
       actionTaken: "Dropped a Student",
       dateOfAction: new Date().toISOString(),
       actionTakenFor: lrn,
       academicYear_id: academicYear_id,
      }),
    ])
  }


// get all applicants
  export const getAllEnrollees_registrar = async () => {

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return [];

    const allEnrollees = await db.select({
      admission_id: AdmissionStatusTable.admission_id,
      id: applicantsInformationTable.applicants_id,
      lrn: applicantsInformationTable.lrn,
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      gradeLevel: studentTypeTable.gradeToEnroll,
      applicationFormReviewStatus: applicationStatusTable.applicationFormReviewStatus,
      reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus, 
      dateApprovedByRegistrar: applicationStatusTable.dateApprovedByRegistrar,
      isActive: AcademicYearTable.isActive,

    })
    .from(applicantsInformationTable)
    .leftJoin(studentTypeTable, eq(applicantsInformationTable.applicants_id, studentTypeTable.applicants_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
    .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
    .leftJoin(AcademicYearTable, eq(AdmissionStatusTable.academicYear_id, AcademicYearTable.academicYear_id))
    .where(and(
      eq(AdmissionStatusTable.academicYear_id, selectedYear),
      eq(applicationStatusTable.academicYear_id, selectedYear),
      eq(studentTypeTable.academicYear_id, selectedYear),
    ))

    console.log("Fetched Enrollees:", allEnrollees);
    
    return allEnrollees ;
  };

// get applicants info
  export const getInfoByLrn = async (lrn: string) => {
    await requireStaffAuth(["registrar"]); // gatekeeper

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return [];

    const latestRemark = db
      .select({
        applicants_id: Registrar_remaks_table.applicants_id,
        reg_remarks: Registrar_remaks_table.reg_remarks,
        dateOfRemarks: Registrar_remaks_table.dateOfRemarks,
      })
      .from(Registrar_remaks_table)
      .where(eq(Registrar_remaks_table.academicYear_id, selectedYear))
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

      lrn: applicantsInformationTable.lrn,
      gradeLevel: educationalBackgroundTable.gradeLevel,
      studentType: studentTypeTable.studentType,
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
    .leftJoin(studentTypeTable, eq(educationalBackgroundTable.applicants_id, studentTypeTable.applicants_id))
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

// get reserved students
  export const get_ReservedApplicants = async () => {
    
    const selectedYear = await getSelectedYear();
    if(!selectedYear) return [];

    const allReserved = await db.select({
      id: applicantsInformationTable.applicants_id,
      lrn: applicantsInformationTable.lrn,
      lastName: applicantsInformationTable.applicantsLastName,
      firstName: applicantsInformationTable.applicantsFirstName,
      middleName: applicantsInformationTable.applicantsMiddleName,
      gradeLevel: studentTypeTable.gradeToEnroll,
      applicationStatus: applicationStatusTable.applicationFormReviewStatus,
      reservationPaymentStatus: applicationStatusTable.reservationPaymentStatus,
      admissionStatus: AdmissionStatusTable.admissionStatus,
      confirmationStatus: AdmissionStatusTable.confirmationStatus,
      isActive: AcademicYearTable.isActive,

    })
    .from(applicantsInformationTable)
    .leftJoin(studentTypeTable, eq(applicantsInformationTable.applicants_id, studentTypeTable.applicants_id))
    .leftJoin(applicationStatusTable, eq(applicantsInformationTable.applicants_id, applicationStatusTable.applicants_id))
    .leftJoin(AdmissionStatusTable, eq(applicantsInformationTable.applicants_id, AdmissionStatusTable.applicants_id))
    .leftJoin(AcademicYearTable, eq(AdmissionStatusTable.academicYear_id, AcademicYearTable.academicYear_id))
    .where(and(
      eq(applicationStatusTable.reservationPaymentStatus, "Reserved"),
      eq(applicationStatusTable.applicationFormReviewStatus, "Reserved"),
      eq(AdmissionStatusTable.academicYear_id, selectedYear),
      eq(applicationStatusTable.academicYear_id, selectedYear),
      eq(studentTypeTable.academicYear_id, selectedYear),
      eq(AcademicYearTable.academicYear_id, selectedYear),
    ))
    .orderBy(sql`CAST(${studentTypeTable.gradeToEnroll} AS INTEGER) ASC`)

  
    console.log("Fetched Enrollees:", allReserved);
    
    return allReserved ;
  };

//get all grades
  export const getStudentsGrade = async () => {

    const selectedYear = await getSelectedYear();
    if(!selectedYear) return [];
    
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
    .leftJoin(StudentPerGradeAndSection, eq(StudentInfoTable.student_id, StudentPerGradeAndSection.student_id))
    .where(eq(StudentPerGradeAndSection.academicYear_id, selectedYear), );
    return studentsGrade;
  }

  export const getStudentsStatus = async () => {
    const selectedYear = await getSelectedYear();
    if (!selectedYear) return [];

    const results = await db
      .select({
        student_id: StudentGradesTable.student_id,
        failedSubjects: sql<number>`COUNT(CASE WHEN ${StudentGradesTable.remarks} = 'FAILED' THEN 1 END)`,
      })
      .from(StudentGradesTable)
      .where(eq(StudentGradesTable.academicYear_id, selectedYear))
      .groupBy(StudentGradesTable.student_id);

    return results.map((r) => {
      let status = "Passed";
      if (r.failedSubjects > 0 && r.failedSubjects < 3) status = "Summer";
      if (r.failedSubjects >= 3) status = "Retained";

      return { student_id: r.student_id, status };
    });
  };

//get grade per student
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


//reports
export const getAdmittedStudents = async () => {
  await requireStaffAuth(["registrar"]);

  const selectedYear = await getSelectedYear();
  if(!selectedYear) return [];

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
  .where(and(eq(AdmissionStatusTable.academicYear_id, selectedYear), eq(AdmissionStatusTable.admissionStatus, "Enrolled")));

  if (admittedStudents.length === 0) {
    console.log("❌ No admitted students found");
  }
  
  console.log("Admitted Students:", admittedStudents);
  return admittedStudents;

}


// export const getAmountPaid = async () => {
//   await requireStaffAuth(["registrar"]);

//   const selectedYear = await getSelectedYear();
//   if(!selectedYear) return [];

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
//         eq(MonthsInSoaTable.academicYear_id, selectedYear)
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
//       lastName: StudentInfoTable.studentLastName,
//       firstName: StudentInfoTable.studentFirstName,
//       middleName: StudentInfoTable.studentMiddleName,
//       suffix: StudentInfoTable.studentSuffix,
//       totalDue: sql<number>`
//         SUM(CASE 
//           WHEN ${MonthsInSoaTable.month_id} <= ${currentMonthId} 
//           THEN ${MonthsInSoaTable.monthlyDue} 
//           ELSE 0 
//         END)
//       `,
//       totalPaid: sql<number>`
//         SUM(CASE 
//           WHEN ${MonthsInSoaTable.month_id} <= ${currentMonthId} 
//           THEN ${MonthsInSoaTable.amountPaid} 
//           ELSE 0 
//         END)
//       `,
//     })
//     .from(StudentInfoTable)
//     .leftJoin(MonthsInSoaTable,eq(StudentInfoTable.student_id, MonthsInSoaTable.applicants_id))
//     .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
//     .where(eq(AdmissionStatusTable.academicYear_id, selectedYear))
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

  const selectedYear = await getSelectedYear();
  if (!selectedYear) return [];

  const amountPaid = await db
    .select({
      lastName: StudentInfoTable.studentLastName,
      firstName: StudentInfoTable.studentFirstName,
      middleName: StudentInfoTable.studentMiddleName,
      suffix: StudentInfoTable.studentSuffix,
      totalDue: sql<number>`
        SUM(
          CASE 
            WHEN TO_DATE('01 ' || ${MonthsInSoaTable.month}, 'DD Month YYYY') <= CURRENT_DATE
            THEN ${MonthsInSoaTable.monthlyDue}
            ELSE 0
          END
        )
      `,
      totalPaid: sql<number>`
        SUM(
          CASE 
            WHEN TO_DATE('01 ' || ${MonthsInSoaTable.month}, 'DD Month YYYY') <= CURRENT_DATE
            THEN ${MonthsInSoaTable.amountPaid}
            ELSE 0
          END
        )
      `,
    })
    .from(StudentInfoTable)
    .leftJoin(
      MonthsInSoaTable,
      eq(StudentInfoTable.applicants_id, MonthsInSoaTable.applicants_id)
    )
    .leftJoin(
      AdmissionStatusTable,
      eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id)
    )
    .where(eq(AdmissionStatusTable.academicYear_id, selectedYear))
    .groupBy(
      StudentInfoTable.student_id,
      StudentInfoTable.lrn,
      StudentInfoTable.studentLastName,
      StudentInfoTable.studentFirstName,
      StudentInfoTable.studentMiddleName,
      StudentInfoTable.studentSuffix
    );

  console.log("Totals (auto up to current date):", amountPaid);
  return amountPaid;
};


export const getRecentGrantees = async () => {
  await requireStaffAuth(["registrar"]);

  const selectedYear = await getSelectedYear();
  if(!selectedYear) return [];

  const grantees = await db
  .select({
    fullName: sql<string>`CONCAT(${StudentInfoTable.studentLastName}, ', ', ${StudentInfoTable.studentFirstName}, ' ', ${StudentInfoTable.studentMiddleName})`,
    studentType: ESCGranteeTable.studentType,
  }).from(ESCGranteeTable)
  .leftJoin(StudentInfoTable, eq(ESCGranteeTable.applicants_id, StudentInfoTable.applicants_id))
  .where(and(
    eq(ESCGranteeTable.academicYear_id, selectedYear),
    inArray(ESCGranteeTable.studentType, ["Incoming G7", "Transferee"])

  ))

  return grantees;
}