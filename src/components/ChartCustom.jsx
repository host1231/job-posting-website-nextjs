"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetVacanciesQuery } from "@/services/vacancy"

const chartConfig = {
    views: {
        label: "Cəmi",
    },
    desktop: {
        label: "Vakansiya",
        color: "var(--primary)"
    },
    mobile: {
        label: "Kompaniya",
        color: "var(--primary)"
    },
}

export function ChartCustom() {
    const [activeChart, setActiveChart] = React.useState("desktop")

    const { data } = useGetVacanciesQuery()

    // Вычисляем общее количество вакансий и компаний
    const total = React.useMemo(() => {
        return {
            desktop: data?.chartData?.reduce((acc, curr) => acc + (curr.vacancies || 0), 0) || 0,
            mobile: data?.chartData?.reduce((acc, curr) => acc + (curr.company || 0), 0) || 0,
        }
    }, [data])

    return (
        <Card className="default-card">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Qrafik</CardTitle>
                    <CardDescription>
                        Son 3 ayda HiJobsAz-da {total.desktop} vakansiya və {total.mobile} kompaniya əlavə olunub.
                    </CardDescription>
                </div>
                <div className="flex">
                    {["desktop", "mobile"].map((key) => {
                        const chart = key
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {(total?.[key] ?? 0).toLocaleString()}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={data?.chartData ?? []}
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
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("az-AZ", {
                                    month: "short",
                                    day: "numeric"
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey={activeChart}
                                    labelFormatter={(value) =>
                                        new Date(value).toLocaleDateString("az-AZ", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        })
                                    }
                                />
                            }
                        />
                        <Bar
                            dataKey={activeChart}
                            fill={chartConfig[activeChart].color}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
