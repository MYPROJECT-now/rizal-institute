  "use server"

  import { desc, eq, or, and } from "drizzle-orm";
  import { db } from "../db/drizzle";
  import { AcademicYearTable, AdmissionStatusTable, applicantsInformationTable, applicationStatusTable, documentsTable, educationalBackgroundTable, GradeLevelTable, guardianAndParentsTable, Registrar_remaks_table, StudentGradesTable, StudentInfoTable, SubjectTable } from "../db/schema";
  import { revalidatePath } from "next/cache";
  import { sql } from "drizzle-orm";
  import { requireStaffAuth } from "./utils/staffAuth";
  import { getSelectedAcademicYear } from "./utils/academicYear";

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
      
      const allStudent = await db.select({
        lrn: StudentInfoTable.lrn,
        studentLastName: StudentInfoTable.studentLastName,
        studentFirstName: StudentInfoTable.studentFirstName,
        studentMiddleName: StudentInfoTable.studentMiddleName,
      })
      .from(StudentInfoTable)
      .leftJoin(AdmissionStatusTable, eq(StudentInfoTable.applicants_id, AdmissionStatusTable.applicants_id))
      .where(and(eq(AdmissionStatusTable.admissionStatus, "Enrolled"), eq(AdmissionStatusTable.academicYear_id, selectedAcademicYear))) 
      console.log("Fetched Enrollees:", allStudent);
      
      return allStudent;
    };

      // export const getEnrolledStudentsInfo = async (lrn: string) => {
  export const getEnrolledStudentsInfo = async () => {
      await requireStaffAuth(["registrar"]); // gatekeeper

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
