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


  const chartConfig = {
    totalPaid: {
      label: "Total Paid",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  export const Enrollment = () => {
    const [chartData, setChartData] = useState<{ month: string; totalPaid: number }[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getTotalperMonth(); // returns [{ month: "July 2025", totalPaid: 12000 }, ...]
          setChartData(data);
        } catch (err) {
          console.error("Failed to load chart data:", err);
        }
      };

      fetchData();
    }, []);

    return (
      <div>
        <Card >
          <CardHeader>
            <CardTitle className="text-center font-bold text-dGreen">Monthly Collection Trend</CardTitle>
          </CardHeader>
          <CardContent className="min-w-[500px] w-[600px] h-[240px] overflow-hidden">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={chartData}>
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
                <Bar dataKey="totalPaid" fill="var(--color-totalPaid)" radius={1} maxBarSize={20} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    );
  };
