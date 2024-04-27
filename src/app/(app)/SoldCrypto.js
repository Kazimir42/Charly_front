import React from 'react'
import Accordion from '@/components/Accordion'
import { formatPrice } from '@/lib/utils'
import PercentageBubble from '@/components/PercentageBubble'
import ProfitLossPrice from '@/components/ProfitLossPrice'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { DropdownButton } from '@/components/DropdownLink'
import Dropdown from '@/components/Dropdown'
import CurrencyBubble from '@/components/CurrencyBubble'
import { useAuth } from '@/hooks/auth'

const SoldCrypto = ({ cryptocurrency }) => {
    const { user } = useAuth({ middleware: 'auth' })

    let formattedAssets = []
    cryptocurrency.locations.map(location => {
        formattedAssets.push([
            <div key={location.id} className="inline-block w-[49%]">
                {location.name}
            </div>,
            <div className="inline-block w-[15%] text-right">a</div>,
            <div className="inline-block w-[15%] text-right">b</div>,
            <div className="inline-block w-[15%] text-right">d</div>,
        ])
    })

    return (
        <Accordion
            header={[
                <div key={cryptocurrency.name} className="inline-block w-[64%]">
                    {cryptocurrency.name}
                </div>,
                <div className="inline-block w-[15%] text-right">a</div>,
                <div className="inline-block w-[15%] text-right">b</div>,
                <div
                    key={'dropdown'}
                    className="inline-block w-[3%] text-right">
                    <div className={'flex justify-end'}></div>
                </div>,
            ]}
            headerContent={[
                <div key={'Location'} className="inline-block w-[49%]">
                    Location
                </div>,
                <div
                    key={'Quantity sold'}
                    className="inline-block w-[15%] text-right">
                    Quantity sold
                </div>,
                <div
                    key={'Buy unit price'}
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
