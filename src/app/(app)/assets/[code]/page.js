'use client'

import { useEffect, useState } from 'react'
import { useAssetData } from '@/hooks/assets'
import { useAuth } from '@/hooks/auth'
import SimpleCard from '@/components/SimpleCard'
import CurrencyBubble from '@/components/CurrencyBubble'
import TransactionTypeBubble from '@/components/TransactionTypeBubble'
import CurrencyIn from '@/components/CurrencyIn'
import CurrencyOut from '@/components/CurrencyOut'
import ProfitLossPrice from '@/components/ProfitLossPrice'
import CardDescriptionList from '@/app/(app)/tax-report/_components/CardDescriptionList'
import Table from '@/components/Table'
import Loading from '@/app/(app)/Loading'
import { formatDate, formatPrice } from '@/lib/utils'

const Page = ({ params }) => {
    const { user } = useAuth({ middleware: 'auth' })
    const { getAsset } = useAssetData()

    const [isLoading, setIsLoading] = useState(true)
    const [asset, setAsset] = useState(null)

    useEffect(() => {
        getAsset(params.code).then(data => {
            setAsset(data)
            setIsLoading(false)
        })
    }, [params.code])

    function formatTransactionRows() {
        if (!asset?.transactions?.length) {
            return [['Aucune transaction trouvée', '', '', '', '', '']]
        }

        return asset.transactions.map(tx => {
            const currencyOut = {
                symbol: tx.from_currency?.symbol ?? null,
                quantity: tx.from_quantity ?? 0,
            }
            const currencyIn = {
                symbol: tx.to_currency?.symbol ?? null,
                quantity: tx.to_quantity ?? 0,
            }

            return [
                formatDate(tx.date, true, 'fr-FR'),
                <TransactionTypeBubble
                    key={'type'}
                    type={tx.type}
                    label={tx?.label}
                />,
                currencyOut.symbol ? (
                    <CurrencyOut
                        key={'out'}
                        className={'ml-auto'}
                        symbol={currencyOut.symbol}
                        quantity={currencyOut.quantity}
                    />
                ) : (
                    ''
                ),
                currencyIn.symbol ? (
                    <CurrencyIn
                        key={'in'}
                        symbol={currencyIn.symbol}
                        quantity={currencyIn.quantity}
                    />
                ) : (
                    ''
                ),
                formatPrice(
                    tx.total_price_per_fiat_currencies[user.currency_symbol],
                    user.currency_symbol,
                ),
                formatPrice(
                    tx.unit_price_per_fiat_currencies[user.currency_symbol],
                    user.currency_symbol,
                ),
            ]
        })
    }

    if (isLoading) {
        return <Loading fullHeight={false} />
    }

    if (!asset) {
        return <p>Actif introuvable.</p>
    }

    const summary = asset.summary
    const sym = user.currency_symbol

    return (
        <>
            <div className={'flex flex-row items-center gap-4 mb-6'}>
                <CurrencyBubble
                    symbol={asset.currency?.symbol}
                    name={asset.currency?.name}
                />
                <span className={'text-sm text-gray-400'}>
                    {asset.location?.name}
                </span>
            </div>

            <div className={'flex flex-row gap-4 mb-6'}>
                <SimpleCard className={'grow'} name={'Quantité'}>
                    {parseFloat(summary.quantity).toLocaleString(undefined, {
                        maximumFractionDigits: 8,
                    })}{' '}
                    {asset.currency?.symbol}
                </SimpleCard>
                <SimpleCard className={'grow'} name={'Valeur actuelle'}>
                    {formatPrice(
                        summary.total_value_per_fiat_currencies?.[sym],
                        sym,
                    )}
                </SimpleCard>
                <SimpleCard className={'grow'} name={"Prix moyen d'achat"}>
                    {formatPrice(
                        summary.average_buy_price_per_fiat_currencies?.[sym],
                        sym,
                    )}
                </SimpleCard>
                <SimpleCard
                    className={'grow'}
                    name={'P/L non réalisé'}
                    childrenClass={'flex flex-row items-baseline gap-2'}>
                    <ProfitLossPrice
                        value={summary.profit_loss_per_fiat_currencies?.[sym]}
                        symbol={sym}
                    />
                    <span
                        className={
                            'text-sm ' +
                            (summary.profit_loss_percentage > 0
                                ? 'text-green-600'
                                : summary.profit_loss_percentage < 0
                                ? 'text-red-600'
                                : 'text-gray-600')
                        }>
                        ({summary.profit_loss_percentage}%)
                    </span>
                </SimpleCard>
            </div>

            <div className={'mb-6'}>
                <h3 className={'font-semibold text-xl mb-2'}>Détails</h3>
                <CardDescriptionList
                    lines={[
                        {
                            name: 'Plateforme',
                            value: asset.location?.name,
                        },
                        {
                            name: 'Total investi',
                            value: formatPrice(
                                summary.total_invested_per_fiat_currencies?.[
                                    sym
                                ],
                                sym,
                            ),
                        },
                        {
                            name: 'Total des ventes',
                            value: formatPrice(
                                summary.total_proceeds_per_fiat_currencies?.[
                                    sym
                                ],
                                sym,
                            ),
                        },
                        {
                            name: "Coût total d'acquisition",
                            value: formatPrice(
                                summary
                                    .total_acquisition_cost_per_fiat_currencies?.[
                                    sym
                                ],
                                sym,
                            ),
                        },
                    ]}
                />
            </div>

            <div>
                <h3 className={'font-semibold text-xl mb-2'}>Transactions</h3>
                <Table
                    header={
                        <tr>
                            <th
                                scope="col"
                                className="py-3.5 pl-5 pr-3 text-left text-sm font-semibold text-gray-900">
                                Date
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Type
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Sortie
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Entrée
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Prix total
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Prix unitaire
                            </th>
                        </tr>
                    }
                    content={formatTransactionRows()}
                />
            </div>
        </>
    )
}

export default Page
