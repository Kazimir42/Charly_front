'use client'

import Header from '@/app/(app)/Header'
import SimpleCard from '@/components/SimpleCard'
import { useEffect, useState } from 'react'
import { useHistoryData } from '@/hooks/history'
import SoldCrypto from '@/app/(app)/SoldCrypto'

const History = () => {
    const [cardStats, setCardStats] = useState([])
    const [cryptocurrencies, setCryptocurrencies] = useState([])

    const { getHistory } = useHistoryData()

    useEffect(() => {
        refreshDashboard()
    }, [])

    function refreshDashboard() {
        getHistory().then(data => {
            if (data) {
                setCryptocurrencies(data)
                // TODO
                setCardStats([
                    {
                        name: 'Total value sold',
                        value: 'TODO €',
                    },
                    {
                        name: 'Profit / Loss',
                        value: 'TODO €',
                    },
                    {
                        name: 'Profit / Loss by %',
                        value: 'TODO €',
                    },
                ])
            }
        })
    }

    return (
        <>
            <Header title="History" className={'mb-4'} />

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
                <h3 className={'font-semibold text-xl mb-2'}>
                    Cryptocurrencies
                </h3>
                <div className="grid grid-cols-2 gap-2">
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
