"use client";

import React, { useEffect, useState } from "react";
import Admin_student from "@/components/sidebar/header/header_student";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { getInfoForDashboard, StudentInfo } from "@/src/actions/studentAction";
import { Loader2 } from "lucide-react";


const Certificate = () => {
      
    const [studentInfo, setstudentInfo] = useState< StudentInfo | null>(null);
    const [loading, setLoading] = useState(true);

    const fullName = [
        studentInfo?.studentFirstName,
        studentInfo?.studentMiddleName,
        studentInfo?.studentLastName,
        studentInfo?.studentSuffix ] .filter(Boolean).join(" ")
  useEffect(() => {
    const fetchData = async () => {
      const res = await getInfoForDashboard();
      setstudentInfo(res);
      setLoading(false);
    };
    fetchData();
  }, []);

        return (
          <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10 bg-page">
            <Admin_student />
            <div className="w-full h-auto lg:h-[540px] bg-white self-center  mt-10 rounded-lg ">
                <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
                  {loading ? (
                    <div>
                      <Loader2 className="animate-spin text-dGreen" />
                    </div>
                  ) : (
                <PDFViewer className="w-[100%] h-[500px]">
                  <Certificate />
              </PDFViewer>
                  )}
                <div className="flex justify-center">
                  {studentInfo ? (
                    <PDFDownloadLink
                      fileName={`Certificate_of_Enrollment_${fullName}`}
                      document={<Certificate  />}
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
export default Certificate;