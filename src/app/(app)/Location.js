import React from 'react'
import Accordion from '@/components/Accordion'
import { formatPercentage, formatPrice } from '@/lib/utils'
import PercentageBubble from '@/components/PercentageBubble'
import ProfitLossPrice from '@/components/ProfitLossPrice'

const Location = ({ location }) => {
    let formattedAssets = []

    location.assets.map(asset => {
        formattedAssets.push([
            {
                className: 'w-[22%] ',
                value: asset.currency.name,
            },
            {
                className: 'w-[15%] text-right',
                value: asset.summary.quantity,
            },
            {
                className: 'w-[15%] text-right',
                value: formatPrice(asset.summary.average_buy_price),
            },
            {
                className: 'w-[15%] text-right',
                value: formatPrice(asset.summary.current_price),
            },
            {
                className: 'w-[15%] text-right',
                value: formatPrice(asset.summary.total_value),
            },
            {
                className: 'w-[15%] text-right',
                value: (
                    <div>
                        <ProfitLossPrice value={asset.summary.profit_loss} />
                        <PercentageBubble
                            className={'text-xs'}
                            value={asset.summary.profit_loss_percentage}
                        />
                    </div>
                ),
            },
        ])
    })

    return (
        <Accordion
            header={[
                {
                    className: 'w-[67%] ',
                    value: location.name,
                },
                {
                    className: 'w-[15%] text-right',
                    value: formatPrice(location.summary.total_value),
                },
                {
                    className: 'w-[15%] text-right',
                    value: (
                        <div>
                            <ProfitLossPrice
                                className={'font-semibold'}
                                value={location.summary.profit_loss}
                            />
                            <PercentageBubble
                                className={'text-sm'}
                                value={location.summary.profit_loss_percentage}
                            />
                        </div>
                    ),
                },
            ]}
            headerContent={[
                {
                    className: 'w-[22%] ',
                    value: 'Name',
                },
                {
                    className: 'w-[15%] text-right',
                    value: 'Quantity',
                },
                {
                    className: 'w-[15%] text-right',
                    value: 'Buy unit price',
                },
                {
                    className: 'w-[15%] text-right',
                    value: 'Current price',
                },
                {
                    className: 'w-[15%] text-right',
                    value: 'Total value',
                },
                {
                    className: 'w-[15%] text-right',
                    value: '+/- value',
                },
            ]}
            content={formattedAssets}
        />
    )
}

export default Location
