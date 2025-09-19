import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { staffClerkUserTable } from "../src/db/schema";
import { clerkClient } from '@clerk/clerk-sdk-node';
import { getAcademicYearID } from "../src/actions/utils/academicYear";

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient);

const staffAccounts = [
  {
    role: "admin",
    username: "admin",
    password: "AdminPass0123",
    email: "admin@school.com",
  },
  {
    role: "cashier",
    username: "cashier",
    password: "CashierPass0123",
    email: "cashier@school.com",
  },
  {
    role: "registrar",
    username: "registrar",
    password: "RegistrarPass0123",
    email: "registrar@school.com",
  },
  {
    role: "teacher",
    username: "teacher",
    password: "TeacherPass0123",
    email: "teacher@school.com",
  },
    {
    role: "teacher",
    username: "rosaly",
    password: "RosalyPass0123",
    email: "teacher@school.com",
  },
    {
    role: "teacher",
    username: "marc",
    password: "MarcPass0123",
    email: "teacher@school.com",
  },
    {
    role: "teacher",
    username: "levi",
    password: "LeviPass0123",
    email: "teacher@school.com",
  },
    {
    role: "teacher",
    username: "conan",
    password: "ConanPass0123",
    email: "teacher@school.com",
  },

];

const createStaffAccounts = async () => {
  try {
    const academicYearID = await getAcademicYearID();

    for (const account of staffAccounts) {
      const { username, password, email, role } = account;

      // Check if user already exists (optional, for idempotency)
      const existing = await clerkClient.users.getUserList({ emailAddress: [email] });
      if (existing.length > 0) {
        console.log(`User already exists: ${username}`);
        continue;
      }

      // Create Clerk user
      const clerkUser = await clerkClient.users.createUser({
        username: username,
        password,
        emailAddress: [email],
        firstName: username,
        publicMetadata: {
          role,
        },
      });

      // Insert to DB
      await db.insert(staffClerkUserTable).values({
        selected_AcademicYear_id: academicYearID,
        clerkId: clerkUser.id,
        userType: role,
        clerk_username: username,
        clerk_email: email,
      });

      console.log(`✅ Created account: ${role} (${email})`);
    }
  } catch (err) {
    console.error("❌ Error creating staff accounts:", err);
    process.exit(1);
  }
};

createStaffAccounts();
