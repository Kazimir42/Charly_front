import React from 'react'
import CurrencyLogo from '@/components/CurrencyLogo'

const CurrencyIn = ({ className, symbol, quantity }) => {
    return (
        <div
            className={
                'flex flex-row gap-1.5 items-center bg-green-100 rounded-full pl-2 pr-2 py-1 w-fit ' +
                className
            }>
            <CurrencyLogo className={'h-7 w-7'} symbol={symbol} />
            <div className={'flex flex-col'}>
                <p className={'text-md text-green-700'}>
                    +{quantity} {symbol}
                </p>
            </div>
        </div>
    )
}

export default CurrencyIn
