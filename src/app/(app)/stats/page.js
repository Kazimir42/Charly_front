'use client'

import Header from '@/app/(app)/Header'
import { useEffect, useState } from 'react'
import Loading from '@/app/(app)/Loading'
import { useDashboardData } from '@/hooks/dashboard'
import { useAuth } from '@/hooks/auth'
import { formatPrice } from '@/lib/utils'
import SimpleCard from '@/components/SimpleCard'
import ProfitLossPrice from '@/components/ProfitLossPrice'
import PercentageBubble from '@/components/PercentageBubble'
import PerformanceTable from '@/app/(app)/stats/_components/PerformanceTable'
import AllocationDonutChart from '@/app/(app)/stats/_components/AllocationDonutChart'

const Performance = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const { getDashboard } = useDashboardData()

    const [stats, setStats] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getDashboard().then(data => {
            if (data) {
                setStats(data.stats)
                setIsLoading(false)
            }
        })
    }, [])

    if (isLoading) {
        return <Loading fullHeight={false} />
    }

    const sym = user.currency_symbol

    return (
        <>
            <Header title="Performance" className={'mb-4'} />

            <div className={'pb-6'}>
                <div className={'flex flex-row flex-wrap gap-4 mb-4'}>
                    <SimpleCard className={'grow'} name={'Valeur totale'}>
                        {formatPrice(
                            stats.current_total_value
                                ?.value_per_fiat_currencies?.[sym],
                            sym,
                        )}
                    </SimpleCard>
                    <SimpleCard className={'grow'} name={'Total investi'}>
                        {formatPrice(
                            stats.total_value_invested
                                ?.value_per_fiat_currencies?.[sym],
                            sym,
                        )}
                    </SimpleCard>
                    <SimpleCard className={'grow'} name={'Total vendu'}>
                        {formatPrice(
                            stats.total_sold_value?.value_per_fiat_currencies?.[
                                sym
                            ],
                            sym,
                        )}
                    </SimpleCard>
                    <SimpleCard
                        className={'grow'}
                        name={'P/L non réalisé'}
                        childrenClass={'flex flex-row items-baseline gap-2'}>
                        <ProfitLossPrice
                            value={
                                stats.unrealized_profit_loss
                                    ?.value_per_fiat_currencies?.[sym]
                            }
                            symbol={sym}
                        />
                        <span className="text-sm font-medium">
                            <PercentageBubble
                                withFont={true}
                                value={
                                    stats.unrealized_profit_loss_percentage
                                        ?.value
                                }
                            />
                        </span>
                    </SimpleCard>
                    <SimpleCard className={'grow'} name={'P/L réalisé'}>
                        <ProfitLossPrice
                            value={
                                stats.realized_profit_loss
                                    ?.value_per_fiat_currencies?.[sym]
                            }
                            symbol={sym}
                        />
                    </SimpleCard>
                </div>

                <div className={'grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6'}>
                    <div className={'col-span-1 lg:col-span-2'}>
                        <h3 className={'font-semibold text-xl mb-2'}>
                            Performance par actif
                        </h3>
                        <PerformanceTable
                            currencies={stats.allocation?.currencies}
                            userCurrencySymbol={sym}
                        />
                    </div>
                    <SimpleCard
                        className={'col-span-1 h-fit'}
                        name={'Répartition par actif'}
                        childrenClass={'h-[400px]'}>
                        <AllocationDonutChart
                            currencies={stats.allocation?.currencies}
                            userCurrencySymbol={sym}
                        />
                    </SimpleCard>
                </div>
            </div>
        </>
    )
}

export default Performance
