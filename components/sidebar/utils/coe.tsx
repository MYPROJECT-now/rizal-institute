"use client";

import EnrollmentCert from "@/components/accounts/students/enrollment certificate/enrollment_cert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getStudentInfo } from "@/src/actions/studentAction";
import { useCOE } from "@/src/store/student/coe";
import { BlobProvider } from "@react-pdf/renderer";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface StudentInfo {
  lrn: string | null;
  gradeLevelName: string | null;
  academicYear: string | null;
  studentFirstName: string | null;
  studentMiddleName: string | null;
  studentLastName: string | null;
  studentSuffix: string | null;
  sectionName: string | null;
  subjects?: string[];
  rooomName: string | null;
}

export const COEModal = () => {
  const { isOpen, close } = useCOE();

  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getStudentInfo();
      setStudentInfo(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  const pdfDocument = useMemo(() => {
    if (!studentInfo) return null;
    return <EnrollmentCert studentInfo={studentInfo} />;
  }, [studentInfo]);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[300px] sm:w-[420px] lg:w-[500px] rounded-lg p-0 overflow-hidden">
        
        {/* Header */}
        <DialogHeader className="p-0">
          <DialogTitle className="text-lg sm:text-xl font-bold text-white bg-dGreen flex items-center justify-center py-4">
            Certificate of Enrollment
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="px-5 py-10 flex flex-col items-center justify-center gap-[60px]">

          <p className="text-center text-gray-600 text-sm">
            Click the button below to view and download your Certificate of Enrollment.
          </p>

          {loading ? (
            <Loader2 className="animate-spin text-dGreen" />
          ) : (
            pdfDocument && (
              <BlobProvider document={pdfDocument}>
                {({ url, loading }) =>
                  loading ? (
                    <Loader2 className="animate-spin text-dGreen" />
                  ) : (
                    <a
                      href={url!}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                      variant={"confirmButton"}
                      className="py-2 px-5 rounded-lg">
                      📄 View / Download COE
                      </Button>
                    </a>
                  )
                }
              </BlobProvider>
            )
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
};
