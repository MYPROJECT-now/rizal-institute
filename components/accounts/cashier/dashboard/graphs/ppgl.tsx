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
import { Loader2 } from "lucide-react";


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
    color: "#0FC64F",
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
    const [loading, setLoading] = useState(true);
  

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
    setLoading(false);
      } catch (err) {
        console.error("❌ Failed to load chart data:", err);
      }
    };

    fetchData();
  }, []);

  return (
  <div className="min-w-[100px] overflow-x-auto">
    <Card className=" w-full sm:w-[300px] gap-4  lg:w-[300px] xl:w-[400px] 2xl:[550px]">
      <CardHeader>
        <CardTitle className="text-center font-bold text-dGreen">
          Payment Completion Status per Grade Level
        </CardTitle>
      </CardHeader>
      <CardContent>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-green-700" />
            </div>
          ) : (
        <ChartContainer config={chartConfig} className="h-full w-full">
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
                dy: 60,
              }}
              style={{ fontSize: 12 }}
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
         )}
      </CardContent>
    </Card>
    </div>
  );
};
