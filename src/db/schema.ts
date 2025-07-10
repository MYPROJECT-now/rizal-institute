    import {  relations } from "drizzle-orm";
    import { integer, pgTable, serial, varchar, date, boolean } from "drizzle-orm/pg-core";



    export const applicantsInformationTable = pgTable("applicationInformationTable", {
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
      reportCard: varchar('reportCard', { length:300 }),
      goodMoral: varchar('goodMoral', { length:300 }),
      idPic: varchar('idPic', { length:300 }),
      studentExitForm: varchar('studentExitForm', { length:300 }),
      form137: varchar('form137', { length:300 }),
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
    })

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


    // //relation
    export const studentsInformationRelations = relations(applicantsInformationTable, ({ one, many }) => ({
      guardian: one(guardianAndParentsTable, {
        fields: [applicantsInformationTable.applicants_id],
        references: [guardianAndParentsTable.applicants_id],
      }),
      education: one(educationalBackgroundTable, {
        fields: [applicantsInformationTable.applicants_id],
        references: [educationalBackgroundTable.applicants_id],
      }),
      documents: one(documentsTable, {
        fields: [applicantsInformationTable.applicants_id],
        references: [documentsTable.applicants_id],
      }),
      status: one(applicationStatusTable, {
        fields: [applicantsInformationTable.applicants_id],
        references: [applicationStatusTable.applicants_id],
      }),
      reservationFee: one(reservationFeeTable, {
        fields: [applicantsInformationTable.applicants_id],
        references: [reservationFeeTable.applicants_id],
      }),


      admissionStatus: one(AdmissionStatusTable, {
        fields: [applicantsInformationTable.applicants_id],
        references: [AdmissionStatusTable.applicants_id],
      }),


      reg_remarks: many(Registrar_remaks_table),
      cashier_remarks: many(Cashier_remaks_table),

    }));




    // student information

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


    export const downPaymentTable = pgTable("downPaymentTable", {
      donw_id: serial('donw_id').primaryKey(),
      student_id: integer('student_id').references(() => StudentInfoTable.student_id).notNull(),
      academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),
      amount: integer('amount').notNull(),
      downPaymentDate: varchar('downPaymentDate', { length:100 }).notNull(),
      SINumberDP: varchar('SINumberDp', { length:300 }).notNull(),
      remarksDP: varchar('remarksDP', { length:100 }).notNull(),
      
    })


    export const MonthsInSoaTable = pgTable("MonthsInSoaTable", {
      month_id: serial('month_id').primaryKey(),
      downPaymentId: integer('downPayment_id').references(() => downPaymentTable.donw_id).notNull(),
      student_id: integer('student_id').references(() => StudentInfoTable.student_id).notNull(),
      academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),

      month: varchar('month', { length:100 }).notNull(),
      monthlyDue: integer('monthlyDue').notNull(),
      amountPaid: integer('amountPaid').notNull().default(0),
      dateOfPayment: date('dateOfPayment'),
      remarks: varchar('remarks', { length:100 }),
      SInumber: varchar('SInumber', { length:300 }),
    })



    export const MonthlyPayementTable = pgTable("MonthlyPayementTable", {
      monthlyPayment_id: serial('monthlyPayment_id').primaryKey(),
      student_id: integer('student_id').references(() => StudentInfoTable.student_id).notNull(),
      month_id: integer('month_id').references(() => MonthsInSoaTable.month_id).notNull(),
      academicYear_id: integer("academicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),

      dateOfPayment: varchar('dateOfPayment', { length:100 }).notNull(),
      amount: integer('amount').notNull(),
      proofOfPayment: varchar('proofOfPayment', { length:300 }).notNull(),
      modeOfPayment: varchar('modeOfPayment', { length:100 }).notNull(),
      dateOfVerification: varchar('dateOfVerification', { length:100 }),
      SInumber: varchar('SInumber', { length:300 }),
      status: varchar('status', { length:100 }).notNull(),
      
    })



    export const SINumberCounter = pgTable("SINumberCounter", {
      id: serial("id").primaryKey(),
      latestNumber: integer("latestNumber").notNull().default(32400),
    });



    export const studentInfoRelations = relations(StudentInfoTable, ({ one, many }) => ({
      downPayment: one(downPaymentTable, {
        fields: [StudentInfoTable.student_id],
        references: [downPaymentTable.student_id],
      }),
      clerkUserRelations: one(ClerkUserTable, {
        fields: [StudentInfoTable.student_id],
        references: [ClerkUserTable.student_id],
      }),

      soa: many(MonthsInSoaTable),
    }));


    export const SOARelations = relations(downPaymentTable, ({ many }) => ({
      soa: many(MonthsInSoaTable)
    }));


    export const AcademicYearTable = pgTable("AcademicYearTable", {
      academicYear_id: serial('academicYear_id').primaryKey(),
      academicYear: varchar('academicYear', { length:100 }).notNull(),
      academicYearStart: date('academicYearStart').notNull(),
      academicYearEnd: date('academicYearEnd').notNull(),
      isActive: boolean('isActive').notNull().default(true),
    })

    export const clerkUserRelations = relations(ClerkUserTable, ({ one }) => ({
      selectedYear: one(AcademicYearTable, {
        fields: [ClerkUserTable.selected_AcademicYear_id],
        references: [AcademicYearTable.academicYear_id],
      }),
    }));


  export const AcademicYearRelations = relations(AcademicYearTable, ({ many }) => ({
    applicants: many(applicantsInformationTable),
    reservations: many(reservationFeeTable),
    applications: many(applicationStatusTable),
    admissions: many(AdmissionStatusTable),
    registrarRemarks: many(Registrar_remaks_table),
    cashierRemarks: many(Cashier_remaks_table),
    students: many(StudentInfoTable),
    downPayments: many(downPaymentTable),
    soaMonths: many(MonthsInSoaTable),
    monthlyPayments: many(MonthlyPayementTable),
    selectedByUsers: many(ClerkUserTable),


  }));


  export const staffClerkUserTable = pgTable("staffClerkUserTable", {
    clerk_uid: serial("clerk_uid").primaryKey(),
    selected_AcademicYear_id: integer("selected_AcademicYear_id").references(() => AcademicYearTable.academicYear_id, { onDelete: 'cascade' }).notNull(),
    clerkId: varchar("clerkID", { length: 100 }).notNull(),
    userType: varchar("userType", { length: 100 }).notNull(),
    clerk_username: varchar("clerk_username", { length: 100 }).notNull(),
    clerk_email: varchar("clerk_email", { length: 100 }).notNull(),
    isActive: boolean("isActive").notNull().default(true),
 
  });