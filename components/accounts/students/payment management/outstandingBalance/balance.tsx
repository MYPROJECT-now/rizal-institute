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
        <div className="text-lg font-semibold flex gap-2 flex-wrap">
        <p>Outstanding Balance:</p>  
        <p className="text-red-600"> 
            {studentInfo?.outstandingBalance !== undefined ? `₱${studentInfo.outstandingBalance}` : 'Loading...'}
        </p>
    </div>
    )
}