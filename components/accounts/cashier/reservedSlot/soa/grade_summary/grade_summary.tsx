"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getGradesSummary } from "@/src/actions/cashierAction";
import { useShowGradeModal, useUploadSoaModal } from "@/src/store/CASHIER/reserved";
import { useEffect, useState } from "react";

interface GradeSummaryType {
  gradeLevelName: string | null;
  finalGrade: number;
}

export const Grade_Summary = () => {
  const { isOpen, close, selectedLRN } = useShowGradeModal();
  const { open } = useUploadSoaModal();
  const [grades, setGrades] = useState<GradeSummaryType[]>([]);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    close();
    open();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedLRN) return;
      setLoading(true);
      const grades = await getGradesSummary(selectedLRN);
      setGrades(grades);
      setLoading(false);
    };
    fetchData();
  }, [selectedLRN]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="rounded-t-lg text-xl font-bold text-white bg-dGreen py-3 flex items-center justify-center">
            Grade Summary
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 px-7">
          {loading ? (
            <p className="text-center text-gray-500 py-4">Loading...</p>
          ) : grades.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No grades found.</p>
          ) : (
            <div className="flex flex-col gap-2 shadow-md border-gray-200 border-2 rounded-lg px-4">
              {grades.map((grade, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 py-2"
                >
                  <span className="font-medium text-gray-700">
                    {"Grade " + (grade.gradeLevelName ?? "-")}
                  </span>
                  <span className="font-semibold text-dGreen">
                    {Math.round(grade.finalGrade)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
