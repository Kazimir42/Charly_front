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
                    value: item.value_per_fiat_currencies[user.currency_symbol],
                })
            })
            setTotalValuesYearly(values)
        }
    }, [totalValues])

    const currencyFormatter = value => formatPrice(value, user.currency_symbol)

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
