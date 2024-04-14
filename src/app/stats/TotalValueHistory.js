import React, { useEffect, useState } from 'react'
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { formatPrice } from '@/lib/utils'

const TotalValueHistory = ({ totalValues }) => {
    const [totalValuesYearly, setTotalValuesYearly] = useState([])

    useEffect(() => {
        if (totalValues.yearly) {
            setTotalValuesYearly(totalValues.yearly)
        }
    }, [totalValues])

    const currencyFormatter = value => formatPrice(value)

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={totalValuesYearly}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={currencyFormatter}
                />
                <Tooltip
                    formatter={value => [currencyFormatter(value), '']}
                    labelFormatter={label => label}
                    contentStyle={{
                        fontSize: '1rem',
                        color: '#333',
                        background: '#fff',
                        lineHeight: '1rem',
                    }}
                />
                <Line type="monotone" dataKey="value" stroke="#5046e5" />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default TotalValueHistory
