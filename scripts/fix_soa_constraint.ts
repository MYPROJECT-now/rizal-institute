import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function fixSoaConstraint() {
  try {
    console.log("Fixing SOA table constraint...");
    
    // Remove the unique constraint on student_id in MonthsInSoaTable if it exists
    await sql`
      DO $$ 
      BEGIN
        -- Check if the constraint exists and drop it
        IF EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'MonthsInSoaTable_student_id_unique' 
          AND table_name = 'MonthsInSoaTable'
        ) THEN
          ALTER TABLE "MonthsInSoaTable" DROP CONSTRAINT "MonthsInSoaTable_student_id_unique";
          RAISE NOTICE 'Dropped unique constraint on student_id in MonthsInSoaTable';
        ELSE
          RAISE NOTICE 'No unique constraint found on student_id in MonthsInSoaTable';
        END IF;
      END $$;
    `;
    
    console.log("Constraint fix completed successfully!");
  } catch (error) {
    console.error("Error fixing constraint:", error);
  } finally {
    process.exit(0);
  }
}

fixSoaConstraint(); 