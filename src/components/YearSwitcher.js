import React from 'react'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'

const YearSwitcher = ({ backLink, nextLink, backTitle, nextTitle }) => {
    return (
        <div className={'flex flex-row items-center justify-between gap-6'}>
            <Link
                href={backLink}
                className={
                    'flex flex-row items-center hover:text-default-primary_dark transition duration-100'
                }>
                <ChevronLeftIcon className={'h-6 w-6 font-black'} />
                <span className={'font-bold'}>{backTitle}</span>
            </Link>
            <Link
                href={nextLink}
                className={
                    'flex flex-row items-center hover:text-default-primary_dark transition duration-100'
                }>
                <span className={'font-bold'}>{nextTitle}</span>
                <ChevronRightIcon className={'h-6 w-6'} />
            </Link>
        </div>
    )
}

export default YearSwitcher
