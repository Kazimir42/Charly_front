import React from 'react'
import { TransactionType } from '@/enums/TransactionType'
import { ArrowDownTrayIcon, ArrowPathRoundedSquareIcon, ArrowUpTrayIcon } from '@heroicons/react/16/solid'

const TransactionTypeBubble = ({ type }) => {
    let typeComponents = {
        [TransactionType.IN]: (
            <TemplateBubble
                className={'flex flex-row gap-1 text-center items-center'}>
                <ArrowDownTrayIcon className={'h-6 w-6'} />
                <p className={'font-black'}>In</p>
            </TemplateBubble>
        ),
        [TransactionType.OUT]: (
            <TemplateBubble
                className={'flex flex-row gap-1 text-center items-center'}>
                <ArrowUpTrayIcon className={'h-6 w-6'} />
                <p className={'font-black'}>Out</p>
            </TemplateBubble>
        ),
        [TransactionType.SWAP]: (
            <TemplateBubble
                className={'flex flex-row gap-1 text-center items-center'}>
                <ArrowPathRoundedSquareIcon className={'h-6 w-6'} />
                <p className={'font-black'}>Swap</p>
            </TemplateBubble>
        ),
    }

    function TemplateBubble({ className, children }) {
        return (
            <div>
                <span className={'rounded-lg px-2 font-semibold ' + className}>
                    {children}
                </span>
            </div>
        )
    }

    return typeComponents[type]
}

export default TransactionTypeBubble
