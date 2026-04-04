'use client'

import Link from 'next/link'
import CurrencyBubble from '@/components/CurrencyBubble'
import ProfitLossPrice from '@/components/ProfitLossPrice'
import PercentageBubble from '@/components/PercentageBubble'
import { formatPrice } from '@/lib/utils'

const PerformanceTable = ({ currencies, userCurrencySymbol }) => {
    const entries = Object.entries(currencies || {})

    if (entries.length === 0) {
        return (
            <p className="text-sm text-slate-400">Aucune donnée disponible.</p>
        )
    }

    return (
        <div className="overflow-x-auto">
            <div className="overflow-hidden border border-slate-200 rounded-xl">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="py-3.5 pl-5 pr-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                Actif
                            </th>
                            <th className="px-3 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                                Quantité
                            </th>
                            <th className="px-3 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                                Prix moyen
                            </th>
                            <th className="px-3 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                                Prix actuel
                            </th>
                            <th className="px-3 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                                Valeur totale
                            </th>
                            <th className="px-3 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                                P/L
                            </th>
                            <th className="px-3 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                                Allocation
                            </th>
                            <th className="px-3 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-slate-500 pr-5">
                                Performance
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {entries.map(([currencyId, data]) => (
                            <tr
                                key={currencyId}
                                className="hover:bg-slate-50 transition-colors">
                                <td className="whitespace-nowrap py-4 pl-5 pr-3 text-sm">
                                    <Link
                                        href={`/assets/${data.symbol}`}
                                        className="hover:opacity-75 transition-opacity">
                                        <CurrencyBubble
                                            symbol={data.symbol}
                                            name={data.name}
                                        />
                                    </Link>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600 text-right tabular-nums">
                                    {parseFloat(data.quantity).toLocaleString(
                                        undefined,
                                        {
                                            maximumFractionDigits: 8,
                                        },
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600 text-right tabular-nums">
                                    {formatPrice(
                                        data
                                            .average_buy_price_per_fiat_currencies?.[
                                            userCurrencySymbol
                                        ],
                                        userCurrencySymbol,
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600 text-right tabular-nums">
                                    {formatPrice(
                                        data
                                            .current_price_per_fiat_currencies?.[
                                            userCurrencySymbol
                                        ],
                                        userCurrencySymbol,
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600 text-right tabular-nums font-medium">
                                    {formatPrice(
                                        data.total_value_per_fiat_currencies?.[
                                            userCurrencySymbol
                                        ],
                                        userCurrencySymbol,
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                                    <ProfitLossPrice
                                        value={
                                            data
                                                .profit_loss_per_fiat_currencies?.[
                                                userCurrencySymbol
                                            ]
                                        }
                                        symbol={userCurrencySymbol}
                                    />
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600 text-right tabular-nums">
                                    {parseFloat(
                                        data.portfolio_percentage,
                                    ).toFixed(1)}
                                    %
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-right pr-5">
                                    <PercentageBubble
                                        value={data.profit_loss_percentage}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PerformanceTable
