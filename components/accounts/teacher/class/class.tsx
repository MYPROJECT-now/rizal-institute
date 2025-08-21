"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getAssignClass } from "@/src/actions/teacherAction";
import { ClassType } from "@/src/type/TEACHER/teacher";
import Link from "next/link";
import { useEffect, useState } from "react";

export const MyClasses = () => {
  const [myClass, setMyClass] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAssignClass();
      setMyClass(data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;

  if (myClass.length === 0)
    return <div className="text-center py-4 text-gray-500">No classes assigned.</div>;

  return (
    <div className="w-full px-10 pt-5 grid grid-cols-2 gap-5">
      {myClass.map((cls, index) => (
        <Link 
          href={`/ACCOUNTS/teacher/class?filterID=${cls.gradeLevel_id}-${cls.subject_id}`}        
          key={index}>
          <Card>
            <CardContent className="p-4">
              {cls.gradeLevelName} - {cls.subjectName}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
