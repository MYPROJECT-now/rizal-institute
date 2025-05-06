import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../src/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });
const FillDatabase = async () => {
  // Insert multiple guardians
  await db.insert(schema.guardianAndParentsTable).values([
    {
      guardiansLastName: "Santos",
      guardiansFirstName: "Maria",
      guardiansMiddleName: "Dela Cruz",
      guardiansSuffix: null,
      fullAddress: "123 Main St, Quezon City",
      mobileNumber: "09171234567",
      email: "iedivinagracia@ccc.edu.ph",
    },
    {
      guardiansLastName: "Reyes",
      guardiansFirstName: "Carlos",
      guardiansMiddleName: "Manuel",
      guardiansSuffix: null,
      fullAddress: "456 Elm St, Pasig City",
      mobileNumber: "09181234567",
      email: "carlos.reyes@example.com",
    },
    {
      guardiansLastName: "Lopez",
      guardiansFirstName: "Ana",
      guardiansMiddleName: "Maria",
      guardiansSuffix: null,
      fullAddress: "789 Pine St, Makati City",
      mobileNumber: "09192233445",
      email: "ana.lopez@example.com",
    },
    {
      guardiansLastName: "Martinez",
      guardiansFirstName: "Juan",
      guardiansMiddleName: "Dela Cruz",
      guardiansSuffix: null,
      fullAddress: "101 Oak St, Mandaluyong City",
      mobileNumber: "09172233445",
      email: "juan.martinez@example.com",
    },
    {
      guardiansLastName: "Torres",
      guardiansFirstName: "Maria",
      guardiansMiddleName: "Dela Cruz", 
      guardiansSuffix: null,
      fullAddress: "123 Main St, Quezon City",
      mobileNumber: "09171234567",
      email: "iedivinagracia@ccc.edu.ph",
    }

  ]);

  // Insert multiple educational backgrounds
  await db.insert(schema.educationalBackgroundTable).values([
    {
      admissionStatus: "Freshmen",
      prevSchool: "St. John Academy",
      schoolAddress: "Caloocan City",
      schoolType: "Private",
      gradeLevel: "Grade 7",
      schoolYear: "2024-2025",
    },
    {
      admissionStatus: "Transferee",
      prevSchool: "Manila Science High School",
      schoolAddress: "Manila City",
      schoolType: "Public",
      gradeLevel: "Grade 8",
      schoolYear: "2023-2024",
    },
    {
      admissionStatus: "Freshmen",
      prevSchool: "Assumption College",
      schoolAddress: "San Lorenzo Village",
      schoolType: "Private",
      gradeLevel: "Grade 9",
      schoolYear: "2024-2025",
    },
    {
      admissionStatus: "Transferee",
      prevSchool: "Ateneo de Manila University",
      schoolAddress: "Sampaloc, Manila",
      schoolType: "Private",
      gradeLevel: "Grade 10",
      schoolYear: "2023-2024",
    },
    {
      admissionStatus: "Transferee",
      prevSchool: "De La Salle University",
      schoolAddress: "Taft Avenue, Manila",
      schoolType: "Private",
      gradeLevel: "Grade 11",
      schoolYear: "2023-2024",
    }
  ]);

  // Insert multiple students
  await db.insert(schema.studentsInformationTable).values([
    {
      lrn: "987654321000",
      studentsLastName: "Santos",
      studentsFirstName: "Juan",
      studentsMiddleName: "Reyes",
      studentsSuffix: null,
      dateOfBirth: new Date("2010-05-22").toISOString().slice(0, 10),
      age: 14,
      gender: "Male",
      civilStatus: "Single",
      nationality: "Filipino",
      religion: "Catholic",
    },
    {
      lrn: "987654321001",
      studentsLastName: "Reyes",
      studentsFirstName: "Lucia",
      studentsMiddleName: "Martinez",
      studentsSuffix: null,
      dateOfBirth: new Date("2009-11-10").toISOString().slice(0, 10),
      age: 15,
      gender: "Female",
      civilStatus: "Single",
      nationality: "Filipino",
      religion: "Catholic",
    },
    {
      lrn: "987654321002",
      studentsLastName: "Lopez",
      studentsFirstName: "Miguel",
      studentsMiddleName: "Torres",
      studentsSuffix: "Jr.",
      dateOfBirth: new Date("2008-02-15").toISOString().slice(0, 10),
      age: 16,
      gender: "Male",
      civilStatus: "Single",
      nationality: "Filipino",
      religion: "Christian",
    },
    {
      lrn: "987654321003",
      studentsLastName: "Martinez",
      studentsFirstName: "Maria",
      studentsMiddleName: "Garcia",
      studentsSuffix: null,
      dateOfBirth: new Date("2011-08-30").toISOString().slice(0, 10),
      age: 13,
      gender: "Female",
      civilStatus: "Single",
      nationality: "Filipino",
      religion: "Catholic",
    },
    {
      lrn: "987654321004",
      studentsLastName: "Torres",
      studentsFirstName: "Juan",
      studentsMiddleName: "Santos",
      studentsSuffix: null,
      dateOfBirth: new Date("2010-05-22").toISOString().slice(0, 10),
      age: 14,
      gender: "Male",
      civilStatus: "Single",
      nationality: "Filipino",
      religion: "Catholic",
    }
  ]);

  await db.insert(schema.applicationStatusTable).values([
    {
      trackingId: "125658456585",
      applicationStatus: "Pending",
      reservationPaymentStatus: "Pending",
      dateOfApplication: new Date("2024-04-01").toISOString().slice(0, 10),
    },
    {
      trackingId: "532151865486",
      applicationStatus: "Pending",
      reservationPaymentStatus: "Pending",
      dateOfApplication: new Date("2024-04-01").toISOString().slice(0, 10),
    },
    {
      trackingId: "653212165158",
      applicationStatus: "Pending",
      reservationPaymentStatus: "Pending",
      dateOfApplication: new Date("2024-04-01").toISOString().slice(0, 10),
    },
    {
      trackingId: "546546546546",
      applicationStatus: "Pending",
      reservationPaymentStatus: "Pending",
      dateOfApplication: new Date("2024-04-01").toISOString().slice(0, 10),
    },
    {
      trackingId: "546546546546",
      applicationStatus: "Pending",
      reservationPaymentStatus: "Pending",
      dateOfApplication: new Date("2024-04-01").toISOString().slice(0, 10),
    }
  ]);

  await db.insert(schema.reservationStatusTable).values([
    {
      admissionStatus: "Pending",
    },
    {
      admissionStatus: "Pending",
    },
    {
      admissionStatus: "Pending",
    },
    {
      admissionStatus: "Pending",
    },
    {
      admissionStatus: "Pending",
    }
  ]);


};

const main = async () => {
  try {
    console.log("Seeding the database");

    // Clear existing data
    await db.delete(schema.studentsInformationTable);
    await db.delete(schema.guardianAndParentsTable);
    await db.delete(schema.educationalBackgroundTable);
    await db.delete(schema.applicationStatusTable);
    await db.delete(schema.reservationStatusTable);

    // Fill database
    await FillDatabase();

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
