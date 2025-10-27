import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { MonthsInSoaTable } from "../src/db/schema"; // make sure this is imported
import { eq } from "drizzle-orm";

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient);

const updateSOA = async () => {
  const mockMonthlyPayment = [
    { month_id: 161, SINumber: "111111", dateOfPayment: "2022-09-06", amountPaid: 938 },
    { month_id: 162, SINumber: "122222", dateOfPayment: "2022-10-06", amountPaid: 938 },
    { month_id: 163, SINumber: "515111", dateOfPayment: "2022-11-06", amountPaid: 938 },
    { month_id: 164, SINumber: "151112", dateOfPayment: "2022-12-06", amountPaid: 938 },
    { month_id: 165, SINumber: "516515", dateOfPayment: "2023-01-06", amountPaid: 937 },
    { month_id: 166, SINumber: "513215", dateOfPayment: "2023-02-06", amountPaid: 937 },
    { month_id: 167, SINumber: "516515", dateOfPayment: "2023-03-06", amountPaid: 937 },
    { month_id: 168, SINumber: "461589", dateOfPayment: "2023-04-06", amountPaid: 937 },

    // student 2
    { month_id: 169, SINumber: "462389", dateOfPayment: "2022-09-06", amountPaid: 938 },
    { month_id: 170, SINumber: "214657", dateOfPayment: "2022-10-06", amountPaid: 938 },
    { month_id: 171, SINumber: "856412", dateOfPayment: "2022-11-06", amountPaid: 938 },
    { month_id: 172, SINumber: "945102", dateOfPayment: "2022-12-06", amountPaid: 938 },
    { month_id: 173, SINumber: "201647", dateOfPayment: "2023-01-06", amountPaid: 937 },
    { month_id: 174, SINumber: "112468", dateOfPayment: "2023-02-06", amountPaid: 937 },
    { month_id: 175, SINumber: "983251", dateOfPayment: "2023-03-06", amountPaid: 937 },
    { month_id: 176, SINumber: "458912", dateOfPayment: "2023-04-06", amountPaid: 937 },

    { month_id: 177, SINumber: "111111", dateOfPayment: "2022-09-06", amountPaid: 7000 },
    { month_id: 185, SINumber: "111111", dateOfPayment: "2022-09-06", amountPaid: 7000 },
    { month_id: 193, SINumber: "111111", dateOfPayment: "2022-09-06", amountPaid: 7000 },

    // student 6
    { month_id: 201, SINumber: "649871", dateOfPayment: "2022-09-06", amountPaid: 675 },
    { month_id: 202, SINumber: "719524", dateOfPayment: "2022-10-06", amountPaid: 675 },
    { month_id: 203, SINumber: "839125", dateOfPayment: "2022-11-06", amountPaid: 675 },
    { month_id: 204, SINumber: "951624", dateOfPayment: "2022-12-06", amountPaid: 675 },
    { month_id: 205, SINumber: "302415", dateOfPayment: "2023-01-06", amountPaid: 675 },
    { month_id: 206, SINumber: "634892", dateOfPayment: "2023-02-06", amountPaid: 675 },
    { month_id: 207, SINumber: "127984", dateOfPayment: "2023-03-06", amountPaid: 675 },
    { month_id: 208, SINumber: "973621", dateOfPayment: "2023-04-06", amountPaid: 675 },

    // student 7
    { month_id: 209, SINumber: "612934", dateOfPayment: "2022-09-06", amountPaid: 938 },
    { month_id: 210, SINumber: "483210", dateOfPayment: "2022-10-06", amountPaid: 938 },
    { month_id: 211, SINumber: "928347", dateOfPayment: "2022-11-06", amountPaid: 938 },
    { month_id: 212, SINumber: "501239", dateOfPayment: "2022-12-06", amountPaid: 938 },
    { month_id: 213, SINumber: "718230", dateOfPayment: "2023-01-06", amountPaid: 937 },
    { month_id: 214, SINumber: "362514", dateOfPayment: "2023-02-06", amountPaid: 937 },
    { month_id: 215, SINumber: "491672", dateOfPayment: "2023-03-06", amountPaid: 937 },
    { month_id: 216, SINumber: "705934", dateOfPayment: "2023-04-06", amountPaid: 937 },

    // student 8
    { month_id: 217, SINumber: "825613", dateOfPayment: "2022-09-06", amountPaid: 1638 },
    { month_id: 218, SINumber: "162397", dateOfPayment: "2022-10-06", amountPaid: 1638 },
    { month_id: 219, SINumber: "951236", dateOfPayment: "2022-11-06", amountPaid: 1638 },
    { month_id: 220, SINumber: "704521", dateOfPayment: "2022-12-06", amountPaid: 1638 },
    { month_id: 221, SINumber: "435982", dateOfPayment: "2023-01-06", amountPaid: 1637 },
    { month_id: 222, SINumber: "248591", dateOfPayment: "2023-02-06", amountPaid: 1637 },
    { month_id: 223, SINumber: "381942", dateOfPayment: "2023-03-06", amountPaid: 1637 },
    { month_id: 224, SINumber: "972654", dateOfPayment: "2023-04-06", amountPaid: 1637 },

    // student 9
    { month_id: 225, SINumber: "561278", dateOfPayment: "2022-09-06", amountPaid: 938 },
    { month_id: 226, SINumber: "947510", dateOfPayment: "2022-10-06", amountPaid: 938 },
    { month_id: 227, SINumber: "432816", dateOfPayment: "2022-11-06", amountPaid: 938 },
    { month_id: 228, SINumber: "216839", dateOfPayment: "2022-12-06", amountPaid: 938 },
    { month_id: 229, SINumber: "845610", dateOfPayment: "2023-01-06", amountPaid: 937 },
    { month_id: 230, SINumber: "659473", dateOfPayment: "2023-02-06", amountPaid: 937 },
    { month_id: 231, SINumber: "951684", dateOfPayment: "2023-03-06", amountPaid: 937 },
    { month_id: 232, SINumber: "705182", dateOfPayment: "2023-04-06", amountPaid: 937 },

    // student 10
    { month_id: 233, SINumber: "139572", dateOfPayment: "2022-09-06", amountPaid: 2063 },
    { month_id: 234, SINumber: "742183", dateOfPayment: "2022-10-06", amountPaid: 2063 },
    { month_id: 235, SINumber: "528614", dateOfPayment: "2022-11-06", amountPaid: 2063 },
    { month_id: 236, SINumber: "319578", dateOfPayment: "2022-12-06", amountPaid: 2063 },
    { month_id: 237, SINumber: "956103", dateOfPayment: "2023-01-06", amountPaid: 2062 },
    { month_id: 238, SINumber: "845297", dateOfPayment: "2023-02-06", amountPaid: 2062 },
    { month_id: 239, SINumber: "621743", dateOfPayment: "2023-03-06", amountPaid: 2062 },
    { month_id: 240, SINumber: "437905", dateOfPayment: "2023-04-06", amountPaid: 2062 },

        // student 11
    { month_id: 241, SINumber: "111801", dateOfPayment: "2022-09-06", amountPaid: 1575 },
    { month_id: 242, SINumber: "111802", dateOfPayment: "2022-10-06", amountPaid: 1575 },
    { month_id: 243, SINumber: "111803", dateOfPayment: "2022-11-06", amountPaid: 1575 },
    { month_id: 244, SINumber: "111804", dateOfPayment: "2022-12-06", amountPaid: 1575 },
    { month_id: 245, SINumber: "111805", dateOfPayment: "2023-01-06", amountPaid: 1575 },
    { month_id: 246, SINumber: "111806", dateOfPayment: "2023-02-06", amountPaid: 1575 },
    { month_id: 247, SINumber: "111807", dateOfPayment: "2023-03-06", amountPaid: 1575 },
    { month_id: 248, SINumber: "111808", dateOfPayment: "2023-04-06", amountPaid: 1575 },

    // student 12
    { month_id: 249, SINumber: "121201", dateOfPayment: "2022-09-06", amountPaid: 2063 },
    { month_id: 250, SINumber: "121202", dateOfPayment: "2022-10-06", amountPaid: 2063 },
    { month_id: 251, SINumber: "121203", dateOfPayment: "2022-11-06", amountPaid: 2063 },
    { month_id: 252, SINumber: "121204", dateOfPayment: "2022-12-06", amountPaid: 2063 },
    { month_id: 253, SINumber: "121205", dateOfPayment: "2023-01-06", amountPaid: 2062 },
    { month_id: 254, SINumber: "121206", dateOfPayment: "2023-02-06", amountPaid: 2062 },
    { month_id: 255, SINumber: "121207", dateOfPayment: "2023-03-06", amountPaid: 2062 },
    { month_id: 256, SINumber: "121208", dateOfPayment: "2023-04-06", amountPaid: 2062 },

    // student 13
    { month_id: 257, SINumber: "131301", dateOfPayment: "2022-09-06", amountPaid: 2063 },
    { month_id: 258, SINumber: "131302", dateOfPayment: "2022-10-06", amountPaid: 2063 },
    { month_id: 259, SINumber: "131303", dateOfPayment: "2022-11-06", amountPaid: 2063 },
    { month_id: 260, SINumber: "131304", dateOfPayment: "2022-12-06", amountPaid: 2063 },
    { month_id: 261, SINumber: "131305", dateOfPayment: "2023-01-06", amountPaid: 2062 },
    { month_id: 262, SINumber: "131306", dateOfPayment: "2023-02-06", amountPaid: 2062 },
    { month_id: 263, SINumber: "131307", dateOfPayment: "2023-03-06", amountPaid: 2062 },
    { month_id: 264, SINumber: "131308", dateOfPayment: "2023-04-06", amountPaid: 2062 },

    // student 14
    { month_id: 265, SINumber: "141401", dateOfPayment: "2022-09-06", amountPaid: 1638 },
    { month_id: 266, SINumber: "141402", dateOfPayment: "2022-10-06", amountPaid: 1638 },
    { month_id: 267, SINumber: "141403", dateOfPayment: "2022-11-06", amountPaid: 1638 },
    { month_id: 268, SINumber: "141404", dateOfPayment: "2022-12-06", amountPaid: 1638 },
    { month_id: 269, SINumber: "141405", dateOfPayment: "2023-01-06", amountPaid: 1637 },
    { month_id: 270, SINumber: "141406", dateOfPayment: "2023-02-06", amountPaid: 1637 },
    { month_id: 271, SINumber: "141407", dateOfPayment: "2023-03-06", amountPaid: 1637 },
    { month_id: 272, SINumber: "141408", dateOfPayment: "2023-04-06", amountPaid: 1637 },

    // student 15
    { month_id: 273, SINumber: "151501", dateOfPayment: "2022-09-06", amountPaid: 2063 },
    { month_id: 274, SINumber: "151502", dateOfPayment: "2022-10-06", amountPaid: 2063 },
    { month_id: 275, SINumber: "151503", dateOfPayment: "2022-11-06", amountPaid: 2063 },
    { month_id: 276, SINumber: "151504", dateOfPayment: "2022-12-06", amountPaid: 2063 },
    { month_id: 277, SINumber: "151505", dateOfPayment: "2023-01-06", amountPaid: 2062 },
    { month_id: 278, SINumber: "151506", dateOfPayment: "2023-02-06", amountPaid: 2062 },
    { month_id: 279, SINumber: "151507", dateOfPayment: "2023-03-06", amountPaid: 2062 },
    { month_id: 280, SINumber: "151508", dateOfPayment: "2023-04-06", amountPaid: 2062 },

    // student 16
    { month_id: 281, siNumber: "151121", dateOfPayment: "2022-09-06", amountPaid: 1575 },
    { month_id: 282, siNumber: "151122", dateOfPayment: "2022-10-06", amountPaid: 1575 },
    { month_id: 283, siNumber: "151123", dateOfPayment: "2022-11-06", amountPaid: 1575 },
    { month_id: 284, siNumber: "151124", dateOfPayment: "2022-12-06", amountPaid: 1575 },
    { month_id: 285, siNumber: "151125", dateOfPayment: "2023-01-06", amountPaid: 1575 },
    { month_id: 286, siNumber: "151126", dateOfPayment: "2023-02-06", amountPaid: 1575 },
    { month_id: 287, siNumber: "151127", dateOfPayment: "2023-03-06", amountPaid: 1575 },
    { month_id: 288, siNumber: "151128", dateOfPayment: "2023-04-06", amountPaid: 1575 },

    // student 17
    { month_id: 289, siNumber: "151129", dateOfPayment: "2022-09-06", amountPaid: 938 },
    { month_id: 290, siNumber: "151130", dateOfPayment: "2022-10-06", amountPaid: 938 },
    { month_id: 291, siNumber: "151131", dateOfPayment: "2022-11-06", amountPaid: 938 },
    { month_id: 292, siNumber: "151132", dateOfPayment: "2022-12-06", amountPaid: 938 },
    { month_id: 293, siNumber: "151133", dateOfPayment: "2023-01-06", amountPaid: 937 },
    { month_id: 294, siNumber: "151134", dateOfPayment: "2023-02-06", amountPaid: 937 },
    { month_id: 295, siNumber: "151135", dateOfPayment: "2023-03-06", amountPaid: 937 },
    { month_id: 296, siNumber: "151136", dateOfPayment: "2023-04-06", amountPaid: 937 },

    // student 18
    { month_id: 297, siNumber: "151137", dateOfPayment: "2022-09-06", amountPaid: 1000 },
    { month_id: 298, siNumber: "151138", dateOfPayment: "2022-10-06", amountPaid: 1000 },
    { month_id: 299, siNumber: "151139", dateOfPayment: "2022-11-06", amountPaid: 1000 },
    { month_id: 300, siNumber: "151140", dateOfPayment: "2022-12-06", amountPaid: 1000 },
    { month_id: 301, siNumber: "151141", dateOfPayment: "2023-01-06", amountPaid: 1000 },
    { month_id: 302, siNumber: "151142", dateOfPayment: "2023-02-06", amountPaid: 1000 },
    { month_id: 303, siNumber: "151143", dateOfPayment: "2023-03-06", amountPaid: 1000 },
    { month_id: 304, siNumber: "151144", dateOfPayment: "2023-04-06", amountPaid: 1000 },

    // student 19
    { month_id: 305, siNumber: "151145", dateOfPayment: "2022-09-06", amountPaid: 469 },
    { month_id: 306, siNumber: "151146", dateOfPayment: "2022-10-06", amountPaid: 469 },
    { month_id: 307, siNumber: "151147", dateOfPayment: "2022-11-06", amountPaid: 469 },
    { month_id: 308, siNumber: "151148", dateOfPayment: "2022-12-06", amountPaid: 469 },
    { month_id: 309, siNumber: "151149", dateOfPayment: "2023-01-06", amountPaid: 468 },
    { month_id: 310, siNumber: "151150", dateOfPayment: "2023-02-06", amountPaid: 468 },
    { month_id: 311, siNumber: "151151", dateOfPayment: "2023-03-06", amountPaid: 468 },
    { month_id: 312, siNumber: "151152", dateOfPayment: "2023-04-06", amountPaid: 468 },

    // student 20
    { month_id: 313, siNumber: "151153", dateOfPayment: "2022-09-06", amountPaid: 1638 },
    { month_id: 314, siNumber: "151154", dateOfPayment: "2022-10-06", amountPaid: 1638 },
    { month_id: 315, siNumber: "151155", dateOfPayment: "2022-11-06", amountPaid: 1638 },
    { month_id: 316, siNumber: "151156", dateOfPayment: "2022-12-06", amountPaid: 1638 },
    { month_id: 317, siNumber: "151157", dateOfPayment: "2023-01-06", amountPaid: 1637 },
    { month_id: 318, siNumber: "151158", dateOfPayment: "2023-02-06", amountPaid: 1637 },
    { month_id: 319, siNumber: "151159", dateOfPayment: "2023-03-06", amountPaid: 1637 },
    { month_id: 320, siNumber: "151160", dateOfPayment: "2023-04-06", amountPaid: 1637 },
  ];

  for (const month of mockMonthlyPayment) {
    await db
      .update(MonthsInSoaTable)
      .set({
        SINumber: month.SINumber,
        dateOfPayment: month.dateOfPayment.split("T")[0],
        amountPaid: month.amountPaid,
        remarks: "GCash",
      })
      .where(eq(MonthsInSoaTable.month_id, month.month_id));
  }

  console.log("SOA updated successfully by month_id!");
};

updateSOA();
