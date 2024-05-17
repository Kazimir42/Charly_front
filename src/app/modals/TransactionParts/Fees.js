import React from 'react'
import Input from '@/components/Input'
import SelectCombobox from '@/components/SelectCombobox'
import { TrashIcon } from '@heroicons/react/24/outline'

const Fees = ({ fees, currencies }) => {
    function Fee(fee) {
        fee = fee.fee
        return (
            <div className={'grid grid-cols-11 gap-2'}>
                <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    step={'0.01'}
                    min={'0'}
                    placeholder={'Quantity'}
                    value={fee.quantity}
                    className="block col-span-3"
                />
                <div className={'col-span-7'}>
                    <SelectCombobox
                        id="from_currency"
                        name="from_currency"
                        placeholder={'Asset'}
                        selectedItem={fee.currencyId}
                        setSelectedItem={id => (fee.currencyId = id)} // todo: fix
                        items={[
                            [{ id: 0, name: '' }],
                            ...currencies.reduce((acc, currency) => {
                                acc.push({
                                    id: currency.id,
                                    name: currency.symbol + ' ' + currency.name,
                                    showedName: (
                                        <div
                                            className={
                                                'flex flex-row justify-between gap-1.5'
                                            }>
                                            <span>{currency.name}</span>
                                            <span className={'text-gray-400'}>
                                                {currency.symbol}
                                            </span>
                                        </div>
                                    ),
                                    imageUrl:
                                        process.env.NEXT_PUBLIC_BACKEND_URL +
                                        '/currencies/logo/' +
                                        currency.symbol +
                                        '.svg',
                                })
                                return acc
                            }, []),
                        ]}
                    />
                </div>
                <button className="hover:text-gray-700 p-1 duration-100 transition text-gray-500 text-right">
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>
        )
    }

    return (
        <div className={'flex flex-col gap-2'}>
            {fees.map((fee, i) => (
                <Fee key={i} fee={fee} />
            ))}
        </div>
    )
}

export default Fees
