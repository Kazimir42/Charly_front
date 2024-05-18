import React from 'react'
import Button from '@/components/Button'

const CreateTaxReportForm = ({ submitCreateForm }) => {
    return (
        <form onSubmit={submitCreateForm} className={'flex flex-col'}>
            <h3 className={'font-semibold text-xl mb-2'}>
                Not tax report found
            </h3>
            <p className={'block font-medium text-sm text-gray-700 mb-4'}>
                The tax report is based on transactions completed in the
                selected year for the tax residency specified in the profile.
            </p>
            <Button className={'w-fit'}>Create report</Button>
        </form>
    )
}

export default CreateTaxReportForm
