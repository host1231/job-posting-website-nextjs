"use client"

import * as React from "react"
import { Pie, PieChart, Cell, Label } from "recharts"
import { useGetVacanciesQuery } from "@/services/vacancy"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c",
]

const ChartVacancies = () => {
  const { data, isLoading } = useGetVacanciesQuery({
    limit: 100
  })

  // Группируем вакансии по типу
  const chartData = React.useMemo(() => {
    if (!data?.vacancies) return []

    const counts = data.vacancies.reduce((acc, vacancy) => {
      acc[vacancy.type] = (acc[vacancy.type] || 0) + 1
      return acc
    }, {})

    return Object.entries(counts).map(([type, count]) => ({
      name: type,
      value: count,
    }))
  }, [data])

  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  if (isLoading || chartData.length === 0) return <div>Загрузка диаграммы...</div>

  return (
    <ChartContainer
      config={{}}
      className="mx-auto aspect-square w-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={100}
          strokeWidth={5}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label
            content={({ viewBox }) => {
              if (!viewBox?.cx || !viewBox?.cy) return null
              return (
                <text
                  x={viewBox.cx}
                  y={viewBox.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x={viewBox.cx}
                    y={viewBox.cy}
                    className="fill-foreground text-3xl font-bold"
                  >
                    {total}
                  </tspan>
                  <tspan
                    x={viewBox.cx}
                    y={viewBox.cy + 24}
                    className="fill-muted-foreground text-sm"
                  >
                    вакансий
                  </tspan>
                </text>
              )
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}

export default ChartVacancies
