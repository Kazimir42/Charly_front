import React from 'react'
import Input from '@/components/Input'
import Label from '@/components/Label'
import { Select } from '@/components/Select'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import Textarea from '@/components/Textarea'

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
    hash,
    setHash,
    receptionAddress,
    setReceptionAddress,
    note,
    setNote,
    locations,
    fiatCurrencies,
    cryptoCurrencies,
}) => {
    return (
        <div className={'flex flex-col gap-2'}>
            <div>
                <Label htmlFor="date">Date*</Label>
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
                    <Label htmlFor="spent_asset">Asset Spent*</Label>
                    <Select
                        id="spent_asset"
                        name="spent_asset"
                        items={{
                            0: 'Choose an asset',
                            ...fiatCurrencies.reduce((acc, fiatCurrency) => {
                                acc[fiatCurrency.id] = fiatCurrency.name
                                return acc
                            }, {}),
                        }}
                        className="block w-full"
                        value={spentAsset}
                        onChange={event => setSpentAsset(event.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="spent_quantity">Quantity Spent*</Label>
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
                    <Label htmlFor="bought_asset">Asset Bought*</Label>
                    <Select
                        id="bought_asset"
                        name="bought_asset"
                        items={{
                            0: 'Choose an asset',
                            ...cryptoCurrencies.reduce(
                                (acc, cryptoCurrency) => {
                                    acc[cryptoCurrency.id] = cryptoCurrency.name
                                    return acc
                                },
                                {},
                            ),
                        }}
                        className="block w-full"
                        value={boughtAsset}
                        onChange={event => setBoughtAsset(event.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="bought_quantity">Quantity Bought*</Label>
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
                <Label htmlFor="location">Location*</Label>
                <Select
                    id="location"
                    name="location"
                    items={{
                        0: 'Choose a location',
                        ...locations.reduce((acc, location) => {
                            acc[location.id] = location.name
                            return acc
                        }, {}),
                    }}
                    className="block w-full"
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    required
                    autoFocus
                />
            </div>
            <div className={'grid grid-cols-2 gap-2'}>
                <div>
                    <Label htmlFor="hash">Hash</Label>
                    <Input
                        id="hash"
                        name="hash"
                        type="text"
                        value={hash}
                        className="block w-full"
                        onChange={event => setHash(event.target.value)}
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="reception_address">Reception address</Label>
                    <Input
                        id="reception_address"
                        name="reception_address"
                        type="text"
                        value={receptionAddress}
                        className="block w-full"
                        onChange={event =>
                            setReceptionAddress(event.target.value)
                        }
                        autoFocus
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="note">Note</Label>
                <Textarea
                    id={'note'}
                    className="block mt-1 w-full h-32"
                    onChange={event => setNote(event.target.value)}
                    defaultValue={note}
                />
            </div>
        </div>
    )
}

export default Buy
