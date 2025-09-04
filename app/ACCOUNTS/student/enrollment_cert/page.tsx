"use client";

import React, { useEffect, useState } from "react";
import Admin_student from "@/components/sidebar/header/header_student";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { getInfoForDashboard, StudentInfo } from "@/src/actions/studentAction";
import EnrollmentCert from "@/components/accounts/students/enrollment certificate/enrollment_cert";

export default function Certificate() {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);

  const fullName = [
    studentInfo?.studentFirstName,
    studentInfo?.studentMiddleName,
    studentInfo?.studentLastName,
    studentInfo?.studentSuffix,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getInfoForDashboard();
      setStudentInfo(res);
    };
    fetchData();
  }, []);

        return (
          <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10 bg-page">
            <Admin_student />
            <div className="w-full h-auto lg:h-[540px] bg-white self-center mt-10 rounded-lg">
              <div>
                {!studentInfo ? (
              <div className="w-full h-[500px] flex items-center justify-center">
                <p className="text-dGreen font-semibold">
                      Please wait for the student information to load before downloading.
                </p>
              </div>
                ) : (
                  <PDFViewer className="w-[100%] h-[500px]">
                    <EnrollmentCert studentInfo={studentInfo} />
                  </PDFViewer>
                )}

                <div className="flex justify-center">
                  {studentInfo ? (
                    <PDFDownloadLink
                      fileName={`Certificate_of_Enrollment_${fullName}`}
                      document={<EnrollmentCert studentInfo={studentInfo} />}
                    >
                      {({ loading }) => (
                        <Button
                          disabled={loading}
                          className="disabled:opacity-50 disabled:cursor-not-allowed bg-dGreen hover:bg-lGreen mt-1 text-center"
                        >
                          {loading ? "Preparing PDF..." : "Download PDF"}
                        </Button>
                      )}
                    </PDFDownloadLink>
                  ) : (
                    <Button
                      disabled
                      className="disabled:opacity-50 disabled:cursor-not-allowed bg-dGreen mt-1 text-center"
                    >
                      Download PDF
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
  );
}
