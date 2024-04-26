import React from 'react'
import Input from '@/components/Input'
import Label from '@/components/Label'
import { Select } from '@/components/Select'
import Textarea from '@/components/Textarea'

const Receive = ({
    date,
    setDate,
    toCurrency,
    setToCurrency,
    toQuantity,
    setToQuantity,
    location,
    setLocation,
    hash,
    setHash,
    toAddress,
    setToAddress,
    note,
    setNote,
    locations,
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
                    <Label htmlFor="to_currency">Asset Received*</Label>
                    <Select
                        id="to_currency"
                        name="to_currency"
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
                        value={toCurrency}
                        onChange={event => setToCurrency(event.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="to_quantity">Quantity Received*</Label>
                    <Input
                        id="to_quantity"
                        name="to_quantity"
                        type="number"
                        step={'0.01'}
                        min={'0'}
                        value={toQuantity}
                        className="block w-full"
                        onChange={event => setToQuantity(event.target.value)}
                        required
                        autoFocus
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="location">Location</Label>
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
                    <Label htmlFor="to_address">Reception address</Label>
                    <Input
                        id="to_address"
                        name="to_address"
                        type="text"
                        value={toAddress}
                        className="block w-full"
                        onChange={event => setToAddress(event.target.value)}
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

export default Receive
