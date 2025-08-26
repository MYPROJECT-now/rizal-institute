  // "use client";

  // import {
  //   Dialog,
  //   DialogContent,
  //   DialogHeader,
  //   DialogTitle,
  // } from "@/components/ui/dialog";
  // import { useApplicationModal } from "@/src/store/application/application";
  // import { Button } from "../ui/button";
  // import { useRouter } from "next/navigation";
  // import Link from "next/link";


  // export const Application_Modal = () => {
  //   const { isOpen, close  } = useApplicationModal();
  //   const router = useRouter();
  //   // const status = await enrollmentStatus();
  //   const handleClose = () => {
  //     close();
  //     router.push("/");

  //   };



  //   // useEffect(() => {
  //   //   const data = async ( ) => {
  //   //     const status =  await enrollmentStatus();
  //   //   }


  //   // },);


  //   return (
  //     <Dialog open={isOpen} onOpenChange={handleClose}>
  //       <DialogContent className="w-[300px] h-[300px] lg:w-[600px] lg:h-[300px] rounded-t-lg">
  //         <DialogHeader>
  //           <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center rounded-t-lg">
  //           Enrollment Category
  //           </DialogTitle>
  //         </DialogHeader>

  //         <div>
  //           <div className="text-center"> 
  //             <p className="text-xl lg:text-2xl font-bold text-dGreen font-merriweather"> 
  //               Select from the category
  //             </p>
  //           </div>
  //           <div className="flex flex-col mx-10">
  //             <Link 
  //             href="/application/new_applicant"
  //             >
  //               <Button
  //                 variant="CButton"
  //                 className="w-full h-[50px] py-2 text-base rounded-lg mt-2"
  //               >
  //                 New Student
  //               </Button>
  //             </Link>

  //             <Link 
  //             href="/application/check"
  //             >
  //               <Button
  //                 variant="CButton"
  //                 className="w-full h-[50px] py-2 text-base rounded-lg mt-2"
  //               >
  //                 Old Student
  //               </Button>
  //             </Link>
  //           </div>
  //         </div>


  //       </DialogContent>
  //     </Dialog>
  //   );
  // };


  // "use client";

  // import {
  //   Dialog,
  //   DialogContent,
  //   DialogHeader,
  //   DialogTitle,
  // } from "@/components/ui/dialog";
  // import { useApplicationModal } from "@/src/store/application/application";
  // import { Button } from "../ui/button";
  // import { useRouter } from "next/navigation";
  // import Link from "next/link";
  // import { useEffect, useState } from "react";
  // import { enrollmentStatus } from "@/src/actions/utils/enrollment";

  // type StatusType = {
  //   isActive: boolean ;
  //   enrollment_start_date: string;
  // }
  // export const Application_Modal = () => {
  //   const { isOpen, close } = useApplicationModal();
  //   const router = useRouter();
  //   const [status, setStatus] = useState<StatusType | null>(null);

  //   const handleClose = () => {
  //     close();
  //     router.push("/");
  //   };


  //   useEffect(() => {
  //     const fetchStatus = async () => {
  //       const result = await enrollmentStatus();
  //       setStatus(result);
  //     };
  //     fetchStatus();
  //   }, []);

  //   return (
  //     <Dialog open={isOpen} onOpenChange={handleClose}>
  //       <DialogContent className="w-[300px] h-[300px] lg:w-[600px] lg:h-[300px] rounded-t-lg">
  //         <DialogHeader>
  //           <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center rounded-t-lg">
  //             Enrollment Category
  //           </DialogTitle>
  //         </DialogHeader>

  //         <>
  //           {active.isActive === false ? (
  //             <div className="flex flex-col justify-center items-center h-[200px] px-2">
  //               <p className="text-dGreen">Loading...</p>
  //             </div>
  //           ) : active ? (
  //           <div className="flex flex-col justify-center items-center h-[200px] px-10">
  //               <p className="text-xl lg:text-2xl font-bold text-dGreen font-merriweather mb-4">
  //                 Select from the category
  //               </p>
  //               <div className="flex flex-col mx-10 w-full">
  //                 <Link href="/application/new_applicant">
  //                   <Button
  //                     variant="CButton"
  //                     className="w-full h-[50px] py-2 text-base rounded-lg mt-2"
  //                   >
  //                     New Student
  //                   </Button>
  //                 </Link>

  //                 <Link href="/application/check">
  //                   <Button
  //                     variant="CButton"
  //                     className="w-full h-[50px] py-2 text-base rounded-lg mt-2"
  //                   >
  //                     Old Student
  //                   </Button>
  //                 </Link>
  //               </div>
  //             </div>
  //           ) : (
  //             <div className="flex flex-col justify-center items-center h-[200px]">
  //               <p className="text-xl font-bold text-red-600">
  //                 Enrollment is currently closed.
  //               </p>
  //             </div>
  //           )}
  //         </>
  //       </DialogContent>
  //     </Dialog>
  //   );
  // };



  
  "use client";

  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { useApplicationModal } from "@/src/store/application/application";
  import { Button } from "../ui/button";
  import { useRouter } from "next/navigation";
  import Link from "next/link";
  import { useEffect, useState } from "react";
  import { enrollmentStatus } from "@/src/actions/utils/enrollment";

  type StatusType = {
    isActive: boolean ;
    enrollment_start_date: string;
  }
  export const Application_Modal = () => {
    const { isOpen, close } = useApplicationModal();
    const router = useRouter();
    const [status, setStatus] = useState<StatusType | null>(null);

    const handleClose = () => {
      close();
      router.push("/");
    };


    useEffect(() => {
      const fetchStatus = async () => {
        const result = await enrollmentStatus();
        setStatus(result);
      };
      fetchStatus();
    }, []);

  // Determine message
  let content;
  if (status === null) {
    content = <p className="text-dGreen">Loading...</p>;
  } else if (!status.isActive) {
    content = (
      <p className="text-xl font-bold text-red-600">
        Enrollment is currently closed.
      </p>
    );
  } else {
    const today = new Date();
    const startDate = new Date(status.enrollment_start_date);

    if (today < startDate) {
      content = (
        <p className="text-xl text-center font-bold text-red-600">
          Enrollment has not yet started.
          <br /> <strong>Start date:{" "} {startDate.toLocaleDateString()}</strong>
          
        </p>
      );
    } else {
      content = (
        <div className="flex flex-col justify-center items-center h-[200px] px-10">
          <p className="text-xl lg:text-2xl font-bold text-dGreen font-merriweather mb-4">
            Select from the category
          </p>
          <div className="flex flex-col mx-10 w-full">
            <Link href="/application/new_applicant">
              <Button
                variant="CButton"
                className="w-full h-[50px] py-2 text-base rounded-lg mt-2"
              >
                New Student
              </Button>
            </Link>

            <Link href="/application/check">
              <Button
                variant="CButton"
                className="w-full h-[50px] py-2 text-base rounded-lg mt-2"
              >
                Old Student
              </Button>
            </Link>
          </div>
        </div>
      );
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[300px] h-[300px] lg:w-[600px] lg:h-[300px] rounded-t-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center rounded-t-lg">
            Enrollment Category
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center h-[200px]">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
};