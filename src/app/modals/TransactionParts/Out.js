import React from 'react'
import Input from '@/components/Input'
import Label from '@/components/Label'
import { Select } from '@/components/Select'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import Textarea from '@/components/Textarea'

const Out = ({
    date,
    setDate,
    toCurrency,
    setToCurrency,
    toQuantity,
    setToQuantity,
    fromCurrency,
    setFromCurrency,
    fromQuantity,
    setFromQuantity,
    location,
    setLocation,
    hash,
    setHash,
    fromAddress,
    setFromAddress,
    note,
    setNote,
    locations,
    fiatCurrencies,
    cryptoCurrencies,
    taxable,
    setTaxable,
    transactionLabels,
    transactionLabel,
    setTransactionLabel,
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
            <div>
                <Label htmlFor="location">Type</Label>
                <Select
                    id="transaction_type"
                    name="transaction_type"
                    items={{
                        0: 'Choose a type',
                        ...transactionLabels.reduce((acc, transactionLabel) => {
                            acc[transactionLabel.id] =
                                transactionLabel.name +
                                ': ' +
                                transactionLabel.description
                            return acc
                        }, {}),
                    }}
                    className="block w-full"
                    value={transactionLabel}
                    onChange={event => setTransactionLabel(event.target.value)}
                    autoFocus
                />
            </div>
            <div className={'grid grid-cols-2 gap-2'}>
                <div>
                    <Label htmlFor="from_currency">Asset Sent*</Label>
                    <Select
                        id="from_currency"
                        name="from_currency"
                        items={{
                            0: 'Choose an asset',
                            ...cryptoCurrencies.reduce((acc, fiatCurrency) => {
                                acc[fiatCurrency.id] = fiatCurrency.name
                                return acc
                            }, {}),
                        }}
                        className="block w-full"
                        value={fromCurrency}
                        onChange={event => setFromCurrency(event.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="from_quantity">Quantity Sent*</Label>
                    <Input
                        id="from_quantity"
                        name="from_quantity"
                        type="number"
                        step={'0.01'}
                        min={'0'}
                        value={fromQuantity}
                        className="block w-full"
                        onChange={event => setFromQuantity(event.target.value)}
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
                    <Label htmlFor="to_currency">Asset Received</Label>
                    <Select
                        id="to_currency"
                        name="to_currency"
                        items={{
                            0: 'Choose an asset',
                            ...fiatCurrencies.reduce((acc, cryptoCurrency) => {
                                acc[cryptoCurrency.id] = cryptoCurrency.name
                                return acc
                            }, {}),
                        }}
                        className="block w-full"
                        value={toCurrency}
                        onChange={event => setToCurrency(event.target.value)}
                        autoFocus
                    />
                </div>
                <div>
                    <Label htmlFor="to_quantity">Quantity Received</Label>
                    <Input
                        id="to_quantity"
                        name="to_quantity"
                        type="number"
                        step={'0.01'}
                        min={'0'}
                        value={toQuantity}
                        className="block w-full"
                        onChange={event => setToQuantity(event.target.value)}
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
                    <Label htmlFor="from_address">Departure address</Label>
                    <Input
                        id="from_address"
                        name="from_address"
                        type="text"
                        value={fromAddress}
                        className="block w-full"
                        onChange={event => setFromAddress(event.target.value)}
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
            <div className={'flex flex-row gap-1 '}>
                <Input
                    id="taxable"
                    type="checkbox"
                    name={'taxable'}
                    checked={taxable}
                    className=""
                    onChange={event => setTaxable(event.target.checked)}
                    autoFocus
                />
                <Label htmlFor="taxable" className={'cursor-pointer'}>
                    Taxable
                </Label>
            </div>
        </div>
    )
}

export default Out