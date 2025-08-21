import { Button } from "@/components/ui/button";
import { toastConfirm } from "@/components/ui/toast.confirm";
import { getCurrentAcademicYear, stopCurrentAcademicYear, updateCurrentAcademicYear } from "@/src/actions/adminAction";
import { useEffect, useState } from "react";
import { toast } from "sonner";




export const UpdateCurrentYear = ({ refreshTrigger }: { refreshTrigger: number }) => {
    const [academicYear, setAcademicYear] = useState("");
    const [academicYearStart, setAcademicYearStart] = useState("");
    const [academicYearEnd, setAcademicYearEnd] = useState("");
    const [academicYearID, setAcademicYearID] = useState(0);
    const [editing, setEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    
    useEffect(() => {
        const fetchAcademicYear = async () => {
        setIsLoading(true);
        try {
          const result = await getCurrentAcademicYear();
          setAcademicYearID(result.academicYear_id);
          setAcademicYear(result.academicYear);
          setAcademicYearStart(result.academicYearStart);
          setAcademicYearEnd(result.academicYearEnd);
          setIsLoading(false);
        } catch (error) {
            console.error("Error fetching academic year:", error);
        }
    };
    fetchAcademicYear();
    }, [refreshTrigger]);

    

    const handleUpdateAcademicYear = async () => {
        try {
            await updateCurrentAcademicYear(
                academicYearID,
                academicYear,
                academicYearStart,
                academicYearEnd
            );
            toast.success("Academic year updated successfully!");
            
        } catch (error) {
            console.error("Error updating academic year:", error);
        }
        setEditing(false);
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
    };


const handleStop = () => {
  toastConfirm("End Academic Year?", {
    description: "This action will end the academic year and cannot be undone.",
    onConfirm: async () => {
      try {
        await stopCurrentAcademicYear(academicYearID);
        toast.success("Academic year ended successfully!");
      } catch (error) {
        toast.error("Failed to end academic year.");
        console.log(error || "something went wrong");
      }
   },

    onCancel: () => {
      toast.info("Action canceled.");
    },
  });
};






    return (
        <div className="flex flex-row justify-between px-[20px]">
        <section className="grid grid-cols-2 gap-1 w-[250px]">
            <label htmlFor="academicYear" className=" items-center flex">academicYear:</label>
            <input 
                type="text" 
                value={isLoading ? "Loading..." : academicYear} 
                readOnly={!editing}
                className={`${
                !editing ? "focus:outline-none" : "focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                } w-full p-1  rounded-sm`}
                onChange={(e) => setAcademicYear(e.target.value)}
            />
            <label htmlFor="academicYearStart" className=" items-center flex">academicYearStart:</label>
            <input 
                type="date" 
                value={isLoading ? "Loading..." : academicYearStart} 
                readOnly={!editing}
                className={`${
                !editing ? "focus:outline-none" : "focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                } w-full p-1  rounded-sm`}
                onChange={(e) => setAcademicYearStart(e.target.value)} 
            />
            <label htmlFor="academicYearEnd" className=" items-center flex">academicYearEnd:</label>
            <input 
                type="date"
                value={isLoading ? "Loading..." : academicYearEnd}
                readOnly={!editing}
                className={`${
                !editing ? "focus:outline-none" : "focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                } w-full p-1  rounded-sm`}
                onChange={(e) => setAcademicYearEnd(e.target.value)}
                
            />

        </section>

        <section className="flex flex-col gap-2">
            {editing ? (
            <Button
                onClick={handleUpdateAcademicYear}
                variant="acceptButton"
                className="w-[130px] h-[40px] rounded-lg"
            >
                Save
            </Button>
            ) : (
              <Button
                onClick={handleEdit}
                variant="confirmButton"
                className="w-[130px] h-[40px] rounded-lg"
            >
                Update
            </Button>
            )}

            {editing ? (
            <Button
                onClick={handleCancel}
                variant="rejectButton"
                className="w-[130px] h-[40px] rounded-lg"
            >
                Cancel
            </Button>
            ) : (
               <Button
                onClick={handleStop}
                variant="rejectButton"
                className="w-[130px] h-[40px] rounded-lg"
            >
                End
            </Button>
            )}

        </section>
        </div>
    )
}