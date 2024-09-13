"use client"

import { Activity } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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


const chartConfig = {
  precipitationProbability: {
    label: "Précipitation possible (%)",
    color: "#1E90FF",
    icon: Activity,
  },
} satisfies ChartConfig

type Props = {
    precipitationProbabilityChartData: {
        date: string
        precipitationProbability: number
    }[]
    loading: boolean
}

export function PrecipitationPercentageChart ({precipitationProbabilityChartData, loading}: Props) {

    if (loading) {
        return (
          <ChartSkeleton />
        )
      }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Précipitations possible</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={precipitationProbabilityChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(date => {
                const d = new Date(date)
                return d.toLocaleTimeString("fr-FR", { hour: "numeric", minute: "2-digit"})
              })}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="precipitationProbability"
              type="step"
              fill="var(--color-precipitationProbability)"
              fillOpacity={0.4}
              stroke="var(--color-precipitationProbability)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
