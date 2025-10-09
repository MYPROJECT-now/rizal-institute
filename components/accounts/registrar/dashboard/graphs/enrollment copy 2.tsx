// "use client"
// import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"
// import { useEffect, useState } from "react"
// import { getEnrollmentTrend } from "@/src/actions/registrarAction"
// import { Loader2 } from "lucide-react"



// const chartConfig = {
//   desktop: {
//     label: "Value",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig

// export const Enrollment = () => {
//     const [chartData, setChartData] = useState<{ academicYear: string | null; count: number }[]>([]);
//     const [yAxisMax, setYAxisMax] = useState(5);
//     const [loading, setLoading] = useState(true);


// useEffect(() => {
//   const fetchData = async () => {
//     const res = await getEnrollmentTrend();

//     // Convert to usable format
//     const formattedData = res.map((item) => ({
//       academicYear: item.academicYear,
//       count: Number(item.count),
//     }));

//     // 📌 Pad with future years if less than 3
//     let paddedData = [...formattedData];

//     if (paddedData.length < 4) {
//       const existingYears = paddedData.map((d) => d.academicYear).filter(Boolean) as string[];

//       const latestYear = existingYears.length > 0
//         ? existingYears[0] // assuming DESC order
//         : "2021-2022"; // fallback

//       let [startYear] = latestYear.split("-").map(Number);

//       while (paddedData.length < 4) {
//         startYear += 1;
//         const nextYear = `${startYear}-${startYear + 1}`;
//         if (!existingYears.includes(nextYear)) {
//           paddedData.unshift({
//             academicYear: nextYear,
//             count: 0,
//           });
//         }
//       }
//     }

//     // Sort ascending for proper chart flow (optional)
//     paddedData = paddedData.sort((a, b) =>
//       a.academicYear && b.academicYear
//         ? a.academicYear.localeCompare(b.academicYear)
//         : 0
//     );

//     // Determine max Y-axis
//     const maxCount = Math.max(...paddedData.map((d) => d.count));
//     const paddedMax = Math.ceil((maxCount + 2) / 5) * 5;
//     setYAxisMax(paddedMax);

//     setChartData(paddedData);
//     setLoading(false);

//   };

//   fetchData();
// }, []);


//   return (
//     <div>
//       <Card className="w-full sm:w-[300px] gap-4  lg:w-[300px] xl:w-[400px] 2xl:[550px]">
//         <CardHeader>
//           <CardTitle className="text-center font-bold text-dGreen">Enrollment Trend</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {loading ? (
//             <div className="flex items-center justify-center">
//               <Loader2 className="h-8 w-8 animate-spin text-green-700" />
//             </div>
//           ) : (
//           <ChartContainer config={chartConfig} style={{  }}>
//             <LineChart data={chartData} margin={{ top:15, bottom: 30, right: 35 }}>
//               <CartesianGrid vertical={false} />

//               <XAxis
//                 dataKey="academicYear"
//                 tickLine={false}
//                 tickMargin={5}
//                 axisLine={false}
//                 label={{
//                   value: "Academic Year",
//                   position: "insideBottom",
//                   dy: 25,
//                   style: { fontSize: 12 },
//                 }}
//               >
//               </XAxis>
//             <YAxis
//               domain={[0, yAxisMax]} // always start from 0, end at highest value
//               tick={{ fontSize: 10 }}
//               interval={0}
//               allowDecimals={false} // 👈 this disables .25, .5 etc.
//               label={{
//                 value: "Number of Students",
//                 angle: -90,
//                 position: "insideLeft",
//                 dy: 50,
//                 dx: 10,
//               }}
//               style={{ fontSize: "10px" }}
//             />
//               <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
//               <Line
//                 type="monotone"
//                 dataKey="count"
//                 stroke="#0FC64F  "
//                 strokeWidth={2}
//                 dot={{ r: 3 }}
//                 activeDot={{ r: 5 }}
//               />
//             </LineChart>
//           </ChartContainer>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
