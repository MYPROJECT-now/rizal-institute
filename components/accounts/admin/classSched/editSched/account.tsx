"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEditScheduleModal,  } from "@/src/store/ADMIN/addSchedule";
import { getData, getDaySched, getTeachersName, updateSchedule } from "@/src/actions/adminAction";
import { Skeleton } from "@/components/ui/skeleton";



export const Edit_Schedule = () => {

  const { isOpen, close } = useEditScheduleModal();
  const [teachers, setTeachers] = useState<{ clerk_uid: number; clerk_username: string }[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState(0);



  const [teacherSchedules, setTeacherSchedules] = useState<{
      section_id: number | null;
      sectionName: string | null;
      gradeLevel_id: number | null;
      gradeLevelName: string | null;
      subject_id: number | null;
      subjectName: string | null;
    }[]>([]);

  // const [selectedGradeLevel, setSelectedGradeLevel] = useState(0);
  // const [selectedSection, setSelectedSection] = useState(0);
  // const [selectedSubject, setSelectedSubject] = useState(0);

  const [day, setDay] = useState<{ 
        schedule_id: number; 
        dayOfWeek: string; 
        startTime: string; 
        endTime: string;
      }[]>([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [sched_id, setSched_id] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [loadsgs, setLoadsgs] = useState(false);
  // const [daySelected, setDaySelected] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const result = await getTeachersName();
      setTeachers(result);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleTeacherChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoadsgs(true);
    const teacherId = Number(e.target.value);
    setSelectedTeacher(teacherId);
  
    if (teacherId) {
      const result = await getData(teacherId);
      setTeacherSchedules(result);
      setLoadsgs(false);
    } else {
      setTeacherSchedules([]);
    }
  };



  const handleEdit = async () => {
    await updateSchedule(sched_id, startTime, endTime);
    toast.success("Schedule updated successfully.");
    close();
    window.location.reload();
  };

  const handleClose = () => {
    close();
    setSelectedTeacher(0);
    setStartTime("");
    setEndTime("");
    setSched_id(0);
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="lg:w-[600px] overflow-y-auto bg-white rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Edit Schedule
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-5">

          <div className="flex flex-col items-center pt-5 gap-5">
          {isLoading ? (
            <div className="w-full flex items-center justify-center py-5">
                <Skeleton className="h-[30px] w-[200px] sm:w-[300px] lg:w-[400px] " />
            </div>
          ):(
            <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
              <span className="text-dGreen text-sm font-semibold">Teacher:</span>
              <select
                value={selectedTeacher}
                onChange={handleTeacherChange}
                className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
              >
                <option value="">-- Select Teacher --</option>
                {teachers.map((teach) => (
                  <option key={teach.clerk_uid} value={teach.clerk_uid}>
                    {teach.clerk_username}
                  </option>
                ))}
              </select>
            </section>   
         )}

            {loadsgs ? (
              <div className="w-full flex items-center justify-center">
                <Skeleton className="h-[30px] w-[200px] sm:w-[300px] lg:w-[400px] " />
              </div>
            ): (
              <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
              <span className="text-dGreen text-sm font-semibold">Grade | Section | Subject:</span>
              <select
                disabled={!selectedTeacher}
                onChange={(e) => {
                const [sectionID, gradeID, subjectID] = e.target.value.split("|").map(Number);
  
                // setSelectedSection(sectionID);
                // setSelectedGradeLevel(gradeID);
                // setSelectedSubject(subjectID);
                // setDaySelected(true);
                
                if (gradeID && subjectID && sectionID) {
                  getDaySched(gradeID, subjectID, sectionID).then((result) => {
                    setDay(result);
                  });
                } else {
                  setDay([]);
                }
              }}
                className="border-2 border-gray-300 rounded px-3 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
              >
                <option value="">-- Select Grade & Section & Subject --</option>
                  {teacherSchedules.map((sched ,idx) => (
                    <option 
                      key={idx} 
                      value={`${sched.section_id}|${sched.gradeLevel_id}|${sched.subject_id}`}
                    >

                      Grade {sched.gradeLevelName} - {sched.sectionName}  - {sched.subjectName}
                    </option>
                  ))}
              </select>
            </section>  
            )}
            

            <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
            <span className="text-dGreen text-sm font-semibold">Days of the Week:</span>
            <select
              value={selectedDay}
              disabled={!selectedTeacher}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setSelectedDay(selectedValue);

                const selectedSched = day.find((d) => d.dayOfWeek === selectedValue);
                if (selectedSched) {
                  setStartTime(selectedSched.startTime);
                  setEndTime(selectedSched.endTime);
                  setSched_id(selectedSched.schedule_id);

                } else {
                  setStartTime("");
                  setEndTime("");
                }
              }}
              className="border-2 border-gray-300 rounded px-3 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            >
              <option value="">-- Select Day --</option>
              {day.map((d) => (
                <option key={d.schedule_id} value={d.dayOfWeek}>
                  {d.dayOfWeek}
                </option>
              ))}
            </select>
          </section>

          <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
            <span className="text-dGreen text-sm font-semibold">Start:</span>
            <input 
              type="time" 
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border-2 border-gray-300 rounded px-3 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            />
          </section>

          <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
            <span className="text-dGreen text-sm font-semibold">End:</span>
            <input 
              type="time" 
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border-2 border-gray-300 rounded px-3 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            />
          </section>



          <Button
            variant="confirmButton"
            className="sm:p-5 p-2 mt-2  rounded-lg"
            onClick={handleEdit}
          >
            Edit Schedule
          </Button>

          </div>
 

        </div>
    </DialogContent>
  </Dialog>
  );
};
