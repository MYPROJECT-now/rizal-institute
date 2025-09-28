import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { getAssignClass } from "@/src/actions/teacherAction";

export const MyClasses = async () => {
  const myClass = await getAssignClass();

  if (!myClass || myClass.length === 0) {
    return <div className="text-center py-4 text-gray-500">No classes assigned.</div>;
  }

  return (
    <div className="sm:px-10 px-3 pt-5 grid sm:grid-cols-2 grid-cols-1 gap-5">
      {myClass.map((cls, index) => (
        <Link
          href={`/ACCOUNTS/teacher/class?filterID=${cls.gradeLevel_id}-${cls.subject_id}`}
          key={index}
        >
          <Card>
            <CardContent className="p-4 text-sm sm:text-lg">
              Grade {cls.gradeLevelName} {cls.sectionName ? ` ${cls.sectionName}` : ""} - {cls.subjectName}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
