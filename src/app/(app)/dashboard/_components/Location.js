import React from 'react'
import AccordionTable from '@/components/AccordionTable'
import { formatPrice } from '@/lib/utils'
import PercentageBubble from '@/components/PercentageBubble'
import ProfitLossPrice from '@/components/ProfitLossPrice'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { DropdownButton } from '@/components/DropdownLink'
import Dropdown from '@/components/Dropdown'
import CurrencyBubble from '@/components/CurrencyBubble'
import { useAuth } from '@/hooks/auth'

const Location = ({
    location,
    openOrCloseLocationEditModal,
    openNewTransactionModal,
    openOrCloseLocationDeleteModal,
}) => {
    const { user } = useAuth({ middleware: 'auth' })

    let formattedAssets = []

    location.assets.map(asset => {
        formattedAssets.push([
            <div key={asset.currency.name} className="inline-block w-[19%]">
                <CurrencyBubble
                    symbol={asset.currency.symbol}
                    name={asset.currency.name}
                />
            </div>,
            <div
                key={asset.summary.quantity}
                className="inline-block w-[15%] text-right">
                {asset.summary.quantity}
            </div>,
            <div
                key={asset.summary.average_buy_price}
                className="inline-block w-[15%] text-right">
                {formatPrice(
                    asset.summary.average_buy_price_per_fiat_currencies[
                        user.currency_symbol
                    ],
                    user.currency_symbol,
                )}
            </div>,
            <div
                key={asset.summary.current_price}
                className="inline-block w-[15%] text-right">
                {formatPrice(
                    asset.summary.current_price_per_fiat_currencies[
                        user.currency_symbol
                    ],
                    user.currency_symbol,
                )}
            </div>,
            <div
                key={asset.summary.total_value}
                className="inline-block w-[15%] text-right">
                {formatPrice(
                    asset.summary.total_value_per_fiat_currencies[
                        user.currency_symbol
                    ],
                    user.currency_symbol,
                )}
            </div>,
            <div
                key={asset.summary.profit_loss}
                className="inline-block w-[15%] text-right">
                <div>
                    <ProfitLossPrice
                        value={
                            asset.summary.profit_loss_per_fiat_currencies[
                                user.currency_symbol
                            ]
                        }
                    />
                    <PercentageBubble
                        className={'text-xs'}
                        value={asset.summary.profit_loss_percentage}
                    />
                </div>
            </div>,
        ])
    })

    return (
        <AccordionTable
            header={[
                <div key={location.name} className="inline-block w-[64%]">
                    {location.name}
                </div>,
                <div
                    key={
                        location.summary.total_value_per_fiat_currencies[
                            user.currency_symbol
                        ]
                    }
                    className="inline-block w-[15%] text-right">
                    {formatPrice(
                        location.summary.total_value_per_fiat_currencies[
                            user.currency_symbol
                        ] ?? 0,
                        user.currency_symbol,
                    )}
                </div>,
                <div
                    key={
                        location.summary.profit_loss_per_fiat_currencies[
                            user.currency_symbol
                        ]
                    }
                    className="inline-block w-[15%] text-right">
                    <div>
                        <ProfitLossPrice
                            className={'font-semibold'}
                            value={
                                location.summary
                                    .profit_loss_per_fiat_currencies[
                                    user.currency_symbol
                                ] ?? 0
                            }
                            symbol={user.currency_symbol}
                        />
                        <PercentageBubble
                            className={'text-sm'}
                            value={location.summary.profit_loss_percentage}
                        />
                    </div>
                </div>,
                <div
                    key={'dropdown'}
                    className="inline-block w-[3%] text-right">
                    <div className={'flex justify-end'}>
                        <Dropdown
                            align="right"
                            width="48"
                            trigger={
                                <button onClick={e => e.stopPropagation()}>
                                    <EllipsisHorizontalIcon
                                        className="h-6 w-6 hover:text-default-primary hover:bg-gray-50 rounded-lg"
                                        aria-hidden="true"
                                    />
                                </button>
                            }>
                            <DropdownButton
                                onClick={e =>
                                    openOrCloseLocationDeleteModal(
                                        location.id,
                                    ) + e.stopPropagation()
                                }>
                                Delete
                            </DropdownButton>
                            <DropdownButton
                                onClick={e =>
                                    openOrCloseLocationEditModal(location.id) +
                                    e.stopPropagation()
                                }>
                                Edit
                            </DropdownButton>
                            <DropdownButton
                                onClick={e =>
                                    openNewTransactionModal(location.id) +
                                    e.stopPropagation()
                                }>
                                New transaction
                            </DropdownButton>
                        </Dropdown>
                    </div>
                </div>,
            ]}
            headerContent={[
                <div key={'Coin'} className="inline-block w-[19%]">
                    Coin
                </div>,
                <div
                    key={'Quantity'}
                    className="inline-block w-[15%] text-right">
                    Quantity
                </div>,
                <div
                    key={'In unit price'}
                    className="inline-block w-[15%] text-right">
                    Buy unit price
                </div>,
                <div
                    key={'Current price'}
                    className="inline-block w-[15%] text-right">
                    Current price
                </div>,
                <div
                    key={'Total value'}
                    className="inline-block w-[15%] text-right">
                    Total value
                </div>,
                <div
                    key={'+/- value'}
                    className="inline-block w-[15%] text-right">
                    +/- value
                </div>,
            ]}
            content={formattedAssets}
        />
    )
}

export default Location
