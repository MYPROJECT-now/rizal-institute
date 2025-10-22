import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { MonthsInSoaTable } from "../src/db/schema"; // make sure this is imported
import { eq } from "drizzle-orm";

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlClient);

const updateSOA = async () => {
  const mockMonthlyPayment = [
    { month_id: 1, SINumber: "111111", dateOfPayment: "2022-09-06", amountPaid: 675 },
    { month_id: 2, SINumber: "122222", dateOfPayment: "2022-10-06", amountPaid: 675 },
    { month_id: 3, SINumber: "515111", dateOfPayment: "2022-11-06", amountPaid: 675 },
    { month_id: 4, SINumber: "151112", dateOfPayment: "2022-12-06", amountPaid: 675 },
    { month_id: 5, SINumber: "516515", dateOfPayment: "2023-01-06", amountPaid: 675 },
    { month_id: 6, SINumber: "513215", dateOfPayment: "2023-02-06", amountPaid: 675 },
    { month_id: 7, SINumber: "516515", dateOfPayment: "2023-03-06", amountPaid: 675 },
    { month_id: 8, SINumber: "461589", dateOfPayment: "2023-04-06", amountPaid: 675 },

    // student 2
    { month_id: 9, SINumber: "462389", dateOfPayment: "2022-09-06", amountPaid: 938 },
    { month_id:10, SINumber: "214657", dateOfPayment: "2022-10-06", amountPaid: 938 },
    { month_id:11, SINumber: "856412", dateOfPayment: "2022-11-06", amountPaid: 938 },
    { month_id:12, SINumber: "945102", dateOfPayment: "2022-12-06", amountPaid: 938 },
    { month_id:13, SINumber: "201647", dateOfPayment: "2023-01-06", amountPaid: 937 },
    { month_id:14, SINumber: "112468", dateOfPayment: "2023-02-06", amountPaid: 937 },
    { month_id:15, SINumber: "983251", dateOfPayment: "2023-03-06", amountPaid: 937 },
    { month_id:16, SINumber: "458912", dateOfPayment: "2023-04-06", amountPaid: 937 },

    { month_id: 17, SINumber: "111111", dateOfPayment: "2022-09-06", amountPaid: 3000 },
    { month_id: 25, SINumber: "111111", dateOfPayment: "2022-09-06", amountPaid: 7500 },
    { month_id: 33, SINumber: "111111", dateOfPayment: "2022-09-06", amountPaid: 1500 },

    // student 6
    { month_id:41, SINumber: "649871", dateOfPayment: "2022-09-06", amountPaid: 1575 },
    { month_id:42, SINumber: "719524", dateOfPayment: "2022-10-06", amountPaid: 1575 },
    { month_id:43, SINumber: "839125", dateOfPayment: "2022-11-06", amountPaid: 1575 },
    { month_id:44, SINumber: "951624", dateOfPayment: "2022-12-06", amountPaid: 1575 },
    { month_id:45, SINumber: "302415", dateOfPayment: "2023-01-06", amountPaid: 1575 },
    { month_id:46, SINumber: "634892", dateOfPayment: "2023-02-06", amountPaid: 1575 },
    { month_id:47, SINumber: "127984", dateOfPayment: "2023-03-06", amountPaid: 1575 },
    { month_id:48, SINumber: "973621", dateOfPayment: "2023-04-06", amountPaid: 1575 },

    // student 7
    { month_id:49, SINumber: "612934", dateOfPayment: "2022-09-06", amountPaid: 2063 },
    { month_id:50, SINumber: "483210", dateOfPayment: "2022-10-06", amountPaid: 2063 },
    { month_id:51, SINumber: "928347", dateOfPayment: "2022-11-06", amountPaid: 2063 },
    { month_id:52, SINumber: "501239", dateOfPayment: "2022-12-06", amountPaid: 2063 },
    { month_id:53, SINumber: "718230", dateOfPayment: "2023-01-06", amountPaid: 2062 },
    { month_id:54, SINumber: "362514", dateOfPayment: "2023-02-06", amountPaid: 2062 },
    { month_id:55, SINumber: "491672", dateOfPayment: "2023-03-06", amountPaid: 2062 },
    { month_id:56, SINumber: "705934", dateOfPayment: "2023-04-06", amountPaid: 2062 },

    // student 8
    { month_id:57, SINumber: "825613", dateOfPayment: "2022-09-06", amountPaid: 1000 },
    { month_id:58, SINumber: "162397", dateOfPayment: "2022-10-06", amountPaid: 1000 },
    { month_id:59, SINumber: "951236", dateOfPayment: "2022-11-06", amountPaid: 1000 },
    { month_id:60, SINumber: "704521", dateOfPayment: "2022-12-06", amountPaid: 1000 },
    { month_id:61, SINumber: "435982", dateOfPayment: "2023-01-06", amountPaid: 1000 },
    { month_id:62, SINumber: "248591", dateOfPayment: "2023-02-06", amountPaid: 1000 },
    { month_id:63, SINumber: "381942", dateOfPayment: "2023-03-06", amountPaid: 1000 },
    { month_id:64, SINumber: "972654", dateOfPayment: "2023-04-06", amountPaid: 1000 },

    // student 9
    { month_id:65, SINumber: "561278", dateOfPayment: "2022-09-06", amountPaid: 1575 },
    { month_id:66, SINumber: "947510", dateOfPayment: "2022-10-06", amountPaid: 1575 },
    { month_id:67, SINumber: "432816", dateOfPayment: "2022-11-06", amountPaid: 1575 },
    { month_id:68, SINumber: "216839", dateOfPayment: "2022-12-06", amountPaid: 1575 },
    { month_id:69, SINumber: "845610", dateOfPayment: "2023-01-06", amountPaid: 1575 },
    { month_id:70, SINumber: "659473", dateOfPayment: "2023-02-06", amountPaid: 1575 },
    { month_id:71, SINumber: "951684", dateOfPayment: "2023-03-06", amountPaid: 1575 },
    { month_id:72, SINumber: "705182", dateOfPayment: "2023-04-06", amountPaid: 1575 },

    // student 10
    { month_id:73, SINumber: "139572", dateOfPayment: "2022-09-06", amountPaid: 469 },
    { month_id:74, SINumber: "742183", dateOfPayment: "2022-10-06", amountPaid: 469 },
    { month_id:75, SINumber: "528614", dateOfPayment: "2022-11-06", amountPaid: 469 },
    { month_id:76, SINumber: "319578", dateOfPayment: "2022-12-06", amountPaid: 469 },
    { month_id:77, SINumber: "956103", dateOfPayment: "2023-01-06", amountPaid: 469 },
    { month_id:78, SINumber: "845297", dateOfPayment: "2023-02-06", amountPaid: 469 },
    { month_id:79, SINumber: "621743", dateOfPayment: "2023-03-06", amountPaid: 468 },
    { month_id:80, SINumber: "437905", dateOfPayment: "2023-04-06", amountPaid: 468 },

        // student 11
    { month_id: 81, SINumber: "111801", dateOfPayment: "2022-09-06", amountPaid: 1575 },
    { month_id: 82, SINumber: "111802", dateOfPayment: "2022-10-06", amountPaid: 1575 },
    { month_id: 83, SINumber: "111803", dateOfPayment: "2022-11-06", amountPaid: 1575 },
    { month_id: 84, SINumber: "111804", dateOfPayment: "2022-12-06", amountPaid: 1575 },
    { month_id: 85, SINumber: "111805", dateOfPayment: "2023-01-06", amountPaid: 1575 },
    { month_id: 86, SINumber: "111806", dateOfPayment: "2023-02-06", amountPaid: 1575 },
    { month_id: 87, SINumber: "111807", dateOfPayment: "2023-03-06", amountPaid: 1575 },
    { month_id: 88, SINumber: "111808", dateOfPayment: "2023-04-06", amountPaid: 1575 },

    // student 12
    { month_id: 89, SINumber: "121201", dateOfPayment: "2022-09-06", amountPaid: 1000 },
    { month_id: 90, SINumber: "121202", dateOfPayment: "2022-10-06", amountPaid: 1000 },
    { month_id: 91, SINumber: "121203", dateOfPayment: "2022-11-06", amountPaid: 1000 },
    { month_id: 92, SINumber: "121204", dateOfPayment: "2022-12-06", amountPaid: 1000 },
    { month_id: 93, SINumber: "121205", dateOfPayment: "2023-01-06", amountPaid: 1000 },
    { month_id: 94, SINumber: "121206", dateOfPayment: "2023-02-06", amountPaid: 1000 },
    { month_id: 95, SINumber: "121207", dateOfPayment: "2023-03-06", amountPaid: 1000 },
    { month_id: 96, SINumber: "121208", dateOfPayment: "2023-04-06", amountPaid: 1000 },

    // student 13
    { month_id: 97, SINumber: "131301", dateOfPayment: "2022-09-06", amountPaid: 1575 },
    { month_id: 98, SINumber: "131302", dateOfPayment: "2022-10-06", amountPaid: 1575 },
    { month_id: 99, SINumber: "131303", dateOfPayment: "2022-11-06", amountPaid: 1575 },
    { month_id: 100, SINumber: "131304", dateOfPayment: "2022-12-06", amountPaid: 1575 },
    { month_id: 101, SINumber: "131305", dateOfPayment: "2023-01-06", amountPaid: 1575 },
    { month_id: 102, SINumber: "131306", dateOfPayment: "2023-02-06", amountPaid: 1575 },
    { month_id: 103, SINumber: "131307", dateOfPayment: "2023-03-06", amountPaid: 1575 },
    { month_id: 104, SINumber: "131308", dateOfPayment: "2023-04-06", amountPaid: 1575 },

    // student 14
    { month_id: 105, SINumber: "141401", dateOfPayment: "2022-09-06", amountPaid: 469 },
    { month_id: 106, SINumber: "141402", dateOfPayment: "2022-10-06", amountPaid: 469 },
    { month_id: 107, SINumber: "141403", dateOfPayment: "2022-11-06", amountPaid: 469 },
    { month_id: 108, SINumber: "141404", dateOfPayment: "2022-12-06", amountPaid: 469 },
    { month_id: 109, SINumber: "141405", dateOfPayment: "2023-01-06", amountPaid: 469 },
    { month_id: 110, SINumber: "141406", dateOfPayment: "2023-02-06", amountPaid: 469 },
    { month_id: 111, SINumber: "141407", dateOfPayment: "2023-03-06", amountPaid: 468 },
    { month_id: 112, SINumber: "141408", dateOfPayment: "2023-04-06", amountPaid: 468 },

    // student 15
    { month_id: 113, SINumber: "151501", dateOfPayment: "2022-09-06", amountPaid: 2063 },
    { month_id: 114, SINumber: "151502", dateOfPayment: "2022-10-06", amountPaid: 2063 },
    { month_id: 115, SINumber: "151503", dateOfPayment: "2022-11-06", amountPaid: 2063 },
    { month_id: 116, SINumber: "151504", dateOfPayment: "2022-12-06", amountPaid: 2063 },
    { month_id: 117, SINumber: "151505", dateOfPayment: "2023-01-06", amountPaid: 2062 },
    { month_id: 118, SINumber: "151506", dateOfPayment: "2023-02-06", amountPaid: 2062 },
    { month_id: 119, SINumber: "151507", dateOfPayment: "2023-03-06", amountPaid: 2062 },
    { month_id: 120, SINumber: "151508", dateOfPayment: "2023-04-06", amountPaid: 2062 },

    // student 16
    { month_id: 121, siNumber: "151121", dateOfPayment: "2022-09-06", amountPaid: 1575 },
    { month_id: 122, siNumber: "151122", dateOfPayment: "2022-10-06", amountPaid: 1575 },
    { month_id: 123, siNumber: "151123", dateOfPayment: "2022-11-06", amountPaid: 1575 },
    { month_id: 124, siNumber: "151124", dateOfPayment: "2022-12-06", amountPaid: 1575 },
    { month_id: 125, siNumber: "151125", dateOfPayment: "2023-01-06", amountPaid: 1575 },
    { month_id: 126, siNumber: "151126", dateOfPayment: "2023-02-06", amountPaid: 1575 },
    { month_id: 127, siNumber: "151127", dateOfPayment: "2023-03-06", amountPaid: 1575 },
    { month_id: 128, siNumber: "151128", dateOfPayment: "2023-04-06", amountPaid: 1575 },

    // student 17
    { month_id: 129, siNumber: "151129", dateOfPayment: "2022-09-06", amountPaid: 1000 },
    { month_id: 130, siNumber: "151130", dateOfPayment: "2022-10-06", amountPaid: 1000 },
    { month_id: 131, siNumber: "151131", dateOfPayment: "2022-11-06", amountPaid: 1000 },
    { month_id: 132, siNumber: "151132", dateOfPayment: "2022-12-06", amountPaid: 1000 },
    { month_id: 133, siNumber: "151133", dateOfPayment: "2023-01-06", amountPaid: 1000 },
    { month_id: 134, siNumber: "151134", dateOfPayment: "2023-02-06", amountPaid: 1000 },
    { month_id: 135, siNumber: "151135", dateOfPayment: "2023-03-06", amountPaid: 1000 },
    { month_id: 136, siNumber: "151136", dateOfPayment: "2023-04-06", amountPaid: 1000 },

    // student 18
    { month_id: 137, siNumber: "151137", dateOfPayment: "2022-09-06", amountPaid: 1575 },
    { month_id: 138, siNumber: "151138", dateOfPayment: "2022-10-06", amountPaid: 1575 },
    { month_id: 139, siNumber: "151139", dateOfPayment: "2022-11-06", amountPaid: 1575 },
    { month_id: 140, siNumber: "151140", dateOfPayment: "2022-12-06", amountPaid: 1575 },
    { month_id: 141, siNumber: "151141", dateOfPayment: "2023-01-06", amountPaid: 1575 },
    { month_id: 142, siNumber: "151142", dateOfPayment: "2023-02-06", amountPaid: 1575 },
    { month_id: 143, siNumber: "151143", dateOfPayment: "2023-03-06", amountPaid: 1575 },
    { month_id: 144, siNumber: "151144", dateOfPayment: "2023-04-06", amountPaid: 1575 },

    // student 19
    { month_id: 145, siNumber: "151145", dateOfPayment: "2022-09-06", amountPaid: 2063 },
    { month_id: 146, siNumber: "151146", dateOfPayment: "2022-10-06", amountPaid: 2063 },
    { month_id: 147, siNumber: "151147", dateOfPayment: "2022-11-06", amountPaid: 2063 },
    { month_id: 148, siNumber: "151148", dateOfPayment: "2022-12-06", amountPaid: 2063 },
    { month_id: 149, siNumber: "151149", dateOfPayment: "2023-01-06", amountPaid: 2063 },
    { month_id: 150, siNumber: "151150", dateOfPayment: "2023-02-06", amountPaid: 2063 },
    { month_id: 151, siNumber: "151151", dateOfPayment: "2023-03-06", amountPaid: 2063 },
    { month_id: 152, siNumber: "151152", dateOfPayment: "2023-04-06", amountPaid: 2063 },

    // student 20
    { month_id: 153, siNumber: "151153", dateOfPayment: "2022-09-06", amountPaid: 469 },
    { month_id: 154, siNumber: "151154", dateOfPayment: "2022-10-06", amountPaid: 469 },
    { month_id: 155, siNumber: "151155", dateOfPayment: "2022-11-06", amountPaid: 469 },
    { month_id: 156, siNumber: "151156", dateOfPayment: "2022-12-06", amountPaid: 469 },
    { month_id: 157, siNumber: "151157", dateOfPayment: "2023-01-06", amountPaid: 469 },
    { month_id: 158, siNumber: "151158", dateOfPayment: "2023-02-06", amountPaid: 469 },
    { month_id: 159, siNumber: "151159", dateOfPayment: "2023-03-06", amountPaid: 469 },
    { month_id: 160, siNumber: "151160", dateOfPayment: "2023-04-06", amountPaid: 469 },
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
