import React from 'react'
import Input from '@/components/Input'
import SelectCombobox from '@/components/SelectCombobox'
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline'

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

    function removeFee(id, isTempId = false) {
        if (isTempId) {
            setFees(fees.filter(f => f.temp_id !== id))
        } else {
            setFees(
                fees.map(f => (f.id === id ? { ...f, is_deleted: true } : f)),
            )
        }
    }

    function updateFee(id, newFee, isTempId = false) {
        setFees(
            fees.map(f =>
                (isTempId ? f.temp_id : f.id) === id ? { ...f, ...newFee } : f,
            ),
        )
    }

    const visibleFees = (fees || []).filter(f => !f.is_deleted)

    return (
        <div className="flex flex-col gap-3">
            {visibleFees.length === 0 ? (
                <div className="flex flex-col items-center py-6 text-center">
                    <p className="text-sm text-slate-400 mb-3">
                        Aucun frais ajouté pour cette transaction.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-11 gap-2 px-1">
                        <span className="col-span-3 text-xs font-medium uppercase tracking-wider text-slate-400">
                            Quantité
                        </span>
                        <span className="col-span-7 text-xs font-medium uppercase tracking-wider text-slate-400">
                            Devise
                        </span>
                        <span className="col-span-1" />
                    </div>
                    {visibleFees.map(fee => {
                        const key = fee.id ?? fee.temp_id
                        const isTempId = !!fee.temp_id && !fee.id
                        return (
                            <div
                                key={key}
                                className={
                                    'grid grid-cols-11 gap-2 items-center rounded-lg p-2 -mx-2 ' +
                                    (isTempId
                                        ? 'bg-blue-50/50 border border-dashed border-blue-200'
                                        : 'hover:bg-slate-50')
                                }>
                                <Input
                                    id={'fee_qty_' + key}
                                    name={'fee_qty_' + key}
                                    type="number"
                                    step="0.00000001"
                                    min="0"
                                    placeholder="0.00"
                                    value={fee?.quantity ?? 0}
                                    onChange={event =>
                                        updateFee(
                                            key,
                                            { quantity: event.target.value },
                                            isTempId,
                                        )
                                    }
                                    className="block col-span-3"
                                />
                                <div className="col-span-7">
                                    <SelectCombobox
                                        id={'fee_currency_' + key}
                                        name={'fee_currency_' + key}
                                        placeholder="Choisir une devise"
                                        selectedItem={fee?.currency_id ?? 0}
                                        setSelectedItem={currency_id =>
                                            updateFee(
                                                key,
                                                { currency_id },
                                                isTempId,
                                            )
                                        }
                                        items={[
                                            [{ id: 0, name: '' }],
                                            ...currencies.reduce(
                                                (acc, currency) => {
                                                    acc.push({
                                                        id: currency.id,
                                                        name:
                                                            currency.symbol +
                                                            ' ' +
                                                            currency.name,
                                                        showedName: (
                                                            <div className="flex flex-row justify-between gap-1.5">
                                                                <span>
                                                                    {
                                                                        currency.name
                                                                    }
                                                                </span>
                                                                <span className="text-slate-400">
                                                                    {
                                                                        currency.symbol
                                                                    }
                                                                </span>
                                                            </div>
                                                        ),
                                                        imageUrl:
                                                            process.env
                                                                .NEXT_PUBLIC_BACKEND_URL +
                                                            '/currencies/logo/' +
                                                            currency.symbol.toLowerCase() +
                                                            '.svg',
                                                    })
                                                    return acc
                                                },
                                                [],
                                            ),
                                        ]}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="col-span-1 flex items-center justify-center rounded-lg p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    onClick={() => removeFee(key, isTempId)}>
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        )
                    })}
                </>
            )}
            <button
                type="button"
                onClick={addBlankFee}
                className="flex items-center gap-1.5 self-start rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-sm text-slate-500 hover:border-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors">
                <PlusIcon className="h-4 w-4" />
                Ajouter des frais
            </button>
        </div>
    )
}

export default Fees
