import React from 'react'
import { formatPrice } from '@/lib/utils'

const ProfitLossPrice = ({ className, value, symbol }) => {
    return (
        <div
            className={
                (className ?? '') +
                ' px-1 ' +
                (value > 0
                    ? 'text-green-600'
                    : value === 0
                    ? 'text-gray-600'
                    : 'text-red-600')
            }>
            <span>{formatPrice(value, symbol)}</span>
        </div>
    )
}

export default ProfitLossPrice
