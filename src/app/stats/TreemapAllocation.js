import React, { PureComponent, useEffect, useState } from 'react'
import { ResponsiveContainer, Treemap } from 'recharts'
import { formatPrice } from '@/lib/utils'

const COLORS = [
    '#8889DD',
    '#9597E4',
    '#8DC77B',
    '#A5D297',
    '#E2CF45',
    '#F8C12D',
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
            payload,
            colors,
            rank,
            name,
            description,
        } = this.props

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
                            y={y + height / 2 + 7}
                            textAnchor="middle"
                            fill="#fff"
                            fontWeight={'lighter'}
                            fontSize={14}>
                            {name}
                        </text>
                        <text
                            x={x + width / 2}
                            y={y + height / 2 + 7 + 20}
                            textAnchor="middle"
                            fill="#fff"
                            fontSize={12}>
                            {description}
                        </text>
                    </>
                ) : null}
                {depth === 1 ? (
                    <text
                        x={x + 4}
                        y={y + 18}
                        fill="#fff"
                        fontSize={16}
                        fillOpacity={0.9}></text>
                ) : null}
            </g>
        )
    }
}

const TreemapAllocation = ({ allocations }) => {
    const [allocationByAsset, setAllocationByAsset] = useState({})
    const [allocationByLocation, setAllocationByLocation] = useState([])

    useEffect(() => {
        if (allocations.locations) {
            let data = []

            for (const locationId in allocations.locations) {
                let location = allocations.locations[locationId]

                data.push({
                    name: formatPrice(location.total_value),
                    description: location.name,
                    children: [
                        {
                            name: <div>{location.name}</div>,
                            size: location.total_value,
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
                    content={<CustomizedContent colors={COLORS} />}
                />
            ) : null}
        </ResponsiveContainer>
    )
}

export default TreemapAllocation
