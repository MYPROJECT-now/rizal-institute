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
  const academicYearID = 3; // Replace with actual AcademicYearTable ID

  const mockApplicants = [
    // Grade 7 (3)
    {
      applicantsLastName: "Santos", applicantsFirstName: "Jim", applicantsMiddleName: "Dy", applicantsSuffix: "",
      dateOfBirth: new Date("2010-03-17"), age:13, gender: "Male", mobileNumber: "09593430011", email: "jim2@example.com", lrn: "501193300001",
      guardiansLastName: "Santos", guardiansFirstName: "John", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09593430022", emergencyEmail: "", fullAddress: "1738 Apo Drive, Calamba",
      gradeLevel: "7", studentType: "Incoming G7", schoolYear: "2022-2023", schoolType: "", prevSchool: "DEF School", schoolAddress: "Calamba",
      birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
      reportCard: "", hasReportCard: false,
      goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false, itr: "", hasTIR: false, escCert: "", hasEscCertificate: false,
      mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
      attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
    },
    {
      applicantsLastName: "Reyes", applicantsFirstName: "Angela", applicantsMiddleName: "Lopez", applicantsSuffix: "",
      dateOfBirth: new Date("2010-07-22"), age: 13, gender: "Female", mobileNumber: "09593430012", email: "angela.reyes@example.com", lrn: "501193300002",
      guardiansLastName: "Reyes", guardiansFirstName: "Maria", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09593430023", emergencyEmail: "maria.reyes@example.com", fullAddress: "Brgy. Halang, Calamba",
      gradeLevel: "7", studentType: "Incoming G7", schoolYear: "2022-2023", schoolType: "Private", prevSchool: "San Bartolome Academy", schoolAddress: "Calamba",
      birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/sample1.jpg", hasBirth: true,
      reportCard: "", hasReportCard: false, goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false, itr: "", hasTIR: false, escCert: "", hasEscCertificate: false, mop: "GCash",
      reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/sample02.jpg", reservationAmount: 500,
      attainmentUponGraduation: "N/a", hasEnrolledSibling: "Yes", siblingName: "Jim Santos"
    },
    {
      applicantsLastName: "Domingo", applicantsFirstName: "Kyle", applicantsMiddleName: "Fernandez", applicantsSuffix: "",
      dateOfBirth: new Date("2010-11-19"), age: 13, gender: "Male", mobileNumber: "09593430013", email: "kyle.domingo@example.com", lrn: "501193300003",
      guardiansLastName: "Domingo", guardiansFirstName: "Arnold", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09593430024", emergencyEmail: "arnold.domingo@example.com", fullAddress: "Brgy. Uno, Calamba",
      gradeLevel: "7", studentType: "Transferee", schoolYear: "2022-2023", schoolType: "Public", prevSchool: "Calamba Elementary School", schoolAddress: "Calamba City",
      birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/sample2.jpg", hasBirth: true,
      reportCard: "", hasReportCard: false, goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false, itr: "", hasTIR: false, escCert: "", hasEscCertificate: false,
      mop: "Bank Transfer", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/sample03.jpg", reservationAmount: 500,
      attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
    },
   
    // Grade 8 (3)
    {
    applicantsLastName: "Ramirez", applicantsFirstName: "Joshua", applicantsMiddleName: "Tan", applicantsSuffix: "",
    dateOfBirth: new Date("2009-01-25"), age: 14, gender: "Male", mobileNumber: "09191230003", email: "joshua.ramirez09@gmail.com", lrn: "123456789014",
    guardiansLastName: "Ramirez", guardiansFirstName: "Lorna", guardiansMiddleName: "Castro", guardiansSuffix: "", emergencyContact: "09283456789", emergencyEmail: "lorna.ramirez@yahoo.com", fullAddress: "San Fernando City, Pampanga",
    gradeLevel: "8", studentType: "Incoming G8", schoolYear: "2022-2023", schoolType: "Public", prevSchool: "Santo Niño National High School", schoolAddress: "San Fernando City, Pampanga",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759929394/reportcardrevised-160114063058-thumbnail_padwb0.webp", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false, itr: "", hasTIR: false, escCert: "", hasEscCertificate: false,
    mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
    },
    {
    applicantsLastName: "Torres", applicantsFirstName: "Elaine", applicantsMiddleName: "Villanueva", applicantsSuffix: "",
    dateOfBirth: new Date("2009-09-03"), age: 14, gender: "Female", mobileNumber: "09201230004", email: "elaine.torres09@outlook.com", lrn: "123456789015",
    guardiansLastName: "Torres", guardiansFirstName: "Jaime", guardiansMiddleName: "Ramos", guardiansSuffix: "", emergencyContact: "09194567890", emergencyEmail: "", fullAddress: "Guagua, Pampanga",
    gradeLevel: "8", studentType: "Incoming G8", schoolYear: "2022-2023", schoolType: "Private", prevSchool: "Holy Child Academy", schoolAddress: "Guagua, Pampanga",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759929394/reportcardrevised-160114063058-thumbnail_padwb0.webp", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false, itr: "", hasTIR: false, escCert: "", hasEscCertificate: false,
    mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
    },
    {
    applicantsLastName: "Lopez", applicantsFirstName: "Jerome", applicantsMiddleName: "Mata", applicantsSuffix: "",
    dateOfBirth: new Date("2009-08-03"), age: 14, gender: "Male", mobileNumber: "09593430016", email: "jerome.lopez@example.com", lrn: "501193300008",
    guardiansLastName: "Lopez", guardiansFirstName: "Benjamin", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09593430027", emergencyEmail: "ben.lopez@example.com", fullAddress: "Sto. Tomas, Batangas",
    gradeLevel: "8", studentType: "Incoming G8", schoolYear: "2022-2023", schoolType: "Private", prevSchool: "Sto. Tomas Academy", schoolAddress: "Batangas",
    birthCert: "", hasBirth: false, reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759929394/reportcardrevised-160114063058-thumbnail_padwb0.webp", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false, itr: "", hasTIR: false, escCert: "", hasEscCertificate: false,
    mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/sample08.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
    },
   
    // Grade 9 (3)
    {
    applicantsLastName: "Mendoza", applicantsFirstName: "Ralph", applicantsMiddleName: "Gutierrez", applicantsSuffix: "",
    dateOfBirth: new Date("2008-02-18"), age: 15, gender: "Male", mobileNumber: "09211230005", email: "ralph.mendoza08@gmail.com", lrn: "123456789016",
    guardiansLastName: "Mendoza", guardiansFirstName: "Carmelita", guardiansMiddleName: "David", guardiansSuffix: "", emergencyContact: "09081234567", emergencyEmail: "carmelita.mendoza@gmail.com", fullAddress: "San Jose, Nueva Ecija",
    gradeLevel: "9", studentType: "Incoming G9", schoolYear: "2022-2023", schoolType: "Public", prevSchool: "San Jose National High School", schoolAddress: "San Jose, Nueva Ecija",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759929394/reportcardrevised-160114063058-thumbnail_padwb0.webp", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false, itr: "", hasTIR: false, escCert: "", hasEscCertificate: false,
    mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
    },
    {   
    applicantsLastName: "Bautista", applicantsFirstName: "Patricia", applicantsMiddleName: "Domingo", applicantsSuffix: "",
    dateOfBirth: new Date("2008-11-06"), age: 15, gender: "Female", mobileNumber: "09221230006", email: "patricia.bautista08@yahoo.com", lrn: "123456789017",
    guardiansLastName: "Bautista", guardiansFirstName: "Antonio", guardiansMiddleName: "Lim", guardiansSuffix: "", emergencyContact: "09193456781", emergencyEmail: "", fullAddress: "Malolos City, Bulacan",
    gradeLevel: "9", studentType: "Incoming G9", schoolYear: "2022-2023", schoolType: "Private", prevSchool: "St. Mary’s Academy", schoolAddress: "Malolos City, Bulacan",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759929394/reportcardrevised-160114063058-thumbnail_padwb0.webp", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false, itr: "", hasTIR: false, escCert: "", hasEscCertificate: false,
    mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
    },
    {
    applicantsLastName: "Rivera", applicantsFirstName: "Daniel", applicantsMiddleName: "Cruz", applicantsSuffix: "",
    dateOfBirth: new Date("2008-07-09"), age: 15, gender: "Male", mobileNumber: "09231230009", email: "daniel.rivera@example.com", lrn: "501193300013",
    guardiansLastName: "Rivera", guardiansFirstName: "Evelyn", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09231230029", emergencyEmail: "evelyn.rivera@example.com", fullAddress: "Tarlac City, Tarlac",
    gradeLevel: "9", studentType: "Incoming G9", schoolYear: "2022-2023", schoolType: "Public", prevSchool: "Tarlac NHS", schoolAddress: "Tarlac City",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true, 
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759929394/reportcardrevised-160114063058-thumbnail_padwb0.webp", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false, itr: "", hasTIR: false, escCert: "", hasEscCertificate: false,
    mop: "Cash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/sample13.jpg", reservationAmount: 500,
    attainmentUponGraduation: "With Honor", hasEnrolledSibling: "No", siblingName: ""
    },

    // Grade 10 (3)
    {
    applicantsLastName: "Villanueva", applicantsFirstName: "Christian", applicantsMiddleName: "Ramos", applicantsSuffix: "",
    dateOfBirth: new Date("2007-05-15"), age: 16, gender: "Male", mobileNumber: "09231230007", email: "christian.villanueva07@gmail.com", lrn: "123456789018",
    guardiansLastName: "Villanueva", guardiansFirstName: "Elena", guardiansMiddleName: "Morales", guardiansSuffix: "", emergencyContact: "09204567891", emergencyEmail: "elena.villanueva@gmail.com", fullAddress: "Quezon City, Metro Manila",
    gradeLevel: "10", studentType: "Transferee", schoolYear: "2022-2023", schoolType: "Private", prevSchool: "Holy Cross High School", schoolAddress: "Quezon City, Metro Manila",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "", hasReportCard: false,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false, itr: "", hasTIR: false, escCert: "", hasEscCertificate: false,
    mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
    },
    {
    applicantsLastName: "Cruz", applicantsFirstName: "Janelle", applicantsMiddleName: "Aquino", applicantsSuffix: "",
    dateOfBirth: new Date("2007-10-29"), age: 16, gender: "Female", mobileNumber: "09241230008", email: "janelle.cruz07@outlook.com", lrn: "123456789019",
    guardiansLastName: "Cruz", guardiansFirstName: "Benjamin", guardiansMiddleName: "Flores", guardiansSuffix: "", emergencyContact: "09187654321", emergencyEmail: "", fullAddress: "Caloocan City, Metro Manila",
    gradeLevel: "10", studentType: "Incoming G10", schoolYear: "2022-2023", schoolType: "Public", prevSchool: "Bagong Silang National High School", schoolAddress: "Caloocan City, Metro Manila",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759929394/reportcardrevised-160114063058-thumbnail_padwb0.webp", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false, itr: "", hasTIR: false, escCert: "", hasEscCertificate: false,
    mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/edktfaxnbbkupqv9nodt.jpg", reservationAmount: 500,
    attainmentUponGraduation: "N/a", hasEnrolledSibling: "No", siblingName: ""
    },
    {
    applicantsLastName: "Santiago", applicantsFirstName: "Erika", applicantsMiddleName: "Marquez", applicantsSuffix: "",
    dateOfBirth: new Date("2007-02-19"), age: 16, gender: "Female", mobileNumber: "09353456789", email: "erika.santiago@example.com", lrn: "501193300018",
    guardiansLastName: "Santiago", guardiansFirstName: "Rosalie", guardiansMiddleName: "", guardiansSuffix: "", emergencyContact: "09353456799", emergencyEmail: "rosalie.santiago@example.com", fullAddress: "Los Baños, Laguna",
    gradeLevel: "10", studentType: "Incoming G10", schoolYear: "2022-2023", schoolType: "Private", prevSchool: "LB Integrated HS", schoolAddress: "Laguna",
    birthCert: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320377/documents/dezmmdodr9ttjcduwbjo.jpg", hasBirth: true,
    reportCard: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759929394/reportcardrevised-160114063058-thumbnail_padwb0.webp", hasReportCard: true,
    goodMoral: "", hasGoodMoral: false, idPic: "", hasIdPic: false, studentExitForm: "", hasExitForm: false, form137: "", hasForm137: false, itr: "", hasTIR: false, escCert: "", hasEscCertificate: false,
    mop: "GCash", reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759320380/reservationPayments/sample18.jpg", reservationAmount: 500,
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

  console.log("12 mock applicants inserted successfully!");
};

insertMockApplicants();
