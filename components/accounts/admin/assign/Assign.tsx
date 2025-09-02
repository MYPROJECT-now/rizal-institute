// "use client";

// import { getTeachers } from "@/src/actions/adminAction";
// import { useEffect, useState } from "react";

// type Grade = {
//   gradeLevel_id: number;
//   gradeLevelName: string;
// };

// type Subject = {
//   subject_id: number;
//   subjectName: string;
// };

// type Teacher = {
//   clerk_username: string;
// };

// interface Props {
//   grades: Grade[];
//   subjects: Subject[];
// }

// export const GradeSubjectMap = ({ grades, subjects }: Props) => {
//   const [teachers, setTeachers] = useState<Teacher[]>([]);

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       const result = await getTeachers();
//       setTeachers(result);
//     };
//     fetchTeachers();
//   }, []);

//   return (
//     <div className="flex flex-col items-center p-10 max-h-[450px] overflow-y-scroll">
//       <section className="flex flex-row items-center gap-5 mb-6">
//         <label className="mb-2 font-semibold">Username:</label>
//         <select className="p-2 border rounded">
//           <option value="">Select a teacher</option>
//           {teachers.map((teacher, idx) => (
//             <option key={idx} value={teacher.clerk_username}>
//               {teacher.clerk_username}
//             </option>
//           ))}
//         </select>
//       </section>

//       <section className="w-full grid grid-cols-2 gap-4">
//         {grades.map((grade) => (
//           <div key={grade.gradeLevel_id}>
//             <h2 className="text-lg font-bold">Grade {grade.gradeLevelName}</h2>
//             <ul className="pl-4 text-sm">
//               {subjects.map((subject) => (
//                 <li key={`${grade.gradeLevel_id}-${subject.subject_id}`}>
//                   <label className="inline-flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       value={subject.subject_id}
//                       name={`grade-${grade.gradeLevel_id}-subjects`}
//                       className="checkbox"
//                     />
//                     <span>{subject.subjectName}</span>
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// };




"use client";

import { useEffect, useState } from "react";
import { assignSubjectsToTeacher, getTeachers } from "@/src/actions/adminAction";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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

interface Props {
  grades: Grade[];
  subjects: Subject[];
}

export const GradeSubjectMap = ({ grades, subjects }: Props) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedPairs, setSelectedPairs] = useState<{ gradeLevel_id: number; subject_id: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      const result = await getTeachers();
      setTeachers(result);
    };
    fetchTeachers();
  }, []);

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
  };

  return (
    <div className="flex flex-col sm:p-10 p-4 max-h-[500px] w-full overflow-y-auto">
      <section className="flex sm:flex-row flex-col items-start sm:items-center gap-0 sm:gap-5 mb-6">
        <label className="mb-2 font-semibold text-xs sm:text-sm text-dGreen">Username:</label>
        <select className="p-2 w-full sm:w-[200px] border-2 border-gray-300 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none rounded-lg" onChange={(e) => setSelectedTeacher(e.target.value)}>
          <option value="">Select a teacher</option>
          {teachers.map((teacher, idx) => (
            <option key={idx} value={teacher.clerk_username}>
              {teacher.clerk_username}
            </option>
          ))}
        </select>
      </section>

      <section className="w-full grid sm:grid-cols-2 grid-cols-1 gap-4 ">
        {grades.map((grade) => (
          <div key={grade.gradeLevel_id}>
            <h2 className="text-lg font-bold text-dGreen">Grade {grade.gradeLevelName}</h2>
            <ul className="pl-4 text-sm">
              {subjects.map((subject) => {
                const checked = selectedPairs.some(
                  (p) => p.gradeLevel_id === grade.gradeLevel_id && p.subject_id === subject.subject_id
                );
                return (
                  <li key={`${grade.gradeLevel_id}-${subject.subject_id}`}>
                    <label className="inline-flex items-center space-x-2">
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
        disabled={isLoading}
      >
        {isLoading ? "Assigning..." : "Assign"}
      </Button>
      </section>
    </div>
  );
};
