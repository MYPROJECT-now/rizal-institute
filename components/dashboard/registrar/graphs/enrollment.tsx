// "use client"
// import { Bar, BarChart, CartesianGrid, XAxis, YAxis,  } from "recharts"
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

// const chartData = [
//     { month: "January", desktop: 186 },
//     { month: "February", desktop: 305 },
//     { month: "March", desktop: 237 },
//     { month: "April", desktop: 73 },
//     { month: "May", desktop: 209 },
//     { month: "June", desktop: 214 },
//   ]
//   const chartConfig = {
//     desktop: {
//       label: "Mob",
//       color: "hsl(var(--chart-1))",
//     },
//   } satisfies ChartConfig
  

// export const Enrollment = () => {
//     return (
//         <div>
//         <Card className="w-[550px]">
//             <CardHeader>
//                 <CardTitle className="text-center">Enrollment Trend</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <ChartContainer config={chartConfig} style={{ width: 500, height: 200 }}>
//                     <BarChart accessibilityLayer data={chartData}>
//                         <CartesianGrid vertical={false} />
//                         <XAxis
//                         dataKey="month"
//                         tickLine={false}
//                         tickMargin={10}
//                         axisLine={false}
//                         tickFormatter={(value) => value.slice(0, 3)}
//                         />

//                         <YAxis 
//                         label={{ value: "Number of Students", angle: -90, position: "insideLeft", textanchor: "center", dy:80, dx:10}} 
//                         style={{ fontSize: '10px' }} 
//                         />
                        
//                         <ChartTooltip
//                         cursor={false}
//                         content={<ChartTooltipContent hideLabel />}
//                         />
//                         <Bar dataKey="desktop" fill="var(--color-desktop)" radius={1} />
//                     </BarChart>
//                 </ChartContainer>
//             </CardContent>
//         </Card>
//         </div>
//     );
// };


"use client"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export const Enrollment = () => {
  return (
    <div>
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle className="text-center">Enrollment Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} style={{ width: 500, height: 200 }}>
            <LineChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                label={{
                  value: "Number of Students",
                  angle: -90,
                  position: "insideLeft",
                  textAnchor: "middle",
                  dy: 80,
                  dx: 10,
                }}
                style={{ fontSize: "10px" }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line
                type="monotone"
                dataKey="desktop"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
