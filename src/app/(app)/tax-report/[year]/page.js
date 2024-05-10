'use client'

import Header from '@/app/(app)/Header'
import YearSwitcher from '@/components/YearSwitcher'
import { useTaxReportData } from '@/hooks/taxReports'
import { useEffect, useState } from 'react'
import SimpleCard from '@/components/SimpleCard'
import CreateTaxReportForm from '@/app/(app)/CreateTaxReportForm'
import Loading from '@/app/(app)/Loading'

const Page = ({ params }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [taxReport, setTaxReport] = useState(null)
    const [cardStats, setCardStats] = useState([])

    const { getTaxReport, createTaxReport } = useTaxReportData()

    useEffect(() => {
        refreshTaxReport()
    }, [params.year])

    function submitCreateForm(e) {
        e.preventDefault()
        createTaxReport({
            year: params.year,
        }).then(r => refreshTaxReport())
    }

    function refreshTaxReport() {
        getTaxReport(params.year).then(result => {
            if (result.id) {
                setTaxReport(result)
                setCardStats([
                    {
                        name: 'Total value sold',
                        value: 'TODO €',
                    },
                    {
                        name: 'Total Profit / Loss',
                        value: 'TODO €',
                    },
                ])
            }
            setIsLoading(false)
        })
    }

    return (
        <>
            <div className={'flex flex-row items-center justify-between mb-4'}>
                <Header title={'Tax report for ' + params.year} />
                <YearSwitcher
                    backLink={'/tax-report/' + (parseInt(params.year) - 1)}
                    nextLink={'/tax-report/' + (parseInt(params.year) + 1)}
                    backTitle={parseInt(params.year) - 1}
                    nextTitle={parseInt(params.year) + 1}
                />
            </div>
            {isLoading ? (
                <Loading fullHeight={false} />
            ) : taxReport ? (
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
            ) : (
                <div className={'pb-6 max-w-xl mt-16'}>
                    <CreateTaxReportForm onSubmit={submitCreateForm} />
                </div>
            )}
        </>
    )
}

export default Page
