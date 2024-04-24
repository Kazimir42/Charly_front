'use client'

import { useRouter } from 'next/router'
import Header from '@/app/(app)/Header'

const Year = () => {
    const router = useRouter()
    const { year } = router.query

    return (
        <>
            <Header title={'Tax report for ' + year} className={'mb-12'} />
        </>
    )
}

export default Year
