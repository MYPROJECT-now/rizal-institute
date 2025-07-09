"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, School } from "lucide-react";
import { useEffect, useState } from "react";
import { getInfoForDashboard } from "@/src/actions/studentAction";

export const StudentDashboard = () => {
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
    <div className="p-8">
      <motion.div
        className="mb-8 border-b border-gray-200 pb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-dGreen flex items-center gap-2">
          <School className="w-8 h-8" />
          Welcome, {studentInfo?.fullName || "Student"}!
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
                  <p className="text-lg font-semibold">
                    {studentInfo?.lrn || "Loading..."}
                  </p>
                </div>
              </div>

              <div className="p-6 flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <BadgeCheck className="w-6 h-6 text-dGreen" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="text-lg font-semibold text-green-600">
                   pending
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 border-t border-gray-200">
              <div className="p-6 flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <span className="text-2xl font-bold text-dGreen">
                    7
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Year Level</p>
                  <p className="text-lg font-semibold">
                    grade 7
                  </p>
                </div>
              </div>

              <div className="p-6 flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <span className="text-2xl font-bold text-dGreen">SY</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">School Year</p>
                  <p className="text-lg font-semibold">
                  2025-2026
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Outstanding Balance Section */}
      <div className="mt-8">
        <div className="bg-red-50 p-6 border-t-2 border-red-300 rounded-lg shadow-md flex flex-wrap justify-between items-center">
          <span className="text-xl lg:text-2xl font-bold text-red-700">Outstanding Balance:</span>
          <span className="text-lg lg:text-2xl font-bold text-white bg-red-600 px-3 py-1 mt-1 lg:px-6 lg:py-3 rounded-lg shadow-md">
            {studentInfo?.outstandingBalance !== undefined ? `₱${studentInfo.outstandingBalance}` : 'Loading...'}
          </span>
        </div>
      </div>
    </div>
  );
};
