"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis,  } from "recharts"
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

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ]
  const chartConfig = {
    desktop: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig
  
// grid grid-cols-1 gap-5 p-0 sm:grid-cols-2 grid-rows-2 md:grid-cols-2 lg:grid-cols-4
export const Ppgl = () => {
    return (
        <div>
        <Card className="w-full sm:w-[250px] md:w-[270px] gap-4 p-4 lg:w-[300px] xl:w-[400px] 2xl:[550px]">
            <CardHeader>
                <CardTitle className="text-center">Population Per Grade Level</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} style={{  }}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        />

                        <YAxis 
                        label={{ value: "Number of Students", angle: -90, position: "insideLeft", textanchor: "center", dy:80, dx:10}} 
                        style={{ fontSize: '10px' }} 
                        />
                        
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={1} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
        </div>
    );
};