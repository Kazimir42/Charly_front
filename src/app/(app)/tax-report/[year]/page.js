'use client'

import Header from '@/app/(app)/Header'
import YearSwitcher from '@/components/YearSwitcher'
import { useTaxReportData } from '@/hooks/taxReports'
import { useEffect, useState } from 'react'
import SimpleCard from '@/components/SimpleCard'
import CreateTaxReportForm from '@/app/(app)/tax-report/_components/CreateTaxReportForm'
import Loading from '@/app/(app)/Loading'
import CardDescriptionList from '@/app/(app)/tax-report/_components/CardDescriptionList'
import { useAuth } from '@/hooks/auth'
import Document2086 from '@/app/(app)/tax-report/_components/taxReportDocuments/FR/Document2086'
import DocumentCard from '@/components/DocumentCard'
import Document3916bis from '@/app/(app)/tax-report/_components/taxReportDocuments/FR/Document3916bis'
import { formatPrice } from '@/lib/utils'
import ProfitLossPrice from '@/components/ProfitLossPrice'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

const Page = ({ params }) => {
    const { user } = useAuth({ middleware: 'auth' })

    const [isLoading, setIsLoading] = useState(true)
    const [taxReport, setTaxReport] = useState(null)
    const [cardStats, setCardStats] = useState([])

    const {
        getTaxReport,
        createTaxReport,
        exportPdf,
        exportCsv,
    } = useTaxReportData()

    useEffect(() => {
        refreshTaxReport()
    }, [params.year])

    function submitCreateForm(e) {
        e.preventDefault()
        createTaxReport({
            year: params.year,
        }).then(() => refreshTaxReport())
    }

    function refreshTaxReport() {
        getTaxReport(params.year)
            .then(result => {
                if (result.id) {
                    setTaxReport(result)
                    setCardStats([
                        {
                            name: 'Total vendu',
                            value: formatPrice(
                                result.total_sold_value_per_fiat_currencies[
                                    user.currency_symbol
                                ],
                                user.currency_symbol,
                            ),
                        },
                        {
                            name: 'Profit / Perte total',
                            value: (
                                <ProfitLossPrice
                                    value={
                                        result
                                            .total_profit_loss_per_fiat_currencies?.[
                                            user.currency_symbol
                                        ]
                                    }
                                    symbol={user.currency_symbol}
                                />
                            ),
                        },
                        {
                            name: 'Valeur fiscale (PFU 30%)',
                            value: formatPrice(
                                result.total_tax_value_per_fiat_currencies?.[
                                    user.currency_symbol
                                ],
                                user.currency_symbol,
                            ),
                        },
                    ])
                }
                setIsLoading(false)
            })
            .catch(error => {
                console.error('refreshTaxReport error:', error)
                setIsLoading(false)
            })
    }

    return (
        <>
            <div className={'flex flex-row items-center justify-between mb-4'}>
                <Header title={'Rapport fiscal pour ' + params.year} />
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
                                Informations
                            </h3>
                            <CardDescriptionList
                                lines={[
                                    {
                                        name: 'Comptes ajoutés',
                                        value:
                                            taxReport.number_taxable_transactions_done >
                                            0
                                                ? taxReport.number_taxable_transactions_done
                                                : '0',
                                    },
                                    {
                                        name: "Transactions sur l'année",
                                        value:
                                            taxReport.number_transactions_done,
                                    },
                                    {
                                        name:
                                            "Transactions imposables sur l'année",
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
                                        name: 'Résidence fiscale',
                                        value: taxReport.country.name,
                                    },
                                    {
                                        name: 'Méthode de calcul',
                                        value: 'PFU (Flat tax 30%)',
                                    },
                                    {
                                        name: 'Méthode de déclaration',
                                        value: 'Flat tax 30%',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <div className={''}>
                        <div
                            className={
                                'flex flex-row items-center justify-between mb-2'
                            }>
                            <h3 className={'font-semibold text-xl'}>
                                Documents
                            </h3>
                            <div className={'flex flex-row gap-2'}>
                                <button
                                    onClick={() => exportPdf(params.year)}
                                    className={
                                        'inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600 transition-colors'
                                    }>
                                    <ArrowDownTrayIcon className={'h-4 w-4'} />
                                    Export PDF
                                </button>
                                <button
                                    onClick={() => exportCsv(params.year)}
                                    className={
                                        'inline-flex items-center gap-1.5 rounded-lg border border-blue-500 px-3 py-1.5 text-sm font-medium text-blue-500 hover:bg-blue-50 transition-colors'
                                    }>
                                    <ArrowDownTrayIcon className={'h-4 w-4'} />
                                    Export CSV
                                </button>
                            </div>
                        </div>
                        {taxReport.country.iso_code === 'FR' ? (
                            <div className={'flex flex-col gap-4'}>
                                <DocumentCard
                                    title={
                                        'Déclarer mes transactions imposables'
                                    }
                                    form={'2086'}>
                                    <Document2086
                                        data={taxReport.documents['2086']}
                                    />
                                </DocumentCard>
                                <DocumentCard
                                    title={"Déclarer mes comptes à l'étranger"}
                                    form={'3916 bis'}>
                                    <Document3916bis />
                                </DocumentCard>
                            </div>
                        ) : null}
                    </div>
                </>
            ) : (
                <div className={'pb-6 max-w-xl mt-16'}>
                    <CreateTaxReportForm submitCreateForm={submitCreateForm} />
                </div>
            )}
        </>
    )
}

export default Page
