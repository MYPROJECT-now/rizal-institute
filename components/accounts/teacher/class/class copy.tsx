import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { getAssignClass, getSchedPerClass } from "@/src/actions/teacherAction";

export const MyClasses = async () => {
  const [myClass, schedList] = await Promise.all([
    getAssignClass(),
    getSchedPerClass(),
  ]);

  if (!myClass || myClass.length === 0) {
    return <div className="text-center py-4 text-gray-500">No classes assigned.</div>;
  }

  return (
    <div className="sm:px-10 px-3 pt-5 grid sm:grid-cols-2 grid-cols-1 gap-5">
      {myClass.map((cls, index) => {
        // 🔹 Find schedules that match this class
        const schedules = schedList?.filter(
          (s) =>
            s.gradeLevel_id === cls.gradeLevel_id &&
            s.subject_id === cls.subject_id
        );

        return (
          <Link
            href={`/ACCOUNTS/teacher/class?filterID=${cls.gradeLevel_id}-${cls.subject_id}`}
            key={index}
          >
            <Card>
              <CardContent className="p-4 text-sm sm:text-lg space-y-2">
                <div>
                  Grade {cls.gradeLevelName}
                  {cls.sectionName ? ` ${cls.sectionName}` : ""} -{" "}
                  {cls.subjectName}
                </div>

                {/* 🔹 Show schedules */}
                {schedules && schedules.length > 0 ? (
                  <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                    {schedules.map((sched, i) => (
                      <div key={i}>
                        {sched.dayOfWeek}: {sched.startTime} - {sched.endTime}{" "}
                        ({sched.roomName})
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400">No schedule set</div>
                )}
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
