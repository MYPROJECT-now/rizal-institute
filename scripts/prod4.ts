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
  const academicYearID = 4; // Replace with actual AcademicYearTable ID

  const mockApplicants = [
    // Grade 7 (3)
    {
    applicantsLastName: "Garcia", applicantsFirstName: "Nathaniel", applicantsMiddleName: "Lopez", applicantsSuffix: "",
    dateOfBirth: new Date("2010-05-20"), age: 12, gender: "Male", mobileNumber: "09593430011", email: "nathaniel.garcia10@gmail.com", lrn: "501193300011",
    guardiansLastName: "Garcia", guardiansFirstName: "Rosa", guardiansMiddleName: "Diaz", guardiansSuffix: "", emergencyContact: "09593430022", emergencyEmail: "rosa.garcia@gmail.com", fullAddress: "Bacoor, Cavite",
    gradeLevel: "7", studentType: "Incoming G7", schoolYear: "2021-2022", schoolType: "Public", prevSchool: "Bacoor Elementary School", schoolAddress: "Bacoor, Cavite",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false,
    itr: "", hasTIR: false, escCert: "", hasEscCertificate: false, mop: "GCash",
    reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/A", hasEnrolledSibling: "No", siblingName: ""
    },
    {
    applicantsLastName: "Reyes", applicantsFirstName: "Sophia", applicantsMiddleName: "Santos", applicantsSuffix: "",
    dateOfBirth: new Date("2010-08-09"), age: 12, gender: "Female", mobileNumber: "09593430012", email: "sophia.reyes10@yahoo.com", lrn: "501193300012",
    guardiansLastName: "Reyes", guardiansFirstName: "Mario", guardiansMiddleName: "Velasquez", guardiansSuffix: "", emergencyContact: "09593430023", emergencyEmail: "", fullAddress: "Dasmariñas City, Cavite",
    gradeLevel: "7", studentType: "Incoming G7", schoolYear: "2021-2022", schoolType: "Private", prevSchool: "Dasmariñas Elementary School", schoolAddress: "Dasmariñas City, Cavite",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false,
    itr: "", hasTIR: false, escCert: "", hasEscCertificate: false, mop: "Cash",
    reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/A", hasEnrolledSibling: "No", siblingName: ""
    },
    {
    applicantsLastName: "Ramos", applicantsFirstName: "Justin", applicantsMiddleName: "Cruz", applicantsSuffix: "",
    dateOfBirth: new Date("2010-01-14"), age: 12, gender: "Male", mobileNumber: "09593430013", email: "justin.ramos10@gmail.com", lrn: "501193300013",
    guardiansLastName: "Ramos", guardiansFirstName: "Cynthia", guardiansMiddleName: "Lopez", guardiansSuffix: "", emergencyContact: "09593430024", emergencyEmail: "cynthia.ramos@gmail.com", fullAddress: "Tarlac City",
    gradeLevel: "7", studentType: "Incoming G7", schoolYear: "2021-2022", schoolType: "Public", prevSchool: "Tarlac Elementary School", schoolAddress: "Tarlac City",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false,
    itr: "", hasTIR: false, escCert: "", hasEscCertificate: false, mop: "GCash",
    reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/A", hasEnrolledSibling: "No", siblingName: ""
    },
   
    // Grade 8 (3)
    {
    applicantsLastName: "Cruz", applicantsFirstName: "Adrian", applicantsMiddleName: "Bautista", applicantsSuffix: "",
    dateOfBirth: new Date("2009-04-16"), age: 13, gender: "Male", mobileNumber: "09593430015", email: "adrian.cruz09@gmail.com", lrn: "501193300015",
    guardiansLastName: "Cruz", guardiansFirstName: "Benjamin", guardiansMiddleName: "Flores", guardiansSuffix: "", emergencyContact: "09593430026", emergencyEmail: "", fullAddress: "Caloocan City, Metro Manila",
    gradeLevel: "8", studentType: "Incoming G8", schoolYear: "2021-2022", schoolType: "Public", prevSchool: "Bagong Silang National High School", schoolAddress: "Caloocan City",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false,
    itr: "", hasTIR: false, escCert: "", hasEscCertificate: false, mop: "GCash",
    reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/A", hasEnrolledSibling: "No", siblingName: ""
    },
    {
    applicantsLastName: "Torres", applicantsFirstName: "Bianca", applicantsMiddleName: "Navarro", applicantsSuffix: "",
    dateOfBirth: new Date("2009-10-08"), age: 13, gender: "Female", mobileNumber: "09593430016", email: "bianca.torres09@yahoo.com", lrn: "501193300016",
    guardiansLastName: "Torres", guardiansFirstName: "Jaime", guardiansMiddleName: "Ramos", guardiansSuffix: "", emergencyContact: "09593430027", emergencyEmail: "jaime.torres@gmail.com", fullAddress: "Guagua, Pampanga",
    gradeLevel: "8", studentType: "Incoming G8", schoolYear: "2021-2022", schoolType: "Private", prevSchool: "Holy Child Academy", schoolAddress: "Guagua, Pampanga",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false,
    itr: "", hasTIR: false, escCert: "", hasEscCertificate: false, mop: "Cash",
    reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/A", hasEnrolledSibling: "No", siblingName: ""
    },
    {
    applicantsLastName: "Villanueva", applicantsFirstName: "Marco", applicantsMiddleName: "Reyes", applicantsSuffix: "",
    dateOfBirth: new Date("2009-09-12"), age: 13, gender: "Male", mobileNumber: "09682341029", email: "marco.villanueva09@gmail.com", lrn: "501193300017",
    guardiansLastName: "Villanueva", guardiansFirstName: "Ricardo", guardiansMiddleName: "Lopez", guardiansSuffix: "", emergencyContact: "09178760045", emergencyEmail: "ricardo.villanueva@gmail.com", fullAddress: "San Pedro, Laguna",
    gradeLevel: "8", studentType: "Incoming G8", schoolYear: "2021-2022", schoolType: "Public", prevSchool: "San Pedro National High School", schoolAddress: "San Pedro, Laguna",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false,
    itr: "", hasTIR: false, escCert: "", hasEscCertificate: false, mop: "GCash",
    reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/A", hasEnrolledSibling: "No", siblingName: ""
    },
    
    // Grade 9 (3)
    {
    applicantsLastName: "Santos", applicantsFirstName: "Lorenzo", applicantsMiddleName: "Rivera", applicantsSuffix: "",
    dateOfBirth: new Date("2008-01-30"), age: 14, gender: "Male", mobileNumber: "09593430017", email: "lorenzo.santos08@gmail.com", lrn: "501193300017",
    guardiansLastName: "Santos", guardiansFirstName: "Luz", guardiansMiddleName: "Manalo", guardiansSuffix: "", emergencyContact: "09593430028", emergencyEmail: "", fullAddress: "Tarlac City",
    gradeLevel: "9", studentType: "Incoming G9", schoolYear: "2021-2022", schoolType: "Public", prevSchool: "San Isidro National High School", schoolAddress: "Tarlac City",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false,
    itr: "", hasTIR: false, escCert: "", hasEscCertificate: false, mop: "Cash",
    reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/A", hasEnrolledSibling: "No", siblingName: ""
    },
    {
    applicantsLastName: "Bautista", applicantsFirstName: "Mariel", applicantsMiddleName: "Pineda", applicantsSuffix: "",
    dateOfBirth: new Date("2008-09-19"), age: 14, gender: "Female", mobileNumber: "09593430018", email: "mariel.bautista08@gmail.com", lrn: "501193300018",
    guardiansLastName: "Bautista", guardiansFirstName: "Antonio", guardiansMiddleName: "Lim", guardiansSuffix: "", emergencyContact: "09593430029", emergencyEmail: "antonio.bautista@gmail.com", fullAddress: "Malolos City, Bulacan",
    gradeLevel: "9", studentType: "Transferee", schoolYear: "2021-2022", schoolType: "Private", prevSchool: "St. Mary’s Academy", schoolAddress: "Malolos City, Bulacan",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "", hasReportCard: false,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false,
    itr: "", hasTIR: false, escCert: "", hasEscCertificate: false, mop: "GCash",
    reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/A", hasEnrolledSibling: "No", siblingName: ""
    },
    {
    applicantsLastName: "Mendoza", applicantsFirstName: "Ryan", applicantsMiddleName: "Lopez", applicantsSuffix: "",
    dateOfBirth: new Date("2008-11-03"), age: 14, gender: "Male", mobileNumber: "09593430019", email: "ryan.mendoza08@yahoo.com", lrn: "501193300019",
    guardiansLastName: "Mendoza", guardiansFirstName: "Carmelita", guardiansMiddleName: "David", guardiansSuffix: "", emergencyContact: "09593430030", emergencyEmail: "", fullAddress: "San Jose, Nueva Ecija",
    gradeLevel: "9", studentType: "Incoming G9", schoolYear: "2021-2022", schoolType: "Public", prevSchool: "San Jose National High School", schoolAddress: "San Jose, Nueva Ecija",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false,
    itr: "", hasTIR: false, escCert: "", hasEscCertificate: false, mop: "Cash",
    reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/A", hasEnrolledSibling: "No", siblingName: ""
    },

    // Grade 10 (3)
    {
    applicantsLastName: "Villanueva", applicantsFirstName: "Kevin", applicantsMiddleName: "Ramos", applicantsSuffix: "",
    dateOfBirth: new Date("2007-03-27"), age: 15, gender: "Male", mobileNumber: "09593430020", email: "kevin.villanueva07@gmail.com", lrn: "501193300020",
    guardiansLastName: "Villanueva", guardiansFirstName: "Luz", guardiansMiddleName: "Morales", guardiansSuffix: "", emergencyContact: "09593430031", emergencyEmail: "luz.villanueva@gmail.com", fullAddress: "Quezon City, Metro Manila",
    gradeLevel: "10", studentType: "Incoming G10", schoolYear: "2021-2022", schoolType: "Private", prevSchool: "Holy Cross High School", schoolAddress: "Quezon City, Metro Manila",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false,
    itr: "", hasTIR: false, escCert: "", hasEscCertificate: false, mop: "GCash",
    reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/A", hasEnrolledSibling: "No", siblingName: ""
    },
    {
    applicantsLastName: "Lopez", applicantsFirstName: "Monica", applicantsMiddleName: "Garcia", applicantsSuffix: "",
    dateOfBirth: new Date("2007-09-12"), age: 14, gender: "Female", mobileNumber: "09593430021", email: "monica.lopez07@yahoo.com", lrn: "501193300021",
    guardiansLastName: "Lopez", guardiansFirstName: "Eduardo", guardiansMiddleName: "Santiago", guardiansSuffix: "", emergencyContact: "09593430032", emergencyEmail: "", fullAddress: "Caloocan City, Metro Manila",
    gradeLevel: "10", studentType: "Incoming G10", schoolYear: "2021-2022", schoolType: "Public", prevSchool: "Bagong Silang National High School", schoolAddress: "Caloocan City, Metro Manila",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false,
    itr: "", hasTIR: false, escCert: "", hasEscCertificate: false, mop: "Cash",
    reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/A", hasEnrolledSibling: "No", siblingName: ""
    },
    {
    applicantsLastName: "Ramos", applicantsFirstName: "Juliana", applicantsMiddleName: "Perez", applicantsSuffix: "",
    dateOfBirth: new Date("2007-03-24"), age: 15, gender: "Female", mobileNumber: "09573620148", email: "juliana.ramos07@yahoo.com", lrn: "501193300025",
    guardiansLastName: "Ramos", guardiansFirstName: "Eduardo", guardiansMiddleName: "Castro", guardiansSuffix: "", emergencyContact: "09453260971", emergencyEmail: "eduardo.ramos@gmail.com", fullAddress: "Tanauan, Batangas",
    gradeLevel: "10", studentType: "Incoming G10", schoolYear: "2021-2022", schoolType: "Private", prevSchool: "St. Bridget College", schoolAddress: "Batangas City",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1760809969/report_card_lrkbc5.jpg", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false,
    itr: "", hasTIR: false, escCert: "", hasEscCertificate: false, mop: "Cash",
    reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/A", hasEnrolledSibling: "No", siblingName: ""
    } 
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
      emergencyEmail: applicant.emergencyEmail,
      fullAddress: applicant.fullAddress
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
      hasBirth: applicant.hasBirth || false,
      reportCard: applicant.reportCard || null,
      hasReportCard: applicant.hasReportCard || false,
      goodMoral: applicant.goodMoral || null,
      hasGoodMoral: applicant.hasGoodMoral || false,
      idPic: applicant.idPic || null,
      hasIdPic: applicant.hasIdPic || false,
      studentExitForm: applicant.studentExitForm || null,
      hasExitForm: applicant.hasExitForm || false,
      form137: applicant.form137 || null,
      hasForm137: applicant.hasForm137 || false,
      itr: applicant.itr || null,
      hasTIR: applicant.hasTIR || false,
      escCert: applicant.escCert || null,
      hasEscCertificate: applicant.hasEscCertificate || false
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

  console.log("20 mock applicants inserted successfully!");
};

insertMockApplicants();
