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
import { getDiscountDIstribution } from "@/src/actions/registrarAction"; // 🔹 changed query
import { Loader2 } from "lucide-react";

const chartConfig = {
  desktop: {
    label: "Students",
  },
} satisfies ChartConfig;


export const Discounts_graph = () => {
  const [rawData, setRawData] = useState<{
    New_ESC_Grantee: number;
    All_Grantees: number;
    With_Honor: number;
    With_High_Honor: number;
    With_Highest_Honor: number;
    sibling_discount: number;
  }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDiscountDIstribution(); // 🔹 changed source
      setRawData(res);
      setLoading(false);
    };
    fetchData();
  }, []);

// const chartData = useMemo(() => {
//   if (!rawData || rawData.length === 0) return [];

//   const item = rawData[0];

//   return [
//     { category: "New ESC", newEsc: Number(item.New_ESC_Grantee) },
//     { category: "All ESC", allEsc: Number(item.All_Grantees) },
//     {
//       category: "Academic",
//       withHonor: Number(item.With_Honor),
//       withHighHonor: Number(item.With_High_Honor),
//       withHighestHonor: Number(item.With_Highest_Honor),
//     },
//     { category: "Sibling", siblingDiscount: Number(item.sibling_discount) },
//   ];
// }, [rawData]);

const chartData = useMemo(() => {
  if (!rawData || rawData.length === 0) return [];

  const item = rawData[0];

  const academicTotal =
    Number(item.With_Honor) +
    Number(item.With_High_Honor) +
    Number(item.With_Highest_Honor);

  return [
    { category: "New ESC", value: Number(item.New_ESC_Grantee), fill: "#0FC64F" },
    { category: "All ESC", value: Number(item.All_Grantees), fill: "#0FC64F" },
    { category: "Academic", value: academicTotal, fill: "#FFB347" },
    { category: "Sibling", value: Number(item.sibling_discount), fill: "#0FC64F" },
  ];
}, [rawData]);



  return (
    <Card className="w-full sm:w-[300px] lg:w-[370px] ">
      <CardHeader>
        <CardTitle className="text-center font-bold text-dGreen">
          Discount Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className=" lg:w-[390px] m-[-12px]">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-green-700" />
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-full w-full">
            
            {/* <BarChart data={chartData} margin={{  left: -14, right: 10, top: 15, bottom: 5   }} style={{ background: "white" }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="category" tickLine={false} axisLine={false} />
              <YAxis
                allowDecimals={false}
                label={{
                  value: "Number of Students",
                  angle: -90,
                  position: "insideLeft",
                    dy: 50,
                    dx: 25,
                }}
                style={{ fontSize: "10px" }}
                
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} /> */}

              {/* Single bars */}
              {/* <Bar dataKey="newEsc" fill="#0FC64F" radius={2} name="New ESC Grantee" />
              <Bar dataKey="allEsc" fill="#0FC64F" radius={2} name="All ESC Grantee" />
              <Bar dataKey="siblingDiscount" fill="#0FC64F" radius={2} name="with Sibling Discount" /> */}

              {/* Academic Discount grouped bars */}
              {/* <Bar dataKey="withHonor" stackId="academic" fill="#FFB347" radius={2} name="With Honor" />
              <Bar dataKey="withHighHonor" stackId="academic" fill="#FF7043" radius={2} name="With High Honor" />
              <Bar dataKey="withHighestHonor" stackId="academic" fill="#FF3D3D" radius={2} name="With Highest Honor" />
            </BarChart> */}
<BarChart
  data={chartData}
  barCategoryGap="40%"
  margin={{ left: -10, right: 10, top: 15, bottom: 5 }}
>
  <CartesianGrid vertical={false} />
  <XAxis dataKey="category" tickLine={false} axisLine={false} />
  <YAxis
    allowDecimals={false}
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
  <Bar dataKey="value" fill="#0FC64F" radius={[2, 2, 0, 0]} barSize={15} />
</BarChart>


          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
