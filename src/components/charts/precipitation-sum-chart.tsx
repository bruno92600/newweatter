"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
import { ChartSkeleton } from "./chart-skeleton"

export const description = "A bar chart"

const chartConfig = {
  precipitation: {
    label: "precipitation",
    color: "#1E90FF",
  },
} satisfies ChartConfig

type Props = {
    precipitationSumChartData: {
        month: string
        precipitation: string
    }[]
    loading: boolean
  
}

export function PrecipitationSumChart({
    precipitationSumChartData,
    loading
}: Props) {

    if (loading) {
        return (
          <ChartSkeleton />
        )
      }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Précipitations</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={precipitationSumChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(date => {
                const d = new Date(date)
                return d.toLocaleTimeString("fr-FR", { hour: "numeric", minute: "2-digit"})
              })}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="precipitation" fill="var(--color-precipitation)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
