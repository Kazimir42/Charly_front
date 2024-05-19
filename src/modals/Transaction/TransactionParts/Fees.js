import React from 'react'
import Input from '@/components/Input'
import SelectCombobox from '@/components/SelectCombobox'
import { TrashIcon } from '@heroicons/react/24/outline'
import Button from '@/components/Button'

const Fees = ({ fees, setFees, currencies }) => {
    function addBlankFee() {
        setFees([
            ...fees,
            {
                temp_id: Date.now(),
                id: null,
                quantity: 0,
                currency_id: 0,
            },
        ])
    }

    // Possibility to delete by tempId for fees not saved on database
    function removeFee(id, isTempId = false) {
        let newFees = []

        // Fee not add on database, we can remove it from array
        if (isTempId) {
            newFees = fees.reduce((acc, cur) => {
                if (cur.temp_id !== id) {
                    acc.push(cur)
                }
                return acc
            }, [])
        } else {
            // Fee is on database, pass is_deleted to true
            newFees = fees.map(fee => {
                if (fee.id === id) {
                    return { ...fee, is_deleted: true }
                }
                return fee
            })
        }

        setFees(newFees)
    }

    // Possibility to update by tempId for fees not saved on database
    function updateFee(id, newFee, isTempId = false) {
        const newFees = fees.map(fee => {
            if ((isTempId ? fee.temp_id : fee.id) === id) {
                return { ...fee, ...newFee }
            }
            return fee
        })

        setFees(newFees)
    }

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
                    value={fee?.quantity ?? 0}
                    onChange={event =>
                        updateFee(
                            fee.id ?? fee.temp_id,
                            { quantity: event.target.value },
                            !!fee.temp_id,
                        )
                    }
                    className="block col-span-3"
                />
                <div className={'col-span-7'}>
                    <SelectCombobox
                        id="from_currency"
                        name="from_currency"
                        placeholder={'Asset'}
                        selectedItem={fee?.currency_id ?? 0}
                        setSelectedItem={currency_id =>
                            updateFee(
                                fee.id ?? fee.temp_id,
                                { currency_id: currency_id },
                                !!fee.temp_id,
                            )
                        }
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
                <button
                    type={'button'}
                    className="hover:text-gray-700 p-1 duration-100 transition text-gray-500 text-right"
                    onClick={() =>
                        removeFee(fee.id ?? fee.temp_id, !!fee.temp_id)
                    }>
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>
        )
    }

    return (
        <div className={'flex flex-col gap-2'}>
            {fees
                ? fees.map((fee, i) => {
                      if (!fee.is_deleted) {
                          return <Fee key={i} fee={fee} />
                      }
                  })
                : null}
            <Button
                type={'button'}
                onClick={() => addBlankFee()}
                className={'w-fit'}>
                + Add fees
            </Button>
        </div>
    )
}

export default Fees
