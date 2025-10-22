"use client";

import { useEffect, useState } from "react";
import { assignSubjectsToTeacher, getTeachers } from "@/src/actions/adminAction";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDeleteAssignModal, useEditAssignModal } from "@/src/store/ADMIN/assign";
import { EditAssign } from "./edit/edit";
import { DeleteAssign } from "./delete/delete";
import { Skeleton } from "@/components/ui/skeleton";

type Grade = {
  gradeLevel_id: number;
  gradeLevelName: string;
};

type Subject = {
  subject_id: number;
  subjectName: string;
};

type Teacher = {
  clerk_username: string;
  clerk_uid: number;
};

interface Assignment {
  gradeLevel_id: number;
  subject_id: number;
}

interface Props {
  grades: Grade[];
  subjects: Subject[];
  existingAssignments: Assignment[];

}

export const GradeSubjectMap = ({ grades, subjects, existingAssignments }: Props) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedPairs, setSelectedPairs] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { open: OpenEdit } = useEditAssignModal();
  const { open: OpenDelete } = useDeleteAssignModal();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchTeachers = async () => {
      const result = await getTeachers();
      setTeachers(result);
      setLoading(false);
    };
    fetchTeachers();
  }, []);

  const assignedSet = new Set(
    existingAssignments.map((a) => `${a.gradeLevel_id}-${a.subject_id}`)
  );

  const handleCheckboxChange = (gradeId: number, subjectId: number, checked: boolean) => {
    const pair = { gradeLevel_id: gradeId, subject_id: subjectId };
    if (checked) {
      setSelectedPairs((prev) => [...prev, pair]);
    } else {
      setSelectedPairs((prev) =>
        prev.filter((p) => !(p.gradeLevel_id === gradeId && p.subject_id === subjectId))
      );
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const teacher = teachers.find((t) => t.clerk_username === selectedTeacher);
    if (!teacher) return;

    await assignSubjectsToTeacher({
      clerk_uid: teacher.clerk_uid,
      assignments: selectedPairs,
    });
    // alert("Assigned successfully!");
    toast.success("Assigned successfully!");
    setSelectedPairs([]); // clear
    setSelectedTeacher("");
    setTeachers([]); // clear
    setIsLoading(false);
    window.location.reload();
  };


  return (
    <div className="flex flex-col gap-6 sm:p-10 p-4 max-h-[500px] w-full overflow-y-auto">
      <header className="flex sm:flex-row flex-col gap-3 sm:items-center ">

        <section className="flex sm:flex-row flex-col items-start sm:items-center gap-0 sm:gap-2 ">
          <label className="mb-2 font-semibold text-xs sm:text-sm text-dGreen">Username:</label>
          {loading ? (<Skeleton className="w-full sm:w-[200px] h-10" />) : (
            <select className="p-2 w-full sm:w-[200px] border-2 border-gray-300 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none rounded-lg" onChange={(e) => setSelectedTeacher(e.target.value)}>
              <option value="">Select a teacher</option>
              {teachers.map((teacher, idx) => (
                <option key={idx} value={teacher.clerk_username}>
                  {teacher.clerk_username}
                </option>
              ))}
            </select>
          )}

        </section>

        <EditAssign />
        <Button
        variant={"confirmButton"}
        className="px-5 py-2 rounded-lg"
        onClick={OpenEdit}
        >
          Edit
        </Button>

        <DeleteAssign />
        <Button
        variant={"rejectButton"}
        className="px-5 py-2 rounded-lg"
        onClick={OpenDelete}
        >
          Delete
        </Button>
      </header>

      <section className="w-full grid sm:grid-cols-2 grid-cols-1 gap-4 ">
        {grades.map((grade) => (
          <div key={grade.gradeLevel_id} className="shadow-lg border-2 border-gray-300 rounded-lg p-4">
            <h2 className="text-lg font-bold text-dGreen">Grade {grade.gradeLevelName}</h2>
            <ul className="pl-4 text-sm">

              {subjects.map((subject) => {
              const pairKey = `${grade.gradeLevel_id}-${subject.subject_id}`;
              if (assignedSet.has(pairKey)) {
                // already assigned → skip
                return ;
              }

              const checked = selectedPairs.some(
                (p) =>
                  p.gradeLevel_id === grade.gradeLevel_id &&
                  p.subject_id === subject.subject_id
              );

                return (
                  <li key={`${grade.gradeLevel_id}-${subject.subject_id}`}>
                    <label className="inline-flex items-center space-x-2 text-lGreen font-semibold">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => handleCheckboxChange(grade.gradeLevel_id, subject.subject_id, e.target.checked)}
                      />
                      <span>{subject.subjectName}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>

      <section className="w-full flex justify-center">
        <Button 
          onClick={handleSubmit} 
          variant="confirmButton"
          className="my-6 sm:px-10 sm:py-5 px-7 py-3 rounded-xl"
          disabled={isLoading || !selectedTeacher || selectedPairs.length === 0}
        >
          {isLoading ? "Assigning..." : "Assign"}
        </Button>
      </section>
    </div>
  );
};
