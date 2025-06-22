
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar, date } from "drizzle-orm/pg-core";

export const applicantsInformationTable = pgTable("applicationInformationTable", {
  applicants_id: serial("id"),
  applicantsLastName: varchar('applicantsLastName', { length:100 }).notNull(),
  applicantsFirstName: varchar('applicantsFirstName',{ length: 100 }).notNull(),
  applicantsMiddleName: varchar('applicantsMiddleName', { length:100 }),
  applicantsSuffix: varchar('applicantsSuffix', { length:100 }),
  dateOfBirth: date('dateOfBirth' ).notNull(),
  age: integer('age').notNull(),
  gender: varchar('gender', { length:100 }).notNull(),
  mobileNumber: varchar('mobileNumber', { length:12 }).notNull(),
  email: varchar('email', { length:100 }).notNull(),
  lrn: varchar('lrn', { length:100 }).notNull().unique().primaryKey(),
});

export const guardianAndParentsTable = pgTable("guardianAndParentsTable", {
  guardians_id: serial("id").primaryKey(),
  guardiansLastName: varchar('guardiansLastName', { length:100 }).notNull(),
  guardiansFirstName: varchar('guardiansFirstName',{ length: 100 }).notNull(),
  guardiansMiddleName: varchar('guardiansMiddleName', { length:100 }),
  guardiansSuffix: varchar('guardiansSuffix', { length:100 }),
  emergencyContact: varchar('mobileNumber', { length:12 }).notNull(),
  emergencyEmail: varchar('email', { length:100 }),
  fullAddress: varchar('fullAddress', { length:250 }).notNull(),
})

export const educationalBackgroundTable = pgTable("educationalBackgroundTable" , {
  educationalBackground_id: serial("id").primaryKey(),
  gradeLevel: varchar('gradeLevel', { length:100 }).notNull(),
  schoolYear: varchar('schoolYear').notNull(),
  schoolType: varchar('schoolType', { length:100 }).notNull(),
  prevSchool: varchar('prevSchool', { length:250 }).notNull(),
  schoolAddress: varchar('schoolAddress', { length:250 }).notNull(),

})

export const documentsTable = pgTable("documentsTable", {
  document_id: serial('id').primaryKey(),
  birthCert: varchar('birthCert', { length:300 }),
  reportCard: varchar('reportCard', { length:300 }),
  goodMoral: varchar('goodMoral', { length:300 }),
  idPic: varchar('idPic', { length:300 }),
  studentExitForm: varchar('studentExitForm', { length:300 }),
})

export const reservationFeeTable = pgTable("reservationFeeTable" ,{
  id: serial('id').primaryKey(),
  mop: varchar('mop', { length:100 }),
  reservationReceipt: varchar ('reservationReceipt', { length:300 }),
})

export const applicationStatusTable = pgTable("applicationStatusTable", {
  id: serial('id').primaryKey(),
  trackingId: varchar('trackingId', { length:100 }).notNull(),
  applicationStatus: varchar('applicationStatus', { length:100 }).notNull(),
  reservationPaymentStatus: varchar('reservationStatus', { length:100 }).notNull(),
  dateOfApplication: date('dateOfApplication').notNull(),
})

// //relation
export const studentsInformationRelations = relations(applicantsInformationTable, ({ one }) => ({
  guardian: one(guardianAndParentsTable, {
    fields: [applicantsInformationTable.applicants_id],
    references: [guardianAndParentsTable.guardians_id],
  }),
  education: one(educationalBackgroundTable, {
    fields: [applicantsInformationTable.applicants_id],
    references: [educationalBackgroundTable.educationalBackground_id],
  }),
  documents: one(documentsTable, {
    fields: [applicantsInformationTable.applicants_id],
    references: [documentsTable.document_id],
  }),
  status: one(applicationStatusTable, {
    fields: [applicantsInformationTable.applicants_id],
    references: [applicationStatusTable.id],
  }),

}));



// export const guardianAndParentsTable = pgTable("guardianAndParentsTable", {
//   id: serial("id").primaryKey(),
//   guardiansLastName: varchar('guardiansLastName', { length:100 }).notNull(),
//   guardiansFirstName: varchar('guardiansFirstName',{ length: 100 }).notNull(),
//   guardiansMiddleName: varchar('guardiansMiddleName', { length:100 }).notNull(),
//   guardiansSuffix: varchar('guardiansSuffix', { length:100 }),
//   fullAddress: varchar('fullAddress', { length:250 }).notNull(),
//   mobileNumber: varchar('mobileNumber', { length:12 }).notNull(),
//   email: varchar('email', { length:100 }).notNull(),
// })



// // enrolless table below
// export const educationalBackgroundTable = pgTable("educationalBackgroundTable" , {
//   id: serial("id").primaryKey(),
//   admissionStatus: varchar('admissionStatus', { length:100 }),
//   prevSchool: varchar('prevSchool', { length:250 }).notNull(),
//   schoolAddress: varchar('schoolAddress', { length:250 }).notNull(),
//   schoolType: varchar('schoolType', { length:100 }).notNull(),
//   gradeLevel: varchar('gradeLevel', { length:100 }).notNull(),
//   schoolYear: varchar('schoolYear').notNull(),
// })

// export const documentsTable = pgTable("documentsTable", {
//   id: serial('id').primaryKey(),
//   birthCert: varchar('birthCert', { length:300 }).notNull(),
//   reportCard: varchar('reportCard', { length:300 }).notNull(),
//   goodMoral: varchar('goodMoral', { length:300 }).notNull(),
//   idPic: varchar('idPic', { length:300 }).notNull(),
//   studentExitForm: varchar('studentExitForm', { length:300 }),
// })

// export const paymentReceiptTable = pgTable("paymentReceiptTable" ,{
//   id: serial('id').primaryKey(),
//   mop: varchar('mop', { length:100 }).notNull(),
//   receipt: varchar ('receipt', { length:300 }).notNull(),
// })

// export const applicationStatusTable = pgTable("applicationStatusTable", {
//   id: serial('id').primaryKey(),
//   trackingId: varchar('trackingId', { length:100 }).notNull(),
//   applicationStatus: varchar('applicationStatus', { length:100 }).notNull(),
//   reservationPaymentStatus: varchar('reservationStatus', { length:100 }).notNull(),
//   dateOfApplication: date('dateOfApplication').notNull(),
// })


// export const reservationStatusTable = pgTable("reservedSlotTable", {
//   id: serial('id').primaryKey(),
//   admissionStatus: varchar('admissionStatus', { length:100 }).notNull(),
//   soaStatus: boolean('soaStatus').default(false).notNull(),
// })

// export const initialPaymentTable = pgTable("initialPaymentTable", {
//   id: serial('id').primaryKey(),
//   mop: varchar('mop', { length:100 }).notNull(),
//   paymentType: varchar('paymentType', { length:100 }).notNull(),
//   paymentAmount: integer('paymentAmount').notNull(),
// })

// export const tuitionFeeTable = pgTable("tuitionFeeTable", {
//   id: serial('id').primaryKey(),
//   tuitionFee: integer('tuitionFee').notNull(),
//   soa: varchar('soa', { length:100 }).notNull(),
//   siNumber: varchar('siNumber', { length:100 }).notNull(),
// })


// //relation
// export const studentsInformationRelations = relations(studentsInformationTable, ({ one }) => ({
//   guardian: one(guardianAndParentsTable, {
//     fields: [studentsInformationTable.id],
//     references: [guardianAndParentsTable.id],
//   }),
//   education: one(educationalBackgroundTable, {
//     fields: [studentsInformationTable.id],
//     references: [educationalBackgroundTable.id],
//   }),
//   documents: one(documentsTable, {
//     fields: [studentsInformationTable.id],
//     references: [documentsTable.id],
//   }),
//   payment: one(paymentReceiptTable, {
//     fields: [studentsInformationTable.id],
//     references: [paymentReceiptTable.id],
//   }),
//   status: one(applicationStatusTable, {
//     fields: [studentsInformationTable.id],
//     references: [applicationStatusTable.id],
//   }),
//   reservation: one(reservationStatusTable, {
//     fields: [studentsInformationTable.id],
//     references: [reservationStatusTable.id],
//   }),
//   initialPayment: one(initialPaymentTable, {
//     fields: [studentsInformationTable.id],
//     references: [initialPaymentTable.id],
//   }),
//   tuition: one(tuitionFeeTable, {
//     fields: [studentsInformationTable.id],
//     references: [tuitionFeeTable.id],
//   })

// }));


