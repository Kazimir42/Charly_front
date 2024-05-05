import React from 'react'
import { TransactionType } from '@/enums/TransactionType'
import {
    ArrowDownTrayIcon,
    ArrowPathRoundedSquareIcon,
    ArrowUpTrayIcon,
} from '@heroicons/react/16/solid'
import TransactionLabelBubble from '@/components/TransactionLabelBubble'

const TransactionTypeBubble = ({ type, label }) => {
    let typeComponents = {
        [TransactionType.IN]: (
            <TemplateBubble
                className={'flex flex-row gap-1 text-center items-center'}>
                <ArrowDownTrayIcon className={'h-6 w-6'} />
                <div className={'flex flex-col '}>
                    <p className={'font-black text-left ml-2'}>In</p>
                    {label ? (
                        <TransactionLabelBubble name={label?.name ?? ''} />
                    ) : (
                        ''
                    )}
                </div>
            </TemplateBubble>
        ),
        [TransactionType.OUT]: (
            <TemplateBubble
                className={'flex flex-row gap-1 text-center items-center'}>
                <ArrowUpTrayIcon className={'h-6 w-6'} />
                <div className={'flex flex-col '}>
                    <p className={'font-black text-left ml-2'}>Out</p>
                    {label ? (
                        <TransactionLabelBubble name={label?.name ?? ''} />
                    ) : (
                        ''
                    )}
                </div>
            </TemplateBubble>
        ),
        [TransactionType.SWAP]: (
            <TemplateBubble
                className={'flex flex-row gap-1 text-center items-center'}>
                <ArrowPathRoundedSquareIcon className={'h-6 w-6'} />
                <div className={'flex flex-col '}>
                    <p className={'font-black text-left ml-2'}>Swap</p>
                    {label ? (
                        <TransactionLabelBubble name={label?.name ?? ''} />
                    ) : (
                        ''
                    )}
                </div>
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
