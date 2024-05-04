import React from 'react'
import { formatPercentage } from '@/lib/utils'

const PercentageBubble = ({ className, value, withFont = true }) => {
    return (
        <div>
            <span
                className={
                    (className ?? '') +
                    ' rounded-full px-1  ' +
                    (value > 0
                        ? 'text-green-600 ' + (withFont ? 'bg-green-100' : '')
                        : value === 0
                        ? 'text-gray-600 ' + (withFont ? 'bg-gray-100' : '')
                        : 'text-red-600 ' + (withFont ? 'bg-red-100' : ''))
                }>
                {formatPercentage(value)}
            </span>
        </div>
    )
}

export default PercentageBubble
