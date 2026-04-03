import React, { PureComponent, useEffect, useRef, useState } from 'react'
import { ResponsiveContainer, Treemap } from 'recharts'
import { formatPercentage, formatPrice } from '@/lib/utils'
import { useAuth } from '@/hooks/auth'
import { ALLOCATION_COLORS, getAllocationColor } from '@/lib/allocationColors'

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
            onHidden,
        } = this.props

        const showLabels = width > 60 && height > 45

        if (depth === 1 && !showLabels && onHidden) {
            onHidden(index)
        }

        return (
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    rx={depth < 2 ? 6 : 0}
                    ry={depth < 2 ? 6 : 0}
                    style={{
                        fill:
                            depth < 2
                                ? colors[
                                      Math.floor(
                                          (index / root?.children?.length) *
                                              ALLOCATION_COLORS.length,
                                      )
                                  ]
                                : '#ffffff00',
                        stroke: '#fff',
                        strokeWidth: depth < 2 ? 3 : 0,
                        strokeOpacity: 1,
                    }}
                />
                {depth === 1 && showLabels ? (
                    <>
                        <text
                            x={x + width / 2}
                            y={y + height / 2 - 8}
                            textAnchor="middle"
                            style={{
                                fill: '#fff',
                                fontWeight: 400,
                                fontSize: '12px',
                                fontFamily: 'Inter, system-ui, sans-serif',
                            }}>
                            {name}
                        </text>
                        <text
                            x={x + width / 2}
                            y={y + height / 2 + 12}
                            textAnchor="middle"
                            style={{
                                fill: 'rgba(255,255,255,0.65)',
                                fontWeight: 300,
                                fontSize: '10px',
                                fontFamily: 'Inter, system-ui, sans-serif',
                            }}>
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
    const [hiddenIndices, setHiddenIndices] = useState(new Set())
    const hiddenRef = useRef(new Set())

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
                    locationName: location.name,
                    percentage: formatPercentage(location.portfolio_percentage),
                    description:
                        location.name +
                        ' · ' +
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

    const handleHidden = index => {
        hiddenRef.current.add(index)
    }

    useEffect(() => {
        if (allocationByLocation.length === 0) return
        hiddenRef.current = new Set()

        const timer = setTimeout(() => {
            setHiddenIndices(new Set(hiddenRef.current))
        }, 100)

        return () => clearTimeout(timer)
    }, [allocationByLocation])

    return (
        <div className="flex h-full flex-col">
            <div className="min-h-0 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    {allocationByLocation ? (
                        <Treemap
                            width={400}
                            height={200}
                            data={allocationByLocation}
                            dataKey="size"
                            stroke="#fff"
                            fill="#8884d8"
                            animationDuration={300}
                            content={
                                <CustomizedContent
                                    colors={ALLOCATION_COLORS}
                                    onHidden={handleHidden}
                                />
                            }
                        />
                    ) : null}
                </ResponsiveContainer>
            </div>
            {hiddenIndices.size > 0 && (
                <div className="flex flex-wrap gap-2 pt-3">
                    {allocationByLocation.map((item, index) => {
                        if (!hiddenIndices.has(index)) return null
                        const color = getAllocationColor(
                            index,
                            allocationByLocation.length,
                        )
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1">
                                <span
                                    className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                                    style={{ backgroundColor: color }}
                                />
                                <span className="text-xs font-medium text-slate-700">
                                    {item.locationName}
                                </span>
                                <span className="text-xs text-slate-400">
                                    {item.percentage}
                                </span>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default TreemapAllocation
