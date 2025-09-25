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
import { getTotalperMonth } from "@/src/actions/cashierAction";
import { Loader2 } from "lucide-react";

const chartConfig = {
  totalPaid: {
    label: "Total Paid",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const Enrollment = () => {
  const [chartData, setChartData] = useState<{ month: string; totalPaid: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getTotalperMonth();
        setChartData(data);
      } catch (err) {
        console.error("Failed to load chart data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

//   const defaultMonths = [
//   { month: "July", totalPaid: 0 },
//   { month: "August", totalPaid: 0 },
//   { month: "September", totalPaid: 0 },
//   { month: "October", totalPaid: 0 },
//   { month: "November", totalPaid: 0 },
//   { month: "December", totalPaid: 0 },
// ];

  return (
    <div>
      <Card className="w-full gap-4 sm:w-[300px] lg:w-[400px]">
        <CardHeader>
          <CardTitle className="text-center font-bold text-dGreen">
            Monthly Collection Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-green-700" />
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex items-center justify-center h-[200px]">
              <p className="text-center text-gray-500">No months to fetch</p>
            </div>
          ) : (
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={chartData}>
              {/* <BarChart data={chartData.length > 0 ? chartData : defaultMonths}> */}

                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={5}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)} // "July 2025" → "Jul"
                />
                <YAxis
                  label={{
                    value: "Amount Paid Per Month",
                    angle: -90,
                    position: "insideLeft",
                    textAnchor: "middle",
                    dy: 80,
                    dx: 10,
                  }}
                  style={{ fontSize: "10px" }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="totalPaid"
                  fill="#0FC64F"
                  radius={1}
                  maxBarSize={20}
                />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
