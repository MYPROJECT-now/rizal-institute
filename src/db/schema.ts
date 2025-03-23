
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar, date } from "drizzle-orm/pg-core";

export const studentsInformationTable = pgTable("studentsInformationTable", {
  id: serial("id").primaryKey(),
  lrn: varchar('lrn', { length:12 }).notNull().unique(),
  studentsLastName: varchar('studentsLastName', { length:100 }).notNull(),
  studentsFirstName: varchar('studentsFirstName',{ length: 100 }).notNull(),
  studentsMiddleName: varchar('studentsMiddleName', { length:100 }).notNull(),
  studentsSuffix: varchar('studentsSuffix', { length:100 }),
  dateOfBirth: date('dateOfBirth' ).notNull(),
  age: integer('age').notNull(),
  gender: varchar('gender').notNull(),
  civilStatus: varchar('civilStatus', { length:100 }).notNull(),
  nationality: varchar('nationality', { length:100 }).notNull(),
  religion: varchar ('religion', { length:100 }).notNull(),
});

export const guardianAndParentsTable = pgTable("guardianAndParentsTable", {
  id: serial("id").primaryKey(),
  guardiansLastName: varchar('guardiansLastName', { length:100 }).notNull(),
  guardiansFirstName: varchar('guardiansFirstName',{ length: 100 }).notNull(),
  guardiansMiddleName: varchar('guardiansMiddleName', { length:100 }).notNull(),
  guardiansSuffix: varchar('guardiansSuffix', { length:100 }),
  fullAddress: varchar('fullAddress', { length:250 }).notNull(),
  mobileNumber: varchar('mobileNumber', { length:12 }).notNull(),
  email: varchar('email', { length:100 }).notNull(),
})

export const educationalBackgroundTable = pgTable("educationalBackgroundTable" , {
  id: serial("id").primaryKey(),
  admissionStatus: varchar('admissionStatus', { length:100 }),
  prevSchool: varchar('prevSchool', { length:250 }).notNull(),
  schoolAddress: varchar('schoolAddress', { length:250 }).notNull(),
  schoolType: varchar('schoolType', { length:100 }).notNull(),
  gradeLevel: varchar('gradeLevel', { length:100 }).notNull(),
  schoolYear: varchar('schoolYear').notNull(),
})

export const documentsTable = pgTable("documentsTable", {
  id: serial('id').primaryKey(),
  birthCert: varchar('birthCert', { length:300 }).notNull(),
  reportCard: varchar('reportCard', { length:300 }).notNull(),
  goodMoral: varchar('goodMoral', { length:300 }).notNull(),
  idPic: varchar('idPic', { length:300 }).notNull(),
  studentExitForm: varchar('studentExitForm', { length:300 }),
})

export const paymentReceiptTable = pgTable("paymentReceiptTable" ,{
  id: serial('id').primaryKey(),
  mop: varchar('mop', { length:100 }).notNull(),
  receipt: varchar ('receipt', { length:300 }).notNull(),
})

export const applicationStatusTable = pgTable("applicationStatusTable", {
  id: serial('id').primaryKey(),
  trackingId: varchar('trackingId', { length:100 }).notNull(),
  applicationStatus: varchar('applicationStatus', { length:100 }).notNull(),
})


//relation
export const studentsInformationRelations = relations(studentsInformationTable, ({ one }) => ({
  guardian: one(guardianAndParentsTable, {
    fields: [studentsInformationTable.id],
    references: [guardianAndParentsTable.id],
  }),
  education: one(educationalBackgroundTable, {
    fields: [studentsInformationTable.id],
    references: [educationalBackgroundTable.id],
  }),
  documents: one(documentsTable, {
    fields: [studentsInformationTable.id],
    references: [documentsTable.id],
  }),
  payment: one(paymentReceiptTable, {
    fields: [studentsInformationTable.id],
    references: [paymentReceiptTable.id],
  }),
  status: one(applicationStatusTable, {
    fields: [studentsInformationTable.id],
    references: [applicationStatusTable.id],
  }),
}));


//relations
// export const clerkUserRelations = relations(clerkUserTable, ({ one }) => ({
//   pwd: one(pwdTable, {
//     fields: [clerkUserTable.pwdNo],
//     references: [pwdTable.pwdNo],
//   }),
// }));