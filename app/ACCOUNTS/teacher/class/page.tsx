// StudentPage.tsx
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
    <div className="h-full flex flex-col  rounded-t-lg  lg:px-5 px-0 ">
      <section className="w-full h-full bg-white self-center lg:mt-2 mt-0">
          <header className="  rounded-t-lg bg-lGreen font-merriweather text-white sm:pl-5 pl-2 sm:py-5 py-4 text-sm sm:text-lg lg:text-2xl lg:border-0 border-x-2 border-t-2 border-white">
            {title}
          </header>
          <MyStudentsClient students={students} />
      </section>
    </div>
  );
}
