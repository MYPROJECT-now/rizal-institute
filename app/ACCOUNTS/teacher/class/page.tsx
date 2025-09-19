// StudentPage.tsx
import Teacher_header from "@/app/header/header_teacher";
import { MyStudentsClient } from "@/components/accounts/teacher/student/student";
import { getAssignClass, getMyStudents } from "@/src/actions/teacherAction";
import { MyStudentType } from "@/src/type/TEACHER/teacher";

export default async function StudentPage({
  searchParams,
}: {
  searchParams?: Promise<{ filterID?: string }>
}) {
  const resolved = await searchParams;
  const filterID = resolved?.filterID;
  let title = "No class selected";
  let students: MyStudentType[] = [];

  if (filterID) {
    const [gradeLevel_id, subject_id] = filterID.split("-").map(Number);
    const classes = await getAssignClass();
    const match = classes?.find(
      (c) => c.gradeLevel_id === gradeLevel_id && c.subject_id === subject_id
    );

    title = match
      ? `Grade ${match.gradeLevelName} ${match.sectionName ? ` ${match.sectionName}` : ""} - ${match.subjectName}`
      : "Class not found";

    if (match) {
      students = await getMyStudents(gradeLevel_id, subject_id);
    }
  }

  return (
    <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10 bg-page">
      <Teacher_header />
      <div className="w-full h-[540px] bg-white self-center mt-10 rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
          {title}
        </div>
        <MyStudentsClient students={students} />
      </div>
    </div>
  );
}
