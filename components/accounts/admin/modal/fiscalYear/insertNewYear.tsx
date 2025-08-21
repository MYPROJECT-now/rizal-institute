import { Button } from "@/components/ui/button";
import { createAcademicYear } from "@/src/actions/adminAction";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const InsertNewYear = ({onCreated }: { onCreated: () => void }) => {
  const [academicYear, setAcademicYear] = useState("");
  const [academicYearStart, setAcademicYearStart] = useState("");
  const [academicYearEnd, setAcademicYearEnd] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Automatically update academicYear when start or end date changes
  useEffect(() => {
    if (academicYearStart && academicYearEnd) {
      const startYear = new Date(academicYearStart).getFullYear();
      const endYear = new Date(academicYearEnd).getFullYear();
      setAcademicYear(`${startYear}-${endYear}`);
    } else {
      setAcademicYear("");
    }
  }, [academicYearStart, academicYearEnd]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await createAcademicYear(academicYear, academicYearStart, academicYearEnd);
      toast.success("Academic year created successfully!");
      onCreated(); 
      setAcademicYear("");
      setAcademicYearStart("");
      setAcademicYearEnd("");
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating academic year:", error);
    }
   
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="fiscal-year" className="mb-1 font-medium">
          Academic Year
        </label>
        <input
          id="fiscal-year"
          type="text"
          placeholder="e.g. 2025 - 2026"
          value={academicYear}
          readOnly
          className="border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition bg-gray-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="start-date" className="mb-1 font-medium">
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            value={academicYearStart}
            onChange={(e) => setAcademicYearStart(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="end-date" className="mb-1 font-medium">
            End Date
          </label>
          <input
            id="end-date"
            type="date"
            value={academicYearEnd}
            onChange={(e) => setAcademicYearEnd(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={(academicYear === "" || academicYearStart === "" || academicYearEnd === "") || isLoading}
        variant="confirmButton"
        className="w-full h-[40px] rounded-lg"
      >
        {isLoading ? "Saving..." : " Save Changes"}
      </Button>
    </div>
  );
};
