import React from 'react'

const CurrencyLogo = ({ symbol, className }) => {
    return (
        <div>
            <img
                src={
                    process.env.NEXT_PUBLIC_BACKEND_URL +
                    '/currencies/logo/' +
                    symbol +
                    '.svg'
                }
                alt={symbol}
                className={'h-8 w-8 ' + className}
            />
        </div>
    )
}

export default CurrencyLogo
