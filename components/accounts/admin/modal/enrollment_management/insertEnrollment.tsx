import { Button } from "@/components/ui/button";
import { createEnrollment } from "@/src/actions/adminAction";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const InsertEnrollment = ({onCreated }: { onCreated: () => void }) => {
  const [enrollment, setEnrollement] = useState("");
  const [enrollmentStart, setEnrollmentStart] = useState("");
  const [enrollmentEnd, setEnrollmentEnd] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Automatically update academicYear when start or end date changes
  useEffect(() => {
    if (enrollmentStart && enrollmentEnd) {
      const startYear = new Date(enrollmentStart).getFullYear();
      const endYear = new Date(enrollmentEnd).getFullYear();
      setEnrollement(`${startYear}-${endYear}`);
    } else {
      setEnrollement("");
    }
  }, [enrollmentStart, enrollmentEnd]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await createEnrollment(enrollment, enrollmentStart, enrollmentEnd);
      toast.success("New Enollment period created successfully!");
      onCreated(); 
      setEnrollement("");
      setEnrollmentStart("");
      setEnrollmentEnd("");
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating new enrollment period:", error);
    }
   
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <label  className="mb-1 font-medium">
          Enrollment Period
        </label>
        <input
          type="text"
          placeholder="e.g. 2025 - 2026"
          value={enrollment}
          readOnly
          className="border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition bg-gray-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">
            Start Date
          </label>
          <input
            type="date"
            value={enrollmentStart}
            onChange={(e) => setEnrollmentStart(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">
            End Date
          </label>
          <input
            type="date"
            value={enrollmentEnd}
            onChange={(e) => setEnrollmentEnd(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={(enrollment === "" || enrollmentStart === "" || enrollmentEnd === "") || isLoading}
        variant="confirmButton"
        className="w-full h-[40px] rounded-lg"
      >
        {isLoading ? "Saving..." : " Save Changes"}
      </Button>
    </div>
  );
};
