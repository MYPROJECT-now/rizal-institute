"use client";
import { FC, useState, useMemo } from "react";
import { SchedType } from "@/src/type/ADMIN/admin";
import SchedTodo from "./classSchedTodo";
import { Add_Schedule } from "../add_schedule/account";
import { useDeleteScheduleModal, useEditScheduleModal, usescheduleModal } from "@/src/store/ADMIN/addSchedule";
import { Button } from "@/components/ui/button";
import { Edit_Schedule } from "../editSched/account";
import { Delete_Schedule } from "../deleteSched/account";

interface Props {
  scheds: SchedType[];
}

const SchedTodos: FC<Props> = ({ scheds }) => {
  const { open: openAdd } = usescheduleModal();
  const { open: openEdit } = useEditScheduleModal();
  const { open: openDelete } = useDeleteScheduleModal();  

  // filter states
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");
  const [selectedSection, setSelectedSection] = useState<string>("all");

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  // 🟢 Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 4; // adjust how many rows you want per page

  // 🟢 Filter logic
  const filteredScheds = useMemo(() => {
    return scheds.filter((s) => {
      const teacherMatch =
        selectedTeacher === "all" || s.clerk_username === selectedTeacher;
      const sectionMatch =
        selectedSection === "all" ||
        `${s.gradeLevelName}-${s.sectionName}` === selectedSection;
      return teacherMatch && sectionMatch;
    });
  }, [scheds, selectedTeacher, selectedSection]);

  // 🟢 Group filtered schedules by day
  const groupedScheds = useMemo(() => {
    return days.reduce((acc, day) => {
      acc[day] = filteredScheds.filter((s) => s.dayOfWeek === day);
      return acc;
    }, {} as Record<string, SchedType[]>);
  }, [filteredScheds]);

  // 🟢 Calculate max rows across all days
  const maxRows = useMemo(
    () => Math.max(...days.map((d) => groupedScheds[d].length), 0),
    [groupedScheds]
  );

  const totalPages = Math.max(1, Math.ceil(maxRows / rowsPerPage));

  // 🟢 Paginated rows
  const paginatedRows = Array.from(
    { length: rowsPerPage },
    (_, i) => currentPage * rowsPerPage + i
  ).filter((rowIdx) => rowIdx < maxRows);

  // 🟢 Dropdown options
  const teacherOptions = useMemo(
    () =>
      Array.from(new Set(scheds.map((s) => s.clerk_username).filter(Boolean))),
    [scheds]
  );

  const sectionOptions = useMemo(
    () =>
      Array.from(
        new Set(
          scheds
            .map((s) =>
              s.gradeLevelName && s.sectionName
                ? `${s.gradeLevelName}-${s.sectionName}`
                : null
            )
            .filter(Boolean)
        )
      ),
    [scheds]
  );

  return (
    <div className=" flex-1 lg:min-h-0 text-xs sm:text-sm  sm:px-8 px-3 sm:py-6 py-4 sm:pt-6 text-center">
      <Add_Schedule />
      <Edit_Schedule />
      <Delete_Schedule />

      <section className="flex  flex-col sm:flex-row  items-start sm:items-center gap-2 sm:gap-2 lg:gap-4 mb-4">
        <label className="text-green-900 font-bold text-sm">Filter By:</label>
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
        >
          <option value="all">All Teachers</option>
          {teacherOptions.map((t) => (
            <option key={t} value={t ?? ""}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="border-2 border-gray-300 rounded px-3 py-1  w-full sm:w-[200px] focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
        >
          <option value="all">All Sections</option>
          {sectionOptions.map((sec) => (
            <option key={sec} value={sec ?? ""}>
              {sec}
            </option>
          ))}
        </select>

        <Button
          onClick={() => {
            setSelectedTeacher("all");
            setSelectedSection("all");
          }}
          variant="confirmButton"
          className=" rounded-lg lg:px-5 sm:px-3 px-2  lg:py-2 py-1 text-xs sm:text-sm  sm:w-auto w-full "
        >
          Clear Filters
        </Button>

        <Button
          onClick={openAdd}
          variant={"confirmButton"}
          className=" rounded-lg lg:px-5 sm:px-3 px-2  lg:py-2 py-1 text-xs sm:text-sm  sm:w-auto w-full "
        >
          Add Schedule
        </Button>

        <Button 
          onClick={openEdit}
          variant={"acceptButton"} 
          className=" rounded-lg lg:px-5 sm:px-3 px-2  lg:py-2 py-1 text-xs sm:text-sm  sm:w-auto w-full "
        >
          Edit
        </Button>

        <Button 
          onClick={openDelete}
          variant={"rejectButton"} 
          className=" rounded-lg lg:px-5 sm:px-3 px-2  lg:py-2 py-1 text-xs sm:text-sm  sm:w-auto w-full "
        >
          Delete
        </Button>
      </section>

      {/* 🔽 Schedule Table */}
      <section className="overflow-x-auto min-w-[100px] shadow-lg rounded-lg border border-green-300 bg-green-50">
        <table className="w-full text-xs sm:text-sm text-center">
          <thead>
            <tr className="bg-green-600 text-white">
              {days.map((day) => (
                <th key={day} className="px-4 py-2 capitalize">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {paginatedRows.map((rowIdx) => (
              <tr
                key={rowIdx}
                className={rowIdx % 2 === 0 ? "bg-white" : "bg-green-100"}
              >
                {days.map((day) => (
                  <td key={day} className="px-4 py-2">
                    {groupedScheds[day][rowIdx] ? (
                      <SchedTodo sched={groupedScheds[day][rowIdx]} />
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 🔽 Pagination Controls */}
      <section className=" flex items-center justify-center gap-2 mt-5">
        <Button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
          disabled={currentPage === 0}
          variant="prevButton"
          className="px-4 py-2 rounded-lg"
        >
          Previous
        </Button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          variant="prevButton"
          className="px-4 py-2 rounded-lg"
        >
          Next
        </Button>
      </section>
    </div>
  );
};

export default SchedTodos;
