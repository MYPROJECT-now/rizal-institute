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
    const [rawData, setRawData] = useState<{ gradeLevel: string | null; studentCount: number; totalBoys: number; totalGirls: number }[]>([]);
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
      const dataMap = new Map(
        rawData.map(item => [item.gradeLevel?.replace("Grade ", ""), item])
      );

      return defaultGrades.map(grade => {
        const data = dataMap.get(grade) ?? { studentCount: 0, totalBoys: 0, totalGirls: 0 };
        return {
          gradeLevel: "Grade " + grade,
          student: Number(data.studentCount),
          boys: Number(data.totalBoys),
          girls: Number(data.totalGirls),
        };
      });
    }, [rawData]);



    return (
      <Card className=" w-full sm:w-[300px]  gap-4  lg:w-[370px] ">
        <CardHeader>
          <CardTitle className="text-center font-bold text-dGreen">Population Per Grade Level</CardTitle>
        </CardHeader>
        <CardContent className=" lg:w-[390px] m-[-12px]">
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-green-700" />
              </div>
            ) : (
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData} margin={{  left: -14, right: 10, top: 15, bottom: 5   }}>
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
                  dx: 25,
                }}
                style={{ fontSize: "10px" }}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="student" fill="#0FC64F  " radius={2} name="Total Students" />
              <Bar dataKey="boys" fill="#2F80ED" radius={2} name="Boys" />
              <Bar dataKey="girls" fill="#FF69B4" radius={2} name="Girls" />
            </BarChart>
          </ChartContainer>
            )}
        </CardContent>
      </Card>
    );
  };
