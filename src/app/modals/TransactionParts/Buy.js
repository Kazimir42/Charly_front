import React from 'react'
import Input from '@/components/Input'
import Label from '@/components/Label'
import { Select } from '@/components/Select'
import { ArrowDownIcon } from '@heroicons/react/24/outline'

const Buy = ({
    date,
    setDate,
    boughtAsset,
    setBoughtAsset,
    boughtQuantity,
    setBoughtQuantity,
    spentAsset,
    setSpentAsset,
    spentQuantity,
    setSpentQuantity,
    location,
    setLocation,
    locations,
}) => {

    return (
        <div className={'flex flex-col gap-2'}>
            <div>
                <Label htmlFor="date">Date</Label>
                <Input
                    id="date"
                    name="date"
                    type="datetime-local"
                    value={date}
                    className="block w-full"
                    onChange={event => setDate(event.target.value)}
                    required
                    autoFocus
                />
            </div>
            <div className={'grid grid-cols-2 gap-2'}>
                <div>
                    <Label htmlFor="spent_asset">Asset Spent</Label>
                    <Select
                        id="spent_asset" // TODO : Call API to get FIAT currencies
                        name="spent_asset"
                        items={{
                            1: 'Dollar',
                            2: 'Euro',
                        }}
                        className="block w-full"
                        value={spentAsset}
                        onChange={event => setSpentAsset(event.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="spent_quantity">Quantity Spent</Label>
                    <Input
                        id="spent_quantity"
                        name="spent_quantity"
                        type="number"
                        value={spentQuantity}
                        className="block w-full"
                        onChange={event => setSpentQuantity(event.target.value)}
                        required
                        autoFocus
                    />
                </div>
            </div>
            <ArrowDownIcon
                className="w-5 h-5 mx-auto text-gray-900"
                aria-hidden="true"
            />
            <div className={'grid grid-cols-2 gap-2'}>
                <div>
                    <Label htmlFor="bought_asset">Asset Bought</Label>
                    <Select
                        id="bought_asset" // TODO : Call API to get currencies
                        name="bought_asset"
                        items={{
                            3: 'Bitcoin',
                            4: 'Ethereum',
                            5: 'Cosmos',
                        }}
                        className="block w-full"
                        value={boughtAsset}
                        onChange={event => setBoughtAsset(event.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="bought_quantity">Quantity Bought</Label>
                    <Input
                        id="bought_quantity"
                        name="bought_quantity"
                        type="number"
                        value={boughtQuantity}
                        className="block w-full"
                        onChange={event =>
                            setBoughtQuantity(event.target.value)
                        }
                        required
                        autoFocus
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="location">Location</Label>
                <Select
                    id="location" // TODO : Call API to get location
                    name="location"
                    items={locations.reduce((acc, location) => {
                        acc[location.id] = location.name
                        return acc
                    }, {})}
                    className="block w-full"
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    required
                    autoFocus
                />
            </div>
        </div>
    )
}

export default Buy
