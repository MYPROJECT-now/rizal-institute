"use client";

import { useEffect, useState } from "react";
import { getMySched } from "@/src/actions/teacherAction";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type MySchedType = {
  sectionName: string | null;
  gradeLevelName: string | null;
  subjectName: string | null;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  roomName: string | null;
};

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];

export const MySched = () => {
  const [schedules, setSchedules] = useState<MySchedType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSched = async () => {
      const data = await getMySched();
      if (data) setSchedules(data);
      setLoading(false);
    };
    fetchSched();
  }, []);

  const grouped = daysOfWeek.map((day) => ({
    day,
    entries: schedules
      .filter((s) => s.dayOfWeek === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime)),
  }));

  const renderSkeleton = () => (
    <div className="flex flex-col gap-2 w-full">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex  items-center justify-around w-full">
          <Skeleton className="h-5 w-[150px]" />
          <Skeleton className="h-5 w-[15    0px]" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  p-5 gap-4 py-10">
      {grouped.map(({ day, entries }) => (
        <Card
          key={day}
          className="p-2 shadow-md border-[3px] border-gray-200 flex flex-col gap-2 items-center"
        >
          <h3 className="capitalize font-merriweather font-bold text-dGreen">
            {day}
          </h3>
          <hr className="border-dGreen border-1 w-full" />

          {/* <section className="w-full space-y-1">
            {loading ? (
              renderSkeleton()
            ) : (
              entries.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3 py-2 border-b-2 border-gray-300"
                >
                  <span className="font-mono text-sm text-gray-700 w-28">
                    {s.startTime} – {s.endTime}
                  </span>
                  <span className="text-gray-900 font-medium text-sm">
                    {s.subjectName} — Grade {s.gradeLevelName} {s.sectionName}
                  </span>
                </div>
              ))
            )}
          </section> */}
          
          <section className="w-full space-y-1">
            {loading ? (
              renderSkeleton()
            ) : entries.length === 0 ? (
              <div className="flex items-center justify-center px-3 py-2 border-b-2 border-gray-300 text-gray-500 italic">
                No Schedule
              </div>
            ) : (
entries.map((s, idx) => (
  <div
    key={idx}
    className="flex flex-col py-2 px-6 border-b-2 border-gray-300"
  >
    {/* Top row: time + subject */}
    <div className="grid grid-cols-2 gap-9">
      <span className="text-gray-900 font-medium text-sm">
        {s.subjectName ?? "No Subject"} — Grade {s.gradeLevelName ?? "N/A"}
      </span>
      <span className="font-mono text-sm text-gray-700 w-28">
        {s.startTime} – {s.endTime}
      </span>
    </div>

    <div className="grid grid-cols-2 gap-9">
    <span className="text-gray-900 font-medium text-sm mt-1">
      {s.sectionName ?? "No Section"} 
    </span>
    <span className="text-gray-900 font-medium text-sm mt-1">
      {`(${s.roomName ?? "No Room"})`}
    </span>
    </div>
  </div>
))

            )}
          </section>

        </Card>
      ))}
    </div>
  );
};
