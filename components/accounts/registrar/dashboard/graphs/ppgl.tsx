"use client";

import { useEffect, useMemo, useState } from "react";
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
import {  getEnrolledCountPerGradeLevel2 } from "@/src/actions/registrarAction";
import { Loader2 } from "lucide-react";


const chartConfig = {
  desktop: {
    label: "Students",
  },
} satisfies ChartConfig;

export const Ppgl = () => {
  const [rawData, setRawData] = useState<{ gradeLevel: string | null; studentCount: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getEnrolledCountPerGradeLevel2();
      setRawData(res);
      setLoading(false);
    };

    fetchData();
  }, []);

  const chartData = useMemo(() => {
    const defaultGrades  = ["7" , "8", "9", "10"];
    const dataMap = new Map(rawData.map(item => [item.gradeLevel, Number(item.studentCount)]));

    return defaultGrades.map(grade => ({
      gradeLevel: "Grade" + grade,
      student: dataMap.get(grade) ?? 0,
    }));
  }, [rawData]);



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
          <BarChart data={chartData} margin={{ top: 15 }}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="gradeLevel"
              tickLine={false}
              tickMargin={5}
              axisLine={false}

            >
            </XAxis>

            <YAxis
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
            <Bar dataKey="student" fill="#0FC64F  " radius={2} />
          </BarChart>
        </ChartContainer>
          )}
      </CardContent>
    </Card>
  );
};
