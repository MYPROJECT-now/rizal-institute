// "use client"

// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { usescheduleModal } from "@/src/store/ADMIN/addSchedule";
// import { AddSchedule, checkSchedule, getAvailableAssignments, getSubjects, getTeachersName, gradeAndSection } from "@/src/actions/adminAction";
// import { Loader2 } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";


// export const Add_Schedule = () => {

//   const { isOpen, close } = usescheduleModal();

//   const [subjects, setSubjects] = useState<{ subject_id: number; subject_name: string }[]>([]);
//   const [teachers, setTeachers] = useState<{ clerk_uid: number; clerk_username: string }[]>([]);
//   const [gradeSections, setGradeSections] = useState<{ gradeLevel_id: number; gradeLevelName: string | null; section_id: number; sectionName: string }[]>([]);
//   const [selectedDays, setSelectedDays] = useState<string[]>([]);
//   // const [assigned, setAssigned] = useState<{ gradeLevel_id: number; subject_id: number }[]>([]);
// const [assignmentData, setAssignmentData] = useState<{
//   available: { gradeLevel_id: number; subject_id: number }[];
//   scheduledAll: boolean;
//   noAssigned: boolean;
// }>({ available: [], scheduledAll: false, noAssigned: false });


//   const [selectedSubject, setSelectedSubject] = useState(0);
//   const [selectedTeacher, setSelectedTeacher] = useState(0);
//   const [selectedGradeLevel, setSelectedGradeLevel] = useState(0);
//   const [selectedSection, setSelectedSection] = useState(0);
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   const [isLoading, setIsLoading] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const toggleDay = (day: string) => {
//     setSelectedDays((prev) =>
//       prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
//     );
//   };
//   // fetch subjects on mount
//   useEffect(() => {
//     setIsLoading(true);
//     const fetchSubjects = async () => {
//       const result = await getSubjects();
//       const result2 = await getTeachersName();
//       const result3 = await gradeAndSection();
//       setSubjects(result);
//       setTeachers(result2);
//       setGradeSections(result3);
//       setIsLoading(false);
//     };
//     fetchSubjects();
//   }, []);

// // const handleTeacherChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
// //   const teacherId = Number(e.target.value);
// //   setSelectedTeacher(teacherId);
// //   setLoader(true);

// //   if (teacherId) {
// //     const result = await getAvailableAssignments(teacherId);
// //     setAssigned(result);   // only assignments not yet scheduled
// //     setLoader(false);
// //   } else {
// //     setAssigned([]);
// //   }

// //   // reset when teacher changes
// //   setSelectedGradeLevel(0);
// //   setSelectedSection(0);
// //   setSelectedSubject(0);
// // };

// const handleTeacherChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
//   const teacherId = Number(e.target.value);
//   setSelectedTeacher(teacherId);
//   setLoader(true);

//   if (teacherId) {
//     const result = await getAvailableAssignments(teacherId);
//     setAssignmentData(result);
//     setLoader(false);
//   } else {
//     setAssignmentData({ available: [], scheduledAll: false, noAssigned: false });
//   }

//   // reset fields
//   setSelectedGradeLevel(0);
//   setSelectedSection(0);
//   setSelectedSubject(0);
// };


//   const handleGradeSectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const [gradeId, sectionId] = e.target.value.split("|"); // split back into separate IDs
//     setSelectedGradeLevel(Number(gradeId));
//     setSelectedSection(Number(sectionId));
//   };



//   const submitSchedule = async () => {
//     if (!selectedSection || !selectedGradeLevel || !selectedSubject || !selectedTeacher || !selectedDays || !startTime || !endTime) {
//       toast.error("Please select all fields.");
//       return;
//     }

//     if (selectedDays.length === 0) {
//       toast.error("Please select at least one day.");
//       return;
//     }

//     if (endTime <= startTime) {
//       toast.error("End time cannot be earlier than or equal to start time.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       for (const day of selectedDays) {
//         const conflicts = await checkSchedule(selectedTeacher, day, startTime, endTime);
//         if (conflicts.length > 0) {
//           toast.error(`Teacher already has a class on ${day} during this time.`);
//           setIsSubmitting(false);
//           return;
//         }

//         await AddSchedule(
//           selectedSection,
//           selectedGradeLevel,
//           selectedSubject,
//           selectedTeacher,
//           day,
//           startTime,
//           endTime
//         );
//       }
//         toast.success("Schedule added successfully.");
//         close();
//         window.location.reload();
//       } catch (error) {
//         toast.error("Failed to add schedule. Please try again.");
//         console.error(error);
//       } finally {
//         setIsSubmitting(false);
//       }
//   };
  
//   const onClose = () => {
//     close();
//     setSelectedDays([]);
//     setSelectedSubject(0);
//     setSelectedTeacher(0);
//     setSelectedGradeLevel(0);
//     setSelectedSection(0);
//     setStartTime("");
//     setEndTime("");

//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="lg:w-[600px] overflow-y-auto bg-white rounded-xl shadow-lg">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
//             Create Schedule
//           </DialogTitle>
//         </DialogHeader>
//         <div className="flex flex-col items-center gap-5">
//           {isLoading ? (
//             <div className="w-full flex items-center justify-center py-5">
//               <Loader2 className="animate-spin text-dGreen" />
//             </div>
//           ):(
//           <div className="flex flex-col items-center pt-5 gap-5">

//             <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
//               <span className="text-dGreen text-sm font-semibold">Teacher:</span>
//               <select
//                 value={selectedTeacher}
//                 onChange={handleTeacherChange}
//                 className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
//               >
//                 <option value="">-- Select Teacher --</option>
//                 {teachers.map((teach) => (
//                   <option key={teach.clerk_uid} value={teach.clerk_uid}>
//                     {teach.clerk_username}
//                   </option>
//                 ))}
//               </select>
//             </section>  


//             {/* Grade & Section select */}
//             {/* {loader ? (
//               <div className="w-full flex flex-col gap-4 items-center justify-center">
//                 <Skeleton className="h-[30px] w-[200px] sm:w-[300px] lg:w-[400px] " />
//                 <Skeleton className="h-[30px] w-[200px] sm:w-[300px] lg:w-[400px] " />

//               </div>
//             ): ( 
//               assigned.length === 0 && selectedTeacher ? (
//               <div className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
//                 <p className="text-red-500 font-semibold text-center">
//                   No subject asigned to this teacher
//                 </p>
//               </div>
//               ) : (
//                 <>
//                   <select
//                     onChange={handleGradeSectionChange}
//                     disabled={!selectedTeacher}
//                     value={
//                       selectedGradeLevel && selectedSection
//                         ? `${selectedGradeLevel}|${selectedSection}`
//                         : ""
//                     }
//                     className="border-2 border-gray-300 rounded px-3 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
//                   >
//                     <option value="">-- Select Grade & Section --</option>
//                     {gradeSections
//                       .filter((gs) =>
//                         assigned.some((a) => a.gradeLevel_id === gs.gradeLevel_id)
//                       )
//                       .map((gs) => (
//                         <option
//                           key={gs.section_id}
//                           value={`${gs.gradeLevel_id}|${gs.section_id}`}
//                         >
//                           Grade {gs.gradeLevelName} - {gs.sectionName}
//                         </option>
//                       ))}
//                   </select>

//                   <select
//                     value={selectedSubject}
//                     disabled={!selectedTeacher || !selectedGradeLevel || !selectedSection}
//                     onChange={(e) => setSelectedSubject(Number(e.target.value))}
//                     className="border-2 border-gray-300 rounded px-3 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
//                   >
//                     <option value="">-- Select Subject --</option>
//                     {subjects
//                       .filter((subj) =>
//                         assigned.some(
//                           (a) =>
//                             a.subject_id === subj.subject_id &&
//                             a.gradeLevel_id === selectedGradeLevel
//                         )
//                       )
//                       .map((subj) => (
//                         <option key={subj.subject_id} value={subj.subject_id}>
//                           {subj.subject_name}
//                         </option>
//                       ))}
//                   </select>
//                 </>
//               )
//             )}
//              */}
// {loader ? (
//   <div className="w-full flex flex-col gap-4 items-center justify-center">
//     <Skeleton className="h-[30px] w-[200px] sm:w-[300px] lg:w-[400px]" />
//     <Skeleton className="h-[30px] w-[200px] sm:w-[300px] lg:w-[400px]" />
//   </div>
// ) : (
//   <>
//     {assignmentData.noAssigned && (
//       <p className="text-red-500 font-semibold text-center text-sm">
//         This teacher has no assigned subjects.
//       </p>
//     )}
//     {assignmentData.scheduledAll && !assignmentData.noAssigned && (
//       <p className="text-orange-500 font-semibold text-center text-sm">
//         All assigned subjects for this teacher already have schedules.
//       </p>
//     )}
//     {!assignmentData.noAssigned && !assignmentData.scheduledAll && (
//       <>
//         <select
//           onChange={handleGradeSectionChange}
//           disabled={!selectedTeacher}
//           value={
//             selectedGradeLevel && selectedSection
//               ? `${selectedGradeLevel}|${selectedSection}`
//               : ""
//           }
//           className="border-2 border-gray-300 rounded px-3 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
//         >
//           <option value="">-- Select Grade & Section --</option>
//           {gradeSections
//             .filter((gs) =>
//               assignmentData.available.some((a) => a.gradeLevel_id === gs.gradeLevel_id)
//             )
//             .map((gs) => (
//               <option
//                 key={gs.section_id}
//                 value={`${gs.gradeLevel_id}|${gs.section_id}`}
//               >
//                 Grade {gs.gradeLevelName} - {gs.sectionName}
//               </option>
//             ))}
//         </select>

//         <select
//           value={selectedSubject}
//           disabled={!selectedTeacher || !selectedGradeLevel || !selectedSection}
//           onChange={(e) => setSelectedSubject(Number(e.target.value))}
//           className="border-2 border-gray-300 rounded px-3 py-1 w-full focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
//         >
//           <option value="">-- Select Subject --</option>
//           {subjects
//             .filter((subj) =>
//               assignmentData.available.some(
//                 (a) =>
//                   a.subject_id === subj.subject_id &&
//                   a.gradeLevel_id === selectedGradeLevel
//               )
//             )
//             .map((subj) => (
//               <option key={subj.subject_id} value={subj.subject_id}>
//                 {subj.subject_name}
//               </option>
//             ))}
//         </select>
//       </>
//     )}
//   </>
// )}

            
//           <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
//             <span className="text-dGreen text-sm font-semibold">Days of the Week:</span>
//             <div className="flex flex-wrap gap-2">
//               {["monday", "tuesday", "wednesday", "thursday", "friday"].map((day) => (
//                 <label key={day} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={day}
//                     checked={selectedDays.includes(day)}
//                     onChange={() => toggleDay(day)}
//                     className="accent-dGreen"
//                     disabled={!selectedTeacher || !selectedGradeLevel || !selectedSection}
//                   />
//                   {/* {day.charAt(0).toUpperCase() + day.slice(1)} */}
//                     {day.charAt(0).toUpperCase() + day.slice(1, 3)}
//                 </label>
//               ))}
//             </div>
//           </section>
 

//           <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
//             <span className="text-dGreen text-sm font-semibold">Start:</span>
//             <input 
//               type="time" 
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//               disabled={!selectedTeacher || !selectedGradeLevel || !selectedSection || !selectedDays}
//               className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
//             />
//           </section>
          
//           <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
//             <span className="text-dGreen text-sm font-semibold">End:</span>
//             <input 
//               type="time" 
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//               disabled={!selectedTeacher || !selectedGradeLevel || !selectedSection || !selectedDays}
//               className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
//             />
//           </section>
//           <Button
//             variant="confirmButton"
//             className="sm:p-5 p-2 mt-2  rounded-lg"
//             onClick={submitSchedule}
//             disabled={isSubmitting || !selectedTeacher || !selectedGradeLevel || !selectedSection || !selectedSubject || !selectedDays.length || !startTime || !endTime}
//           >
//             Add Schedule
//           </Button>
//           </div>
//           )}

//         </div>
//     </DialogContent>
//   </Dialog>
//   );
// };
