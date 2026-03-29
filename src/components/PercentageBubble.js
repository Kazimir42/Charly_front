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
                        ? 'text-green-600 ' + (withFont ? 'bg-green-50' : '')
                        : value === 0
                        ? 'text-gray-600 ' + (withFont ? 'bg-slate-50' : '')
                        : 'text-red-600 ' + (withFont ? 'bg-red-50' : ''))
                }>
                {formatPercentage(value)}
            </span>
        </div>
    )
}

export default PercentageBubble
