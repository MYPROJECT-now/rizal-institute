import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getAssignedGradeAndSubjects, getTeachers } from "@/src/actions/adminAction";
import { useEditAssignModal } from "@/src/store/ADMIN/assign";
import { useEffect, useState } from "react";

export const EditAssign = () => {
    const { isOpen, close} = useEditAssignModal();
    const [teachers, setTeachers] = useState<{ clerk_uid: number; clerk_username: string }[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState(0);
    const [assigned, setAssigned] = useState<{ gradeLevel_id: number; gradeLevelName: string | null; subjectName: string | null; subject_id: number }[]>([]);
    const [selectedGradeLevel, setSelectedGradeLevel] = useState(0);
    const [selectedSubject, setSelectedSubject] = useState(0);
    const [loadingGS, setLoadingGS] = useState(false);

    useEffect(() => {
    const fetchTeachers = async () => {
        const result = await getTeachers();
        setTeachers(result);
        //         const result2 = await getAssignedGradeAndSubjects(1);
        // setAssigned(result2);
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


    return (
        <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="lg:w-[600px] overflow-y-auto bg-white rounded-xl shadow-lg">
            <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
                    Edit Assigned
                </DialogTitle>
                </DialogHeader>
                <div className=" flex flex-col items-center gap-7 py-4">

                    <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] lg:w-[400px]">
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
                        <p>Loading...</p>
                    ) : assigned.length === 0 && selectedTeacher ? (
                        <div>
                            no assigned subjects yet
                        </div>
                    ): (
                        <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] lg:w-[400px]">
                            <span className="text-dGreen text-sm font-semibold">Assigned Grade & Subject:</span>
                            <select
                            className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                            value={
                                selectedGradeLevel && selectedSubject
                                ? `${selectedGradeLevel}|${selectedSubject}`
                                : ""
                            }
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


                    <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] lg:w-[400px]">
                        <span className="text-dGreen text-sm font-semibold">Grade:</span>
                        <select
                            className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                        >
                            <option value="">--Select Grade Level--</option>
                        </select>
                    </section>      

                    <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] lg:w-[400px]">
                        <span className="text-dGreen text-sm font-semibold">Subject:</span>
                        <select
                            className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                        >
                            <option value="">--Select Subject--</option>
                        </select>
                    </section>
                    
            




                    <Button
                    variant={"confirmButton"}
                    className="px-4 py-2 rounded-lg"
                    >
                        Submit
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}