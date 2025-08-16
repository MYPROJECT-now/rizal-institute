"use client";


import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getTotal } from "@/src/actions/cashierAction";

// const chartData = [
//   {
//     gradeLevel: "Grade 7",
//     upToDate: 10,
//     late: 3,
//     none: 1,
//   },
//   {
//     gradeLevel: "Grade 8",
//     upToDate: 12,
//     late: 5,
//     none: 0,
//   },
// ];
// type ChartConfig = Record<
//   string,
//   {
//     label: string;
//     color: string;
//   }
// >;


// const chartConfig = {
//   upToDate: {
//     label: "Up-to-date",
//     color: "hsl(var(--chart-1))",
//   },
//   late: {
//     label: "Late",
//     color: "hsl(var(--chart-2))",
//   },
//   none: {
//     label: "No Payment",
//     color: "hsl(var(--chart-3))",
//   },
// } satisfies ChartConfig;
type ChartRow = {
  gradeLevel: string;
  upToDate: number;
  late: number;
  none: number;
};


type ChartConfig = Record<
  string,
  {
    label: string;
    color: string;
  }
>;


const chartConfig: ChartConfig = {
  upToDate: {
    label: "Up-to-date",
    color: "hsl(var(--chart-1))",
  },
  late: {
    label: "Late",
    color: "hsl(var(--chart-2))",
  },
  none: {
    label: "No Payment",
    color: "hsl(var(--chart-3))",
  },
};




export const Ppgl = () => {
    const [chartData, setChartData] = useState<ChartRow[]>([]);

  useEffect(() => {
  const normalizeChartData = (data: ChartRow[]): ChartRow[] => {
  const defaultGradeLevels = ["7", "8", "9", "10"];
  const map = new Map(data.map(row => [row.gradeLevel, row]));

    return defaultGradeLevels.map(level => ({
      gradeLevel: level,
      upToDate: map.get(level)?.upToDate ?? 0,
      late: map.get(level)?.late ?? 0,
      none: map.get(level)?.none ?? 0,
    }));
  };

  const fetchData = async () => {
    try {
    const data = await getTotal();
    const normalized = normalizeChartData(data);
    console.log("📊 Normalized chart data:", normalized);
    setChartData(normalized);
      } catch (err) {
        console.error("❌ Failed to load chart data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          Payment Completion Status per Grade Level
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[240px] w-[430px]">
        <ChartContainer config={chartConfig} className="h-full">
          <BarChart data={chartData} >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="gradeLevel"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `Grade ${value}`}
            />
            <YAxis
              allowDecimals={false}
              label={{
                value: "Number of Students",
                angle: -90,
                position: "insideLeft",
                textAnchor: "middle",
                dy: 80,
              }}
              style={{ fontSize: "10px" }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel={false} />}
            />
            {/* {Object.entries(chartConfig).map(([key, { color }]) => (
              <Bar key={key} dataKey={key} fill={color} radius={[4, 4, 0, 0]} />
            ))} */}
            {(Object.entries(chartConfig) as [string, { label: string; color: string }][]).map(
              ([key, { color }]) => (
                <Bar key={key} dataKey={key} fill={color} radius={[4, 4, 0, 0]} />
              )
            )}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
