import React, { PureComponent, useEffect, useState } from 'react'
import { ResponsiveContainer, Treemap } from 'recharts'
import { formatPercentage, formatPrice } from '@/lib/utils'
import { useAuth } from '@/hooks/auth'

const COLORS = [
    '#3B82F6',
    '#60A5FA',
    '#10B981',
    '#34D399',
    '#F59E0B',
    '#FBBF24',
]

class CustomizedContent extends PureComponent {
    render() {
        const {
            root,
            depth,
            x,
            y,
            width,
            height,
            index,
            colors,
            name,
            description,
        } = this.props

        const nameStyle = {
            textAnchor: 'middle',
            fill: '#fff',
            fontWeight: 'normal',
            fontSize: '14px',
            fontFamily:
                'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        }

        const descriptionStyle = {
            textAnchor: 'middle',
            fill: '#ddd',
            fontWeight: 'lighter',
            fontSize: '13px',
            fontFamily:
                'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        }

        return (
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={{
                        fill:
                            depth < 2
                                ? colors[
                                      Math.floor(
                                          (index / root?.children?.length) * 6,
                                      )
                                  ]
                                : '#ffffff00',
                        stroke: '#fff',
                        strokeWidth: 2 / (depth + 1e-10),
                        strokeOpacity: 1 / (depth + 1e-10),
                    }}
                />
                {depth === 1 ? (
                    <>
                        <text
                            x={x + width / 2}
                            y={y + height / 2 + 7 - 10}
                            style={nameStyle}>
                            {name}
                        </text>
                        <text
                            x={x + width / 2}
                            y={y + height / 2 + 7 + 10}
                            style={descriptionStyle}>
                            {description}
                        </text>
                    </>
                ) : null}
            </g>
        )
    }
}

const TreemapAllocation = ({ allocations }) => {
    const [allocationByLocation, setAllocationByLocation] = useState([])

    const { user } = useAuth({ middleware: 'auth' })

    useEffect(() => {
        if (allocations.locations) {
            let data = []

            for (const locationId in allocations.locations) {
                let location = allocations.locations[locationId]

                data.push({
                    name: formatPrice(
                        location.total_value_per_fiat_currencies[
                            user.currency_symbol
                        ],
                        user.currency_symbol,
                    ),
                    description:
                        location.name +
                        ' | ' +
                        formatPercentage(location.portfolio_percentage),
                    children: [
                        {
                            name: location.name,
                            size: parseFloat(location.total_value) || 0,
                        },
                    ],
                })
            }

            setAllocationByLocation(data)
        }
    }, [allocations])

    return (
        <ResponsiveContainer width="100%" height="100%">
            {allocationByLocation ? (
                <Treemap
                    width={400}
                    height={200}
                    data={allocationByLocation}
                    dataKey="size"
                    stroke="#fff"
                    fill="#8884d8"
                    animationDuration={0}
                    content={<CustomizedContent colors={COLORS} />}
                />
            ) : null}
        </ResponsiveContainer>
    )
}

export default TreemapAllocation
