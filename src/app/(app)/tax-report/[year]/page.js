'use client'

import Header from '@/app/(app)/Header'

const Page = ({ params }) => {
    return (
        <>
            <Header
                title={'Tax report for ' + params.year}
                className={'mb-12'}
            />
        </>
    )
}

export default Page
