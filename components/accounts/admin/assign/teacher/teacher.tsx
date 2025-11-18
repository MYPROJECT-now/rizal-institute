"use client";

import { useEffect, useState } from "react";
import { getAssignedLoad2 } from "@/src/actions/adminAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AssignedLoad {
  TeachersName: string | null;
  gradeLevelName: string | null;
  subjectName: string | null;
}

type GroupedLoads = Record<string, AssignedLoad[]>;

export const TeacherAssignmentPage = () => {
  const [groupedLoads, setGroupedLoads] = useState<GroupedLoads>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoad = async () => {
      try {
        const data = await getAssignedLoad2();

        // Group by teacher name
        // const grouped = data.reduce((acc: Record<string, any[]>, item: any) => {
        const grouped = data.reduce((acc: GroupedLoads, item) => {
          const teacher = item.TeachersName || "Unassigned";
          if (!acc[teacher]) acc[teacher] = [];
          acc[teacher].push(item);
          return acc;
        }, {});

        setGroupedLoads(grouped);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoad();
  }, []);

  if (loading) {
    return <div className="p-5 text-center text-gray-500">Loading...</div>;
  }

  if (!groupedLoads || Object.keys(groupedLoads).length === 0) {
    return <div className="p-5 text-center text-gray-500">No assignments yet</div>;
  }

return (
  <div className="p-5 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
    {Object.entries(groupedLoads).map(([teacher, subjects]) => {
      
      // group by grade
      const groupedByGrade = subjects.reduce((acc: Record<string, string[]>, item) => {
        const grade = item.gradeLevelName || "No Grade";
        const subject = item.subjectName || "—";
        if (!acc[grade]) acc[grade] = [];
        acc[grade].push(subject);
        return acc;
      }, {});

      const sortedGrades = Object.keys(groupedByGrade).sort((a, b) => {
        const na = parseInt(a.replace(/\D/g, "")) || 0;
        const nb = parseInt(b.replace(/\D/g, "")) || 0;
        return na - nb;
      });

      return (
        <Card key={teacher} className="rounded-2xl border shadow-sm hover:shadow-md transition bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-2xl font-bold text-dGreen">
              {teacher}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <div className="grid gap-4">
              {sortedGrades.map((grade) => (
                <div
                  key={grade}
                  className="p-4 rounded-xl bg-green-50 border border-green-200"
                >
                  <p className="font-semibold text-green-800 mb-2">
                    Grade {grade}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {groupedByGrade[grade].map((subj, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-white border text-sm shadow-sm"
                      >
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </CardContent>
        </Card>
      );
    })}
  </div>
);

};
