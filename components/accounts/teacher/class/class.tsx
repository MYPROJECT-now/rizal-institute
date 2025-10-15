import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { getAssignClass, getSchedPerClass } from "@/src/actions/teacherAction";
import { Clock, MapPin } from "lucide-react";

export const MyClasses = async () => {
  const [myClass, schedList] = await Promise.all([
    getAssignClass(),
    getSchedPerClass(),
  ]);

  if (!myClass || myClass.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        No classes assigned.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-10 p-10 h-full">
      {myClass.map((cls, index) => {
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
            <Card className="rounded-xl">
              <div className="bg-gradient-to-r from-green-600 to-green-400 text-white px-5 py-3 rounded-t-2xl font-semibold text-lg">
                Grade {cls.gradeLevelName}
                {cls.sectionName ? ` ${cls.sectionName}` : ""} —{" "}
                {cls.subjectName}
              </div>
              <CardContent className="p-5 space-y-3 text-sm text-gray-700">
                {schedules && schedules.length > 0 ? (
                  schedules.map((sched, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border text-gray-600"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="capitalize">
                          {sched.dayOfWeek}:
                        </span>
                      </div>
                      <div className="text-right text-gray-700">
                        {sched.startTime} - {sched.endTime}
                        <div className="flex items-center gap-1 text-xs text-gray-500 justify-end">
                          <MapPin className="w-3 h-3" />
                          {sched.roomName}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-400 italic">
                    No schedule set
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
