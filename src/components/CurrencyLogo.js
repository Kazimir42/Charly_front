import React from 'react'

const CurrencyLogo = ({ symbol, className }) => {
    const lowerSymbol = symbol?.toLowerCase()

    return (
        <div className="shrink-0">
            <img
                src={
                    process.env.NEXT_PUBLIC_BACKEND_URL +
                    '/currencies/logo/' +
                    lowerSymbol +
                    '.svg'
                }
                alt={symbol}
                className={'h-8 w-8 min-h-8 min-w-8 shrink-0 ' + className}
                onError={e => {
                    e.target.style.display = 'none'
                }}
            />
        </div>
    )
}

export default CurrencyLogo
