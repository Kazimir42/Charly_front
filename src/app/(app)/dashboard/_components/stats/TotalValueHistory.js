import React, { useEffect, useState } from 'react'
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { formatDate, formatPrice } from '@/lib/utils'
import { useAuth } from '@/hooks/auth'

const TotalValueHistory = ({ totalValues }) => {
    const [totalValuesYearly, setTotalValuesYearly] = useState([])

    const { user } = useAuth({ middleware: 'auth' })

    useEffect(() => {
        if (totalValues.yearly) {
            let values = []
            totalValues.yearly.forEach(item => {
                values.push({
                    date: formatDate(item.date, false, 'fr-FR'),
                    value:
                        parseFloat(
                            item.value_per_fiat_currencies[
                                user.currency_symbol
                            ],
                        ) || 0,
                })
            })
            setTotalValuesYearly(values)
        }
    }, [totalValues])

    const currencyFormatter = value => formatPrice(value, user.currency_symbol)

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
                    <p className="text-xs font-medium text-slate-500">
                        {label}
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                        {currencyFormatter(payload[0].value)}
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={totalValuesYearly}
                margin={{
                    top: 10,
                    right: 10,
                    left: 10,
                    bottom: 0,
                }}>
                <defs>
                    <linearGradient
                        id="valueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1">
                        <stop
                            offset="0%"
                            stopColor="#3B82F6"
                            stopOpacity={0.15}
                        />
                        <stop
                            offset="100%"
                            stopColor="#3B82F6"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <CartesianGrid
                    strokeDasharray="none"
                    stroke="#f1f5f9"
                    vertical={false}
                />
                <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    dy={10}
                    interval={'preserveStartEnd'}
                    minTickGap={40}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    tickFormatter={currencyFormatter}
                    dx={-5}
                />
                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }}
                />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fill="url(#valueGradient)"
                    dot={false}
                    activeDot={{
                        r: 4,
                        fill: '#3B82F6',
                        stroke: '#fff',
                        strokeWidth: 2,
                    }}
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default TotalValueHistory
