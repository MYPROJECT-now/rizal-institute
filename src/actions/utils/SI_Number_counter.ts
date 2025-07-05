

import { db } from "../../db/drizzle";
import { eq } from "drizzle-orm";
import { SINumberCounter } from "../../db/schema";

// export const generateSINumber = async () => {
//   const counter = await db.select().from(SINumberCounter).limit(1);

//   if (!counter || counter.length === 0) throw new Error("SI counter not initialized");

//   const counterRecord = counter[0];
//   const next = counterRecord.latestNumber + 1;

//   const formatted = String(next).padStart(7, "0");

//   console.log("📦 Generated SI Number:", formatted); // 👈 LOG HERE

//   await db
//     .update(SINumberCounter)
//     .set({ latestNumber: next })
//     .where(eq(SINumberCounter.id, counterRecord.id));

//   return formatted;
// };


export const generateSINumber = async () => {
  const counter = await db.select().from(SINumberCounter).limit(1);

  let next: number;
  let counterId: number;

  if (!counter || counter.length === 0) {
    // Table is empty, insert default
    next = 32401;

    const inserted = await db.insert(SINumberCounter).values({
      latestNumber: next
    }).returning();

    counterId = inserted[0].id;

  } else {
    const counterRecord = counter[0];
    next = (counterRecord.latestNumber ?? 32400) + 1;
    counterId = counterRecord.id;

    await db.update(SINumberCounter)
      .set({ latestNumber: next })
      .where(eq(SINumberCounter.id, counterId));
  }

  const formatted = String(next).padStart(7, "0");
  console.log("📦 Generated SI Number:", formatted);

  return formatted;
};
