import React from 'react'
import CurrencyLogo from '@/components/CurrencyLogo'

const CurrencyBubble = ({ symbol, name }) => {
    return (
        <div className={'flex flex-row gap-2 items-center'}>
            <CurrencyLogo symbol={symbol} />
            <div className={'flex flex-col'}>
                <p>{name}</p>
                <p className={'text-xs text-gray-400'}>{symbol}</p>
            </div>
        </div>
    )
}

export default CurrencyBubble
