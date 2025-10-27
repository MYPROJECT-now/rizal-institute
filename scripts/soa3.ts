import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { MonthsInSoaTable } from "../src/db/schema"; // make sure this is imported
import { eq } from "drizzle-orm";

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient);

const updateSOA = async () => {
  const mockMonthlyPayment = [
    { month_id: 321, SINumber: "111111", dateOfPayment: "2022-09-06", amountPaid: 938 },
    { month_id: 322, SINumber: "122222", dateOfPayment: "2022-10-06", amountPaid: 938 },
    { month_id: 323, SINumber: "515111", dateOfPayment: "2022-11-06", amountPaid: 938 },
    { month_id: 324, SINumber: "151112", dateOfPayment: "2022-12-06", amountPaid: 938 },
    { month_id: 325, SINumber: "516515", dateOfPayment: "2023-01-06", amountPaid: 937 },
    { month_id: 326, SINumber: "513215", dateOfPayment: "2023-02-06", amountPaid: 937 },
    { month_id: 327, SINumber: "516515", dateOfPayment: "2023-03-06", amountPaid: 937 },
    { month_id: 328, SINumber: "461589", dateOfPayment: "2023-04-06", amountPaid: 937 },

    // student 2
    { month_id: 329, SINumber: "462389", dateOfPayment: "2022-09-06", amountPaid: 875 },
    { month_id: 330, SINumber: "214657", dateOfPayment: "2022-10-06", amountPaid: 875 },
    { month_id: 331, SINumber: "856412", dateOfPayment: "2022-11-06", amountPaid: 875 },
    { month_id: 332, SINumber: "945102", dateOfPayment: "2022-12-06", amountPaid: 875 },
    { month_id: 333, SINumber: "201647", dateOfPayment: "2023-01-06", amountPaid: 875 },
    { month_id: 334, SINumber: "112468", dateOfPayment: "2023-02-06", amountPaid: 875 },
    { month_id: 335, SINumber: "983251", dateOfPayment: "2023-03-06", amountPaid: 875 },
    { month_id: 336, SINumber: "458912", dateOfPayment: "2023-04-06", amountPaid: 875 },

    { month_id: 337, SINumber: "111111", dateOfPayment: "2022-09-06", amountPaid: 7500 },
    { month_id: 345, SINumber: "111111", dateOfPayment: "2022-09-06", amountPaid: 7500 },
    { month_id: 353, SINumber: "111111", dateOfPayment: "2022-09-06", amountPaid: 7500 },

    // student 6
    { month_id: 361, SINumber: "649871", dateOfPayment: "2022-09-06", amountPaid: 938 },
    { month_id: 362, SINumber: "719524", dateOfPayment: "2022-10-06", amountPaid: 938 },
    { month_id: 363, SINumber: "839125", dateOfPayment: "2022-11-06", amountPaid: 938 },
    { month_id: 364, SINumber: "951624", dateOfPayment: "2022-12-06", amountPaid: 938 },
    { month_id: 365, SINumber: "302415", dateOfPayment: "2023-01-06", amountPaid: 937 },
    { month_id: 366, SINumber: "634892", dateOfPayment: "2023-02-06", amountPaid: 937 },
    { month_id: 367, SINumber: "127984", dateOfPayment: "2023-03-06", amountPaid: 937 },
    { month_id: 368, SINumber: "973621", dateOfPayment: "2023-04-06", amountPaid: 937 },

    // student 7
    { month_id: 369, SINumber: "612934", dateOfPayment: "2022-09-06", amountPaid: 938 },
    { month_id: 370, SINumber: "483210", dateOfPayment: "2022-10-06", amountPaid: 938 },
    { month_id: 371, SINumber: "928347", dateOfPayment: "2022-11-06", amountPaid: 938 },
    { month_id: 372, SINumber: "501239", dateOfPayment: "2022-12-06", amountPaid: 938 },
    { month_id: 373, SINumber: "718230", dateOfPayment: "2023-01-06", amountPaid: 937 },
    { month_id: 374, SINumber: "362514", dateOfPayment: "2023-02-06", amountPaid: 937 },
    { month_id: 375, SINumber: "491672", dateOfPayment: "2023-03-06", amountPaid: 937 },
    { month_id: 376, SINumber: "705934", dateOfPayment: "2023-04-06", amountPaid: 937 },

    // student 8
    { month_id: 377, SINumber: "825613", dateOfPayment: "2022-09-06", amountPaid: 2063 },
    { month_id: 378, SINumber: "162397", dateOfPayment: "2022-10-06", amountPaid: 2063 },
    { month_id: 379, SINumber: "951236", dateOfPayment: "2022-11-06", amountPaid: 2063 },
    { month_id: 380, SINumber: "704521", dateOfPayment: "2022-12-06", amountPaid: 2063 },
    { month_id: 381, SINumber: "435982", dateOfPayment: "2023-01-06", amountPaid: 2062 },
    { month_id: 382, SINumber: "248591", dateOfPayment: "2023-02-06", amountPaid: 2062 },
    { month_id: 383, SINumber: "381942", dateOfPayment: "2023-03-06", amountPaid: 2062 },
    { month_id: 384, SINumber: "972654", dateOfPayment: "2023-04-06", amountPaid: 2062 },

    // student 9
    { month_id: 385, SINumber: "561278", dateOfPayment: "2022-09-06", amountPaid: 2063 },
    { month_id: 386, SINumber: "947510", dateOfPayment: "2022-10-06", amountPaid: 2063 },
    { month_id: 387, SINumber: "432816", dateOfPayment: "2022-11-06", amountPaid: 2063 },
    { month_id: 388, SINumber: "216839", dateOfPayment: "2022-12-06", amountPaid: 2063 },
    { month_id: 389, SINumber: "845610", dateOfPayment: "2023-01-06", amountPaid: 2062 },
    { month_id: 390, SINumber: "659473", dateOfPayment: "2023-02-06", amountPaid: 2062 },
    { month_id: 391, SINumber: "951684", dateOfPayment: "2023-03-06", amountPaid: 2062 },
    { month_id: 392, SINumber: "705182", dateOfPayment: "2023-04-06", amountPaid: 2062 },

    // student 10
    { month_id: 393, SINumber: "139572", dateOfPayment: "2022-09-06", amountPaid: 2063 },
    { month_id: 394, SINumber: "742183", dateOfPayment: "2022-10-06", amountPaid: 2063 },
    { month_id: 395, SINumber: "528614", dateOfPayment: "2022-11-06", amountPaid: 2063 },
    { month_id: 396, SINumber: "319578", dateOfPayment: "2022-12-06", amountPaid: 2063 },
    { month_id: 397, SINumber: "956103", dateOfPayment: "2023-01-06", amountPaid: 2062 },
    { month_id: 398, SINumber: "845297", dateOfPayment: "2023-02-06", amountPaid: 2062 },
    { month_id: 399, SINumber: "621743", dateOfPayment: "2023-03-06", amountPaid: 2062 },
    { month_id: 400, SINumber: "437905", dateOfPayment: "2023-04-06", amountPaid: 2062 },

        // student 11
    { month_id: 401, SINumber: "111801", dateOfPayment: "2022-09-06", amountPaid: 675 },
    { month_id: 402, SINumber: "111802", dateOfPayment: "2022-10-06", amountPaid: 675 },
    { month_id: 403, SINumber: "111803", dateOfPayment: "2022-11-06", amountPaid: 675 },
    { month_id: 404, SINumber: "111804", dateOfPayment: "2022-12-06", amountPaid: 675 },
    { month_id: 405, SINumber: "111805", dateOfPayment: "2023-01-06", amountPaid: 675 },
    { month_id: 406, SINumber: "111806", dateOfPayment: "2023-02-06", amountPaid: 675 },
    { month_id: 407, SINumber: "111807", dateOfPayment: "2023-03-06", amountPaid: 675 },
    { month_id: 408, SINumber: "111808", dateOfPayment: "2023-04-06", amountPaid: 675 },

    // student 12
    { month_id: 409, SINumber: "121201", dateOfPayment: "2022-09-06", amountPaid: 938 },
    { month_id: 410, SINumber: "121202", dateOfPayment: "2022-10-06", amountPaid: 938 },
    { month_id: 411, SINumber: "121203", dateOfPayment: "2022-11-06", amountPaid: 938 },
    { month_id: 412, SINumber: "121204", dateOfPayment: "2022-12-06", amountPaid: 938 },
    { month_id: 413, SINumber: "121205", dateOfPayment: "2023-01-06", amountPaid: 937 },
    { month_id: 414, SINumber: "121206", dateOfPayment: "2023-02-06", amountPaid: 937 },
    { month_id: 415, SINumber: "121207", dateOfPayment: "2023-03-06", amountPaid: 937 },
    { month_id: 416, SINumber: "121208", dateOfPayment: "2023-04-06", amountPaid: 937 },

    // student 13
    { month_id: 417, SINumber: "131301", dateOfPayment: "2022-09-06", amountPaid: 2063 },
    { month_id: 418, SINumber: "131302", dateOfPayment: "2022-10-06", amountPaid: 2063 },
    { month_id: 419, SINumber: "131303", dateOfPayment: "2022-11-06", amountPaid: 2063 },
    { month_id: 420, SINumber: "131304", dateOfPayment: "2022-12-06", amountPaid: 2063 },
    { month_id: 421, SINumber: "131305", dateOfPayment: "2023-01-06", amountPaid: 2062 },
    { month_id: 422, SINumber: "131306", dateOfPayment: "2023-02-06", amountPaid: 2062 },
    { month_id: 423, SINumber: "131307", dateOfPayment: "2023-03-06", amountPaid: 2062 },
    { month_id: 424, SINumber: "131308", dateOfPayment: "2023-04-06", amountPaid: 2062 },

    // student 14
    { month_id: 425, SINumber: "141401", dateOfPayment: "2022-09-06", amountPaid: 2063 },
    { month_id: 426, SINumber: "141402", dateOfPayment: "2022-10-06", amountPaid: 2063 },
    { month_id: 427, SINumber: "141403", dateOfPayment: "2022-11-06", amountPaid: 2063 },
    { month_id: 428, SINumber: "141404", dateOfPayment: "2022-12-06", amountPaid: 2063 },
    { month_id: 429, SINumber: "141405", dateOfPayment: "2023-01-06", amountPaid: 2062 },
    { month_id: 430, SINumber: "141406", dateOfPayment: "2023-02-06", amountPaid: 2062 },
    { month_id: 431, SINumber: "141407", dateOfPayment: "2023-03-06", amountPaid: 2062 },
    { month_id: 432, SINumber: "141408", dateOfPayment: "2023-04-06", amountPaid: 2062 },

    // student 15
    { month_id: 433, SINumber: "151501", dateOfPayment: "2022-09-06", amountPaid: 1638 },
    { month_id: 434, SINumber: "151502", dateOfPayment: "2022-10-06", amountPaid: 1638 },
    { month_id: 435, SINumber: "151503", dateOfPayment: "2022-11-06", amountPaid: 1638 },
    { month_id: 436, SINumber: "151504", dateOfPayment: "2022-12-06", amountPaid: 1638 },
    { month_id: 437, SINumber: "151505", dateOfPayment: "2023-01-06", amountPaid: 1637 },
    { month_id: 438, SINumber: "151506", dateOfPayment: "2023-02-06", amountPaid: 1637 },
    { month_id: 439, SINumber: "151507", dateOfPayment: "2023-03-06", amountPaid: 1637 },
    { month_id: 440, SINumber: "151508", dateOfPayment: "2023-04-06", amountPaid: 1637 },

    // student 16
    { month_id: 441, siNumber: "151121", dateOfPayment: "2022-09-06", amountPaid: 1575 },
    { month_id: 442, siNumber: "151122", dateOfPayment: "2022-10-06", amountPaid: 1575 },
    { month_id: 443, siNumber: "151123", dateOfPayment: "2022-11-06", amountPaid: 1575 },
    { month_id: 444, siNumber: "151124", dateOfPayment: "2022-12-06", amountPaid: 1575 },
    { month_id: 445, siNumber: "151125", dateOfPayment: "2023-01-06", amountPaid: 1575 },
    { month_id: 446, siNumber: "151126", dateOfPayment: "2023-02-06", amountPaid: 1575 },
    { month_id: 447, siNumber: "151127", dateOfPayment: "2023-03-06", amountPaid: 1575 },
    { month_id: 448, siNumber: "151128", dateOfPayment: "2023-04-06", amountPaid: 1575 },

    // student 17
    { month_id: 449, siNumber: "151129", dateOfPayment: "2022-09-06", amountPaid: 2063 },
    { month_id: 450, siNumber: "151130", dateOfPayment: "2022-10-06", amountPaid: 2063 },
    { month_id: 451, siNumber: "151131", dateOfPayment: "2022-11-06", amountPaid: 2063 },
    { month_id: 452, siNumber: "151132", dateOfPayment: "2022-12-06", amountPaid: 2063 },
    { month_id: 453, siNumber: "151133", dateOfPayment: "2023-01-06", amountPaid: 2062 },
    { month_id: 454, siNumber: "151134", dateOfPayment: "2023-02-06", amountPaid: 2062 },
    { month_id: 455, siNumber: "151135", dateOfPayment: "2023-03-06", amountPaid: 2062 },
    { month_id: 456, siNumber: "151136", dateOfPayment: "2023-04-06", amountPaid: 2062 },

    // student 18
    { month_id: 457, siNumber: "151137", dateOfPayment: "2022-09-06", amountPaid: 2063 },
    { month_id: 458, siNumber: "151138", dateOfPayment: "2022-10-06", amountPaid: 2063 },
    { month_id: 459, siNumber: "151139", dateOfPayment: "2022-11-06", amountPaid: 2063 },
    { month_id: 460, siNumber: "151140", dateOfPayment: "2022-12-06", amountPaid: 2063 },
    { month_id: 461, siNumber: "151141", dateOfPayment: "2023-01-06", amountPaid: 2062 },
    { month_id: 462, siNumber: "151142", dateOfPayment: "2023-02-06", amountPaid: 2062 },
    { month_id: 463, siNumber: "151143", dateOfPayment: "2023-03-06", amountPaid: 2062 },
    { month_id: 464, siNumber: "151144", dateOfPayment: "2023-04-06", amountPaid: 2062 },

    // student 19
    { month_id: 465, siNumber: "151145", dateOfPayment: "2022-09-06", amountPaid: 2063 },
    { month_id: 466, siNumber: "151146", dateOfPayment: "2022-10-06", amountPaid: 2063 },
    { month_id: 467, siNumber: "151147", dateOfPayment: "2022-11-06", amountPaid: 2063 },
    { month_id: 468, siNumber: "151148", dateOfPayment: "2022-12-06", amountPaid: 2063 },
    { month_id: 469, siNumber: "151149", dateOfPayment: "2023-01-06", amountPaid: 2062 },
    { month_id: 470, siNumber: "151150", dateOfPayment: "2023-02-06", amountPaid: 2062 },
    { month_id: 471, siNumber: "151151", dateOfPayment: "2023-03-06", amountPaid: 2062 },
    { month_id: 472, siNumber: "151152", dateOfPayment: "2023-04-06", amountPaid: 2062 },

    // student 20
    { month_id: 473, siNumber: "151153", dateOfPayment: "2022-09-06", amountPaid: 1638 },
    { month_id: 474, siNumber: "151154", dateOfPayment: "2022-10-06", amountPaid: 1638 },
    { month_id: 475, siNumber: "151155", dateOfPayment: "2022-11-06", amountPaid: 1638 },
    { month_id: 476, siNumber: "151156", dateOfPayment: "2022-12-06", amountPaid: 1638 },
    { month_id: 477, siNumber: "151157", dateOfPayment: "2023-01-06", amountPaid: 1637 },
    { month_id: 478, siNumber: "151158", dateOfPayment: "2023-02-06", amountPaid: 1637 },
    { month_id: 479, siNumber: "151159", dateOfPayment: "2023-03-06", amountPaid: 1637 },
    { month_id: 480, siNumber: "151160", dateOfPayment: "2023-04-06", amountPaid: 1637 },
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
