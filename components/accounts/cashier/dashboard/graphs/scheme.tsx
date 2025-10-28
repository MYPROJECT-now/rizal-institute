"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  TooltipProps,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { paymentScheme } from "@/src/actions/cashierAction";
import { Loader2 } from "lucide-react";

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white border border-gray-200 shadow-md rounded-md px-2 py-1 text-xs">
        <p className="font-semibold text-green-700">{`${name}: ${value}`}</p>
      </div>
    );
  }
  return null;
};

export const PaymentScheme = () => {
  const [chartData, setChartData] = useState<
    { name: string; value: number; color: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await paymentScheme();

        const counts = data.reduce(
          (acc: Record<string, number>, row: { paymentMethod: string }) => {
            const key = row.paymentMethod || "Unknown";
            acc[key] = (acc[key] || 0) + 1;
            return acc;
          },
          {}
        );

        setChartData([
          {
            name: "Installments",
            value: counts["Installments"] || 0,
            color: "#0FC64F",
          },
          {
            name: "Full Payment",
            value: counts["full_payment"] || 0,
            color: "hsl(var(--chart-2))",
          },
        ]);
      } catch (err) {
        console.error("❌ Failed to load payment scheme:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="w-full sm:w-[300px] lg:w-[370px]">
      <CardHeader>
        <CardTitle className="text-center font-bold text-dGreen">
          Payment Scheme Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex justify-center items-center  ">
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-green-700" />
        </div>
      ) : chartData.every((item) => item.value === 0) ? (
        <div className="flex items-center justify-center h-40 text-gray-500 font-medium">
          No Data
        </div>
      ) : (
        <>
          <PieChart width={240} height={180}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={75}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip content={<CustomTooltip />} />
          </PieChart>

          <div className="absolute top-0 right-6 bg-gray-300/50 rounded-md p-2 shadow-sm text-xs">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </>
      )}

      </CardContent>
    </Card>
  );
};
