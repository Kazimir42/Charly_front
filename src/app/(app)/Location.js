import React from 'react'
import Accordion from '@/components/Accordion'
import { formatPrice } from '@/lib/utils'
import PercentageBubble from '@/components/PercentageBubble'
import ProfitLossPrice from '@/components/ProfitLossPrice'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { DropdownButton } from '@/components/DropdownLink'
import Dropdown from '@/components/Dropdown'

const Location = ({
    location,
    openOrCloseLocationEditModal,
    openNewTransactionModal,
}) => {
    let formattedAssets = []
    location.assets.map(asset => {
        formattedAssets.push([
            <div className="inline-block w-[19%]">{asset.currency.name}</div>,
            <div className="inline-block w-[15%] text-right">
                {asset.summary.quantity}
            </div>,
            <div className="inline-block w-[15%] text-right">
                {formatPrice(asset.summary.average_buy_price)}
            </div>,
            <div className="inline-block w-[15%] text-right">
                {formatPrice(asset.summary.current_price)}
            </div>,
            <div className="inline-block w-[15%] text-right">
                {formatPrice(asset.summary.total_value)}
            </div>,
            <div className="inline-block w-[15%] text-right">
                <div>
                    <ProfitLossPrice value={asset.summary.profit_loss} />
                    <PercentageBubble
                        className={'text-xs'}
                        value={asset.summary.profit_loss_percentage}
                    />
                </div>
            </div>,
        ])
    })

    return (
        <Accordion
            header={[
                <div className="inline-block w-[64%]">{location.name}</div>,
                <div className="inline-block w-[15%] text-right">
                    {formatPrice(location.summary.total_value)}
                </div>,
                <div className="inline-block w-[15%] text-right">
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
                </div>,
                <div className="inline-block w-[3%] text-right">
                    <div className={'flex justify-end'}>
                        <Dropdown
                            align="right"
                            width="48"
                            trigger={
                                <button onClick={e => e.stopPropagation()}>
                                    <EllipsisHorizontalIcon
                                        className="h-6 w-6 hover:text-indigo-600 hover:bg-gray-50 rounded-lg"
                                        aria-hidden="true"
                                    />
                                </button>
                            }>
                            {/* Authentication */}
                            <DropdownButton
                                onClick={() =>
                                    openOrCloseLocationEditModal(location.id)
                                }>
                                Edit
                            </DropdownButton>
                            <DropdownButton
                                onClick={() =>
                                    openNewTransactionModal(location.id)
                                }>
                                Add crypto
                            </DropdownButton>
                        </Dropdown>
                    </div>
                </div>,
            ]}
            headerContent={[
                <div className="inline-block w-[19%]">Name</div>,
                <div className="inline-block w-[15%] text-right">Quantity</div>,
                <div className="inline-block w-[15%] text-right">
                    Buy unit price
                </div>,
                <div className="inline-block w-[15%] text-right">
                    Current price
                </div>,
                <div className="inline-block w-[15%] text-right">
                    Total value
                </div>,
                <div className="inline-block w-[15%] text-right">
                    +/- value
                </div>,
            ]}
            content={formattedAssets}
        />
    )
}

export default Location
