import { integer, pgTable, serial, varchar, date, boolean } from "drizzle-orm/pg-core";

  // applicants information
  export const applicantsInformationTable = pgTable("applicantsInformationTable", {
    applicants_id: serial("applicants_id").primaryKey(),
    applicantsLastName: varchar('applicantsLastName', { length:100 }).notNull(),
    applicantsFirstName: varchar('applicantsFirstName',{ length: 100 }).notNull(),
    applicantsMiddleName: varchar('applicantsMiddleName', { length:100 }),
    applicantsSuffix: varchar('applicantsSuffix', { length:100 }),
    dateOfBirth: date('dateOfBirth' ).notNull(),
    age: integer('age').notNull(),
    gender: varchar('gender', { length:100 }).notNull(),
    mobileNumber: varchar('mobileNumber', { length:12 }).notNull(),
    email: varchar('email', { length:100 }).notNull(),
    lrn: varchar('lrn', { length:100 }).notNull().unique(),
  });

  export const guardianAndParentsTable = pgTable("guardianAndParentsTable", {
    guardians_id: serial("guardians_id").primaryKey(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id, { onDelete: "cascade" }).notNull().unique(),
    guardiansLastName: varchar('guardiansLastName', { length:100 }).notNull(),
    guardiansFirstName: varchar('guardiansFirstName',{ length: 100 }).notNull(),
    guardiansMiddleName: varchar('guardiansMiddleName', { length:100 }),
    guardiansSuffix: varchar('guardiansSuffix', { length:100 }),
    emergencyContact: varchar('mobileNumber', { length:12 }).notNull(),
    emergencyEmail: varchar('email', { length:100 }),
    fullAddress: varchar('fullAddress', { length:250 }).notNull(),
  })

  export const educationalBackgroundTable = pgTable("educationalBackgroundTable" , {
    educationalBackground_id: serial("educationalBackground_id").primaryKey(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id, { onDelete: "cascade" }).notNull().unique(),
    gradeLevel: varchar('gradeLevel', { length:100 }).notNull(),
    studentType: varchar('studentType', { length:100 }).notNull(),
    schoolYear: varchar('schoolYear', { length: 100 }).notNull(),
    schoolType: varchar('schoolType', { length:100 }).notNull(),
    prevSchool: varchar('prevSchool', { length:250 }).notNull(),
    schoolAddress: varchar('schoolAddress', { length:250 }).notNull(),

  })

  export const documentsTable = pgTable("documentsTable", {
    document_id: serial('document_id').primaryKey(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id, { onDelete: "cascade" }).notNull().unique(),
    birthCert: varchar('birthCert', { length:300 }),
    hasBirth: boolean('hasBirth').default(false),
    reportCard: varchar('reportCard', { length:300 }),
    hasReportCard: boolean('hasReportCard').default(false),
    goodMoral: varchar('goodMoral', { length:300 }),
    hasGoodMoral: boolean('hasGoodMoral').default(false),
    idPic: varchar('idPic', { length:300 }),
    hasIdPic: boolean('hasIdPic').default(false),
    studentExitForm: varchar('studentExitForm', { length:300 }),
    hasExitForm: boolean('hasExitForm').default(false),
    form137: varchar('form137', { length:300 }),
    hasForm137: boolean('hasForm137').default(false),
  })

  export const additionalInformationTable = pgTable("additionalInformationTable", {
    additionalInformation_id: serial('additionalInformation_id').primaryKey(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id, { onDelete: "cascade" }).notNull().unique(),
    AttainmentUponGraduation: varchar('AttainmentUponGraduation', { length:100 }),
    ConsistentGPA: varchar('ConsistentGPA', { length:100 }),
    HasEnrolledSibling: varchar('HasEnrolledSibling', { length:100 }),
  })

  export const reservationFeeTable = pgTable("reservationFeeTable" ,{
    reservation_id: serial('reservation_id').primaryKey(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id, { onDelete: "cascade" }).notNull(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),
    reservationAmount: integer('reservationAmount').notNull(),
    mop: varchar('mop', { length:100 }),
    reservationReceipt: varchar ('reservationReceipt', { length:300 }),
    dateOfPayment: varchar('dateOfPayment').notNull(),
    SINumber: varchar('SINumber', { length:300 }),
  })






//application status
  export const applicationStatusTable = pgTable("applicationStatusTable", {
    application_status_id: serial('application_status_id').primaryKey(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id, { onDelete: "cascade" }).notNull(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),
    trackingId: varchar('trackingId', { length:100 }).notNull(),
    applicationFormReviewStatus: varchar('applicationFormReviewStatus', { length:100 }).notNull(),
    reservationPaymentStatus: varchar('reservationPaymentStatus', { length:100 }).notNull(),
    dateOfApplication: date('dateOfApplication').notNull(),
    dateApprovedByRegistrar: date('dateApprovedByRegistrar'),
    dateApprovedByCashier: date('dateApprovedByCashier'),
  })

  export const AdmissionStatusTable = pgTable("AdmissionStatusTable", {
    admission_id: serial('admission_id').primaryKey(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),
    confirmationStatus: varchar('confirmationStatus', { length:100 }),
    dateOfConfirmation: date('dateOfConfirmation'),
    admissionStatus: varchar('admissionStatus', { length:100 }).notNull(),
    dateOfAdmission: date('dateOfAdmission').notNull(),
    dateAdmitted: date('dateAdmitted'),
    isActive: boolean('isActive').notNull().default(false),
  })

  export const Registrar_remaks_table = pgTable("Registrar_remaks_table", {
    reg_remarks_id: serial('reg_remarks_id').primaryKey(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),
    reg_remarks: varchar('reg_remarks', { length:100 }).notNull(),
    dateOfRemarks: date('dateOfRemarks').notNull(),
    resolved_reg_remarks: boolean('resolved_reg_remarks').notNull().default(false),
  })

  export const Cashier_remaks_table = pgTable("Cashier_remaks_table", {
    cashier_remarks_id: serial('cashier_remarks_id').primaryKey(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),
    cashier_remarks: varchar('cashier_remarks', { length:100 }).notNull(),
    dateOfRemarks: date('dateOfRemarks').notNull(),
    resolved_cashier_remarks: boolean('resolved_cashier_remarks').notNull().default(false),
  })




  // students information
  export const StudentInfoTable = pgTable("studentInfoTable", {
    student_id: serial('student_id').primaryKey(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).unique(),
    lrn: varchar('lrn', { length:100 }).notNull().unique(),
    studentLastName: varchar('studentLastName', { length:100 }).notNull(),
    studentFirstName: varchar('studentFirstName', { length:100 }).notNull(),
    studentMiddleName: varchar('studentMiddleName', { length:100 }),
    studentSuffix: varchar('studentSuffix', { length:100 }),
    fullAddress: varchar('fullAddress', { length:300 }).notNull(),
    studentGender: varchar('studentGender', { length:100 }).notNull(),
    studentBirthDate: date('studentBirthDate').notNull(),
    studentAge: integer('studentAge').notNull(),
  })

  export const StudentGradesTable = pgTable("StudentGradesTable", {
    grade_id: serial("grade_id").primaryKey(),
    student_id: integer("student_id").references(() => StudentInfoTable.student_id, { onDelete: "cascade" }).notNull(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: "cascade" }).notNull(),
    gradeLevel_id: integer("gradeLevel_id").references(() => GradeLevelTable.gradeLevel_id, { onDelete: "cascade" }).notNull(),
    subject_id: integer("subject_id").references(() => SubjectTable.subject_id, { onDelete: "cascade" }).notNull(),
    clerk_uid: integer("clerk_uid").references(() => staffClerkUserTable.clerk_uid, { onDelete: "cascade" }),
    finalGrade: integer("finalGrade"),
    remarks: varchar("remarks", { length: 100 }),
    dateSubmitted: date("dateSubmitted"),
  });

  export const SectionTable = pgTable("SectionTable", {
    section_id: serial("section_id").primaryKey(),
    sectionName: varchar("sectionName", { length: 100 }).notNull(),
    limit: integer("limit").notNull(),
    gradeLevel_id: integer("gradeLevel_id").references(() => GradeLevelTable.gradeLevel_id, { onDelete: "cascade" }).notNull(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: "cascade" }).notNull(),
  })

  export const StudentPerGradeAndSection = pgTable("StudentPerGradeAndSection", {
    spgac_id: serial("spgac_id").primaryKey(),
    student_id: integer("student_id").references(() => StudentInfoTable.student_id, { onDelete: "cascade" }).notNull(),
    section_id: integer("section_id").references(() => SectionTable.section_id, { onDelete: "cascade" }).notNull(),
    gradeLevel_id: integer("gradeLevel_id").references(() => GradeLevelTable.gradeLevel_id, { onDelete: "cascade" }).notNull(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: "cascade" }).notNull(),
  })

  export const ScheduleTable = pgTable("ScheduleTable", {
    schedule_id: serial("schedule_id").primaryKey(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: "cascade" }).notNull(),
    section_id: integer("section_id").references(() => SectionTable.section_id, { onDelete: "cascade" }).notNull(),
    gradeLevel_id: integer("gradeLevel_id").references(() => GradeLevelTable.gradeLevel_id, { onDelete: "cascade" }).notNull(),
    subject_id: integer("subject_id").references(() => SubjectTable.subject_id, { onDelete: "cascade" }).notNull(),
    clerk_uid: integer("clerk_uid"), // teacher.references(() => staffClerkUserTable.clerk_uid, { onDelete: "cascade" })
    dayOfWeek: varchar("dayOfWeek", { length: 20 }).notNull(), // "Monday", "Tue"
    startTime: varchar("startTime", { length: 10 }).notNull(), // "08:00"
    endTime: varchar("endTime", { length: 10 }).notNull(),     // "09:30"
  });




// student intital tuition details
  export const downPaymentTable = pgTable("downPaymentTable", {
    donw_id: serial('donw_id').primaryKey(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull(),
    temp_down_id: integer('temp_down_id').references(() => tempdownPaymentTable.temp_down_id).notNull(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),
    amount: integer('amount').notNull(),
    downPaymentDate: varchar('downPaymentDate', { length:100 }).notNull(),
    SINumber: varchar('SINumber', { length:300 }),
    paymentMethod: varchar('paymentMethod', { length:100 }).notNull(),
    
  })

  export const tempdownPaymentTable = pgTable("tempdownPaymentTable", {
    temp_down_id: serial('donw_id').primaryKey(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),
    amount: integer('amount').notNull(),
    downPaymentDate: varchar('downPaymentDate', { length:100 }).notNull(),
    SINumber: varchar('SINumber', { length:300 }),
    paymentMethod: varchar('paymentMethod', { length:100 }),
    
  })

  export const TempMonthsInSoaTable = pgTable("TempMonthsInSoaTable", {
    temp_month_id: serial('month_id').primaryKey(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),

    temp_month: varchar('month', { length:100 }).notNull(),
    temp_monthlyDue: integer('monthlyDue').notNull(),

  })

  export const fullPaymentTable = pgTable("fullPaymentTable", {
    payment_id: serial('payment_id').primaryKey(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull(),
    payment_amount: integer('payment_amount').notNull(),
    payment_receipt: varchar('payment_receipt', { length:300 }).notNull(),
    paymentMethod: varchar('paymentMethod', { length:100 }).notNull(),
    paymentStatus: varchar('paymentStatus', { length:100 }),
    SINumber: varchar('SINumber', { length:300 }),

  })



// students  tuition and payments
  export const MonthsInSoaTable = pgTable("MonthsInSoaTable", {
    month_id: serial('month_id').primaryKey(),
    temp_month_id: integer('temp_month_id').references(() => TempMonthsInSoaTable.temp_month_id).notNull(),
    downPaymentId: integer('downPayment_id').references(() => downPaymentTable.donw_id).notNull(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),

    month: varchar('month', { length:100 }).notNull(),
    monthlyDue: integer('monthlyDue').notNull(),
    amountPaid: integer('amountPaid').notNull().default(0),
    dateOfPayment: date('dateOfPayment'),
    remarks: varchar('remarks', { length:100 }),
    SINumber: varchar('SINumber', { length:300 }),
  })


  export const MonthlyPayementTable = pgTable("MonthlyPayementTable", {
    monthlyPayment_id: serial('monthlyPayment_id').primaryKey(),
    student_id: integer('student_id').references(() => StudentInfoTable.student_id).notNull(),
    month_id: integer('month_id').references(() => MonthsInSoaTable.month_id),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),

    dateOfPayment: varchar('dateOfPayment', { length:100 }).notNull(),
    amount: integer('amount').notNull(),
    proofOfPayment: varchar('proofOfPayment', { length:300 }).notNull(),
    cashiersReceipt: varchar('cashiersReceipt', { length:300 }),
    modeOfPayment: varchar('modeOfPayment', { length:100 }).notNull(),
    dateOfVerification: varchar('dateOfVerification', { length:100 }),
    SINumber: varchar('SINumber', { length:300 }),
    status: varchar('status', { length:100 }).notNull(),
    
  })




// tuition fee related
  export const grantAvailable = pgTable("grantAvailable", {
    grand_id: serial('grand_id').primaryKey(),
    grantAvailable: integer('grantAvailable').notNull(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull().unique(),
  })

  export const BreakDownTable = pgTable("BreakDownTable", {
    breakDown_id: serial('breakDown_id').primaryKey(),
    applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),
    tuitionFee: integer('tuitionFee').notNull(),
    miscellaneous: integer('miscellaneous').notNull(),
    academic_discount: varchar('academic_discount', { length:100 }),
    academic_discount_amount: integer('academic_discount_amount'),
    withSibling: varchar('withSibling', { length:100 }),
    withSibling_amount: integer('withSibling_amount'),
    other_fees: integer('other_fees'),
    other_discount: integer('other_discount'),
    totalTuitionFee: integer('totalTuitionFee'),
    escGrant: integer('escGrant'),
  })








// admin components
export const AcademicYearTable = pgTable("AcademicYearTable", {
    academicYear_id: serial('academicYear_id').primaryKey(),
    academicYear: varchar('academicYear', { length:100 }).notNull(),
    academicYearStart: date('academicYearStart').notNull(),
    academicYearEnd: date('academicYearEnd').notNull(),
    isActive: boolean('isActive').notNull().default(true),
  })

export const EnrollmentStatusTable = pgTable("EnrollmentStatusTable", {
    enrollment_status_id: serial('enrollment_status_id').primaryKey(),
    academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),
    enrollment_period: varchar('enrollment_period', { length:100 }).notNull(),
    enrollment_start_date: varchar('enrollment_start_date', { length:100 }).notNull(),
    enrollment_end_date: varchar('enrollment_end_date', { length:100 }).notNull(),
    isActive: boolean('isActive').notNull().default(true),
  })

export const auditTrailsTable = pgTable("auditTrailsTable", {
  auditTrail_id: serial("auditTrail_id").primaryKey(),
  academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),
  username: varchar("username", { length: 100 }).notNull(),
  usertype: varchar("usertype", { length: 100 }).notNull(),
  actionTaken: varchar("actionTaken", { length: 100 }).notNull(),
  actionTakenFor: varchar("actionTakenFor", { length: 100 }).notNull(),
  dateOfAction: date("dateOfAction").notNull(),
});





//teacher component

export const TeacherAssignmentTable = pgTable("TeacherAssignmentTable", {
  assignment_id: serial("assignment_id").primaryKey(),
  clerk_uid: integer("clerk_uid").references(() => staffClerkUserTable.clerk_uid, { onDelete: "cascade" }).notNull(),
  gradeLevel_id: integer("gradeLevel_id").references(() => GradeLevelTable.gradeLevel_id, { onDelete: "cascade" }).notNull(),
  subject_id: integer("subject_id").references(() => SubjectTable.subject_id, { onDelete: "cascade" }).notNull(),
  section_id: integer("section_id").references(() => SectionTable.section_id, { onDelete: "cascade" }),
  academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: "cascade" }).notNull(),
});





//accounts
export const ClerkUserTable = pgTable("ClerkUserTable", {
  clerk_uid: serial('clerk_uid').primaryKey(),
  student_id: integer('student_id').references(() => StudentInfoTable.student_id).notNull().unique(),
  applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id, { onDelete: "cascade" }).notNull().unique(),
  clerkId: varchar("clerkID", { length: 100 }).notNull(),
  userType: varchar("userType", { length: 100 }).notNull(),
  clerk_username: varchar("clerk_username", { length: 100 }).notNull(),
  clerk_email: varchar("clerk_email", { length: 100 }).notNull(),
  isActive: boolean('isActive').notNull().default(true),
  selected_AcademicYear_id: integer('selected_AcademicYear_id').references(() => AcademicYearTable.academicYear_id).notNull(),
})


export const staffClerkUserTable = pgTable("staffClerkUserTable", {
  clerk_uid: serial("clerk_uid").primaryKey(),
  selected_AcademicYear_id: integer("selected_AcademicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),
  clerkId: varchar("clerkID", { length: 100 }).notNull(),
  userType: varchar("userType", { length: 100 }).notNull(),
  clerk_username: varchar("clerk_username", { length: 100 }).notNull(),
  clerk_email: varchar("clerk_email", { length: 100 }).notNull(),
  isActive: boolean("isActive").notNull().default(true),

});








  // static components
  export const GradeLevelTable = pgTable("GradeLevelTable", {
    gradeLevel_id: serial("gradeLevel_id").primaryKey(),
    gradeLevelName: varchar("gradeLevelName", { length: 100 }).notNull(), // ex: "7"
  });

  export const SubjectTable = pgTable("SubjectTable", {
    subject_id: serial("subject_id").primaryKey(),
    subjectName: varchar("subjectName", { length: 100 }).notNull(), // ex: "Science"
    isActive: boolean("isActive").notNull().default(true),
  });




export const ReceiptInfoTable = pgTable("ReceiptInfoTable", {
  school_id: serial("school_id").primaryKey(),
  schoolName: varchar("schoolName", { length: 100 }).notNull(),
  address: varchar("address", { length: 100 }).notNull(),
  tin: varchar("tin", { length: 100 }).notNull(),
  latestSINumber: varchar("latestSINumber", { length: 100 }).notNull(),
  atpNumber: varchar("atpNumber", { length: 100 }).notNull(),
  dateIssued: varchar("dateIssued", { length: 100 }).notNull(),
  dateExpired: varchar("dateExpired", { length: 100 }).notNull(),
  isActive: boolean("isActive").notNull().default(true),
});

