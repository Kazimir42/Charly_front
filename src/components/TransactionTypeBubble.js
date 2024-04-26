import React from 'react'
import { TransactionType } from '@/enums/TransactionType'

const TransactionTypeBubble = ({ type }) => {
    let typeComponents = {
        [TransactionType.BUY]: (
            <TemplateBubble className={'text-green-600 bg-green-100'}>
                BUY
            </TemplateBubble>
        ),
        [TransactionType.SELL]: (
            <TemplateBubble className={'text-red-600 bg-red-100'}>
                SELL
            </TemplateBubble>
        ),
        [TransactionType.RECEIVE]: (
            <TemplateBubble className={'text-teal-600 bg-teal-100'}>
                RECEIVE
            </TemplateBubble>
        ),
        [TransactionType.SEND]: (
            <TemplateBubble className={'text-orange-600 bg-orange-100'}>
                SEND
            </TemplateBubble>
        ),
        [TransactionType.SWAP]: (
            <TemplateBubble className={'text-blue-600 bg-blue-100'}>
                SWAP
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
