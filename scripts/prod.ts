// // scripts/insertMockApplicants.ts
// import "dotenv/config";
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// import { applicantsInformationTable, guardianAndParentsTable, educationalBackgroundTable, documentsTable, reservationFeeTable, additionalInformationTable, applicationStatusTable, AdmissionStatusTable, studentTypeTable } from "../src/db/schema";

// const sqlClient = neon(process.env.DATABASE_URL!);
// const db = drizzle(sqlClient);

// const generateRandomTrackingId = () => Math.random().toString(36).substring(2, 12).toUpperCase();

// const insertMockApplicants = async () => {
//   const academicYearID = 1; // Replace with actual AcademicYearTable ID

//   const mockApplicants = [
//     // Grade 7 (5)
//     {
//       applicantsLastName: "Dela Cruz", applicantsFirstName: "Juan", applicantsMiddleName: "Reyes", applicantsSuffix: "",
//       dateOfBirth: new Date("2011-05-14"), age: 14, gender: "Male", mobileNumber: "091712345678", email: "juan1@example.com", lrn: "123456789012",
//       guardiansLastName: "Dela Cruz", guardiansFirstName: "Maria", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876543", emergencyEmail: "maria.guardian1@example.com", fullAddress: "123 Main St, Calamba",
//       gradeLevel: "7", studentType: "Incoming G7", schoolYear: "2024-2025", schoolType: "Public", prevSchool: "Calamba Elementary", schoolAddress: "Calamba",
//       birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
//       reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
//       goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//       mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//       attainmentUponGraduation: "With Honor", hasEnrolledSibling: "Yes", siblingName: "Ana Dela Cruz"
//     },
//     {
//       applicantsLastName: "Lopez", applicantsFirstName: "Ella", applicantsMiddleName: "Santos", applicantsSuffix: "",
//       dateOfBirth: new Date("2011-07-02"), age: 14, gender: "Female", mobileNumber: "091712345679", email: "ella1@example.com", lrn: "123456789013",
//       guardiansLastName: "Lopez", guardiansFirstName: "Pedro", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876544", emergencyEmail: "pedro.guardian1@example.com", fullAddress: "456 Main St, Calamba",
//       gradeLevel: "7", studentType: "Incoming G7", schoolYear: "2024-2025", schoolType: "Private", prevSchool: "Holy Child School", schoolAddress: "Calamba",
//       birthCert: "", hasBirth: true,
//       reportCard: "", hasReportCard: true,
//       goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//       mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//       attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
//     },
//     {
//       applicantsLastName: "Garcia", applicantsFirstName: "Leo", applicantsMiddleName: "Torres", applicantsSuffix: "",
//       dateOfBirth: new Date("2011-09-11"), age: 14, gender: "Male", mobileNumber: "091712345680", email: "leo1@example.com", lrn: "123456789014",
//       guardiansLastName: "Garcia", guardiansFirstName: "Ana", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876545", emergencyEmail: "ana.guardian1@example.com", fullAddress: "789 Main St, Calamba",
//       gradeLevel: "7", studentType: "Incoming G7", schoolYear: "2024-2025", schoolType: "Public", prevSchool: "Calamba Elementary", schoolAddress: "Calamba",
//       birthCert: "", hasBirth: true,
//       reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
//       goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//       mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//       attainmentUponGraduation: "With High Honor", hasEnrolledSibling: "Yes", siblingName: "Mia Garcia"
//     },
//     {
//       applicantsLastName: "Reyes", applicantsFirstName: "Kim", applicantsMiddleName: "Salazar", applicantsSuffix: "",
//       dateOfBirth: new Date("2011-12-22"), age: 13, gender: "Female", mobileNumber: "091712345681", email: "kim1@example.com", lrn: "123456789015",
//       guardiansLastName: "Reyes", guardiansFirstName: "Jose", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876546", emergencyEmail: "jose.guardian1@example.com", fullAddress: "321 Main St, Calamba",
//       gradeLevel: "7", studentType: "Incoming G7", schoolYear: "2024-2025", schoolType: "Private", prevSchool: "St. Mary School", schoolAddress: "Calamba",
//       birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
//       reportCard: "", hasReportCard: true,
//       goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//       mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//       attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
//     },
//     {
//       applicantsLastName: "Torres", applicantsFirstName: "Ian", applicantsMiddleName: "De Guzman", applicantsSuffix: "",
//       dateOfBirth: new Date("2011-03-30"), age: 14, gender: "Male", mobileNumber: "091712345682", email: "ian1@example.com", lrn: "123456789016",
//       guardiansLastName: "Torres", guardiansFirstName: "Liza", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876547", emergencyEmail: "liza.guardian1@example.com", fullAddress: "654 Main St, Calamba",
//       gradeLevel: "7", studentType: "Incoming G7", schoolYear: "2024-2025", schoolType: "Public", prevSchool: "Calamba Elementary", schoolAddress: "Calamba",
//       birthCert: "", hasBirth: true,
//       reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
//       goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//       mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//       attainmentUponGraduation: "With Highest Honor", hasEnrolledSibling: "No", siblingName: ""
//     },
//     // Grade 8 (5)
//     {
//       applicantsLastName: "Santos", applicantsFirstName: "Mark", applicantsMiddleName: "Cruz", applicantsSuffix: "",
//       dateOfBirth: new Date("2010-06-15"), age: 15, gender: "Male", mobileNumber: "091712345683", email: "mark1@example.com", lrn: "123456789017",
//       guardiansLastName: "Santos", guardiansFirstName: "Rosa", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876548", emergencyEmail: "rosa.guardian1@example.com", fullAddress: "987 Main St, Calamba",
//       gradeLevel: "8", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Private", prevSchool: "Holy Child School", schoolAddress: "Calamba",
//       birthCert: "", hasBirth: true,
//       reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
//       goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//       mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//       attainmentUponGraduation: "With Honor", hasEnrolledSibling: "Yes", siblingName: "Anna Santos"
//     },
//     {
//       applicantsLastName: "Mendoza", applicantsFirstName: "Lara", applicantsMiddleName: "Perez", applicantsSuffix: "",
//       dateOfBirth: new Date("2010-08-20"), age: 15, gender: "Female", mobileNumber: "091712345684", email: "lara1@example.com", lrn: "123456789018",
//       guardiansLastName: "Mendoza", guardiansFirstName: "Carlos", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876549", emergencyEmail: "carlos.guardian1@example.com", fullAddress: "321 Main St, Calamba",
//       gradeLevel: "8", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Public", prevSchool: "Calamba Elementary", schoolAddress: "Calamba",
//       birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
//       reportCard: "", hasReportCard: true,
//       goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//       mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//       attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
//     },
//     {
//     applicantsLastName: "Ramos", applicantsFirstName: "Kian", applicantsMiddleName: "Flores", applicantsSuffix: "",
//     dateOfBirth: new Date("2010-09-12"), age: 15, gender: "Male", mobileNumber: "091712345689", email: "kian1@example.com", lrn: "123456789023",
//     guardiansLastName: "Ramos", guardiansFirstName: "Ella", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876554", emergencyEmail: "ella.guardian1@example.com", fullAddress: "123 Purok 2, Calamba",
//     gradeLevel: "8", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Private", prevSchool: "St. John Academy", schoolAddress: "Calamba",
//     birthCert: "", hasBirth: true,
//     reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
//     goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true,
//     mop: "Bank Transfer", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//     attainmentUponGraduation: "With High Honor", hasEnrolledSibling: "No", siblingName: ""
//   },
//   {
//     applicantsLastName: "Balagtas", applicantsFirstName: "Ellaine", applicantsMiddleName: "Santos", applicantsSuffix: "",
//     dateOfBirth: new Date("2010-03-09"), age: 15, gender: "Female", mobileNumber: "091712345690", email: "ellaine1@example.com", lrn: "123456789024",
//     guardiansLastName: "Balagtas", guardiansFirstName: "Lina", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876555", emergencyEmail: "lina.guardian1@example.com", fullAddress: "456 Rizal St, Calamba",
//     gradeLevel: "8", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Public", prevSchool: "Calamba Elementary", schoolAddress: "Calamba",
//     hasBirth: true, birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/sample.jpg",
//     hasReportCard: true, reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759929394/samplecard.webp",
//     goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true,
//     mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//     attainmentUponGraduation: "With Honor", hasEnrolledSibling: "Yes", siblingName: "Marco Balagtas"
//   },
//   {
//     applicantsLastName: "Domingo", applicantsFirstName: "Faith", applicantsMiddleName: "Lopez", applicantsSuffix: "",
//     dateOfBirth: new Date("2010-11-25"), age: 15, gender: "Female", mobileNumber: "091712345691", email: "faith1@example.com", lrn: "123456789025",
//     guardiansLastName: "Domingo", guardiansFirstName: "Ryan", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876556", emergencyEmail: "ryan.guardian1@example.com", fullAddress: "789 Calamba Blvd",
//     gradeLevel: "8", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Private", prevSchool: "Faith Christian School", schoolAddress: "Calamba",
//     birthCert: "", hasBirth: true,
//     reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
//     goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true,
//     mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//     attainmentUponGraduation: "With Highest Honor", hasEnrolledSibling: "No", siblingName: ""
//    },
//     // Grade 9 (5)
//     {
//       applicantsLastName: "Cruz", applicantsFirstName: "Ben", applicantsMiddleName: "Garcia", applicantsSuffix: "",
//       dateOfBirth: new Date("2009-02-14"), age: 16, gender: "Male", mobileNumber: "091712345685", email: "ben1@example.com", lrn: "123456789019",
//       guardiansLastName: "Cruz", guardiansFirstName: "Linda", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876550", emergencyEmail: "linda.guardian1@example.com", fullAddress: "123 Elm St, Calamba",
//       gradeLevel: "9", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Private", prevSchool: "Holy Child School", schoolAddress: "Calamba",
//       birthCert: "", hasBirth: true,
//       reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
//       goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//       mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//       attainmentUponGraduation: "With Honor", hasEnrolledSibling: "Yes", siblingName: "Ella Cruz"
//     },
//     {
//       applicantsLastName: "Navarro", applicantsFirstName: "Mia", applicantsMiddleName: "Lopez", applicantsSuffix: "",
//       dateOfBirth: new Date("2009-05-30"), age: 16, gender: "Female", mobileNumber: "091712345686", email: "mia1@example.com", lrn: "123456789020",
//       guardiansLastName: "Navarro", guardiansFirstName: "Rafael", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876551", emergencyEmail: "rafael.guardian1@example.com", fullAddress: "456 Elm St, Calamba",
//       gradeLevel: "9", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Public", prevSchool: "Calamba Elementary", schoolAddress: "Calamba",
//       birthCert: "", hasBirth: true,
//       reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
//       goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//       mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//       attainmentUponGraduation: "With High Honor", hasEnrolledSibling: "No", siblingName: ""
//     },
//     {
//     applicantsLastName: "Francisco", applicantsFirstName: "Dylan", applicantsMiddleName: "Reyes", applicantsSuffix: "",
//     dateOfBirth: new Date("2009-04-05"), age: 16, gender: "Male", mobileNumber: "091712345692", email: "dylan1@example.com", lrn: "123456789026",
//     guardiansLastName: "Francisco", guardiansFirstName: "Tina", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876557", emergencyEmail: "tina.guardian1@example.com", fullAddress: "999 Elm St, Calamba",
//     gradeLevel: "9", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Private", prevSchool: "St. John Academy", schoolAddress: "Calamba",
//     birthCert: "", hasBirth: true, reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
//     goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//     mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//     attainmentUponGraduation: "With Honor", hasEnrolledSibling: "Yes", siblingName: "Ella Francisco"
//   },
//   {
//     applicantsLastName: "Gomez", applicantsFirstName: "Trisha", applicantsMiddleName: "Cruz", applicantsSuffix: "",
//     dateOfBirth: new Date("2009-09-10"), age: 16, gender: "Female", mobileNumber: "091712345693", email: "trisha1@example.com", lrn: "123456789027",
//     guardiansLastName: "Gomez", guardiansFirstName: "Carla", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876558", emergencyEmail: "carla.guardian1@example.com", fullAddress: "654 Elm St, Calamba",
//     gradeLevel: "9", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Public", prevSchool: "Calamba Elementary", schoolAddress: "Calamba",
//     birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/sample6.jpg", hasBirth: true,
//     reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,  goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//     mop: "Bank Transfer", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//     attainmentUponGraduation: "With Highest Honor", hasEnrolledSibling: "No", siblingName: ""
//   },
//   {
//     applicantsLastName: "Tan", applicantsFirstName: "Noah", applicantsMiddleName: "Garcia", applicantsSuffix: "",
//     dateOfBirth: new Date("2009-07-18"), age: 16, gender: "Male", mobileNumber: "091712345694", email: "noah1@example.com", lrn: "123456789028",
//     guardiansLastName: "Tan", guardiansFirstName: "Rico", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876559", emergencyEmail: "rico.guardian1@example.com", fullAddress: "222 Pine St, Calamba",
//     gradeLevel: "9", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Private", prevSchool: "Faith Christian School", schoolAddress: "Calamba",
//     birthCert: "", hasBirth: true,
//     reportCard: "", hasReportCard: true,
//     goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//     mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//     attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
//   },

//     // Grade 10 (5)
//     {
//       applicantsLastName: "Villanueva", applicantsFirstName: "Jake", applicantsMiddleName: "Torres", applicantsSuffix: "",
//       dateOfBirth: new Date("2008-11-05"), age: 17, gender: "Male", mobileNumber: "091712345687", email: "jake1@example.com", lrn: "123456789021",
//       guardiansLastName: "Villanueva", guardiansFirstName: "Cecilia", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876552", emergencyEmail: "cecilia.guardian1@example.com", fullAddress: "789 Elm St, Calamba",
//       gradeLevel: "10", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Private", prevSchool: "Holy Child School", schoolAddress: "Calamba",
//       birthCert: "", hasBirth: true,
//       reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
//       goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//       mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//       attainmentUponGraduation: "With Honor", hasEnrolledSibling: "Yes", siblingName: "Leo Villanueva"
//     },
//     {
//       applicantsLastName: "Serrano", applicantsFirstName: "Lia", applicantsMiddleName: "Reyes", applicantsSuffix: "",
//       dateOfBirth: new Date("2008-01-19"), age: 17, gender: "Female", mobileNumber: "091712345688", email: "lia1@example.com", lrn: "123456789022",
//       guardiansLastName: "Serrano", guardiansFirstName: "Miguel", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876553", emergencyEmail: "miguel.guardian1@example.com", fullAddress: "321 Elm St, Calamba",
//       gradeLevel: "10", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Public", prevSchool: "Calamba Elementary", schoolAddress: "Calamba",
//       birthCert: "", hasBirth: true,
//       reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
//       goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//       mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//       attainmentUponGraduation: "With High Honor", hasEnrolledSibling: "No", siblingName: ""
//     },
//     {
//     applicantsLastName: "Castro", applicantsFirstName: "Renz", applicantsMiddleName: "Lopez", applicantsSuffix: "",
//     dateOfBirth: new Date("2008-04-10"), age: 17, gender: "Male", mobileNumber: "091712345695", email: "renz1@example.com", lrn: "123456789029",
//     guardiansLastName: "Castro", guardiansFirstName: "Diana", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876560", emergencyEmail: "diana.guardian1@example.com", fullAddress: "987 Pine St, Calamba",
//     gradeLevel: "10", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Private", prevSchool: "Faith Christian School", schoolAddress: "Calamba",
//     birthCert: "", hasBirth: true,
//     reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
//     goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//     mop: "Bank Transfer", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//     attainmentUponGraduation: "With Honor", hasEnrolledSibling: "Yes", siblingName: "Kai Castro"
//   },
//   {
//     applicantsLastName: "Marquez", applicantsFirstName: "Ivy", applicantsMiddleName: "Santos", applicantsSuffix: "",
//     dateOfBirth: new Date("2008-07-25"), age: 17, gender: "Female", mobileNumber: "091712345696", email: "ivy1@example.com", lrn: "123456789030",
//     guardiansLastName: "Marquez", guardiansFirstName: "Paul", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876561", emergencyEmail: "paul.guardian1@example.com", fullAddress: "765 Rizal St, Calamba",
//     gradeLevel: "10", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Public", prevSchool: "Calamba Elementary", schoolAddress: "Calamba",
//     hasBirth: true, birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/sample11.jpg",
//     reportCard: "", hasReportCard: true,
//     goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//     mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//     attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
//   },
//   {
//     applicantsLastName: "Dizon", applicantsFirstName: "Karl", applicantsMiddleName: "Garcia", applicantsSuffix: "",
//     dateOfBirth: new Date("2008-05-17"), age: 17, gender: "Male", mobileNumber: "091712345697", email: "karl1@example.com", lrn: "123456789031",
//     guardiansLastName: "Dizon", guardiansFirstName: "Rowena", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876562", emergencyEmail: "rowena.guardian1@example.com", fullAddress: "111 Mabini St, Calamba",
//     gradeLevel: "10", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Private", prevSchool: "St. John Academy", schoolAddress: "Calamba",
//     birthCert: "", hasBirth: true,
//     reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
//     goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
//     mop: "Cash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
//     attainmentUponGraduation: "With Highest Honor", hasEnrolledSibling: "No", siblingName: ""
//   }
//   ];

//   for (const applicant of mockApplicants) {
//     // Insert into applicantsInformationTable
//     const result = await db.insert(applicantsInformationTable).values({
//       applicantsLastName: applicant.applicantsLastName,
//       applicantsFirstName: applicant.applicantsFirstName,
//       applicantsMiddleName: applicant.applicantsMiddleName,
//       applicantsSuffix: applicant.applicantsSuffix || null,
//       dateOfBirth: applicant.dateOfBirth.toISOString().split("T")[0],
//       age: applicant.age,
//       gender: applicant.gender,
//       mobileNumber: applicant.mobileNumber,
//       email: applicant.email,
//       lrn: applicant.lrn
//     }).returning();

//     const applicantID = result[0].applicants_id;

//     // Insert into related tables
//     await db.insert(guardianAndParentsTable).values({
//       applicants_id: applicantID,
//       guardiansLastName: applicant.guardiansLastName,
//       guardiansFirstName: applicant.guardiansFirstName,
//       guardiansMiddleName: applicant.guardiansMiddleName || null,
//       guardiansSuffix: applicant.guardiansSuffix || null,
//       emergencyContact: applicant.emergencyContact,
//       emergencyEmail: applicant.emergencyEmail,
//       fullAddress: applicant.fullAddress
//     });

//     await db.insert(educationalBackgroundTable).values({
//       applicants_id: applicantID,
//       gradeLevel: applicant.gradeLevel,
//       studentType: applicant.studentType,
//       schoolYear: applicant.schoolYear,
//       schoolType: applicant.schoolType,
//       prevSchool: applicant.prevSchool,
//       schoolAddress: applicant.schoolAddress
//     });

//     await db.insert(documentsTable).values({
//       applicants_id: applicantID,
//       birthCert: applicant.birthCert || null,
//       hasBirth: applicant.hasBirth || true,
//       reportCard: applicant.reportCard || null,
//       hasReportCard: applicant.hasReportCard || true,
//       goodMoral: applicant.goodMoral || null,
//       hasGoodMoral: applicant.hasGoodMoral || true,
//       idPic: applicant.idPic || null,
//       hasIdPic: applicant.hasIdPic || true,
//       studentExitForm: applicant.studentExitForm || null,
//       hasExitForm: applicant.hasExitForm || true,
//       form137: applicant.form137 || null,
//       hasForm137: applicant.hasForm137 || true,
//       itr: applicant.itr || null,
//       hasTIR: applicant.hasTIR || true,
//       escCert: applicant.escCert || null,
//       hasEscCertificate: applicant.hasEscCertificate || true
//     });

//     await db.insert(reservationFeeTable).values({
//       applicants_id: applicantID,
//       mop: applicant.mop,
//       reservationReceipt: applicant.reservationReceipt,
//       reservationAmount: applicant.reservationAmount,    
//       academicYear_id: academicYearID,
//       dateOfPayment: new Date().toISOString().slice(0, 10),

//     });

//     await db.insert(additionalInformationTable).values({
//       applicants_id: applicantID,
//       AttainmentUponGraduation: applicant.attainmentUponGraduation,
//       HasEnrolledSibling: applicant.hasEnrolledSibling,
//       siblingName: applicant.siblingName
//     });

//     await db.insert(applicationStatusTable).values({
//       applicants_id: applicantID,
//       trackingId: generateRandomTrackingId(),
//       academicYear_id: academicYearID,
//       applicationFormReviewStatus: 'Pending',
//       reservationPaymentStatus: 'Pending',
//       dateOfApplication: new Date().toISOString().slice(0, 10),
//     });

//     await db.insert(AdmissionStatusTable).values({
//       applicants_id: applicantID,
//       academicYear_id: academicYearID,
//       admissionStatus: "Pending",
//       confirmationStatus: 'Pending',
//       dateOfAdmission: new Date().toISOString().slice(0, 10),
//     });

//     await db.insert(studentTypeTable).values({
//       applicants_id: applicantID,
//       studentType: applicant.studentType,
//       academicYear_id: academicYearID,
//       gradeToEnroll: applicant.gradeLevel,
//       student_case: 'REGULAR'
//     });
//   }

//   console.log("20 mock applicants inserted successfully!");
// };

// insertMockApplicants();
