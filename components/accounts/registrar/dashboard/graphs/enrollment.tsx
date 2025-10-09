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
import { useEffect, useState } from "react"
import { getEnrollmentTrend } from "@/src/actions/registrarAction"
import { Loader2 } from "lucide-react"



const chartConfig = {
  desktop: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export const Enrollment = () => {
  const [chartData, setChartData] = useState<{ 
    academicYear: string; 
    new_enrollees: number; 
    returnees: number; 
    not_returnees: number 
  }[] >([]);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchData = async () => {
    const res = await getEnrollmentTrend();

    // Convert to usable format
    const formattedData = res.map((item) => ({
      academicYear: item.academicYear,
      new_enrollees: Number(item.new_enrollees || 0),
      returnees: Number(item.returnees || 0),
      not_returnees: Number(item.not_returnees || 0),
    }));

    // 📌 Pad with future years if less than 3
    let paddedData = [...formattedData];

    if (paddedData.length < 4) {
      const existingYears = paddedData.map((d) => d.academicYear).filter(Boolean) as string[];

      const latestYear = existingYears.length > 0
        ? existingYears[0] // assuming DESC order
        : "2021-2022"; // fallback

      let [startYear] = latestYear.split("-").map(Number);

      while (paddedData.length < 4) {
        startYear += 1;
        const nextYear = `${startYear}-${startYear + 1}`;
        if (!existingYears.includes(nextYear)) {
          paddedData.unshift({
            academicYear: nextYear,
            new_enrollees: 0,
            returnees: 0,
            not_returnees: 0,
          });
        }
      }
    }

    // Sort ascending for proper chart flow (optional)
    paddedData = paddedData.sort((a, b) =>
      a.academicYear && b.academicYear
        ? a.academicYear.localeCompare(b.academicYear)
        : 0
    );

    setChartData(paddedData);
    setLoading(false);

  };

  fetchData();
}, []);


  return (
    <div>
    <Card className=" w-full sm:w-[300px]  gap-4  lg:w-[370px] ">
        <CardHeader>
          <CardTitle className="text-center font-bold text-dGreen">Enrollment Trend</CardTitle>
        </CardHeader>
        <CardContent className=" lg:w-[390px] m-[-12px]">
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-green-700" />
            </div>
          ) : (
          <ChartContainer config={chartConfig} style={{  }}>
            <LineChart data={chartData} margin={{  left: -14, right: 10, top: 15, bottom: 5   }}>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="academicYear"
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
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

              <Line
                type="monotone"
                dataKey="not_returnees"
                stroke="#F44336"
                strokeWidth={2}
                name="Not Returnees"
              />
              <Line
                type="monotone"
                dataKey="returnees"
                stroke="#2196F3"
                strokeWidth={2}
                name="Returnees"
              />              
              <Line
                type="monotone"
                dataKey="new_enrollees"
                stroke="#0FC64F "
                strokeWidth={2}
                name="New Students"

              />
            </LineChart>
          </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
