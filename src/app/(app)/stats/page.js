'use client'

import Header from '@/app/(app)/Header'
import { useEffect, useState } from 'react'
import Loading from '@/app/(app)/Loading'
import { useStatsData } from '@/hooks/stats'
import { useAuth } from '@/hooks/auth'
import { formatPrice } from '@/lib/utils'
import SimpleCard from '@/components/SimpleCard'
import ProfitLossPrice from '@/components/ProfitLossPrice'
import PercentageBubble from '@/components/PercentageBubble'
import TotalValueHistory from '@/app/(app)/dashboard/_components/stats/TotalValueHistory'
import TreemapAllocation from '@/app/(app)/dashboard/_components/stats/TreemapAllocation'

const Stats = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const { getStatsData } = useStatsData()

    const [cardStats, setCardStats] = useState([])
    const [allocationStats, setAllocationStats] = useState([])
    const [totalValueHistoryStats, setTotalValueHistoryStats] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        refreshStats()
    }, [])

    function refreshStats() {
        getStatsData().then(({ dashboard, history }) => {
            if (dashboard) {
                const ds = dashboard.stats

                const cards = [
                    {
                        name: 'Total invested',
                        value: formatPrice(
                            ds.total_value_invested
                                ?.value_per_fiat_currencies?.[
                                user.currency_symbol
                            ],
                            user.currency_symbol,
                        ),
                    },
                    {
                        name: 'Current value',
                        value: formatPrice(
                            ds.current_total_value?.value_per_fiat_currencies?.[
                                user.currency_symbol
                            ],
                            user.currency_symbol,
                        ),
                    },
                    {
                        name: 'Unrealized P/L',
                        value: (
                            <ProfitLossPrice
                                value={
                                    ds.current_profit_loss
                                        ?.value_per_fiat_currencies?.[
                                        user.currency_symbol
                                    ]
                                }
                                symbol={user.currency_symbol}
                            />
                        ),
                    },
                    {
                        name: 'Unrealized P/L %',
                        value: (
                            <PercentageBubble
                                className={''}
                                withFont={false}
                                value={ds.current_profit_loss_percentage?.value}
                            />
                        ),
                    },
                ]

                if (history?.stats) {
                    const hs = history.stats
                    cards.splice(1, 0, {
                        name: 'Total sold',
                        value: formatPrice(
                            hs.total_sold_value?.value_per_fiat_currencies?.[
                                user.currency_symbol
                            ],
                            user.currency_symbol,
                        ),
                    })
                    cards.push({
                        name: 'Realized P/L',
                        value: (
                            <ProfitLossPrice
                                value={
                                    hs.realized_profit_loss
                                        ?.value_per_fiat_currencies?.[
                                        user.currency_symbol
                                    ]
                                }
                                symbol={user.currency_symbol}
                            />
                        ),
                    })
                }

                setCardStats(cards)
                setAllocationStats(ds.allocation)
                setTotalValueHistoryStats(ds.total_value_history)
                setIsLoading(false)
            }
        })
    }

    if (isLoading) {
        return <Loading fullHeight={false} />
    }

    return (
        <>
            <Header title="Stats" className={'mb-4'} />

            <div className={'pb-6'}>
                <div className={'flex flex-row flex-wrap gap-4 mb-4'}>
                    {cardStats.map((cardStat, index) => (
                        <SimpleCard
                            key={index}
                            className={'grow'}
                            name={cardStat.name}>
                            {cardStat.value}
                        </SimpleCard>
                    ))}
                </div>
                <div className={'grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4'}>
                    <SimpleCard
                        className={'col-span-1 lg:col-span-2'}
                        childrenClass={'h-[300px]'}
                        name={'Total value history'}>
                        <TotalValueHistory
                            totalValues={totalValueHistoryStats}
                        />
                    </SimpleCard>
                    <SimpleCard
                        className={'col-span-1'}
                        name={'Allocation by location'}
                        childrenClass={'h-[300px]'}>
                        <TreemapAllocation allocations={allocationStats} />
                    </SimpleCard>
                </div>
            </div>
        </>
    )
}

export default Stats
