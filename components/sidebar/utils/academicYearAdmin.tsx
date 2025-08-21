  "use client";

  import { Button } from "@/components/ui/button";
  import { getAcademicYear, getDefaultYear, updateAcademicYear } from "@/src/actions/utils/academicYear";
  import { useEffect, useState } from "react";
  import { toast } from "sonner";

  export const AcademicYear = () => {
    const [academicYear, setAcademicYear] = useState<string[]>([]);
    const [selectedAcademicYear, setSelectedAcademicYear] = useState<string>("");
    const [defaultYear, setDefaultYear] = useState<string | null>(null);



    useEffect(() => {
      const fetchAcademicYear = async () => {
        const result = await getAcademicYear(); // Already ordered in descending
        const defaultYr = await getDefaultYear(); // This returns "2024-2025"


        if (result) {
          const yearList = result.map((item) => item.academicYear);
          setAcademicYear(yearList);
        }

        setDefaultYear(defaultYr);
        setSelectedAcademicYear(defaultYr ?? "");
      };

      fetchAcademicYear();
    }, []);


    const handleUpdateselectedAcademicYear = async () =>{
      try {
      const message = await updateAcademicYear (selectedAcademicYear);

      toast.success(message?.message ?? "Academic Year Updated Successfully");
      } catch (error) {
        console.log(error);
      }

    }

    return (

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

    );
  };
