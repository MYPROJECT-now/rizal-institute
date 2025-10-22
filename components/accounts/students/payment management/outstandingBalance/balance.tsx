"use client";

import { getInfoForDashboard } from "@/src/actions/studentAction";
import { useEffect, useState } from "react";

export const Balance = () => {
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null);

    useEffect(() => {
      const fetchData = async () => {
        const res = await getInfoForDashboard();
        setData(res);
      };
  
      fetchData();
    }, []);
  
    const studentInfo = data;
    return (
        <div className="text-sm sm:text-lg font-semibold flex sm:gap-2 gap-0 w-full">
        <p>Outstanding Balance:</p>  
        <div className={studentInfo?.paymentMethod === "full_payment" ? "text-dGreen font-semibold" :studentInfo?.outstandingBalance === 0 ? "text-dGreen font-semibold": "text-red-500 font-semibold"}>
          {studentInfo?.paymentMethod === "full_payment" || studentInfo?.outstandingBalance === 0 ? (
            <div>
              <p>Fully Paid</p>
            </div>
          ) : (
            <div>
              <p className="text-black">
                {studentInfo?.outstandingBalance !== undefined
                  ? `₱${studentInfo.outstandingBalance}`
                  : "Loading..."}
              </p>
            </div>
          )}
        </div>
    </div>
    )
}