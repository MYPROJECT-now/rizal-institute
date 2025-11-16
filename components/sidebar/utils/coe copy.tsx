  "use client";

import EnrollmentCert from "@/components/accounts/students/enrollment certificate/enrollment_cert";
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-dGreen" />
      </div>
    );
  }

    return (
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="w-[290px] sm:w-[450px] lg:w-[600px]  bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl lg:text-2xl py-3 font-bold text-white bg-dGreen rounded-t-lg flex items-center justify-center">
              Certificate of Enrollment
            </DialogTitle>
          </DialogHeader>
             <div className="h-full w-full flex flex-col items-center justify-center p-4">
               {pdfDocument && (
                 <BlobProvider document={pdfDocument}>
                   {({ url, loading }) =>
                     loading ? (
                       <Loader2 className="animate-spin text-dGreen" />
                     ) : (
                       <a
                         href={url!}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="px-4 py-2 bg-dGreen text-white rounded-lg shadow-md hover:bg-dGreen/80 transition"
                       >
                         📄 View / Download Certificate
                       </a>
                     )
                   }
                 </BlobProvider>
               )}
             </div>
        </DialogContent>
      </Dialog>
    );
  };
