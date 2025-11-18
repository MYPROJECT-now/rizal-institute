import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton";
import {   deleteAssigned, getAcadYear, getAssignedGradeAndSubjects, getTeachers, } from "@/src/actions/adminAction";
import { useDeleteAssignModal } from "@/src/store/ADMIN/assign";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const DeleteAssign = () => {
    const { isOpen, close} = useDeleteAssignModal();
    const [teachers, setTeachers] = useState<{ clerk_uid: number; clerk_username: string }[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState(0);
    const [assigned, setAssigned] = useState<{ gradeLevel_id: number; gradeLevelName: string | null; subjectName: string | null; subject_id: number }[]>([]);
    const [selectedGradeLevel, setSelectedGradeLevel] = useState(0);
    const [selectedSubject, setSelectedSubject] = useState(0);

    const [loadingGS, setLoadingGS] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [deletThis, setDeleteThis] = useState(false);
    const [isActive, setIsActive] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchYear = async () => {
        const res = await getAcadYear();
        setIsActive(res?.isActive ?? false); // DEFAULT to false
        };
        fetchYear();
    }, []);


    useEffect(() => {
    const fetchTeachers = async () => {
        const result = await getTeachers();
        setTeachers(result);


    };
    fetchTeachers();
    }, []);

    const handleTeacherChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLoadingGS(true);
        const teacherId = Number(e.target.value);
        setSelectedTeacher(teacherId);

        if (teacherId) {
            const result = await getAssignedGradeAndSubjects(teacherId);
            setAssigned(result);
            setLoadingGS(false);
        } else {
            setAssigned([]);
        }
    };

    const handleGradeAndSubject = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [gradeId, subjectId] = e.target.value.split("|"); // split back into separate IDs
        setSelectedGradeLevel(Number(gradeId));
        setSelectedSubject(Number(subjectId));
    };



    const onClose = () => {
        setSelectedTeacher(0);
        setSelectedGradeLevel(0);
        setSelectedSubject(0);
        setIsConfirmed(false);
        close();
    }

    const handleDelete = async () => {
        const teacher = teachers.find((t) => t.clerk_uid === selectedTeacher);
        const teacherUsername = teacher ? teacher.clerk_username : "";

        setDeleteThis(true);
        await deleteAssigned(selectedTeacher, selectedGradeLevel, selectedSubject, teacherUsername);
        toast.success("Successfully deleted");
        close();
        setDeleteThis(false);
        window.location.reload();
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="lg:w-[600px] sm:w-[500px] w-[290px]  bg-white rounded-lg ">
            <DialogHeader>
            <DialogTitle className="lg:text-2xl sm:text-xl text-lg font-bold text-white bg-dGreen h-[60px] flex items-center justify-center rounded-t-lg">
                    Delete Assigned
                </DialogTitle>
                </DialogHeader>
                <div className=" flex flex-col items-center gap-7 py-4 overflow-y-auto max-h-[400px]">

                    <section className="flex flex-col gap-1 px-6 w-full sm:w-[300px] lg:w-[400px]">
                        <span className="text-dGreen text-sm font-semibold">Teacher:</span>
                        <select 
                        value={selectedTeacher}
                        onChange={handleTeacherChange}
                            className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                        >
                            <option value="">--Select Teacher--</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.clerk_uid} value={teacher.clerk_uid    }>
                                {teacher.clerk_username}
                                </option>
                            ))}
                        </select>   
                    </section>

                    {loadingGS ? (
                        <Skeleton className="h-[30px] w-full sm:w-[300px] lg:w-[400px] " />
                    ) : assigned.length === 0 && selectedTeacher ? (
                        <div>
                            no assigned subjects yet
                        </div>
                    ): (
                    <section className="flex flex-col gap-1 px-6 w-full sm:w-[300px] lg:w-[400px]">
                            <span className="text-dGreen text-sm font-semibold">Assigned Grade & Subject:</span>
                            <select
                            className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                            value={
                                selectedGradeLevel && selectedSubject
                                ? `${selectedGradeLevel}|${selectedSubject}`
                                : ""
                            }
                            disabled={!selectedTeacher}
                            onChange={handleGradeAndSubject}
                            >
                                <option value="">--Select Assign Subject--</option>
                                {assigned.map((assign, idx) => (
                                    <option key={idx} value={`${assign.gradeLevel_id}|${assign.subject_id}`}>
                                    {assign.gradeLevelName} - {assign.subjectName}
                                    </option>
                                ))}

                            </select>
                        </section>
                    )}
                    
                    <section className="flex flex-row sm:gap-1 gap-0 w-full sm:w-[300px] lg:w-[400px] items-center sm:text-start text-center  px-8">
                        <input 
                            type="checkbox"
                            checked={isConfirmed}
                            onChange={(e) => setIsConfirmed(e.target.checked)}
                        />   
                        <p className="text-sm sm:text-base">This action cannot be undone</p>   
                    </section>

            
                    

                    <Button
                    variant={"rejectButton"}
                    className="px-4 py-2 rounded-lg"
                    onClick={handleDelete}
                    disabled={!selectedTeacher || !selectedGradeLevel || !selectedSubject || !isConfirmed || deletThis || isActive === false || isActive === null}
                    >
                        Submit
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}