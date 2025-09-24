import { db } from "@/src/db/drizzle";
import { ReceiptInfoTable } from "@/src/db/schema";
import { desc } from "drizzle-orm";

export const generateSINumber = async () => {
  // Get the latest SINumber
  const lastRecord = await db
    .select({ latest: ReceiptInfoTable.latestSINumber })
    .from(ReceiptInfoTable)
    .orderBy(desc(ReceiptInfoTable.school_id))
    .limit(1);

  let newNumber = "001"; // default if no previous record

  if (lastRecord.length > 0) {
    const lastNumber = lastRecord[0].latest;
    
    // Convert to number, increment
    const incremented = parseInt(lastNumber, 10) + 1;

    // Keep the same length as before (preserve leading zeros)
    const length = lastNumber.length;
    newNumber = incremented.toString().padStart(length, "0");
  }

  return newNumber;
};
