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
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const AcademicYearModal = () => {
  const { isOpen, close } = useAcadModal();
  const [academicYear, setAcademicYear] = useState<string[]>([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<string>("");
  const [defaultYear, setDefaultYear] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


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
        setLoading(false);
      };

      fetchAcademicYear();
    }, []);


  
  const handleUpdateselectedAcademicYear = async () =>{
    try {
    const message = await updateAcademicYear (selectedAcademicYear);

    toast.success(message?.message ?? "Academic Year Updated Successfully");
    close();
    window.location.reload();
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="w-[290px] sm:w-[500px] lg:w-[600px]  bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl lg:text-2xl py-3 font-bold text-white bg-dGreen rounded-t-lg flex items-center justify-center">
            Academic Year
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-5 px-10 py-2">
            {loading ? (
              <div>
                <Loader2 className="text-dGreen animate-spin" />
              </div>
            ) : (
            <select
              className="border-2 border-gray-300 px-3 py-1 h-[40px] w-[170px] sm:w-[250px] rounded-xl text-center focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            value={selectedAcademicYear}
            onChange={(e) => setSelectedAcademicYear(e.target.value)}
          >
            {academicYear.map((year) => (
                <option className="text-center bg-gray-300" key={year} value={year}>
                {year === defaultYear ? `${year}` : year}
              </option>
            ))}
          </select>
            )}

          <div className="flex  gap-5">
            <Button
            variant="prevButton"
              className="sm:px-5 px-3 sm:py-5 py-2 rounded-xl text-xs sm:text-sm  "
            >
              Cancel
            </Button>
            
            <Button
            variant="confirmButton"
              className="px-7 sm:py-5 py-2 rounded-xl text-xs sm:text-sm  "
              onClick={handleUpdateselectedAcademicYear}>
              Set
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
