'use client'

import Header from '@/app/(app)/Header'
import YearSwitcher from '@/components/YearSwitcher'
import { useTaxReportData } from '@/hooks/taxReports'
import { useEffect, useState } from 'react'
import Button from '@/components/Button'

const Page = ({ params }) => {
    const [taxReport, setTaxReport] = useState(null)

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
            }
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
            {!taxReport ? (
                <div className={'pb-6 max-w-xl mt-16'}>
                    <form
                        onSubmit={submitCreateForm}
                        className={'flex flex-col'}>
                        <h3 className={'font-semibold text-xl mb-2'}>
                            Not tax report found
                        </h3>
                        <p
                            className={
                                'block font-medium text-sm text-gray-700 mb-4'
                            }>
                            The tax report is based on transactions completed in
                            the selected year for the tax residency specified in
                            the profile.
                        </p>
                        <Button className={'w-fit'}>Create report</Button>
                    </form>
                </div>
            ) : null}
        </>
    )
}

export default Page
