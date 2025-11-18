// scripts/insertMockApplicants.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { applicantsInformationTable, guardianAndParentsTable, educationalBackgroundTable, documentsTable, reservationFeeTable, additionalInformationTable, applicationStatusTable, AdmissionStatusTable, studentTypeTable } from "../src/db/schema";
import { eq } from "drizzle-orm";

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient);

const generateRandomTrackingId = () => Math.random().toString(36).substring(2, 12).toUpperCase();

const insertMockApplicants = async () => {
  const academicYearID = 2; // Replace with actual AcademicYearTable ID

  const mockApplicants = [
    // Grade 7 (3)
    {
      applicantsLastName: "Bautista", applicantsFirstName: "Jose", applicantsMiddleName: "Pilar", applicantsSuffix: "Jr.",
      dateOfBirth: new Date("2010-06-2"), age:15, gender: "Male", mobileNumber: "09119874321", email: "jose1@example.com", lrn: "403371150011",
      guardiansLastName: "Bautista", guardiansFirstName: "Juan", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "0911874322", emergencyEmail: "juan.guardian1@example.com", fullAddress: "Acacia 1, Calamba",
    religion: "Catholic", ip: "", house_no_purok: "John 91" ,barangay: "Lawa", city: "Calamba", province: "Laguna", motherTounge: "Tagalog",
      relationship: "Mother", gradeLevel: "7", studentType: "Incoming G7", schoolYear: "2023-2024", schoolType: "Private", prevSchool: "Sta. Cecilia", schoolAddress: "Canlubang",
      birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
      reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
      goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
    },
    {
      applicantsLastName: "Clara", applicantsFirstName: "Maria", applicantsMiddleName: "", applicantsSuffix: "",
      dateOfBirth: new Date("2011-01-02"), age: 14, gender: "Female", mobileNumber: "091712345679", email: "clara1@example.com", lrn: "403371150021",
        religion: "Catholic", ip: "", house_no_purok: "John 91" ,barangay: "Lawa", city: "Calamba", province: "Laguna", motherTounge: "Tagalog",
      relationship: "Mother", guardiansLastName: "Ibarra", guardiansFirstName: "Simon", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "0911874321", emergencyEmail: "ibarra.guardian1@example.com", fullAddress: "Narra 2, Calamba",
      gradeLevel: "7", studentType: "Incoming G7", schoolYear: "2023-2024", schoolType: "Private", prevSchool: "Holy Child School", schoolAddress: "Calamba",
      birthCert: "", hasBirth: true,
      reportCard: "", hasReportCard: true,
      goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
    },
   {
      applicantsLastName: "Rivera", applicantsFirstName: "Angelo", applicantsMiddleName: "Torres", applicantsSuffix: "",
      dateOfBirth: new Date("2010-09-15"), age: 14, gender: "Male", mobileNumber: "09181234001", email: "angelo1@example.com", lrn: "403371150031",
      guardiansLastName: "Rivera", guardiansFirstName: "Mario", guardiansMiddleName: "Delos Santos", guardiansSuffix: "", emergencyContact: "09181234011", emergencyEmail: "mario.rivera@example.com", fullAddress: "Blk 5 Lot 12 Banlic, Calamba",
        religion: "Catholic", ip: "", house_no_purok: "John 91" ,barangay: "Lawa", city: "Calamba", province: "Laguna", motherTounge: "Tagalog",
      relationship: "Mother", gradeLevel: "7", studentType: "Incoming G7", schoolYear: "2023-2024", schoolType: "Private", prevSchool: "St. Therese Academy", schoolAddress: "Calamba",
      birthCert: "", hasBirth: true,
      reportCard: "", hasReportCard: true,
      goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true,
      itr: "", hasTIR: true, escCert: "", hasEscCertificate: true, mop: "GCash",
      reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      attainmentUponGraduation: "N/a", hasEnrolledSibling: "Yes", siblingName: "Lara Rivera"
    },
    {
      applicantsLastName: "Cruz", applicantsFirstName: "Miguel", applicantsMiddleName: "Santos", applicantsSuffix: "",
      dateOfBirth: new Date("2010-09-15"), age: 14, gender: "Male", mobileNumber: "09181234001", email: "migsCrus@example.com", lrn: "403371150032",
      guardiansLastName: "Rivera", guardiansFirstName: "Mario", guardiansMiddleName: "Delos Santos", guardiansSuffix: "", emergencyContact: "09181234011", emergencyEmail: "mario.rivera@example.com", fullAddress: "Blk 5 Lot 12 Banlic, Calamba",
        religion: "Catholic", ip: "", house_no_purok: "John 91" ,barangay: "Lawa", city: "Calamba", province: "Laguna", motherTounge: "Tagalog",
      relationship: "Mother", gradeLevel: "7", studentType: "Incoming G7", schoolYear: "2023-2024", schoolType: "Private", prevSchool: "St. Therese Academy", schoolAddress: "Calamba",
      birthCert: "", hasBirth: true,
      reportCard: "", hasReportCard: true,
      goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true,
      itr: "", hasTIR: true, escCert: "", hasEscCertificate: true, mop: "GCash",
      reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      attainmentUponGraduation: "N/a", hasEnrolledSibling: "Yes", siblingName: "Lara Rivera"
    },
    {
      applicantsLastName: "Santos", applicantsFirstName: "Jared", applicantsMiddleName: "Lopez", applicantsSuffix: "",
      dateOfBirth: new Date("2010-09-15"), age: 14, gender: "Male", mobileNumber: "09181234001", email: "SantosJared@example.com", lrn: "403371150033",
      guardiansLastName: "Rivera", guardiansFirstName: "Mario", guardiansMiddleName: "Delos Santos", guardiansSuffix: "", emergencyContact: "09181234011", emergencyEmail: "mario.rivera@example.com", fullAddress: "Blk 5 Lot 12 Banlic, Calamba",
        religion: "Catholic", ip: "", house_no_purok: "John 91" ,barangay: "Lawa", city: "Calamba", province: "Laguna", motherTounge: "Tagalog",
      relationship: "Mother", gradeLevel: "7", studentType: "Incoming G7", schoolYear: "2023-2024", schoolType: "Private", prevSchool: "St. Therese Academy", schoolAddress: "Calamba",
      birthCert: "", hasBirth: true,
      reportCard: "", hasReportCard: true,
      goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true,
      itr: "", hasTIR: true, escCert: "", hasEscCertificate: true, mop: "GCash",
      reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      attainmentUponGraduation: "N/a", hasEnrolledSibling: "Yes", siblingName: "Lara Rivera"
    },

    
    // Grade 8 (5)
    {
      applicantsLastName: "Ten", applicantsFirstName: "Benjamin", applicantsMiddleName: "", applicantsSuffix: "",
      dateOfBirth: new Date("2009-02-26"), age: 16, gender: "Male", mobileNumber: "091712345658", email: "benjamin1@example.com", lrn: "401056789019",
      guardiansLastName: "Ten", guardiansFirstName: "Maximo", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876559", emergencyEmail: "linda.guardian1@example.com", fullAddress: "Asgard St, Calamba",
        religion: "Catholic", ip: "", house_no_purok: "John 91" ,barangay: "Lawa", city: "Calamba", province: "Laguna", motherTounge: "Tagalog",
      relationship: "Mother", gradeLevel: "8", studentType: "Transferee", schoolYear: "2023-2024", schoolType: "Private", prevSchool: "ABC Catholic School", schoolAddress: "Calamba",
      birthCert: "", hasBirth: true,
      reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
      goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      attainmentUponGraduation: "With Honor", hasEnrolledSibling: "No", siblingName: ""
    },
    {
      applicantsLastName: "Navarro", applicantsFirstName: "Myra", applicantsMiddleName: "Lopez", applicantsSuffix: "",
      dateOfBirth: new Date("2009-05-30"), age: 16, gender: "Female", mobileNumber: "091712345686", email: "myraNavarro@example.com", lrn: "123456789456",
      guardiansLastName: "Navarro", guardiansFirstName: "Rafael", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09179876551", emergencyEmail: "rafael.guardian1@example.com", fullAddress: "456 Elm St, Calamba",
        religion: "Catholic", ip: "", house_no_purok: "John 91" ,barangay: "Lawa", city: "Calamba", province: "Laguna", motherTounge: "Tagalog",
      relationship: "Mother", gradeLevel: "8", studentType: "Transferee", schoolYear: "2024-2025", schoolType: "Private", prevSchool: "Rizal Institute", schoolAddress: "Canlubang, Calamba",
      birthCert: "", hasBirth: true,
      reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
      goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      attainmentUponGraduation: "With High Honor", hasEnrolledSibling: "Yes", siblingName: "Navarro, Mia Lopez"
    },
    {
      applicantsLastName: "Reyes", applicantsFirstName: "Patrick", applicantsMiddleName: "Nolasco", applicantsSuffix: "",
      dateOfBirth: new Date("2009-07-22"), age: 15, gender: "Male", mobileNumber: "09181234004", email: "patrick1@example.com", lrn: "401056789021",
      guardiansLastName: "Reyes", guardiansFirstName: "Jun", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09181234014", emergencyEmail: "jun.r@example.com", fullAddress: "Linga, Calamba",
        religion: "Catholic", ip: "", house_no_purok: "John 91" ,barangay: "Lawa", city: "Calamba", province: "Laguna", motherTounge: "Tagalog",
      relationship: "Mother", gradeLevel: "8", studentType: "Transferee", schoolYear: "2023-2024", schoolType: "Public", prevSchool: "Calamba National High School", schoolAddress: "Calamba",
      birthCert: "", hasBirth: true,
      reportCard: "", hasReportCard: true,
      goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
      mop: "Cash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
    },

    // Grade 9 (3)
    {
      applicantsLastName: "Lim", applicantsFirstName: "Christian", applicantsMiddleName: "", applicantsSuffix: "",
      dateOfBirth: new Date("2008-11-29"), age:17 , gender: "Male", mobileNumber: "09190000001", email: "christian1@example.com", lrn: "111122233331",
      guardiansLastName: "Lim", guardiansFirstName: "Samboy", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09190000021", emergencyEmail: "", fullAddress: "10 Apo Drive, Calamba",
        religion: "Catholic", ip: "", house_no_purok: "John 91" ,barangay: "Lawa", city: "Calamba", province: "Laguna", motherTounge: "Tagalog",
      relationship: "Mother", gradeLevel: "9", studentType: "Transferee", schoolYear: "2023-2024", schoolType: "Private", prevSchool: "Brent International School", schoolAddress: "Calamba",
      birthCert: "", hasBirth: true,
      reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
      goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
    },
    {
      applicantsLastName: "Doe", applicantsFirstName: "Juan", applicantsMiddleName: "", applicantsSuffix: "",
      dateOfBirth: new Date("2008-06-19"), age: 17, gender: "Male", mobileNumber: "09390001111", email: "doe1@example.com", lrn: "403191160991",
      guardiansLastName: "", guardiansFirstName: "", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "", emergencyEmail: "", fullAddress: "39 Amapola, Calamba",
        religion: "Catholic", ip: "", house_no_purok: "John 91" ,barangay: "Lawa", city: "Calamba", province: "Laguna", motherTounge: "Tagalog",
      relationship: "Mother", gradeLevel: "9", studentType: "Transferee", schoolYear: "2023-2024", schoolType: "Private", prevSchool: "Brent International School", schoolAddress: "Calamba",
      birthCert: "", hasBirth: true,
      reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
      goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      attainmentUponGraduation: "With Honor", hasEnrolledSibling: "No", siblingName: ""
    },
    {
      applicantsLastName: "Garcia", applicantsFirstName: "Nathan", applicantsMiddleName: "Reyes", applicantsSuffix: "",
      dateOfBirth: new Date("2008-02-02"), age: 16, gender: "Male", mobileNumber: "09181234007", email: "nathan1@example.com", lrn: "403191160911",
      guardiansLastName: "Garcia", guardiansFirstName: "Linda", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09181234017", emergencyEmail: "linda.g@example.com", fullAddress: "Real, Calamba",
        religion: "Catholic", ip: "", house_no_purok: "John 91" ,barangay: "Lawa", city: "Calamba", province: "Laguna", motherTounge: "Tagalog",
      relationship: "Mother", gradeLevel: "9", studentType: "Transferee", schoolYear: "2023-2024", schoolType: "Private", prevSchool: "La Salle Canlubang", schoolAddress: "Calamba",
      birthCert: "", hasBirth: true,
      reportCard: "", hasReportCard: true,
      goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
    },

    // Grade 10 (3)
    {
      applicantsLastName: "Legaspi", applicantsFirstName: "Noel", applicantsMiddleName: "", applicantsSuffix: "",
      dateOfBirth: new Date("2007-07-04") , age: 18, gender: "Male", mobileNumber: "0954123780", email: "noel1@example.com", lrn: "311267800999",
      guardiansLastName: "Legaspi", guardiansFirstName: "Alan", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09223238950", emergencyEmail: "", fullAddress: "17 Lotus, Calamba",
        religion: "Catholic", ip: "", house_no_purok: "John 91" ,barangay: "Lawa", city: "Calamba", province: "Laguna", motherTounge: "Tagalog",
      relationship: "Mother", gradeLevel: "10", studentType: "Transferee", schoolYear: "2023-2024", schoolType: "Public", prevSchool: "Canlubang Elementary School", schoolAddress: "",
      birthCert: "", hasBirth: true,
      reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
      goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      attainmentUponGraduation: "With High Honor", hasEnrolledSibling: "No", siblingName: ""
    },
     {
      applicantsLastName: "Gaspar", applicantsFirstName: "Lia", applicantsMiddleName: "", applicantsSuffix: "",
      dateOfBirth: new Date("2007-03-29") , age: 18, gender: "Female", mobileNumber: "09456789012", email: "gaspar@example.com", lrn: "511590015423",
      guardiansLastName: "Gaspar", guardiansFirstName: "Crisostomo", guardiansMiddleName: "Ibarra", guardiansSuffix: "", emergencyContact: "09272543019", emergencyEmail: " ", fullAddress: "38 Gumamela, Calamba",
        religion: "Catholic", ip: "", house_no_purok: "John 91" ,barangay: "Lawa", city: "Calamba", province: "Laguna", motherTounge: "Tagalog",
      relationship: "Mother", gradeLevel: "10", studentType: "Transferee", schoolYear: "2023-2024", schoolType: "Private", prevSchool: "Rizal Institute", schoolAddress: "Canlubang, Calamba",
      birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
      reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
      goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      attainmentUponGraduation: "With Highest Honor", hasEnrolledSibling: "No", siblingName: ""
    },
    {
      applicantsLastName: "Torres", applicantsFirstName: "Hannah", applicantsMiddleName: "Marquez", applicantsSuffix: "",
      dateOfBirth: new Date("2007-01-09"), age: 17, gender: "Female", mobileNumber: "09181234010", email: "hannah1@example.com", lrn: "311267801000",
        religion: "Catholic", ip: "", house_no_purok: "John 91" ,barangay: "Lawa", city: "Calamba", province: "Laguna", motherTounge: "Tagalog",
      relationship: "Mother", guardiansLastName: "Torres", guardiansFirstName: "Claudia", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09181234020", emergencyEmail: "claudia.torres@example.com", fullAddress: "Real, Calamba",
      gradeLevel: "10", studentType: "Transferee", schoolYear: "2023-2024", schoolType: "Private", prevSchool: "La Salle Canlubang", schoolAddress: "Calamba",
      birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
      reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
      goodMoral: "", hasGoodMoral: true, idPic: "", hasIdPic: true, studentExitForm: "", hasExitForm: true, form137: "", hasForm137: true, itr: "", hasTIR: true, escCert: "", hasEscCertificate: true,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      attainmentUponGraduation: "With Honor", hasEnrolledSibling: "No", siblingName: ""
    },
    
  ];

  for (const applicant of mockApplicants) {
    // Insert into applicantsInformationTable
    const result = await db.insert(applicantsInformationTable).values({
      applicantsLastName: applicant.applicantsLastName,
      applicantsFirstName: applicant.applicantsFirstName,
      applicantsMiddleName: applicant.applicantsMiddleName,
      applicantsSuffix: applicant.applicantsSuffix || null,
      dateOfBirth: applicant.dateOfBirth.toISOString().split("T")[0],
      age: applicant.age,
      gender: applicant.gender,
      religion: applicant.religion,
      ip: applicant.ip || null,
      house_no_purok: applicant.house_no_purok,
      barangay: applicant.barangay,
      city: applicant.city,
      province: applicant.province,
      motherTounge: applicant.motherTounge,
      mobileNumber: applicant.mobileNumber,
      email: applicant.email,
      lrn: applicant.lrn
    }).returning();

    const applicantID = result[0].applicants_id;

    // Insert into related tables
    await db.insert(guardianAndParentsTable).values({
      applicants_id: applicantID,
      guardiansLastName: applicant.guardiansLastName,
      guardiansFirstName: applicant.guardiansFirstName,
      guardiansMiddleName: applicant.guardiansMiddleName || null,
      guardiansSuffix: applicant.guardiansSuffix || null,
      emergencyContact: applicant.emergencyContact,
      emergencyEmail: applicant.emergencyEmail || null,
      relationship: applicant.relationship,
    });

    await db.insert(educationalBackgroundTable).values({
      applicants_id: applicantID,
      gradeLevel: applicant.gradeLevel,
      studentType: applicant.studentType,
      schoolYear: applicant.schoolYear,
      schoolType: applicant.schoolType,
      prevSchool: applicant.prevSchool,
      schoolAddress: applicant.schoolAddress
    });

    await db.insert(documentsTable).values({
      applicants_id: applicantID,
      birthCert: applicant.birthCert || null,
      hasBirth: applicant.hasBirth || true,
      reportCard: applicant.reportCard || null,
      hasReportCard: applicant.hasReportCard || true,
      goodMoral: applicant.goodMoral || null,
      hasGoodMoral: applicant.hasGoodMoral || true,
      idPic: applicant.idPic || null,
      hasIdPic: applicant.hasIdPic || true,
      studentExitForm: applicant.studentExitForm || null,
      hasExitForm: applicant.hasExitForm || true,
      form137: applicant.form137 || null,
      hasForm137: applicant.hasForm137 || true,
      itr: applicant.itr || null,
      hasTIR: applicant.hasTIR || true,
      escCert: applicant.escCert || null,
      hasEscCertificate: applicant.hasEscCertificate || true
    });

    await db.insert(reservationFeeTable).values({
      applicants_id: applicantID,
      mop: applicant.mop,
      reservationReceipt: applicant.reservationReceipt,
      reservationAmount: applicant.reservationAmount,    
      academicYear_id: academicYearID,
      dateOfPayment: new Date().toISOString().slice(0, 10),

    });

    await db.insert(additionalInformationTable).values({
      applicants_id: applicantID,
      AttainmentUponGraduation: applicant.attainmentUponGraduation,
      HasEnrolledSibling: applicant.hasEnrolledSibling,
      siblingName: applicant.siblingName
    });

    await db.insert(applicationStatusTable).values({
      applicants_id: applicantID,
      trackingId: generateRandomTrackingId(),
      academicYear_id: academicYearID,
      applicationFormReviewStatus: 'Pending',
      reservationPaymentStatus: 'Pending',
      dateOfApplication: new Date().toISOString().slice(0, 10),
    });

    await db.insert(AdmissionStatusTable).values({
      applicants_id: applicantID,
      academicYear_id: academicYearID,
      admissionStatus: "Pending",
      confirmationStatus: 'Pending',
      dateOfAdmission: new Date().toISOString().slice(0, 10),
    });

    await db.insert(studentTypeTable).values({
      applicants_id: applicantID,
      studentType: applicant.studentType,
      academicYear_id: academicYearID,
      gradeToEnroll: applicant.gradeLevel,
      student_case: 'REGULAR'
    });
  }

  console.log("12 mock applicants inserted successfully!");
};

insertMockApplicants();
