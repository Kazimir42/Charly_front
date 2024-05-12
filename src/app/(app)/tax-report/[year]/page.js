'use client'

import Header from '@/app/(app)/Header'
import YearSwitcher from '@/components/YearSwitcher'
import { useTaxReportData } from '@/hooks/taxReports'
import { useEffect, useState } from 'react'
import SimpleCard from '@/components/SimpleCard'
import CreateTaxReportForm from '@/app/(app)/CreateTaxReportForm'
import Loading from '@/app/(app)/Loading'
import CardDescriptionList from '@/app/(app)/CardDescriptionList'
import { useAuth } from '@/hooks/auth'
import Document2086 from '@/app/taxReportDocuments/FR/Document2086'
import DocumentCard from '@/components/DocumentCard'
import Document3916bis from '@/app/taxReportDocuments/FR/Document3916bis'
import { formatPrice } from '@/lib/utils'

const Page = ({ params }) => {
    const { user } = useAuth({ middleware: 'auth' })

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
                        value: formatPrice(
                            result.total_sold_value_per_fiat_currencies[
                                user.currency_symbol
                            ],
                            user.currency_symbol,
                        ),
                    },
                    {
                        name: 'Total Profit / Loss',
                        value: 'TODO €',
                    },
                    {
                        name: 'Tax value',
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
                <>
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
                    <div className={'grid grid-cols-2 gap-4 pb-6'}>
                        <div className={''}>
                            <h3 className={'font-semibold text-xl mb-2'}>
                                Information
                            </h3>
                            <CardDescriptionList
                                lines={[
                                    {
                                        name: 'Accounts added',
                                        value: 'todo',
                                    },
                                    {
                                        name: 'Transactions over the year',
                                        value:
                                            taxReport.number_transactions_done,
                                    },
                                    {
                                        name:
                                            'Taxable transactions over the year',
                                        value:
                                            taxReport.number_taxable_transactions_done,
                                    },
                                ]}
                            />
                        </div>
                        <div className={''}>
                            <h3 className={'font-semibold text-xl mb-2'}>
                                Configuration
                            </h3>
                            <CardDescriptionList
                                lines={[
                                    {
                                        name: 'Tax residence',
                                        value: taxReport.country.name,
                                    },
                                    {
                                        name: 'Calculation method',
                                        value: 'todo',
                                    },
                                    {
                                        name: 'Method of declaration',
                                        value: 'Flat tax 30%',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <div className={''}>
                        <h3 className={'font-semibold text-xl mb-2'}>
                            Documents
                        </h3>
                        {taxReport.country.iso_code === 'FR' ? (
                            <div className={'flex flex-col gap-4'}>
                                <DocumentCard
                                    title={'Report my taxable transactions'}
                                    form={'2086'}>
                                    <Document2086
                                        data={taxReport.documents['2086']}
                                    />
                                </DocumentCard>
                                <DocumentCard
                                    title={'Declare my accounts abroad'}
                                    form={'3916 bis'}>
                                    <Document3916bis />
                                </DocumentCard>
                            </div>
                        ) : null}
                    </div>
                </>
            ) : (
                <div className={'pb-6 max-w-xl mt-16'}>
                    <CreateTaxReportForm onSubmit={submitCreateForm} />
                </div>
            )}
        </>
    )
}

export default Page
