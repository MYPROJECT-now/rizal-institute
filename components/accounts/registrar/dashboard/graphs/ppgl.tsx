"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getEnrolledCountPerGradeLevel } from "@/src/actions/registrarAction";
import { Loader2 } from "lucide-react";


const chartConfig = {
  desktop: {
    label: "Students",
  },
} satisfies ChartConfig;

export const Ppgl = () => {
  const [chartData, setChartData] = useState<{ gradeLevel: string | null; count: number }[]>([]);
  const [yAxisMax, setYAxisMax] = useState(5);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  const fetchData = async () => {
    const res = await getEnrolledCountPerGradeLevel();

    const defaultGrades = ["7", "8", "9", "10"];
    // Map received data to an object for quick lookup
    const dataMap = new Map(res.map(item => [item.gradeLevel, Number(item.count)]));

    // Fill missing grades with 0
    const filledData = defaultGrades.map(grade => ({
      gradeLevel: grade,
      count: dataMap.get(grade) ?? 0,
    }));

    const maxCount = Math.max(...filledData.map((d) => d.count));
    const paddedMax = Math.ceil((maxCount + 2) / 5) * 5;
    setYAxisMax(paddedMax);

    setChartData(filledData);
    setLoading(false);
  };

  fetchData();
}, []);



  return (
    <Card className=" w-full sm:w-[300px]  gap-4  lg:w-[300px] xl:w-[400px] 2xl:[550px]">
      <CardHeader>
        <CardTitle className="text-center font-bold text-dGreen">Population Per Grade Level</CardTitle>
      </CardHeader>
      <CardContent>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-green-700" />
            </div>
          ) : (
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} margin={{ bottom: 30, top: 15 }}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="gradeLevel"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              label={{
                value: "Grade Level",
                position: "insideBottom",
                dy: 25,
                style: { fontSize: 12 },
              }}
            >
            </XAxis>

            <YAxis
              domain={[0, yAxisMax]} // always start from 0, end at highest value
              tick={{ fontSize: 10 }}
              interval={0}
              allowDecimals={false} // 👈 this disables .25, .5 etc.
              label={{
                value: "Number of Students",
                angle: -90,
                position: "insideLeft",
                dy: 50,
                dx: 10,
              }}
              style={{ fontSize: "10px" }}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="#0FC64F  " radius={1} />
          </BarChart>
        </ChartContainer>
          )}
      </CardContent>
    </Card>
  );
};
