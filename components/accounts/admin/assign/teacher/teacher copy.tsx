// "use client";

// import { useEffect, useState } from "react";
// import { getAssignedLoad2 } from "@/src/actions/adminAction";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export const TeacherAssignmentPage = () => {
//   const [groupedLoads, setGroupedLoads] = useState<Record<string, any[]>>({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLoad = async () => {
//       try {
//         const data = await getAssignedLoad2();

//         // Group by teacher name
//         const grouped = data.reduce((acc: Record<string, any[]>, item: any) => {
//           const teacher = item.TeachersName || "Unassigned";
//           if (!acc[teacher]) acc[teacher] = [];
//           acc[teacher].push(item);
//           return acc;
//         }, {});

//         setGroupedLoads(grouped);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLoad();
//   }, []);

//   if (loading) {
//     return <div className="p-5 text-center text-gray-500">Loading...</div>;
//   }

//   if (!groupedLoads || Object.keys(groupedLoads).length === 0) {
//     return <div className="p-5 text-center text-gray-500">No assignments yet</div>;
//   }

//   return (
//     <div className="p-5 grid gap-4 grid-cols-4">
//       {Object.entries(groupedLoads).map(([teacher, subjects]) => (
//         <Card key={teacher} className="shadow-md hover:shadow-lg transition">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl capitalize font-semibold font-oswald text-dGreen">{teacher}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {subjects.map((subject, idx) => (
//               <div key={idx} className="flex flex-row justify-center text-md">
//                 <p className=" text-green-900 w-[90px]  ">
//                   <span className="font-bold ">Grade:</span> {subject.gradeLevelName} 
//                 </p>
//                 <p className=" text-green-900">
//                    <span className="font-bold ">Subject:</span> {subject.subjectName}
//                 </p>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };
