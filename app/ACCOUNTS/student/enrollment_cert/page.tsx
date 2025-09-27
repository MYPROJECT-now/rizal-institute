"use client";

import React, { useEffect, useState, useMemo } from "react";
import {  PDFViewer } from "@react-pdf/renderer";
import { getInfoForDashboard, StudentInfo } from "@/src/actions/studentAction";
import { Loader2 } from "lucide-react";
import EnrollmentCert from "@/components/accounts/students/enrollment certificate/enrollment_cert";

const CertificatePage = () => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getInfoForDashboard();
      setStudentInfo(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  // const fullName = useMemo(
  //   () =>
  //     [
  //       studentInfo?.studentFirstName,
  //       studentInfo?.studentMiddleName,
  //       studentInfo?.studentLastName,
  //       studentInfo?.studentSuffix,
  //     ]
  //       .filter(Boolean)
  //       .join(" "),
  //   [studentInfo]
  // );

  // ✅ Memoize the PDF Document so it doesn’t re-render unnecessarily
  const pdfDocument = useMemo(() => {
    if (!studentInfo) return null;
    return <EnrollmentCert studentInfo={studentInfo} />;
  }, [studentInfo]);

  return (
        <div className=" h-full  flex-1 flex flex-col  rounded-t-lg  lg:px-5 px-0 ">
          <section className="w-full h-full  bg-white self-center lg:mt-2 mt-0">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin text-dGreen" />
            </div>
          ) : (
            <>
              {pdfDocument && (
                <PDFViewer className="w-[100%] h-full">{pdfDocument}</PDFViewer>
              )}
                {/* <div className="flex flex-col gap-5 items-center justify-center">
                  {pdfDocument ? (
                    <PDFDownloadLink
                      fileName={`Certificate_of_Enrollment_${fullName}`}
                      document={pdfDocument}
                    >
                      {({ loading }) => (
                        <Button
                          disabled={loading}
                          variant={"confirmButton"}
                          className="disabled:opacity-50 disabled:cursor-not-allowed  mt-1 text-center"
                        >
                          {loading ? "Preparing PDF..." : "Download PDF"}
                        </Button>
                      )}
                    </PDFDownloadLink>
                  ) : (
                    <Button
                      disabled
                      variant={"confirmButton"}
                      className="disabled:opacity-50 disabled:cursor-not-allowed  text-center"
                    >
                      Download PDF
                    </Button>
                  )}
              </div> */}
            </>
          )}


        </section>
      </div>

  );
};

export default CertificatePage;
