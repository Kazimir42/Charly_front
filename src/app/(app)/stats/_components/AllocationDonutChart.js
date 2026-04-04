'use client'

import { useEffect, useState } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { getAllocationColor } from '@/lib/allocationColors'
import { formatPrice, formatPercentage } from '@/lib/utils'

const AllocationDonutChart = ({ currencies, userCurrencySymbol }) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        if (!currencies) return

        const entries = Object.entries(currencies)
        const data = entries.map(([, curr]) => ({
            name: curr.symbol,
            fullName: curr.name,
            value: parseFloat(curr.total_value) || 0,
            percentage: curr.portfolio_percentage,
            formattedValue: formatPrice(
                curr.total_value_per_fiat_currencies?.[userCurrencySymbol],
                userCurrencySymbol,
            ),
        }))

        setChartData(data)
    }, [currencies, userCurrencySymbol])

    if (chartData.length === 0) {
        return (
            <p className="text-sm text-slate-400">Aucune donnée disponible.</p>
        )
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload
            return (
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
                    <p className="text-sm font-medium text-slate-900">
                        {data.fullName}
                    </p>
                    <p className="text-sm text-slate-500">
                        {data.formattedValue}
                    </p>
                    <p className="text-sm text-slate-400">
                        {formatPercentage(data.percentage)}
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="flex h-full flex-col">
            <div className="min-h-0 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius="55%"
                            outerRadius="80%"
                            dataKey="value"
                            stroke="#fff"
                            strokeWidth={2}
                            animationDuration={300}>
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getAllocationColor(
                                        index,
                                        chartData.length,
                                    )}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 pt-3">
                {chartData.map((item, index) => {
                    const color = getAllocationColor(index, chartData.length)
                    return (
                        <div
                            key={index}
                            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1">
                            <span
                                className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                                style={{ backgroundColor: color }}
                            />
                            <span className="text-xs font-medium text-slate-700">
                                {item.name}
                            </span>
                            <span className="text-xs text-slate-400">
                                {formatPercentage(item.percentage)}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AllocationDonutChart
