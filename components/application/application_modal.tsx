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


export const Application_Modal = () => {
  const { isOpen, close  } = useApplicationModal();
  const router = useRouter();
  
  const handleClose = () => {
    close();
    router.push("/");

  };

  //   useEffect(() => {
  //   checkAndOpen(); 
  // }, []);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[600px] h-[300px] rounded-t-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center rounded-t-lg">
          Enrollment Category
          </DialogTitle>
        </DialogHeader>
        <div className="text-center"> 
          <p className="text-2xl font-bold text-dGreen font-merriweather"> 
            Select from the category
          </p>
        </div>
        <div className="flex flex-col mx-10">
          <Link 
          href="/new_application/new_applicant"
          >
            <Button
              variant="CButton"
              className="w-full h-[50px] py-2 text-base rounded-lg mt-2"
            >
              New Student
            </Button>
          </Link>

          <Link 
          href="/new_application/old_student"
          >
            <Button
              variant="CButton"
              className="w-full h-[50px] py-2 text-base rounded-lg mt-2"
            >
              Old Student
            </Button>
          </Link>
        </div>


      </DialogContent>
    </Dialog>
  );
};
