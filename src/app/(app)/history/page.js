'use client'

import Header from '@/app/(app)/Header'
import SimpleCard from '@/components/SimpleCard'
import { useEffect, useState } from 'react'
import Loading from '@/app/(app)/Loading'
import { useHistoryData } from '@/hooks/history'
import SoldCrypto from '@/app/(app)/history/_components/SoldCrypto'
import { useAuth } from '@/hooks/auth'
import { formatPrice } from '@/lib/utils'
import ProfitLossPrice from '@/components/ProfitLossPrice'
import PercentageBubble from '@/components/PercentageBubble'

const History = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const [cardStats, setCardStats] = useState([])
    const [cryptocurrencies, setCryptocurrencies] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { getHistory } = useHistoryData()

    useEffect(() => {
        refreshDashboard()
    }, [])

    function refreshDashboard() {
        getHistory().then(data => {
            if (data) {
                setCryptocurrencies(data.cryptocurrencies || [])
                const stats = data.stats
                setCardStats([
                    {
                        name: 'Total investi',
                        value: formatPrice(
                            stats.total_invested_value
                                ?.value_per_fiat_currencies?.[
                                user.currency_symbol
                            ],
                            user.currency_symbol,
                        ),
                    },
                    {
                        name: 'Total vendu',
                        value: formatPrice(
                            stats.total_sold_value?.value_per_fiat_currencies?.[
                                user.currency_symbol
                            ],
                            user.currency_symbol,
                        ),
                    },
                    {
                        name: 'Profit / Perte réalisé',
                        value: (
                            <ProfitLossPrice
                                value={
                                    stats.realized_profit_loss
                                        ?.value_per_fiat_currencies?.[
                                        user.currency_symbol
                                    ]
                                }
                                symbol={user.currency_symbol}
                            />
                        ),
                    },
                    {
                        name: 'Profit / Perte réalisé en %',
                        value: (
                            <PercentageBubble
                                className={''}
                                withFont={false}
                                value={
                                    stats.realized_profit_loss_percentage?.value
                                }
                            />
                        ),
                    },
                ])
                setIsLoading(false)
            }
        })
    }

    if (isLoading) {
        return <Loading fullHeight={false} />
    }

    return (
        <>
            <Header title="Historique" className={'mb-4'} />

            <div className={'pb-6'}>
                <div className={'flex flex-row gap-4 mb-4'}>
                    {cardStats.map((cardStat, index) => (
                        <SimpleCard
                            key={index}
                            className={'grow'}
                            name={cardStat.name}>
                            {cardStat.value}
                        </SimpleCard>
                    ))}
                </div>
            </div>

            <div className={'pb-6'}>
                <h3 className={'font-semibold text-xl mb-2'}>Cryptomonnaies</h3>
                <div className="grid 2xl:grid-cols-2 gap-2">
                    {cryptocurrencies.map((cryptocurrency, index) => (
                        <SoldCrypto
                            key={index}
                            cryptocurrency={cryptocurrency}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default History
