
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const studentsInformationTable = pgTable("studentsInformationTable", {
  lrn: integer('integer').primaryKey().unique(),
  lastName: varchar('lastName', { length:100 }).notNull(),
  firstName: varchar('firstName',{ length: 100 }).notNull(),
  middleName: varchar('middleName', { length:100 }).notNull(),
  suffix: varchar('suffix', { length:100 }),
  dateOfBirth: integer('dateOfBirth').notNull(),
  age: integer('age').notNull(),
  gender: varchar('gender').notNull(),
  civilStatus: varchar('civilStatus', { length:100 }).notNull(),
  religion: varchar ('religion', { length:100 }).notNull(),
});

export const guardianAndParentsTable = pgTable("guardianAndParentsTable", {
  id: serial("id").primaryKey(),
  lastName: varchar('lastName', { length:100 }).notNull(),
  firstName: varchar('firstName',{ length: 100 }).notNull(),
  middleName: varchar('middleName', { length:100 }).notNull(),
  suffix: varchar('suffix', { length:100 }),
  fullAddress: varchar('fullAddress', { length:250 }).notNull(),
  mobileNumber: integer('mobileNumber').notNull(),
  email: varchar('email', { length:100 }).notNull(),
})

export const educationalBackground = pgTable("educationalBackground" , {
  id: serial("id").primaryKey(),
  admissionStatus: varchar('admissionStatus', { length:100 }),
  prevSchool: varchar('prevSchool', { length:250 }).notNull(),
  schoolAddress: varchar('schoolAddress', { length:250 }).notNull(),
  schoolType: varchar('schoolType', { length:100 }).notNull(),
  gradeLevel: varchar('gradeLevel', { length:100 }).notNull(),
  schoolYear: integer('schoolYear').notNull(),
})

export const documents = pgTable("documents", {
  id: serial('id').primaryKey(),
  birthCert: varchar('birthCert', { length:300 }).notNull(),
  reportCard: varchar('reportCard', { length:300 }).notNull(),
  goodMoral: varchar('goodMoral', { length:300 }).notNull(),
  idPic: varchar('idPic', { length:300 }).notNull(),
  studentExitForm: varchar('studentExitForm', { length:300 }),
})

export const paymentReceipt = pgTable("paymentReceipt" ,{
  id: serial('id').primaryKey(),
  mop: varchar('mop', { length:100 }).notNull(),
  receipt: varchar ('receipt', { length:300 }).notNull(),
})


//relation
export const studentsInformationRelations = relations(studentsInformationTable, ({ one }) => ({
  guardian: one(guardianAndParentsTable, {
    fields: [studentsInformationTable.lrn],
    references: [guardianAndParentsTable.id],
  }),
  education: one(educationalBackground, {
    fields: [studentsInformationTable.lrn],
    references: [educationalBackground.id],
  }),
  documents: one(documents, {
    fields: [studentsInformationTable.lrn],
    references: [documents.id],
  }),
  payment: one(paymentReceipt, {
    fields: [studentsInformationTable.lrn],
    references: [paymentReceipt.id],
  }),
}));


//relations
// export const clerkUserRelations = relations(clerkUserTable, ({ one }) => ({
//   pwd: one(pwdTable, {
//     fields: [clerkUserTable.pwdNo],
//     references: [pwdTable.pwdNo],
//   }),
// }));