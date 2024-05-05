'use client'

import Header from '@/app/(app)/Header'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'

const Page = ({ params }) => {
    function YearSwitcher() {
        return (
            <div className={'flex flex-row items-center justify-between gap-6'}>
                <Link
                    href={'/tax-report/' + (parseInt(params.year) - 1)}
                    className={
                        'flex flex-row items-center hover:text-default-primary_dark transition duration-100'
                    }>
                    <ChevronLeftIcon className={'h-6 w-6 font-black'} />
                    <span className={'font-bold'}>
                        {parseInt(params.year) - 1}
                    </span>
                </Link>
                <Link
                    href={'/tax-report/' + (parseInt(params.year) + 1)}
                    className={
                        'flex flex-row items-center hover:text-default-primary_dark transition duration-100'
                    }>
                    <span className={'font-bold'}>
                        {parseInt(params.year) + 1}
                    </span>
                    <ChevronRightIcon className={'h-6 w-6'} />
                </Link>
            </div>
        )
    }

    return (
        <>
            <div className={'flex flex-row items-center justify-between'}>
                <Header
                    title={'Tax report for ' + params.year}
                    className={'mb-4'}
                />
                <YearSwitcher />
            </div>
        </>
    )
}

export default Page
