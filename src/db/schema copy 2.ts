
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar, date } from "drizzle-orm/pg-core";

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
  applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull().unique(),
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
  applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull().unique(),
  gradeLevel: varchar('gradeLevel', { length:100 }).notNull(),
  schoolYear: varchar('schoolYear', { length: 100 }).notNull(),
  schoolType: varchar('schoolType', { length:100 }).notNull(),
  prevSchool: varchar('prevSchool', { length:250 }).notNull(),
  schoolAddress: varchar('schoolAddress', { length:250 }).notNull(),

})

export const documentsTable = pgTable("documentsTable", {
  document_id: serial('document_id').primaryKey(),
  applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull().unique(),
  birthCert: varchar('birthCert', { length:300 }),
  reportCard: varchar('reportCard', { length:300 }),
  goodMoral: varchar('goodMoral', { length:300 }),
  idPic: varchar('idPic', { length:300 }),
  studentExitForm: varchar('studentExitForm', { length:300 }),
})

export const reservationFeeTable = pgTable("reservationFeeTable" ,{
  reservation_id: serial('reservation_id').primaryKey(),
  applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull().unique(),
  mop: varchar('mop', { length:100 }),
  reservationReceipt: varchar ('reservationReceipt', { length:300 }),
})

export const applicationStatusTable = pgTable("applicationStatusTable", {
  application_status_id: serial('application_status_id').primaryKey(),
  applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull().unique(),
  trackingId: varchar('trackingId', { length:100 }).notNull(),
  applicationStatus: varchar('applicationStatus', { length:100 }).notNull(),
  reservationPaymentStatus: varchar('reservationStatus', { length:100 }).notNull(),
  dateOfApplication: date('dateOfApplication').notNull(),
})

export const downPaymentTable = pgTable("downPaymentTable", {
  donw_id: serial('id').primaryKey(),
  applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull().unique(),
  amount: integer('amount').notNull(),
  SINumberDP: varchar('SINumberDp', { length:300 }).notNull(),
  remarksDP: varchar('remarksDP', { length:100 }).notNull(),
})


export const MonthsInSoaTable = pgTable("MonthsInSoaTable", {
  month_id: serial('id').primaryKey(),
  downPaymentId: integer('downPayment_id').references(() => downPaymentTable.donw_id).notNull(),
  applicants_id: integer('applicants_id').references(() => applicantsInformationTable.applicants_id).notNull(),
  month: varchar('month', { length:100 }).notNull(),
  dateOfPayment: date('dateOfPayment'),
  amount: integer('amount').notNull(),
  remarks: varchar('remarks', { length:100 }),
  SInumber: varchar('SInumber', { length:300 }),

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
  downPayment: one(downPaymentTable, {
    fields: [applicantsInformationTable.applicants_id],
    references: [downPaymentTable.applicants_id],
  }),
  monthsInSoa: many(MonthsInSoaTable)

}));


export const SOARelations = relations(downPaymentTable, ({ many }) => ({
  soa: many(MonthsInSoaTable)
}));

