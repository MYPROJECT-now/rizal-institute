  "use client";

  import { motion } from "framer-motion";
  import { Card, CardContent } from "@/components/ui/card";
  import { BadgeCheck, School } from "lucide-react";
  import { useEffect, useState } from "react";
  import { getInfoForDashboard, sendReminder } from "@/src/actions/studentAction";
  import { Skeleton } from "@/components/ui/skeleton"

  export const StudentDashboard = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
      setLoading(true);
      const fetchData = async () => {
        const res = await getInfoForDashboard();
        setData(res);
        setLoading(false);
      };

      fetchData();
    }, []);

    useEffect(() => {
      if (!loading && data) {
        // condition: only trigger if balance is not 0
        if (
          !data.reminderForCurrentMonth && 
          data.outstandingBalance > 0
        ) {
          // call your API
          const handleTrigger = async () => {
            try {
              await sendReminder(data.lrn, data.email, data.outstandingBalance);
            } catch (err) {
              console.error("Failed to trigger API:", err);
            }
          };

          handleTrigger();
        }
      }
    }, [data, loading]); 
  
    const studentInfo = data;

    return (
      <div className="sm:p-8 px-4 py-3">
        <motion.div
          className="mb-8 border-b border-gray-200 pb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className=" text-xl sm:text-3xl font-bold text-dGreen flex items-center gap-2">
            <School className="w-8 h-8" />
            Welcome, {loading ? <Skeleton className="h-10 w-[120px] rounded-lg" /> : studentInfo?.studentLastName} 
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-white shadow-lg border-dGreen/20 border overflow-hidden">
            <div className="bg-dGreen text-white p-4">
              <h2 className="text-xl font-semibold">Student Information</h2>
            </div>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <div className="p-6 flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <span className="text-2xl font-bold text-dGreen">ID</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Student ID</p>
                    <div className="text-lg font-semibold">
                      {loading ? <Skeleton className="h-8 w-[120px] rounded-lg" /> : studentInfo?.lrn}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <BadgeCheck className="w-6 h-6 text-dGreen" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="text-lg font-semibold text-green-600">
                    {loading ? <Skeleton className="h-8 w-[100px] rounded-lg" /> : studentInfo?.admissionStatus}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 border-t border-gray-200">
                <div className="p-6 flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <span className="text-2xl font-bold text-dGreen">
                      {loading ? <Skeleton className="h-6 w-4 rounded-full" /> : studentInfo?.gradeLevelName}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Year Level</p>
                    <div className="text-lg font-semibold">
                    {loading ? <Skeleton className="h-8 w-[100px] rounded-lg" /> : "Grade" + " " + studentInfo?.gradeLevelName    }
                    </div>
                  </div>
                </div>

                <div className="p-6 flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <span className="text-2xl font-bold text-dGreen">SY</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">School Year</p>
                    <div className="text-lg font-semibold">
                      {loading ? <Skeleton className="h-8 w-[100px] rounded-lg" /> : studentInfo?.academicYear} 
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Outstanding Balance Section */}
        <div className="mt-[60px]">
          <div className="bg-red-50 sm:p-6 p-2 border-t-2 border-red-300 rounded-lg shadow-md flex justify-between items-center">
            <span className="sm:text-xl text-sm font-bold text-red-700">Outstanding Balance:</span>
            <span className={studentInfo?.paymentMethod === "full_payment"  ? "text-lg sm:text-2xl font-bold text-white bg-dGreen sm:px-6 px-2 py-3 rounded-lg shadow-md" : studentInfo?.outstandingBalance === 0 ? "text-lg sm:text-2xl font-bold text-white bg-dGreen sm:px-6 px-2 py-3 rounded-lg shadow-md" : "text-lg sm:text-2xl  font-bold text-white bg-red-600 px-6 py-3 rounded-lg shadow-md"}>
              {studentInfo?.paymentMethod === "full_payment" || studentInfo?.outstandingBalance === 0 ? (
                <div>
                  <p className="sm:text-xl text-sm">Fully Paid</p>
                </div>
              ) : (
                <div>
                  <p>
                    {studentInfo?.outstandingBalance !== undefined
                      ? `₱${studentInfo.outstandingBalance}`
                      : "..."}
                  </p>
                </div>
              )}

            </span>
          </div>
        </div>
      </div>
    );
  };
