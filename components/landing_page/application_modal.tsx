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
import { Skeleton } from "../ui/skeleton";

  type StatusType = {
    isActive: boolean ;
    enrollment_start_date: string;
  }
  export const Application_Modal = () => {
    const { isOpen, close } = useApplicationModal();
    const router = useRouter();
    const [status, setStatus] = useState<StatusType | null>(null);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
      close();
      router.push("/");
    };


    useEffect(() => {
      setLoading(true);
      const fetchStatus = async () => {
        const result = await enrollmentStatus();
        setStatus(result);
        setLoading(false);
      };
      fetchStatus();
    }, []);

  // Determine message
  let content;
  if (status === null) {
    content = (
        <div className="flex flex-col justify-center items-center lg:py-10 py-7 px-10">
          <p className=" lg:text-2xl sm:text-xl text-base font-bold text-red-600">  
            Enrollemtn period is not yet set.
          </p>

        </div>
    )
  } else if (!status.isActive) {
    content = (
      <div className="flex flex-col justify-center items-center lg:py-10 py-7 px-10">
      <p className=" lg:text-2xl sm:text-xl text-base font-bold text-red-600">
        Enrollment is currently closed.
      </p>
      </div>
    );
  } else {
    const today = new Date();
    const startDate = new Date(status.enrollment_start_date);

    if (today < startDate) {
      content = (
        <div className="flex flex-row gap-2 lg:py-10 py-7 px-10">
          <p className=" lg:text-2xl sm:text-xl text-base text-center font-bold text-red-600">
            Enrollment has not yet started.
            <br /> <strong>Start date:{" "} {startDate.toLocaleDateString()}</strong>
          </p>
        </div>
      );
    } else {
      content = (
        <div className="flex flex-col justify-center items-center lg:py-10 py-7 px-10">
          <p className=" lg:text-2xl sm:text-xl text-base font-bold text-dGreen font-merriweather sm:mb-4 mb-3">
            Select from the category
          </p>
          <div className="flex flex-col mx-10 w-full">
            <Link href="/application/new_applicant">
              <Button
                variant="CButton"
                className="w-full sm:py-5 py-4  sm:text-base text-sm rounded-lg mt-2"
              >
                New Student
              </Button>
            </Link>

            <Link href="/application/check">
              <Button
                variant="CButton"
                className="w-full sm:py-5 py-4  sm:text-base text-sm rounded-lg mt-2"
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
      <DialogContent className="lg:w-[600px] lg:h-[300px] sm:w-[500px] w-[290px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="lg:text-2xl sm:text-xl text-lg font-bold text-white bg-dGreen sm:py-4 py-3 flex  justify-center rounded-t-lg">
            Enrollment Category
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center -mt-5 ">
          {loading ? (
            <div className="flex flex-col gap-4 lg:py-10 py-7">
                <Skeleton className="sm:w-[300px] w-[250px] sm:h-[40px] h-[35px]"/>
                <div className="flex flex-col gap-1">
                <Skeleton className="sm:w-[300px] w-[250px] sm:h-[40px] h-[35px]"/>
                <Skeleton className="sm:w-[300px] w-[250px] sm:h-[40px] h-[35px]"/>
                </div>
            </div>
            ):(
              content
            )}
       
        </div>
      </DialogContent>
    </Dialog>
  );
};