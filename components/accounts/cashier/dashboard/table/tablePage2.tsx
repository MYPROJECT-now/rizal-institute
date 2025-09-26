
import { getRecentPayments } from "@/src/actions/cashierAction";
import { RecentPaymentType } from "@/src/type/CASHIER/RECENT_PAYMENT/recentPayment";


export const RecentPaymentsTable = async  () => {

const recentPayment: RecentPaymentType[] = await getRecentPayments();


  return (
    <div className="overflow-x-auto min-w-[100px] mb-10 shadow-lg rounded-lg border border-green-300 bg-green-50">
      <table className="w-full text-sm text-center">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="border p-2">LRN</th>
            <th className="border p-2 min-w-[120px] sm:min-w-0">Student Name</th>
            <th className="border p-2 min-w-[100px] sm:min-w-0">Grade Level</th>
            <th className="border p-2 min-w-[120px] sm:min-w-0">Amount Paid</th>
            <th className="border p-2 min-w-[100px] sm:min-w-0">Date Paid</th>
          </tr>
        </thead>
        <tbody>
          {recentPayment.length === 0 ? (
            <tr>  
              <td colSpan={5} className="border p-2 text-center">
                No recent payments found.
              </td>
            </tr>
          ) : (
          recentPayment.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-green-100"
                } hover:bg-green-300 transition duration-200`}
              >
              <td className="border p-2">{item.lrn}</td>
              <td className="border p-2">{item.studentLastName}, {item.studentFirstName} {item.studentMiddleName} {item.studentSuffix}</td>
              <td className="border px-[55px]">Grade 7</td>
              <td className="border p-2">₱{item.amount.toLocaleString()}</td>
              <td className="border p-2">{item.dateOfPayment}</td>
            </tr>
          ))
        )}
        </tbody>
      </table>
    </div>
  );
};
