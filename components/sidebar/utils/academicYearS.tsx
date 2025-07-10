"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getAcademicYear } from "@/src/actions/studentAction";
import { useAcadModal } from "@/src/store/academicYear";
import { useEffect, useState } from "react";

export const AcademicYearModal = () => {
  const { isOpen, close } = useAcadModal();
  const [academicYear, setAcademicYear] = useState<string[]>([]);


  useEffect(() => {
    const fetchAcademicYear = async () => {
      const result = await getAcademicYear();
      if (result) {
        setAcademicYear(result.map((item) => item.academicYear));
      }
    }
      fetchAcademicYear();
  }, []);
    
  

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[600px] h-[200px] bg-white rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Academic Year
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-5 px-10">
          <select
          className="h-[40px] w-[200px] rounded-xl text-center">
            {academicYear.map((year) => (
              <option 
                key={year} 
                value={year}
              >
                {year}
              </option>
            ))}

          </select>

          <div className="flex  gap-5">
            <Button
            variant="prevButton"
            className="h-[40px] w-[100px] rounded-xl">
              Cancel
            </Button>
            
            <Button
            variant="confirmButton"
            className="h-[40px] w-[100px] rounded-xl">
              Set
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
