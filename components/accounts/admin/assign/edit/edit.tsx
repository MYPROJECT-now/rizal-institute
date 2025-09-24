import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton";
import {   getAssignedGradeAndSubjects, getGradesWithUnassignedSubjects, getTeachers, getUnassignedSubjectsByGrade, updateAssigned } from "@/src/actions/adminAction";
import { useEditAssignModal } from "@/src/store/ADMIN/assign";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const EditAssign = () => {
    const { isOpen, close} = useEditAssignModal();
    const [teachers, setTeachers] = useState<{ clerk_uid: number; clerk_username: string }[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState(0);
    const [assigned, setAssigned] = useState<{ gradeLevel_id: number; gradeLevelName: string | null; subjectName: string | null; subject_id: number }[]>([]);
    const [selectedGradeLevel, setSelectedGradeLevel] = useState(0);
    const [selectedSubject, setSelectedSubject] = useState(0);
    const [unassignedSubjects, setUnassignedSubjects] = useState<{ subject_id: number; subjectName: string }[]>([]);
    const [grades, setGrades] = useState<{ gradeLevel_id: number; gradeLevelName: string}[]>([]);
    const [selectedUnassignedGrade, setSelectedUnassignedGrade] = useState(0);
    const [selectedUnassignedSubject, setSelectedUnassignedSubject] = useState(0);

    const [loadingteacher, setLoadingTeacher] = useState(false);
    const [loadingGS, setLoadingGS] = useState(false);
    const [loadingS, setLoadingS] = useState(false);
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        setLoadingTeacher(true);
        const fetchTeachers = async () => {
            const result = await getTeachers();
            setTeachers(result);
            setLoadingTeacher(false);
            const result2 = await getGradesWithUnassignedSubjects();
            setGrades(result2);


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


    const handleGradeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLoadingS(true);
        const gradeId = Number(e.target.value);
        setSelectedUnassignedGrade(gradeId);

        if (gradeId) {
            const result = await getUnassignedSubjectsByGrade(gradeId);
            setUnassignedSubjects(result);
            setLoadingS(false);
        } else {
            setUnassignedSubjects([]);
        }
    };

    const handleUpdate = async () => {
        const teacher = teachers.find((t) => t.clerk_uid === selectedTeacher);
        const teacherUsername = teacher ? teacher.clerk_username : "";
        setSubmit(true);
        await updateAssigned(selectedTeacher, selectedUnassignedGrade, selectedUnassignedSubject, selectedGradeLevel, selectedSubject, teacherUsername);
        toast.success("Successfully updated");
        setSubmit(false);
        close();
        window.location.reload();
    }
    

    const onClose = () => {
        setSelectedTeacher(0);
        setSelectedGradeLevel(0);
        setSelectedSubject(0);
        setSelectedUnassignedGrade(0);
        setSelectedUnassignedSubject(0);
        close();
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="lg:w-[600px] overflow-y-auto bg-white rounded-xl shadow-lg">
            <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
                    Edit Assigned
                </DialogTitle>
                </DialogHeader>
                <div className=" flex flex-col items-center gap-7 py-4">

                    <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] lg:w-[400px]">
                        {loadingteacher ? (
                            <Skeleton className="h-[30px] w-[200px] sm:w-[300px] lg:w-[400px] " />
                        ) :(
                        <>
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
                        </>
                        )}

                    </section>

                    {loadingGS ? (
                            <Skeleton className="h-[30px] w-[200px] sm:w-[300px] lg:w-[400px] " />
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
                            disabled={!selectedTeacher}
                            >
                                <option value="">--Select Assign Subject--</option>
                                {assigned.map((assign, idx) => (
                                    <option key={idx} value={`${assign.gradeLevel_id}|${assign.subject_id}`}>
                                    Grade {assign.gradeLevelName} - {assign.subjectName}
                                    </option>
                                ))}

                            </select>
                        </section>
                    )}


                    <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] lg:w-[400px]">
                        <span className="text-dGreen text-sm font-semibold">Grade:</span>
                        <select
                            value={selectedUnassignedGrade}
                            onChange={handleGradeChange}
                            disabled={!selectedTeacher || !selectedGradeLevel && !selectedSubject}
                            className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                        >
                            <option value="">--Select Grade Level--</option>
                            {grades.map((grade) => (
                                <option key={grade.gradeLevel_id} value={grade.gradeLevel_id}>
                                Grade {grade.gradeLevelName}
                                </option>
                            ))}
                        </select>
                    </section>      

                    <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] lg:w-[400px]">
                        {loadingS ? (
                            <Skeleton className="h-[30px] w-[200px] sm:w-[300px] lg:w-[400px] " />
                        ) :(
                        <>
                            <span className="text-dGreen text-sm font-semibold">Subject:</span>
                            <select
                            className="border-2 border-gray-300 rounded px-3 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                            value={selectedUnassignedSubject}
                            onChange={(e) => setSelectedUnassignedSubject(Number(e.target.value))}
                            disabled={!selectedTeacher || !selectedGradeLevel && !selectedSubject || !selectedUnassignedGrade}

                            >
                            <option value="">--Select Subject--</option>
                            {unassignedSubjects.map((subject) => (
                                <option key={subject.subject_id} value={subject.subject_id}>
                                {subject.subjectName}
                                </option>
                            ))}
                            </select>
                            </>
                        )}

                    </section>
                    

                    <Button
                    variant={"confirmButton"}
                    className="px-4 py-2 rounded-lg"
                    onClick={handleUpdate}
                    disabled={!selectedTeacher || !selectedGradeLevel && !selectedSubject || !selectedUnassignedGrade || !selectedUnassignedSubject || submit}
                    >
                        Submit
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}