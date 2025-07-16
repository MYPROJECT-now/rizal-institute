"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getAcademicYear, getDefaultYear, updateAcademicYear } from "@/src/actions/studentAction";
import { useAcadModal } from "@/src/store/academicYear";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const AcademicYearModal = () => {
  const { isOpen, close } = useAcadModal();
  const [academicYear, setAcademicYear] = useState<string[]>([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<string>("");
  const [defaultYear, setDefaultYear] = useState<string | null>(null);


    useEffect(() => {
      const fetchAcademicYear = async () => {
        const result = await getAcademicYear(); // Already ordered in descending
        const defaultYr = await getDefaultYear(); // This returns "2024-2025"


        if (result) {
          const yearList = result.map((item) => item.academicYear ?? "");
          setAcademicYear(yearList);
        }

        setDefaultYear(defaultYr);
        setSelectedAcademicYear(defaultYr ?? "");
      };

      fetchAcademicYear();
    }, []);

  const handleclose = () => {
    close();
    window.location.reload();
  };
  
      const handleUpdateselectedAcademicYear = async () =>{
        try {
        const message = await updateAcademicYear (selectedAcademicYear);
  
        toast.success(message?.message ?? "Academic Year Updated Successfully");
        } catch (error) {
          console.log(error);
        }
  
      }


  return (
    <Dialog open={isOpen} onOpenChange={handleclose}>
      <DialogContent className="w-[600px] h-[200px] bg-white rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Academic Year
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-5 px-10">
            <select
            className="h-[40px] w-[250px] rounded-xl text-center"
            value={selectedAcademicYear}
            onChange={(e) => setSelectedAcademicYear(e.target.value)}
          >
            {academicYear.map((year) => (
              <option key={year} value={year}>
                {year === defaultYear ? `${year}` : year}
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
            className="h-[40px] w-[100px] rounded-xl"
              onClick={handleUpdateselectedAcademicYear}>
              Set
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
