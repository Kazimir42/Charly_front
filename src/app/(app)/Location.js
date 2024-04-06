import React from 'react'
import Accordion from '@/components/Accordion'

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
                value: 'TODO €',
            },
            {
                className: 'w-[15%] text-right',
                value: 'TODO €',
            },
            {
                className: 'w-[15%] text-right',
                value: 'TODO €',
            },
            {
                className: 'w-[15%] text-right',
                value: 'TODO €',
            },
            {
                className: 'w-[15%] text-right',
                value: '+ TODO€',
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
                    value: 'TODO€',
                },
                {
                    className: 'w-[15%] text-right',
                    value: '+ TODO€',
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
