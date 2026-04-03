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
    color,
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
                    <span className="flex items-center gap-2">
                        {color && (
                            <span
                                className="inline-block h-3 w-3 shrink-0 rounded-full"
                                style={{ backgroundColor: color }}
                            />
                        )}
                        {location.name}
                    </span>
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
                                        className="h-6 w-6 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
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
                                Supprimer
                            </DropdownButton>
                            <DropdownButton
                                onClick={e =>
                                    openOrCloseLocationEditModal(location.id) +
                                    e.stopPropagation()
                                }>
                                Modifier
                            </DropdownButton>
                            <DropdownButton
                                onClick={e =>
                                    openNewTransactionModal(location.id) +
                                    e.stopPropagation()
                                }>
                                Nouvelle transaction
                            </DropdownButton>
                        </Dropdown>
                    </div>
                </div>,
            ]}
            headerContent={[
                <div key={'Crypto'} className="inline-block w-[19%]">
                    Crypto
                </div>,
                <div
                    key={'Quantité'}
                    className="inline-block w-[15%] text-right">
                    Quantité
                </div>,
                <div
                    key={"Prix d'achat unitaire"}
                    className="inline-block w-[15%] text-right">
                    Prix d'achat unitaire
                </div>,
                <div
                    key={'Prix actuel'}
                    className="inline-block w-[15%] text-right">
                    Prix actuel
                </div>,
                <div
                    key={'Valeur totale'}
                    className="inline-block w-[15%] text-right">
                    Valeur totale
                </div>,
                <div
                    key={'+/- valeur'}
                    className="inline-block w-[15%] text-right">
                    +/- valeur
                </div>,
            ]}
            content={formattedAssets}
        />
    )
}

export default Location
