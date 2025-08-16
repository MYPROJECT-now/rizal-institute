    import { Button } from "@/components/ui/button";
    import { toastConfirm } from "@/components/ui/toast.confirm";
    import {  getCurrentEnrollmentPeriod, stopCurrentEnrollmentPeriod, updateEnrollmentPeriod } from "@/src/actions/adminAction";
    import { useEffect, useState } from "react";
    import { toast } from "sonner";




    export const UpdateCurrentEnrollmentPeriod = ({ refreshTrigger }: { refreshTrigger: number }) => {
        const [enrollment, setEnrollement] = useState("");
        const [enrollmentStart, setEnrollmentStart] = useState("");
        const [enrollmentEnd, setEnrollmentEnd] = useState("");
        const [enrollmentID, setEnrollmentID] = useState(0);
        const [enrollmentStatus, setEnrollmentStatus] = useState("");
        const [editing, setEditing] = useState(false);
        const [isLoading, setIsLoading] = useState(false);

        
        useEffect(() => {
            const fetchAcademicYear = async () => {
            setIsLoading(true);
            try {
            const result = await getCurrentEnrollmentPeriod();
            setEnrollmentID(result.enrollmentID);
            setEnrollement(result.enrollment);
            setEnrollmentStart(result.enrollmentStart);
            setEnrollmentEnd(result.academicYearEnd);
            setEnrollmentStatus(result.isActive ? "Open" : "Close");
            setIsLoading(false);
            } catch (error) {
                console.error("Error fetching enrollment period:", error);
            }
        };
        fetchAcademicYear();
        }, [refreshTrigger]);

        

        const handleUpdateEnrollment = async () => {
            try {
                await updateEnrollmentPeriod(
                    enrollmentID,
                    enrollment,
                    enrollmentStart,
                    enrollmentEnd
                );
                toast.success("Enrollment period updated successfully!");
                
            } catch (error) {
                console.error("Error updating enrollment period:", error);
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
    toastConfirm("End Enrollment Period?", {
        description: "This action will end the enrollment period and cannot be undone.",
        onConfirm: async () => {
        try {
            await stopCurrentEnrollmentPeriod(enrollmentID);
            toast.success("Enrollment period ended successfully!");
        } catch (error) {
            toast.error("Failed to end enrollment period.");
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
                <label htmlFor="academicYear" className=" items-center flex">enrollmentStatus</label>
                <input 
                    type="text"
                    value={isLoading ? "Loading..." : enrollmentStatus}
                    readOnly
                    className= "focus:outline-none w-full p-1  rounded-sm"
                />
                <label htmlFor="academicYear" className=" items-center flex">enrollment period:</label>
                <input 
                    type="text" 
                    value={isLoading ? "Loading..." : enrollment} 
                    readOnly={!editing}
                    className={`${
                    !editing ? "focus:outline-none" : "focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                    } w-full p-1  rounded-sm`}
                    onChange={(e) => setEnrollement(e.target.value)}
                />
                <label htmlFor="academicYearStart" className=" items-center flex">enrollment start:</label>
                <input 
                    type="date" 
                    value={isLoading ? "Loading..." : enrollmentStart} 
                    readOnly={!editing}
                    className={`${
                    !editing ? "focus:outline-none" : "focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                    } w-full p-1  rounded-sm`}
                    onChange={(e) => setEnrollmentStart(e.target.value)} 
                />
                <label htmlFor="academicYearEnd" className=" items-center flex">enrollment end:</label>
                <input 
                    type="date"
                    value={isLoading ? "Loading..." : enrollmentEnd}
                    readOnly={!editing}
                    className={`${
                    !editing ? "focus:outline-none" : "focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                    } w-full p-1  rounded-sm`}
                    onChange={(e) => setEnrollmentEnd(e.target.value)}
                    
                />

            </section>

            <section className="flex flex-col gap-2">
                {editing ? (
                <Button
                    onClick={handleUpdateEnrollment}
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