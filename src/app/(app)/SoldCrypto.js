import React from 'react'
import AccordionTable from '@/components/AccordionTable'
import { useAuth } from '@/hooks/auth'
import CurrencyBubble from '@/components/CurrencyBubble'
import { formatPrice } from '@/lib/utils'

const SoldCrypto = ({ cryptocurrency }) => {
    const { user } = useAuth({ middleware: 'auth' })

    let formattedAssets = []
    cryptocurrency.locations.map(location => {
        formattedAssets.push([
            <div key={location.id} className="inline-block w-[52%]">
                {location.name}
            </div>,
            <div className="inline-block w-[15%] text-right">
                {location.quantity}
            </div>,
            <div className="inline-block w-[15%] text-right">
                {formatPrice(
                    location.average_unit_price_per_fiat_currencies[
                        user.currency_symbol
                    ],
                    user.currency_symbol,
                )}
            </div>,
            <div className="inline-block w-[15%] text-right">
                {formatPrice(
                    location.total_price_per_fiat_currencies[
                        user.currency_symbol
                    ],
                    user.currency_symbol,
                )}
            </div>,
        ])
    })

    return (
        <AccordionTable
            header={[
                <div key={cryptocurrency.name} className="inline-block w-[52%]">
                    <CurrencyBubble
                        symbol={cryptocurrency.symbol}
                        name={cryptocurrency.name}
                    />
                </div>,
                <div className="inline-block w-[15%] text-right">
                    {cryptocurrency.quantity}
                </div>,
                <div className="inline-block w-[15%] text-right">
                    {formatPrice(
                        cryptocurrency.average_unit_price_per_fiat_currencies[
                            user.currency_symbol
                        ],
                        user.currency_symbol,
                    )}
                </div>,
                <div className="inline-block w-[15%] text-right font-semibold">
                    {formatPrice(
                        cryptocurrency.total_price_per_fiat_currencies[
                            user.currency_symbol
                        ],
                        user.currency_symbol,
                    )}
                </div>,
            ]}
            headerContent={[
                <div key={'Location'} className="inline-block w-[52%]">
                    Location
                </div>,
                <div
                    key={'Quantity sold'}
                    className="inline-block w-[15%] text-right">
                    Quantity sold
                </div>,
                <div
                    key={'In unit price'}
                    className="inline-block w-[15%] text-right">
                    Sold unit price
                </div>,
                <div
                    key={'Total value'}
                    className="inline-block w-[15%] text-right">
                    Total sold
                </div>,
            ]}
            content={formattedAssets}
        />
    )
}

export default SoldCrypto
