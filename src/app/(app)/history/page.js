'use client'

import Header from '@/app/(app)/Header'
import SimpleCard from '@/components/SimpleCard'
import TotalValueHistory from '@/app/stats/TotalValueHistory'
import TreemapAllocation from '@/app/stats/TreemapAllocation'
import { useEffect, useState } from 'react'
import { useHistoryData } from '@/hooks/history'

const History = () => {
    const [cardStats, setCardStats] = useState([])
    const [assets, setAssets] = useState([])

    const { getHistory } = useHistoryData()

    useEffect(() => {
        refreshDashboard()
    }, [])

    function refreshDashboard() {
        getHistory().then(data => {
            if (data) {
                setAssets(data.locations || [])
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
        </>
    )
}

export default History
