// // scripts/insertAcademicYear.ts
// import "dotenv/config";
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// import { additionalInformationTable, AdmissionStatusTable, applicantsInformationTable, applicationStatusTable, auditTrailsTable, BreakDownTable, downPaymentTable, educationalBackgroundTable, ESCGranteeTable, fullPaymentTable, guardianAndParentsTable, MonthlyPayementTable, MonthsInSoaTable, reservationFeeTable, ScheduleTable, SectionTable, StudentGradesTable, StudentInfoTable, StudentPerGradeAndSection, studentTypeTable, TeacherAssignmentTable, tempdownPaymentTable, TempMonthsInSoaTable } from "@/src/db/schema";


// const sqlClient = neon(process.env.DATABASE_URL!);
// const db = drizzle(sqlClient);

// const mockData = async () => {

//   //acadmic year 1 2024-2025
//   await db.insert(applicantsInformationTable).values({
//     applicants_id: 1,
//     applicantsLastName: "Dela Cruz",
//     applicantsFirstName: "Juan",
//     applicantsMiddleName: "Reyes",
//     applicantsSuffix: null,
//     dateOfBirth: "2011-05-14",
//     age: 14,
//     gender: "Male",
//     mobileNumber: "09171234567",
//     email: "juan.delacruz@example.com",
//     lrn: "123456789012",
//   });

//   // 👨‍👩‍👧 Guardian
//   await db.insert(guardianAndParentsTable).values({
//     applicants_id: 1,
//     guardiansLastName: "Dela Cruz",
//     guardiansFirstName: "Maria",
//     guardiansMiddleName: "Santos",
//     guardiansSuffix: null,
//     emergencyContact: "09182345678",
//     emergencyEmail: "maria.delacruz@example.com",
//     fullAddress: "123 Mabini St., Quezon City",
//   });

//   // 🎓 Educational Background
//   await db.insert(educationalBackgroundTable).values({
//     applicants_id: 1,
//     gradeLevel: "Grade 7",
//     studentType: "Ongoing G7", // Old Student, Transferee
//     schoolYear: "2024-2025",
//     schoolType: "Private",
//     prevSchool: "St. Mary’s Academy",
//     schoolAddress: "Pasig City",
//   });

//   // 🏫 Student Type
//   await db.insert(studentTypeTable).values({
//     applicants_id: 1,
//     academicYear_id: 1,
//     studentType: "Ongoing G7",
//     gradeToEnroll: "Grade 7",
//     promotion: "PROMOTED",
//     student_case: "REGULAR",
//   });

//   // 📋 Additional Info
//   await db.insert(additionalInformationTable).values({
//     applicants_id: 1,
//     AttainmentUponGraduation: "With Honor", // With High Honor, With Highest Honor
//     HasEnrolledSibling: "Yes",
//     siblingName: "Ana Dela Cruz",
//     escGrantee: "No",
//   });

//   // 💸 Reservation Fee
//   await db.insert(reservationFeeTable).values({
//     applicants_id: 1,
//     academicYear_id: 1,
//     reservationAmount: 500,
//     mop: "GCash",
//     reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/jlkrjhfbqhza6xrlrtqw.jpg",
//     dateOfPayment: "2024-03-15",
//     SINumber: "004001",
//   });

//   // 🗂 Application Status
//   await db.insert(applicationStatusTable).values({
//     applicants_id: 1,
//     academicYear_id: 1,
//     trackingId: "857290079956",
//     applicationFormReviewStatus: "Reserved",
//     reservationPaymentStatus: "Reserved",
//     dateOfApplication: "2024-09-01",
//   });

//   // 🎫 Admission Status
//   await db.insert(AdmissionStatusTable).values({
//     applicants_id: 1,
//     academicYear_id: 1,
//     confirmationStatus: "Approved",
//     dateOfConfirmation: "2024-04-05",
//     admissionStatus: "Enrolled",
//     dateOfAdmission: "2024-09-20",
//     isActive: true,
//   });

//   // 🧑‍🎓 Student Info
//   await db.insert(StudentInfoTable).values({
//     applicants_id: 1,
//     lrn: "123456789012",
//     studentLastName: "Dela Cruz",
//     studentFirstName: "Juan",
//     studentMiddleName: "Reyes",
//     fullAddress: "123 Mabini St., Quezon City",
//     studentGender: "Male",
//     studentBirthDate: "2011-05-14",
//     studentAge: 14,
//   });

//   // 🧾 Breakdown / Tuition Fee
//   await db.insert(BreakDownTable).values({
//     applicants_id: 1,
//     academicYear_id: 1,
//     tuitionFee: 30000,
//     miscellaneous: 5000,
//     academic_discount: "N/a", // With Honor, With High Honor, With Highest Honor
//     academic_discount_amount: 0,
//     withSibling: "Yes",// Yes, No
//     withSibling_amount: 500,
//     totalTuitionFee: 35000,
//     escGrant: 9000,
//   });

//   // 💰 Down Payment
//   await db.insert(tempdownPaymentTable).values({
//     temp_down_id: 1,
//     applicants_id: 1,
//     academicYear_id: 1,
//     amount: 500,
//     downPaymentDate: "2024-09-10",
//     paymentMethod: "Cash",
//     SINumber: "004001",
//   });

//   await db.insert(downPaymentTable).values({
//     applicants_id: 1,
//     temp_down_id: 1,
//     academicYear_id: 1,
//     amount: 500,
//     downPaymentDate: "2024-09-10",
//     paymentMethod: "Installments",  // or full_payment
//     SINumber: "004001",

//   });

//   // 🧾 SOA months months is from September 2024 to March 2025
// const months = [
//   { label: "September 2024", date: "2024-09-10" },
//   { label: "October 2024", date: "2024-10-10" },
//   { label: "November 2024", date: "2024-11-10" },
//   { label: "December 2024", date: "2024-12-10" },
//   { label: "January 2025", date: "2025-01-10" },
//   { label: "February 2025", date: "2025-02-10" },
//   { label: "March 2025", date: "2025-03-10" },
// ];

//   const baseSINumber = 4002; // 🧾 starting point (004322)

// for (const [i, { label, date }] of months.entries()) {
//   await db.insert(TempMonthsInSoaTable).values({
//     applicants_id: 1,
//     academicYear_id: 1,
//     temp_month: label,
//     temp_monthlyDue: 3571.50, 
//   });

//   const sin = String(baseSINumber + (i + 1)).padStart(6, "0"); // 004323, 004324, 004325, etc.

//   // if the payment method is full payment put the full payment at the start month
//   await db.insert(MonthsInSoaTable).values({
//     temp_month_id: 1 ,
//     downPaymentId: 1,
//     applicants_id: 1,
//     academicYear_id: 1,
//     month: label,
//     monthlyDue: 3571.50,
//     amountPaid: 3571.50,
//     dateOfPayment: date, //like 2025-09-10
//     SINumber: sin,
//   });

//   await db.insert(MonthlyPayementTable).values({
//     month_id: i+1,
//     student_id: 1,
//     academicYear_id: 1,
//     dateOfPayment: date,
//     amount: 3571.50,
//     proofOfPayment:  "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/jlkrjhfbqhza6xrlrtqw.jpg",
//     modeOfPayment: "GCash",
//     SINumber: sin,
//     dateOfVerification: date,
//     status: "Approved",
//   });

// };

//     // 🏫 Section
//   await db.insert(SectionTable).values({
//     section_id: 1,
//     sectionName: "Section 1",
//     limit: 10,
//     gradeLevel_id: 1,
//     academicYear_id: 1,
//   });

//   // make only for Ongoing G7
//  await db.insert(ESCGranteeTable).values({
//    applicants_id: 1,
//    academicYear_id: 1,
//    ESCGrantee: true,
//    studentType: "Ongoing G7"
//  })


//   await db.insert(StudentPerGradeAndSection).values({
//     student_id:1,
//     section_id:1,
//     gradeLevel_id:1,
//     academicYear_id:1
//   })


// const studentGrades = Array.from({ length: 7 }, (_, i) => ({
//   student_id: 1,
//   gradeLevel_id: 1,
//   academicYear_id: 1,
//   subject_id: i + 1,     
//   finalGrade: 85,
//   remarks: "PASSED",
//   dateSubmitted: "2025-09-10",
// }));

// await db.insert(StudentGradesTable).values(studentGrades);



// //APPLICANT 2
// await db.insert(applicantsInformationTable).values({
//   applicants_id: 2,
//   applicantsLastName: "Santos",
//   applicantsFirstName: "Maria",
//   applicantsMiddleName: "Lopez",
//   applicantsSuffix: null,
//   dateOfBirth: "2011-03-22",
//   age: 14,
//   gender: "Female",
//   mobileNumber: "09181234568",
//   email: "maria.santos@example.com",
//   lrn: "123456789013",
// });

// await db.insert(guardianAndParentsTable).values({
//   applicants_id: 2,
//   guardiansLastName: "Santos",
//   guardiansFirstName: "Carlos",
//   guardiansMiddleName: "Reyes",
//   guardiansSuffix: null,
//   emergencyContact: "09182345679",
//   emergencyEmail: "carlos.santos@example.com",
//   fullAddress: "456 Bonifacio Ave., Manila",
// });

// await db.insert(educationalBackgroundTable).values({
//   applicants_id: 2,
//   gradeLevel: "Grade 7",
//   studentType: "Ongoing G7",
//   schoolYear: "2024-2025",
//   schoolType: "Private",
//   prevSchool: "La Salle Green Hills",
//   schoolAddress: "Mandaluyong City",
// });

//   // 💸 Reservation Fee
//   await db.insert(reservationFeeTable).values({
//     applicants_id: 2,
//     academicYear_id: 1,
//     reservationAmount: 500,
//     mop: "GCash",
//     reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/jlkrjhfbqhza6xrlrtqw.jpg",
//     dateOfPayment: "2024-03-15",
//     SINumber: "004011",
//   });

//   // 🗂 Application Status
//   await db.insert(applicationStatusTable).values({
//     applicants_id: 2,
//     academicYear_id: 1,
//     trackingId: "857290079951",
//     applicationFormReviewStatus: "Reserved",
//     reservationPaymentStatus: "Reserved",
//     dateOfApplication: "2024-09-01",
//   });

//   // 🎫 Admission Status
//   await db.insert(AdmissionStatusTable).values({
//     applicants_id: 2,
//     academicYear_id: 1,
//     confirmationStatus: "Approved",
//     dateOfConfirmation: "2024-04-05",
//     admissionStatus: "Enrolled",
//     dateOfAdmission: "2024-09-20",
//     isActive: true,
//   });


//   await db.insert(StudentInfoTable).values({
//     applicants_id: 2,
//     lrn: "123456789013",
//     studentLastName: "Santos",
//     studentFirstName: "Maria",
//     studentMiddleName: "Lopez",
//     fullAddress: "456 Mabini St., Quezon City",
//     studentGender: "Female",
//     studentBirthDate: "2010-03-22",
//     studentAge: 15,
//   });


//   // 🧾 Breakdown / Tuition Fee
//   await db.insert(BreakDownTable).values({
//     applicants_id: 2,
//     academicYear_id: 1,
//     tuitionFee: 30000,
//     miscellaneous: 5000,
//     academic_discount: "N/a", // With Honor, With High Honor, With Highest Honor
//     academic_discount_amount: 0,
//     withSibling: "Yes",// Yes, No
//     withSibling_amount: 500,
//     totalTuitionFee: 35000,
//     escGrant: 9000,
//   });

//   // 💰 Down Payment
//   await db.insert(tempdownPaymentTable).values({
//     temp_down_id: 2,
//     applicants_id: 2,
//     academicYear_id: 1,
//     amount: 500,
//     downPaymentDate: "2024-09-10",
//     paymentMethod: "Cash",
//     SINumber: "004011",
//   });

//   await db.insert(downPaymentTable).values({
//     applicants_id: 2,
//     temp_down_id: 2,
//     academicYear_id: 1,
//     amount: 500,
//     downPaymentDate: "2024-09-10",
//     paymentMethod: "Installments",  // or full_payment
//     SINumber: "004011",

//   });

//   // 🧾 SOA months months is from September 2024 to March 2025
// const months2 = [
//   { label: "September 2024", date: "2024-09-10" },
//   { label: "October 2024", date: "2024-10-10" },
//   { label: "November 2024", date: "2024-11-10" },
//   { label: "December 2024", date: "2024-12-10" },
//   { label: "January 2025", date: "2025-01-10" },
//   { label: "February 2025", date: "2025-02-10" },
//   { label: "March 2025", date: "2025-03-10" },
// ];

//   const baseSINumber2 = 4012; // 🧾 starting point (004322)

// for (const [i, { label, date }] of months.entries()) {
//   await db.insert(TempMonthsInSoaTable).values({
//     applicants_id: 2,
//     academicYear_id: 1,
//     temp_month: label,
//     temp_monthlyDue: 3571.50, 
//   });

//   const sin = String(baseSINumber2 + (i + 1)).padStart(6, "0"); // 004323, 004324, 004325, etc.

//   // if the payment method is full payment put the full payment at the start month
//   await db.insert(MonthsInSoaTable).values({
//     temp_month_id: 2 ,
//     month_id: i+8,
//     downPaymentId: 2,
//     applicants_id: 2,
//     academicYear_id: 1,
//     month: label,
//     monthlyDue: 3571.50,
//     amountPaid: 3571.50,
//     dateOfPayment: date, //like 2025-09-10
//     SINumber: sin,
//   });

//   await db.insert(MonthlyPayementTable).values({
//     month_id: i+8,
//     student_id: 2,
//     academicYear_id: 1,
//     dateOfPayment: date,
//     amount: 3571.50,
//     proofOfPayment:  "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/jlkrjhfbqhza6xrlrtqw.jpg",
//     modeOfPayment: "GCash",
//     SINumber: sin,
//     dateOfVerification: date,
//     status: "Approved",
//   });

// };

//     // 🏫 Section
//   // await db.insert(SectionTable).values({
//   //   section_id: 1,
//   //   sectionName: "Section 1",
//   //   limit: 10,
//   //   gradeLevel_id: 1,
//   //   academicYear_id: 1,
//   // });

//   // make only for Ongoing G7
//  await db.insert(ESCGranteeTable).values({
//    applicants_id: 2,
//    academicYear_id: 1,
//    ESCGrantee: true,
//    studentType: "Ongoing G7"
//  })


//   await db.insert(StudentPerGradeAndSection).values({
//     student_id:2,
//     section_id:1,
//     gradeLevel_id:1,
//     academicYear_id:1
//   })


// const studentGrades2 = Array.from({ length: 7 }, (_, i) => ({
//   student_id: 2,
//   gradeLevel_id: 1,
//   academicYear_id: 1,
//   subject_id: i + 1,     
//   finalGrade: 85,
//   remarks: "PASSED",
//   dateSubmitted: "2025-09-10",
// }));

// await db.insert(StudentGradesTable).values(studentGrades2);






// //APPLICANT 3
//  await db.insert(applicantsInformationTable).values({
//     applicants_id: 3,
//     applicantsLastName: "Reyes",
//     applicantsFirstName: "Carlos",
//     applicantsMiddleName: "Dizon",
//     applicantsSuffix: null,
//     dateOfBirth: "2009-07-09",
//     age: 16,
//     gender: "Male",
//     mobileNumber: "09181234569",
//     email: "carlos.reyes@example.com",
//     lrn: "123456789014",
//   });

//   await db.insert(guardianAndParentsTable).values({
//     applicants_id: 3,
//     guardiansLastName: "Reyes",
//     guardiansFirstName: "Luz",
//     guardiansMiddleName: "Dizon",
//     guardiansSuffix: null,
//     emergencyContact: "09184567892",
//     emergencyEmail: "luz.reyes@example.com",
//     fullAddress: "789 Mabini St., Quezon City",
//   });

//   await db.insert(educationalBackgroundTable).values({
//     applicants_id: 3,
//     gradeLevel: "Grade 9",
//     studentType: "Ongoing G9",
//     schoolYear: "2024-2025",
//     schoolType: "Public",
//     prevSchool: "Quezon City High School",
//     schoolAddress: "Quezon City",
//   });

//   // 💸 Reservation Fee
//   await db.insert(reservationFeeTable).values({
//     applicants_id: 3,
//     academicYear_id: 1,
//     reservationAmount: 500,
//     mop: "GCash",
//     reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/jlkrjhfbqhza6xrlrtqw.jpg",
//     dateOfPayment: "2024-03-15",
//     SINumber: "004021",
//   });

//   // 🗂 Application Status
//   await db.insert(applicationStatusTable).values({
//     applicants_id: 3,
//     academicYear_id: 1,
//     trackingId: "857290079951",
//     applicationFormReviewStatus: "Reserved",
//     reservationPaymentStatus: "Reserved",
//     dateOfApplication: "2024-09-01",
//   });

//   // 🎫 Admission Status
//   await db.insert(AdmissionStatusTable).values({
//     applicants_id: 3,
//     academicYear_id: 1,
//     confirmationStatus: "Approved",
//     dateOfConfirmation: "2024-04-05",
//     admissionStatus: "Enrolled",
//     dateOfAdmission: "2024-09-20",
//     isActive: true,
//   });


//   await db.insert(StudentInfoTable).values({
//     applicants_id: 3,
//     lrn: "123456789014",
//     studentLastName: "Reyes",
//     studentFirstName: "Carlos",
//     studentMiddleName: "Dizon",
//     fullAddress: "789 Mabini St., Quezon City",
//     studentGender: "Male",
//     studentBirthDate: "2009-07-09",
//     studentAge: 16,
//   });


//   // 🧾 Breakdown / Tuition Fee
//   await db.insert(BreakDownTable).values({
//     applicants_id: 3,
//     academicYear_id: 1,
//     tuitionFee: 30000,
//     miscellaneous: 5000,
//     academic_discount: "N/a", // With Honor, With High Honor, With Highest Honor
//     academic_discount_amount: 0,
//     withSibling: "Yes",// Yes, No
//     withSibling_amount: 500,
//     totalTuitionFee: 35000,
//     escGrant: 9000,
//   });

//   // 💰 Down Payment
//   await db.insert(tempdownPaymentTable).values({
//     temp_down_id: 3,
//     applicants_id: 3,
//     academicYear_id: 1,
//     amount: 500,
//     downPaymentDate: "2024-09-10",
//     paymentMethod: "Cash",
//     SINumber: "004021",
//   });

//   await db.insert(downPaymentTable).values({
//     applicants_id: 3,
//     temp_down_id: 3,
//     academicYear_id: 1,
//     amount: 500,
//     downPaymentDate: "2024-09-10",
//     paymentMethod: "Installments",  // or full_payment
//     SINumber: "004021",

//   });

//   // 🧾 SOA months months is from September 2024 to March 2025
// const months3 = [
//   { label: "September 2024", date: "2024-09-10" },
//   { label: "October 2024", date: "2024-10-10" },
//   { label: "November 2024", date: "2024-11-10" },
//   { label: "December 2024", date: "2024-12-10" },
//   { label: "January 2025", date: "2025-01-10" },
//   { label: "February 2025", date: "2025-02-10" },
//   { label: "March 2025", date: "2025-03-10" },
// ];

//   const baseSINumber3 = 4022; // 🧾 starting point (004322)

// for (const [i, { label, date }] of months.entries()) {
//   await db.insert(TempMonthsInSoaTable).values({
//     applicants_id: 3,
//     academicYear_id: 1,
//     temp_month: label,
//     temp_monthlyDue: 3571.50, 
//   });

//   const sin = String(baseSINumber2 + (i + 1)).padStart(6, "0"); // 004323, 004324, 004325, etc.

//   // if the payment method is full payment put the full payment at the start month
//   await db.insert(MonthsInSoaTable).values({
//     temp_month_id: 3 ,
//     month_id: i+16,
//     downPaymentId: 3,
//     applicants_id: 3,
//     academicYear_id: 1,
//     month: label,
//     monthlyDue: 3571.50,
//     amountPaid: 3571.50,
//     dateOfPayment: date, //like 2025-09-10
//     SINumber: sin,
//   });

//   await db.insert(MonthlyPayementTable).values({
//     month_id: i+16,
//     student_id: 3,
//     academicYear_id: 1,
//     dateOfPayment: date,
//     amount: 3571.50,
//     proofOfPayment:  "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/jlkrjhfbqhza6xrlrtqw.jpg",
//     modeOfPayment: "GCash",
//     SINumber: sin,
//     dateOfVerification: date,
//     status: "Approved",
//   });

// };

//     // 🏫 Section
//   await db.insert(SectionTable).values({
//     section_id: 2,
//     sectionName: "Section 2",
//     limit: 10,
//     gradeLevel_id: 1,
//     academicYear_id: 1,
//   });

//   // make only for Ongoing G7
//  await db.insert(ESCGranteeTable).values({
//    applicants_id: 3,
//    academicYear_id: 1,
//    ESCGrantee: true,
//    studentType: "Ongoing G7"
//  })


//   await db.insert(StudentPerGradeAndSection).values({
//     student_id:3,
//     section_id:2,
//     gradeLevel_id:1,
//     academicYear_id:1
//   })


// const studentGrades3 = Array.from({ length: 7 }, (_, i) => ({
//   student_id: 3,
//   gradeLevel_id: 1,
//   academicYear_id: 1,
//   subject_id: i + 1,     
//   finalGrade: 85,
//   remarks: "PASSED",
//   dateSubmitted: "2025-09-10",
// }));

// await db.insert(StudentGradesTable).values(studentGrades3);





// //APPLICANT 4
// await db.insert(applicantsInformationTable).values({
//   applicants_id: 4,
//   applicantsLastName: "Garcia",
//   applicantsFirstName: "Andrea",
//   applicantsMiddleName: "Villanueva",
//   applicantsSuffix: null,
//   dateOfBirth: "2012-07-11",
//   age: 12,
//   gender: "Female",
//   mobileNumber: "09179876543",
//   email: "andrea.garcia@example.com",
//   lrn: "123456789015",
// });
// await db.insert(guardianAndParentsTable).values({
//   applicants_id: 4,
//   guardiansLastName: "Garcia",
//   guardiansFirstName: "Miguel",
//   guardiansMiddleName: "Santos",
//   guardiansSuffix: null,
//   emergencyContact: "09184561234",
//   emergencyEmail: "miguel.garcia@example.com",
//   fullAddress: "23 P. Tuazon St., Cubao, Quezon City",
// });
// await db.insert(educationalBackgroundTable).values({
//   applicants_id: 4,
//   gradeLevel: "Grade 7",
//   studentType: "New",
//   schoolYear: "2024-2025",
//   schoolType: "Private",
//   prevSchool: "St. Joseph Academy",
//   schoolAddress: "Cubao, Quezon City",
// });


//   // 💸 Reservation Fee
//   await db.insert(reservationFeeTable).values({
//     applicants_id: 4,
//     academicYear_id: 1,
//     reservationAmount: 500,
//     mop: "GCash",
//     reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/jlkrjhfbqhza6xrlrtqw.jpg",
//     dateOfPayment: "2024-03-15",
//     SINumber: "004041",
//   });

//   // 🗂 Application Status
//   await db.insert(applicationStatusTable).values({
//     applicants_id: 4,
//     academicYear_id: 1,
//     trackingId: "857290079951",
//     applicationFormReviewStatus: "Reserved",
//     reservationPaymentStatus: "Reserved",
//     dateOfApplication: "2024-09-01",
//   });

//   // 🎫 Admission Status
//   await db.insert(AdmissionStatusTable).values({
//     applicants_id: 4,
//     academicYear_id: 1,
//     confirmationStatus: "Approved",
//     dateOfConfirmation: "2024-04-05",
//     admissionStatus: "Enrolled",
//     dateOfAdmission: "2024-09-20",
//     isActive: true,
//   });


//   await db.insert(StudentInfoTable).values({
//     applicants_id: 4,
//     lrn: "123456789013",
//     studentLastName: "Santos",
//     studentFirstName: "Maria",
//     studentMiddleName: "Lopez",
//     fullAddress: "456 Mabini St., Quezon City",
//     studentGender: "Female",
//     studentBirthDate: "2010-03-22",
//     studentAge: 15,
//   });


//   // 🧾 Breakdown / Tuition Fee
//   await db.insert(BreakDownTable).values({
//     applicants_id: 4,
//     academicYear_id: 1,
//     tuitionFee: 30000,
//     miscellaneous: 5000,
//     academic_discount: "N/a", // With Honor, With High Honor, With Highest Honor
//     academic_discount_amount: 0,
//     withSibling: "Yes",// Yes, No
//     withSibling_amount: 500,
//     totalTuitionFee: 35000,
//     escGrant: 9000,
//   });

//   // 💰 Down Payment
//   await db.insert(tempdownPaymentTable).values({
//     temp_down_id: 4,
//     applicants_id: 4,
//     academicYear_id: 1,
//     amount: 500,
//     downPaymentDate: "2024-09-10",
//     paymentMethod: "Cash",
//     SINumber: "004041",
//   });

//   await db.insert(downPaymentTable).values({
//     applicants_id: 4,
//     temp_down_id: 4,
//     academicYear_id: 1,
//     amount: 500,
//     downPaymentDate: "2024-09-10",
//     paymentMethod: "Installments",  // or full_payment
//     SINumber: "004041",

//   });

//   // 🧾 SOA months months is from September 2024 to March 2025
// const months4 = [
//   { label: "September 2024", date: "2024-09-10" },
//   { label: "October 2024", date: "2024-10-10" },
//   { label: "November 2024", date: "2024-11-10" },
//   { label: "December 2024", date: "2024-12-10" },
//   { label: "January 2025", date: "2025-01-10" },
//   { label: "February 2025", date: "2025-02-10" },
//   { label: "March 2025", date: "2025-03-10" },
// ];

//   const baseSINumber4 = 4042; // 🧾 starting point (004322)

// for (const [i, { label, date }] of months.entries()) {
//   await db.insert(TempMonthsInSoaTable).values({
//     applicants_id: 4,
//     academicYear_id: 1,
//     temp_month: label,
//     temp_monthlyDue: 3571.50, 
//   });

//   const sin = String(baseSINumber2 + (i + 1)).padStart(6, "0"); // 004323, 004324, 004325, etc.

//   // if the payment method is full payment put the full payment at the start month
//   await db.insert(MonthsInSoaTable).values({
//     temp_month_id: 4 ,
//     month_id: i+24,
//     downPaymentId: 4,
//     applicants_id: 4,
//     academicYear_id: 1,
//     month: label,
//     monthlyDue: 3571.50,
//     amountPaid: 3571.50,
//     dateOfPayment: date, //like 2025-09-10
//     SINumber: sin,
//   });

//   await db.insert(MonthlyPayementTable).values({
//     month_id: i+24,
//     student_id: 4,
//     academicYear_id: 1,
//     dateOfPayment: date,
//     amount: 3571.50,
//     proofOfPayment:  "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/jlkrjhfbqhza6xrlrtqw.jpg",
//     modeOfPayment: "GCash",
//     SINumber: sin,
//     dateOfVerification: date,
//     status: "Approved",
//   });

// };

//     // 🏫 Section
//   // await db.insert(SectionTable).values({
//   //   section_id: 2,
//   //   sectionName: "Section 2",
//   //   limit: 10,
//   //   gradeLevel_id: 1,
//   //   academicYear_id: 1,
//   // });

//   // make only for Ongoing G7
//  await db.insert(ESCGranteeTable).values({
//    applicants_id: 4,
//    academicYear_id: 1,
//    ESCGrantee: true,
//    studentType: "Ongoing G7"
//  })


//   await db.insert(StudentPerGradeAndSection).values({
//     student_id:4,
//     section_id:2,
//     gradeLevel_id:1,
//     academicYear_id:1
//   })


// const studentGrades4 = Array.from({ length: 7 }, (_, i) => ({
//   student_id: 4,
//   gradeLevel_id: 1,
//   academicYear_id: 1,
//   subject_id: i + 1,     
//   finalGrade: 85,
//   remarks: "PASSED",
//   dateSubmitted: "2025-09-10",
// }));

// await db.insert(StudentGradesTable).values(studentGrades4);



// // 🧍‍♂️ APPLICANT 5
// await db.insert(applicantsInformationTable).values({
//   applicants_id: 5,
//   applicantsLastName: "Reyes",
//   applicantsFirstName: "Daniel",
//   applicantsMiddleName: "Cruz",
//   applicantsSuffix: null,
//   dateOfBirth: "2011-02-18",
//   age: 13,
//   gender: "Male",
//   mobileNumber: "09175678912",
//   email: "daniel.reyes@example.com",
//   lrn: "123456789016",
// });

// await db.insert(guardianAndParentsTable).values({
//   applicants_id: 5,
//   guardiansLastName: "Reyes",
//   guardiansFirstName: "Alfredo",
//   guardiansMiddleName: "Lopez",
//   guardiansSuffix: null,
//   emergencyContact: "09183451267",
//   emergencyEmail: "alfredo.reyes@example.com",
//   fullAddress: "128 Mabini St., San Juan City",
// });

// await db.insert(educationalBackgroundTable).values({
//   applicants_id: 5,
//   gradeLevel: "Grade 8",
//   studentType: "Old Student",
//   schoolYear: "2024-2025",
//   schoolType: "Public",
//   prevSchool: "San Juan National High School",
//   schoolAddress: "San Juan City",
// });

// // 💸 Reservation Fee
// await db.insert(reservationFeeTable).values({
//   applicants_id: 5,
//   academicYear_id: 1,
//   reservationAmount: 500,
//   mop: "Cash",
//   reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/kewqjpoflkxkqbxwyu1x.jpg",
//   dateOfPayment: "2024-03-20",
//   SINumber: "004150",
// });

// // 🗂 Application Status
// await db.insert(applicationStatusTable).values({
//   applicants_id: 5,
//   academicYear_id: 1,
//   trackingId: "857290079952",
//   applicationFormReviewStatus: "Reserved",
//   reservationPaymentStatus: "Reserved",
//   dateOfApplication: "2024-09-02",
// });

// // 🎫 Admission Status
// await db.insert(AdmissionStatusTable).values({
//   applicants_id: 5,
//   academicYear_id: 1,
//   confirmationStatus: "Approved",
//   dateOfConfirmation: "2024-04-07",
//   admissionStatus: "Enrolled",
//   dateOfAdmission: "2024-09-21",
//   isActive: true,
// });

// // 👨‍🎓 Student Info
// await db.insert(StudentInfoTable).values({
//   applicants_id: 5,
//   lrn: "123456789016",
//   studentLastName: "Reyes",
//   studentFirstName: "Daniel",
//   studentMiddleName: "Cruz",
//   fullAddress: "128 Mabini St., San Juan City",
//   studentGender: "Male",
//   studentBirthDate: "2011-02-18",
//   studentAge: 13,
// });

// // 🧾 Breakdown / Tuition Fee
// await db.insert(BreakDownTable).values({
//   applicants_id: 5,
//   academicYear_id: 1,
//   tuitionFee: 31000,
//   miscellaneous: 5500,
//   academic_discount: "With Honor",
//   academic_discount_amount: 1000,
//   withSibling: "No",
//   withSibling_amount: 0,
//   totalTuitionFee: 35500,
//   escGrant: 9000,
// });

// // 💰 Down Payment
// await db.insert(tempdownPaymentTable).values({
//   temp_down_id: 5,
//   applicants_id: 5,
//   academicYear_id: 1,
//   amount: 500,
//   downPaymentDate: "2024-09-10",
//   paymentMethod: "Cash",
//   SINumber: "004150",
// });

// await db.insert(downPaymentTable).values({
//   applicants_id: 5,
//   temp_down_id: 5,
//   academicYear_id: 1,
//   amount: 500,
//   downPaymentDate: "2024-09-10",
//   paymentMethod: "Installments",
//   SINumber: "004150",
// });

// // 🧾 SOA Months (September 2024 - March 2025)
// const months5 = [
//   { label: "September 2024", date: "2024-09-10" },
//   { label: "October 2024", date: "2024-10-10" },
//   { label: "November 2024", date: "2024-11-10" },
//   { label: "December 2024", date: "2024-12-10" },
//   { label: "January 2025", date: "2025-01-10" },
//   { label: "February 2025", date: "2025-02-10" },
//   { label: "March 2025", date: "2025-03-10" },
// ];

// const baseSINumber5 = 4351;

// for (const [i, { label, date }] of months5.entries()) {
//   await db.insert(TempMonthsInSoaTable).values({
//     applicants_id: 5,
//     academicYear_id: 1,
//     temp_month: label,
//     temp_monthlyDue: 3643,
//   });

//   const sin = String(baseSINumber5 + (i + 1)).padStart(6, "0");

//   await db.insert(MonthsInSoaTable).values({
//     temp_month_id:5,
//     month_id: i + 32,
//     downPaymentId: 5,
//     applicants_id: 5,
//     academicYear_id: 1,
//     month: label,
//     monthlyDue: 3643,
//     amountPaid: 3643,
//     dateOfPayment: date,
//     SINumber: sin,
//   });

//   await db.insert(MonthlyPayementTable).values({
//     month_id: i + 32,
//     student_id: 5,
//     academicYear_id: 1,
//     dateOfPayment: date,
//     amount: 3643,
//     proofOfPayment:
//       "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/kewqjpoflkxkqbxwyu1x.jpg",
//     modeOfPayment: "Cash",
//     SINumber: sin,
//     dateOfVerification: date,
//     status: "Approved",
//   });
// }

// // 🏫 Section (Grade 8)
// await db.insert(SectionTable).values({
//   section_id: 3,
//   sectionName: "Section 3",
//   limit: 10,
//   gradeLevel_id: 2,
//   academicYear_id: 1,
// });

// // ESC Grantee
// await db.insert(ESCGranteeTable).values({
//   applicants_id: 5,
//   academicYear_id: 1,
//   ESCGrantee: true,
//   studentType: "Old Student",
// });

// // 👩‍🏫 Student-Section Link
// await db.insert(StudentPerGradeAndSection).values({
//   student_id: 5,
//   section_id: 3,
//   gradeLevel_id: 2,
//   academicYear_id: 1,
// });

// // 🧮 Grades
// const studentGrades5 = Array.from({ length: 7 }, (_, i) => ({
//   student_id: 5,
//   gradeLevel_id: 2,
//   academicYear_id: 1,
//   subject_id: i + 8, // subjects for Grade 8
//   finalGrade: 88,
//   remarks: "PASSED",
//   dateSubmitted: "2025-09-10",
// }));

// await db.insert(StudentGradesTable).values(studentGrades5);



// // 🧍‍♂️ APPLICANT 6
// await db.insert(applicantsInformationTable).values({
//   applicants_id: 6,
//   applicantsLastName: "Torres",
//   applicantsFirstName: "Isabella",
//   applicantsMiddleName: "Lopez",
//   applicantsSuffix: null,
//   dateOfBirth: "2011-06-23",
//   age: 13,
//   gender: "Female",
//   mobileNumber: "09171234567",
//   email: "isabella.torres@example.com",
//   lrn: "123456789017",
// });

// await db.insert(guardianAndParentsTable).values({
//   applicants_id: 6,
//   guardiansLastName: "Torres",
//   guardiansFirstName: "Mario",
//   guardiansMiddleName: "Lopez",
//   guardiansSuffix: null,
//   emergencyContact: "09179876543",
//   emergencyEmail: "mario.torres@example.com",
//   fullAddress: "45 Mabini St., San Juan City",
// });

// await db.insert(educationalBackgroundTable).values({
//   applicants_id: 6,
//   gradeLevel: "Grade 8",
//   studentType: "Old Student",
//   schoolYear: "2024-2025",
//   schoolType: "Public",
//   prevSchool: "San Juan National High School",
//   schoolAddress: "San Juan City",
// });

// // 💸 Reservation Fee
// await db.insert(reservationFeeTable).values({
//   applicants_id: 6,
//   academicYear_id: 1,
//   reservationAmount: 500,
//   mop: "Cash",
//   reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/sample_receipt.jpg",
//   dateOfPayment: "2024-03-21",
//   SINumber: "004151",
// });

// // 🗂 Application Status
// await db.insert(applicationStatusTable).values({
//   applicants_id: 6,
//   academicYear_id: 1,
//   trackingId: "857290079953",
//   applicationFormReviewStatus: "Reserved",
//   reservationPaymentStatus: "Reserved",
//   dateOfApplication: "2024-09-03",
// });

// // 🎫 Admission Status
// await db.insert(AdmissionStatusTable).values({
//   applicants_id: 6,
//   academicYear_id: 1,
//   confirmationStatus: "Approved",
//   dateOfConfirmation: "2024-04-08",
//   admissionStatus: "Enrolled",
//   dateOfAdmission: "2024-09-22",
//   isActive: true,
// });

// // 👨‍🎓 Student Info
// await db.insert(StudentInfoTable).values({
//   applicants_id: 6,
//   lrn: "123456789017",
//   studentLastName: "Torres",
//   studentFirstName: "Isabella",
//   studentMiddleName: "Lopez",
//   fullAddress: "45 Mabini St., San Juan City",
//   studentGender: "Female",
//   studentBirthDate: "2011-06-23",
//   studentAge: 13,
// });

// // 🧾 Breakdown / Tuition Fee
// await db.insert(BreakDownTable).values({
//   applicants_id: 6,
//   academicYear_id: 1,
//   tuitionFee: 31000,
//   miscellaneous: 5500,
//   academic_discount: "With Honor",
//   academic_discount_amount: 1000,
//   withSibling: "No",
//   withSibling_amount: 0,
//   totalTuitionFee: 35500,
//   escGrant: 9000,
// });

// // 💰 Down Payment
// await db.insert(tempdownPaymentTable).values({
//   temp_down_id: 6,
//   applicants_id: 6,
//   academicYear_id: 1,
//   amount: 500,
//   downPaymentDate: "2024-09-11",
//   paymentMethod: "Cash",
//   SINumber: "004161",
// });

// await db.insert(downPaymentTable).values({
//   applicants_id: 6,
//   temp_down_id: 6,
//   academicYear_id: 1,
//   amount: 500,
//   downPaymentDate: "2024-09-11",
//   paymentMethod: "Installments",
//   SINumber: "004161",
// });

// // 🧾 SOA Months (September 2024 - March 2025)
// const months6 = [
//   { label: "September 2024", date: "2024-09-11" },
//   { label: "October 2024", date: "2024-10-11" },
//   { label: "November 2024", date: "2024-11-11" },
//   { label: "December 2024", date: "2024-12-11" },
//   { label: "January 2025", date: "2025-01-11" },
//   { label: "February 2025", date: "2025-02-11" },
//   { label: "March 2025", date: "2025-03-11" },
// ];

// const baseSINumber6 = 4362;

// for (const [i, { label, date }] of months6.entries()) {
//   await db.insert(TempMonthsInSoaTable).values({
//     applicants_id: 6,
//     academicYear_id: 1,
//     temp_month: label,
//     temp_monthlyDue: 3643,
//   });

//   const sin = String(baseSINumber6 + (i + 1)).padStart(6, "0");

//   await db.insert(MonthsInSoaTable).values({
//     temp_month_id: 6,
//     month_id: i + 40,
//     downPaymentId: 6,
//     applicants_id: 6,
//     academicYear_id: 1,
//     month: label,
//     monthlyDue: 3643,
//     amountPaid: 3643,
//     dateOfPayment: date,
//     SINumber: sin,
//   });

//   await db.insert(MonthlyPayementTable).values({
//     month_id: i + 40,
//     student_id: 6,
//     academicYear_id: 1,
//     dateOfPayment: date,
//     amount: 3643,
//     proofOfPayment:
//       "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/sample_receipt.jpg",
//     modeOfPayment: "Cash",
//     SINumber: sin,
//     dateOfVerification: date,
//     status: "Approved",
//   });
// }

// // 🏫 Section (Grade 8)
// // await db.insert(SectionTable).values({
// //   section_id: 3,
// //   sectionName: "Section 3",
// //   limit: 10,
// //   gradeLevel_id: 2,
// //   academicYear_id: 1,
// // });

// // ESC Grantee
// await db.insert(ESCGranteeTable).values({
//   applicants_id: 6,
//   academicYear_id: 1,
//   ESCGrantee: true,
//   studentType: "Old Student",
// });

// // 👩‍🏫 Student-Section Link
// await db.insert(StudentPerGradeAndSection).values({
//   student_id: 6,
//   section_id: 3,
//   gradeLevel_id: 2,
//   academicYear_id: 1,
// });

// // 🧮 Grades
// const studentGrades6 = Array.from({ length: 7 }, (_, i) => ({
//   student_id: 6,
//   gradeLevel_id: 2,
//   academicYear_id: 1,
//   subject_id: i + 8, // subjects for Grade 8
//   finalGrade: 90,
//   remarks: "PASSED",
//   dateSubmitted: "2025-09-11",
// }));

// await db.insert(StudentGradesTable).values(studentGrades6);


// // 🧍‍♂️ APPLICANT 7
// await db.insert(applicantsInformationTable).values({
//   applicants_id: 7,
//   applicantsLastName: "Velasco",
//   applicantsFirstName: "Miguel",
//   applicantsMiddleName: "Santos",
//   applicantsSuffix: null,
//   dateOfBirth: "2011-04-15",
//   age: 13,
//   gender: "Male",
//   mobileNumber: "09172345678",
//   email: "miguel.velasco@example.com",
//   lrn: "123456789018",
// });

// await db.insert(guardianAndParentsTable).values({
//   applicants_id: 7,
//   guardiansLastName: "Velasco",
//   guardiansFirstName: "Ricardo",
//   guardiansMiddleName: "Santos",
//   guardiansSuffix: null,
//   emergencyContact: "09179871234",
//   emergencyEmail: "ricardo.velasco@example.com",
//   fullAddress: "78 Mabini St., San Juan City",
// });

// await db.insert(educationalBackgroundTable).values({
//   applicants_id: 7,
//   gradeLevel: "Grade 8",
//   studentType: "Old Student",
//   schoolYear: "2024-2025",
//   schoolType: "Public",
//   prevSchool: "San Juan National High School",
//   schoolAddress: "San Juan City",
// });

// // 💸 Reservation Fee
// await db.insert(reservationFeeTable).values({
//   applicants_id: 7,
//   academicYear_id: 1,
//   reservationAmount: 500,
//   mop: "Cash",
//   reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/sample_receipt.jpg",
//   dateOfPayment: "2024-03-22",
//   SINumber: "004162",
// });

// // 🗂 Application Status
// await db.insert(applicationStatusTable).values({
//   applicants_id: 7,
//   academicYear_id: 1,
//   trackingId: "857290079954",
//   applicationFormReviewStatus: "Reserved",
//   reservationPaymentStatus: "Reserved",
//   dateOfApplication: "2024-09-04",
// });

// // 🎫 Admission Status
// await db.insert(AdmissionStatusTable).values({
//   applicants_id: 7,
//   academicYear_id: 1,
//   confirmationStatus: "Approved",
//   dateOfConfirmation: "2024-04-09",
//   admissionStatus: "Enrolled",
//   dateOfAdmission: "2024-09-23",
//   isActive: true,
// });

// // 👨‍🎓 Student Info
// await db.insert(StudentInfoTable).values({
//   applicants_id: 7,
//   lrn: "123456789018",
//   studentLastName: "Velasco",
//   studentFirstName: "Miguel",
//   studentMiddleName: "Santos",
//   fullAddress: "78 Mabini St., San Juan City",
//   studentGender: "Male",
//   studentBirthDate: "2011-04-15",
//   studentAge: 13,
// });

// // 🧾 Breakdown / Tuition Fee
// await db.insert(BreakDownTable).values({
//   applicants_id: 7,
//   academicYear_id: 1,
//   tuitionFee: 31000,
//   miscellaneous: 5500,
//   academic_discount: "With Honor",
//   academic_discount_amount: 1000,
//   withSibling: "No",
//   withSibling_amount: 0,
//   totalTuitionFee: 35500,
//   escGrant: 9000,
// });

// // 💰 Down Payment
// await db.insert(tempdownPaymentTable).values({
//   temp_down_id: 7,
//   applicants_id: 7,
//   academicYear_id: 1,
//   amount: 500,
//   downPaymentDate: "2024-09-12",
//   paymentMethod: "Cash",
//   SINumber: "004162",
// });

// await db.insert(downPaymentTable).values({
//   applicants_id: 7,
//   temp_down_id: 7,
//   academicYear_id: 1,
//   amount: 500,
//   downPaymentDate: "2024-09-12",
//   paymentMethod: "Installments",
//   SINumber: "004162",
// });

// // 🧾 SOA Months (September 2024 - March 2025)
// const months7 = [
//   { label: "September 2024", date: "2024-09-12" },
//   { label: "October 2024", date: "2024-10-12" },
//   { label: "November 2024", date: "2024-11-12" },
//   { label: "December 2024", date: "2024-12-12" },
//   { label: "January 2025", date: "2025-01-12" },
//   { label: "February 2025", date: "2025-02-12" },
//   { label: "March 2025", date: "2025-03-12" },
// ];

// const baseSINumber7 = 4362;

// for (const [i, { label, date }] of months7.entries()) {
//   await db.insert(TempMonthsInSoaTable).values({
//     applicants_id: 7,
//     academicYear_id: 1,
//     temp_month: label,
//     temp_monthlyDue: 3643,
//   });

//   const sin = String(baseSINumber7 + (i + 1)).padStart(6, "0");

//   await db.insert(MonthsInSoaTable).values({
//     temp_month_id: 7,
//     month_id: i + 48,
//     downPaymentId: 7,
//     applicants_id: 7,
//     academicYear_id: 1,
//     month: label,
//     monthlyDue: 3643,
//     amountPaid: 3643,
//     dateOfPayment: date,
//     SINumber: sin,
//   });

//   await db.insert(MonthlyPayementTable).values({
//     month_id: i + 48,
//     student_id: 7,
//     academicYear_id: 1,
//     dateOfPayment: date,
//     amount: 3643,
//     proofOfPayment:
//       "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/sample_receipt.jpg",
//     modeOfPayment: "Cash",
//     SINumber: sin,
//     dateOfVerification: date,
//     status: "Approved",
//   });
// }

// // ESC Grantee
// await db.insert(ESCGranteeTable).values({
//   applicants_id: 7,
//   academicYear_id: 1,
//   ESCGrantee: true,
//   studentType: "Old Student",
// });

// await db.insert(SectionTable).values({
//   section_id: 4,
//   sectionName: "Section 4",
//   limit: 10,
//   gradeLevel_id: 2,
//   academicYear_id: 1,
// });

// // 👩‍🏫 Student-Section Link
// await db.insert(StudentPerGradeAndSection).values({
//   student_id: 7,
//   section_id: 4,
//   gradeLevel_id: 2,
//   academicYear_id: 1,
// });

// // 🧮 Grades
// const studentGrades7 = Array.from({ length: 7 }, (_, i) => ({
//   student_id: 7,
//   gradeLevel_id: 2,
//   academicYear_id: 1,
//   subject_id: i + 8,
//   finalGrade: 89,
//   remarks: "PASSED",
//   dateSubmitted: "2025-09-12",
// }));

// await db.insert(StudentGradesTable).values(studentGrades7);


// // 🧍‍♀️ APPLICANT 8
// await db.insert(applicantsInformationTable).values({
//   applicants_id: 8,
//   applicantsLastName: "Martinez",
//   applicantsFirstName: "Sofia",
//   applicantsMiddleName: "Reyes",
//   applicantsSuffix: null,
//   dateOfBirth: "2011-07-19",
//   age: 13,
//   gender: "Female",
//   mobileNumber: "09173456789",
//   email: "sofia.martinez@example.com",
//   lrn: "123456789019",
// });

// await db.insert(guardianAndParentsTable).values({
//   applicants_id: 8,
//   guardiansLastName: "Martinez",
//   guardiansFirstName: "Juan",
//   guardiansMiddleName: "Reyes",
//   guardiansSuffix: null,
//   emergencyContact: "09179873456",
//   emergencyEmail: "juan.martinez@example.com",
//   fullAddress: "90 Mabini St., San Juan City",
// });

// await db.insert(educationalBackgroundTable).values({
//   applicants_id: 8,
//   gradeLevel: "Grade 8",
//   studentType: "Old Student",
//   schoolYear: "2024-2025",
//   schoolType: "Public",
//   prevSchool: "San Juan National High School",
//   schoolAddress: "San Juan City",
// });

// // 💸 Reservation Fee
// await db.insert(reservationFeeTable).values({
//   applicants_id: 8,
//   academicYear_id: 1,
//   reservationAmount: 500,
//   mop: "Cash",
//   reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/sample_receipt.jpg",
//   dateOfPayment: "2024-03-23",
//   SINumber: "004170",
// });

// // 🗂 Application Status
// await db.insert(applicationStatusTable).values({
//   applicants_id: 8,
//   academicYear_id: 1,
//   trackingId: "857290079955",
//   applicationFormReviewStatus: "Reserved",
//   reservationPaymentStatus: "Reserved",
//   dateOfApplication: "2024-09-05",
// });

// // 🎫 Admission Status
// await db.insert(AdmissionStatusTable).values({
//   applicants_id: 8,
//   academicYear_id: 1,
//   confirmationStatus: "Approved",
//   dateOfConfirmation: "2024-04-10",
//   admissionStatus: "Enrolled",
//   dateOfAdmission: "2024-09-24",
//   isActive: true,
// });

// // 👨‍🎓 Student Info
// await db.insert(StudentInfoTable).values({
//   applicants_id: 8,
//   lrn: "123456789019",
//   studentLastName: "Martinez",
//   studentFirstName: "Sofia",
//   studentMiddleName: "Reyes",
//   fullAddress: "90 Mabini St., San Juan City",
//   studentGender: "Female",
//   studentBirthDate: "2011-07-19",
//   studentAge: 13,
// });

// // 🧾 Breakdown / Tuition Fee
// await db.insert(BreakDownTable).values({
//   applicants_id: 8,
//   academicYear_id: 1,
//   tuitionFee: 31000,
//   miscellaneous: 5500,
//   academic_discount: "With Honor",
//   academic_discount_amount: 1000,
//   withSibling: "No",
//   withSibling_amount: 0,
//   totalTuitionFee: 35500,
//   escGrant: 9000,
// });

// // 💰 Down Payment
// await db.insert(tempdownPaymentTable).values({
//   temp_down_id: 8,
//   applicants_id: 8,
//   academicYear_id: 1,
//   amount: 500,
//   downPaymentDate: "2024-09-13",
//   paymentMethod: "Cash",
//   SINumber: "004170",
// });

// await db.insert(downPaymentTable).values({
//   applicants_id: 8,
//   temp_down_id: 8,
//   academicYear_id: 1,
//   amount: 500,
//   downPaymentDate: "2024-09-13",
//   paymentMethod: "Installments",
//   SINumber: "004170",
// });

// // 🧾 SOA Months (September 2024 - March 2025)
// const months8 = [
//   { label: "September 2024", date: "2024-09-13" },
//   { label: "October 2024", date: "2024-10-13" },
//   { label: "November 2024", date: "2024-11-13" },
//   { label: "December 2024", date: "2024-12-13" },
//   { label: "January 2025", date: "2025-01-13" },
//   { label: "February 2025", date: "2025-02-13" },
//   { label: "March 2025", date: "2025-03-13" },
// ];

// const baseSINumber8 = 4371;

// for (const [i, { label, date }] of months8.entries()) {
//   await db.insert(TempMonthsInSoaTable).values({
//     applicants_id: 8,
//     academicYear_id: 1,
//     temp_month: label,
//     temp_monthlyDue: 3643,
//   });

//   const sin = String(baseSINumber8 + (i + 1)).padStart(6, "0");

//   await db.insert(MonthsInSoaTable).values({
//     temp_month_id: 8,
//     month_id: i + 56,
//     downPaymentId: 8,
//     applicants_id: 8,
//     academicYear_id: 1,
//     month: label,
//     monthlyDue: 3643,
//     amountPaid: 3643,
//     dateOfPayment: date,
//     SINumber: sin,
//   });

//   await db.insert(MonthlyPayementTable).values({
//     month_id: i + 56,
//     student_id: 8,
//     academicYear_id: 1,
//     dateOfPayment: date,
//     amount: 3643,
//     proofOfPayment:
//       "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/sample_receipt.jpg",
//     modeOfPayment: "Cash",
//     SINumber: sin,
//     dateOfVerification: date,
//     status: "Approved",
//   });
// }

// // ESC Grantee
// await db.insert(ESCGranteeTable).values({
//   applicants_id: 8,
//   academicYear_id: 1,
//   ESCGrantee: true,
//   studentType: "Old Student",
// });

// // 👩‍🏫 Student-Section Link
// await db.insert(StudentPerGradeAndSection).values({
//   student_id: 8,
//   section_id: 4,
//   gradeLevel_id: 2,
//   academicYear_id: 1,
// });

// // 🧮 Grades
// const studentGrades8 = Array.from({ length: 7 }, (_, i) => ({
//   student_id: 8,
//   gradeLevel_id: 2,
//   academicYear_id: 1,
//   subject_id: i + 8,
//   finalGrade: 91,
//   remarks: "PASSED",
//   dateSubmitted: "2025-09-13",
// }));

// await db.insert(StudentGradesTable).values(studentGrades8);















  
//   //acadmic year 2 2025-2026 old student
// //   await db.insert(studentTypeTable).values({
// //     applicants_id: 1,
// //     academicYear_id: 2,
// //     studentType: "Old Student",
// //     gradeToEnroll: "Grade 8",
// //     promotion: "PROMOTED",
// //     student_case: "REGULAR",
// //   });

// //   await db.insert(reservationFeeTable).values({
// //     applicants_id: 1,
// //     academicYear_id: 2,
// //     reservationAmount: 500,
// //     mop: "GCash",
// //     reservationReceipt: "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/jlkrjhfbqhza6xrlrtqw.jpg",
// //     dateOfPayment: "2025-03-15",
// //     SINumber: "004130",
// //   });


// //   // 🗂 Application Status
// //   await db.insert(applicationStatusTable).values({
// //     applicants_id: 1,
// //     academicYear_id: 2,
// //     trackingId: "857290079953",
// //     applicationFormReviewStatus: "Reserved",
// //     reservationPaymentStatus: "Reserved",
// //     dateOfApplication: "2025-09-01",
// //   });

// //   // 🎫 Admission Status
// //   await db.insert(AdmissionStatusTable).values({
// //     applicants_id: 1,
// //     academicYear_id: 2,
// //     confirmationStatus: "Approved",
// //     dateOfConfirmation: "2025-04-05",
// //     admissionStatus: "Enrolled",
// //     dateOfAdmission: "2025-09-20",
// //     isActive: true,
// //   });
  
// //   await db.insert(BreakDownTable).values({
// //     applicants_id: 1,
// //     academicYear_id: 2,
// //     tuitionFee: 30000,
// //     miscellaneous: 5000,
// //     academic_discount: "N/a", // With Honor, With High Honor, With Highest Honor
// //     academic_discount_amount: 0,
// //     withSibling: "Yes",// Yes, No
// //     withSibling_amount: 500,
// //     totalTuitionFee: 35000,
// //     escGrant: 9000,
// //   });

// //   await db.insert(tempdownPaymentTable).values({
// //     temp_down_id: 2,
// //     applicants_id: 1,
// //     academicYear_id: 2,
// //     amount: 500,
// //     downPaymentDate: "2025-09-10",
// //     paymentMethod: "Cash",
// //     SINumber: "004330",
// //   });

// //   await db.insert(downPaymentTable).values({
// //     applicants_id: 1,
// //     temp_down_id: 2,
// //     academicYear_id: 2,
// //     amount: 500,
// //     downPaymentDate: "2025-09-10",
// //     paymentMethod: "Installments",  // or full_payment
// //     SINumber: "004330",

// //   });
// // // 🧾 SOA months: September 2024 to March 2025
// // const months20 = [
// //   { label: "September 2025", date: "2025-09-10" },
// //   { label: "October 2025", date: "2025-10-10" },
// //   { label: "November 2025", date: "2025-11-10" },
// //   { label: "December 2025", date: "2025-12-10" },
// //   { label: "January 2026", date: "2026-01-10" },
// //   { label: "February 2026", date: "2026-02-10" },
// //   { label: "March 2026", date: "2026-03-10" },
// // ];

// // const baseSINumber20 = 4330; // 🧾 starting point (004322)

// // // pay only up to October
// // const cutoffMonth = "October 2025";

// // for (const [i, { label, date }] of months2.entries()) {
// //   const sin = String(baseSINumber2 + (i + 1)).padStart(6, "0"); // 004331, 004332, etc.

// //   // determine if month should be marked as paid or unpaid
// //   const isPaid = 
// //     months2.findIndex(m => m.label === label) <= 
// //     months2.findIndex(m => m.label === cutoffMonth);

// //   await db.insert(TempMonthsInSoaTable).values({
// //     applicants_id: 1,
// //     academicYear_id: 1,
// //     temp_month: label,
// //     temp_monthlyDue: 3571.50,
// //   });

// //   await db.insert(MonthsInSoaTable).values({
// //     temp_month_id: i + 1,
// //     downPaymentId: 2,
// //     applicants_id: 2,
// //     academicYear_id: 1,
// //     month: label,
// //     monthlyDue: 3571.50,
// //     amountPaid: isPaid ? 3571.50 : 0, // ✅ only paid up to October
// //     dateOfPayment: isPaid ? date : null,
// //     SINumber: isPaid ? sin : null,
// //   });

// //   // only insert into MonthlyPaymentTable if it's paid
// //   if (isPaid) {
// //     await db.insert(MonthlyPayementTable).values({
// //       month_id: i + 1,
// //       student_id: 1,
// //       academicYear_id: 1,
// //       dateOfPayment: date,
// //       amount: 3571.50,
// //       proofOfPayment:
// //         "https://res.cloudinary.com/dkfn4xy6q/image/upload/v1759658393/reservationPayments/jlkrjhfbqhza6xrlrtqw.jpg",
// //       modeOfPayment: "GCash",
// //       SINumber: sin,
// //       dateOfVerification: date,
// //       status: "Approved",
// //     });
// //   }
// // }

// //   await db.insert(SectionTable).values({
// //     section_id: 1,
// //     sectionName: "Section 1",
// //     limit: 10,
// //     gradeLevel_id: 2,
// //     academicYear_id: 2,
// //   });


// //     // 🏫 Section
// //   await db.insert(SectionTable).values({
// //     section_id: 1,
// //     sectionName: "Section 1",
// //     limit: 10,
// //     gradeLevel_id: 1,
// //     academicYear_id: 1,
// //   });

// //   // make only for Ongoing G7 and or as Old Studnet if it has on as Ongoing G7
// //  await db.insert(ESCGranteeTable).values({
// //    applicants_id: 1,
// //    academicYear_id: 1,
// //    ESCGrantee: true,
// //    studentType: "Old Student"
// //  })



// //   await db.insert(StudentPerGradeAndSection).values({
// //     student_id:1,
// //     section_id:1,
// //     gradeLevel_id:2,
// //     academicYear_id:2
// //   })











//   console.log("✅ Sample applicant and related data inserted successfully!");

// };

// mockData();
