import React from 'react'
import Input from '@/components/Input'
import Label from '@/components/Label'
import { Select } from '@/components/Select'
import Textarea from '@/components/Textarea'
import SelectCombobox from '@/components/SelectCombobox'
import { ArrowRightIcon } from '@heroicons/react/16/solid'

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
                <Label htmlFor="transaction_type">Type</Label>
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
                />
            </div>
            <div className={'grid grid-cols-11 gap-2 items-center'}>
                <div className={'col-span-5'}>
                    <h3 className={'font-medium text-sm text-gray-700'}>
                        Sent*
                    </h3>
                    <div className={'flex flex-row gap-2'}>
                        <Input
                            id="from_quantity"
                            name="from_quantity"
                            type="number"
                            step={'0.01'}
                            min={'0'}
                            placeholder={'Quantity'}
                            value={fromQuantity}
                            className="block w-full"
                            onChange={event =>
                                setFromQuantity(event.target.value)
                            }
                            required
                        />
                        <SelectCombobox
                            id="from_currency"
                            name="from_currency"
                            required={true}
                            placeholder={'Asset'}
                            selectedItem={fromCurrency}
                            setSelectedItem={setFromCurrency}
                            items={[
                                [{ id: 0, name: '' }],
                                ...cryptoCurrencies.reduce(
                                    (acc, cryptoCurrency) => {
                                        acc.push({
                                            id: cryptoCurrency.id,
                                            name: cryptoCurrency.name,
                                            imageUrl:
                                                process.env
                                                    .NEXT_PUBLIC_BACKEND_URL +
                                                '/currencies/logo/' +
                                                cryptoCurrency.symbol +
                                                '.svg',
                                        })
                                        return acc
                                    },
                                    [],
                                ),
                            ]}
                        />
                    </div>
                </div>
                <div>
                    <h3>&nbsp;</h3>
                    <ArrowRightIcon
                        className="w-5 h-5 mx-auto text-gray-900"
                        aria-hidden="true"
                    />
                </div>
                <div className={'col-span-5'}>
                    <h3 className={'font-medium text-sm text-gray-700'}>
                        Received
                    </h3>
                    <div className={'flex flex-row gap-2'}>
                        <Input
                            id="to_quantity"
                            name="to_quantity"
                            type="number"
                            step={'0.01'}
                            min={'0'}
                            placeholder={'Quantity'}
                            value={toQuantity}
                            className="block w-full"
                            onChange={event =>
                                setToQuantity(event.target.value)
                            }
                        />
                        <SelectCombobox
                            id="to_currency"
                            name="to_currency"
                            placeholder={'Asset'}
                            selectedItem={toCurrency}
                            setSelectedItem={setToCurrency}
                            items={[
                                [{ id: 0, name: '' }],
                                ...fiatCurrencies.reduce(
                                    (acc, fiatCurrency) => {
                                        acc.push({
                                            id: fiatCurrency.id,
                                            name: fiatCurrency.name,
                                            imageUrl:
                                                process.env
                                                    .NEXT_PUBLIC_BACKEND_URL +
                                                '/currencies/logo/' +
                                                fiatCurrency.symbol +
                                                '.svg',
                                        })
                                        return acc
                                    },
                                    [],
                                ),
                            ]}
                        />
                    </div>
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
                />
                <Label htmlFor="taxable" className={'cursor-pointer'}>
                    Taxable
                </Label>
            </div>
        </div>
    )
}

export default Out
