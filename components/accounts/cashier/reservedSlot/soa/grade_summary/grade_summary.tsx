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
  finalGrade: number | null;
  subjectName: string | null;
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

  // Group by Grade Level
  // const grouped = grades.reduce((acc: any, item) => {
  //   const key = item.gradeLevelName ?? "Unknown";
  //   if (!acc[key]) acc[key] = [];
  //   acc[key].push(item);
  //   return acc;
  // }, {});

  // Compute GWA per grade level
// Compute GWA per grade level
// const gwaPerLevel: Record<string, number> = {};

// Object.keys(grouped).forEach((level) => {
//   const gradesOnly = grouped[level]
//     .map((g: GradeSummaryType) => g.finalGrade)
//     .filter((n: number | null): n is number => typeof n === "number");

//   const sum = gradesOnly.reduce(
//     (a: number, b: number) => a + b,
//     0
//   );

//   const avg = gradesOnly.length > 0 ? sum / gradesOnly.length : 0;

//   gwaPerLevel[level] = Number(avg.toFixed(2));
// });
// Group by Grade Level (FULLY TYPED)
type GroupedGrades = Record<string, GradeSummaryType[]>;

const grouped: GroupedGrades = grades.reduce((acc: GroupedGrades, item) => {
  const key = item.gradeLevelName ?? "Unknown";
  if (!acc[key]) acc[key] = [];
  acc[key].push(item);
  return acc;
}, {} as GroupedGrades);

// Compute GWA per grade level (FULLY TYPED)
const gwaPerLevel: Record<string, number> = {};

Object.keys(grouped).forEach((level) => {
  const gradesOnly = grouped[level]
    .map((g) => g.finalGrade)
    .filter((n): n is number => typeof n === "number");

  const sum = gradesOnly.reduce((a, b) => a + b, 0);
  const avg = gradesOnly.length > 0 ? sum / gradesOnly.length : 0;

  gwaPerLevel[level] = Number(avg.toFixed(2));
});

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[550px] bg-gray-50 rounded-xl shadow-lg">
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
            <div className="flex flex-col gap-4">
              {Object.keys(grouped).map((level, index) => (
                <div
                  key={index}
                  className="border rounded-lg shadow-sm bg-white"
                >
                  {/* Grade Level Heading */}
                  <div className="bg-green-100 px-4 py-2 rounded-t-lg border-b">
                    <span className="font-semibold text-dGreen">
                      Grade {level}
                    </span>
                  </div>

                  {/* Subjects */}
                  <div className="px-4 py-2 grid grid-cols-2 gap-y-2">
                    {grouped[level].map((g: GradeSummaryType, idx: number) => (
                      <div key={idx} className="flex justify-between text-sm pr-6">
                        <span className="text-gray">{g.subjectName ?? "-"}</span>
                        <span className="font-semibold text-dGreen">{g.finalGrade ?? "-"}</span>
                      </div>
                    ))}
                  </div>


                  {/* GWA per grade level */}
                  <div className="px-4 py-3 border-t bg-gray-50 flex justify-between">
                    <span className="font-medium text-gray-700">
                      GWA
                    </span>
                    <span className="font-bold text-dGreen">
                      {gwaPerLevel[level]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
