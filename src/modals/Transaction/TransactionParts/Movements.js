import React from 'react'
import { TransactionType } from '@/enums/TransactionType'
import { Select } from '@/components/Select'
import { formatDate } from '@/lib/utils'
import Input from '@/components/Input'
import {
    TrashIcon,
    PlusIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline'

const Movements = ({
    movementableTransactions,
    date,
    type,
    quantity,
    currency,
    movements,
    setMovements,
    toFillQuantity,
    unitPurchasePrice,
}) => {
    function addBlankMovement() {
        setMovements([
            ...movements,
            {
                temp_id: Date.now(),
                id: null,
                from_transaction_id: 0,
                quantity: 0,
            },
        ])
    }

    function updateMovement(id, newMovement, isTempId = false) {
        setMovements(
            movements.map(m =>
                (isTempId ? m.temp_id : m.id) === id
                    ? { ...m, ...newMovement }
                    : m,
            ),
        )
    }

    function removeMovement(id, isTempId = false) {
        if (isTempId) {
            setMovements(movements.filter(m => m.temp_id !== id))
        } else {
            setMovements(
                movements.map(m =>
                    m.id === id ? { ...m, is_deleted: true } : m,
                ),
            )
        }
    }

    if (type !== TransactionType.OUT && type !== TransactionType.SWAP) {
        return (
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <InformationCircleIcon className="h-5 w-5 shrink-0 text-slate-400" />
                <p className="text-sm text-slate-500">
                    Les mouvements ne sont disponibles que pour les transactions
                    de type <span className="font-medium">Vente</span> ou{' '}
                    <span className="font-medium">Swap</span>.
                </p>
            </div>
        )
    }

    if (!quantity || !currency || !date) {
        return (
            <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <ExclamationTriangleIcon className="h-5 w-5 shrink-0 text-amber-500" />
                <p className="text-sm text-amber-700">
                    Renseignez la date, la devise vendue et la quantité dans
                    l'onglet Informations pour pouvoir ajouter des mouvements.
                </p>
            </div>
        )
    }

    const visibleMovements = (movements || []).filter(m => !m.is_deleted)
    const toFillIsNegative = toFillQuantity < 0

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <InformationCircleIcon className="h-5 w-5 shrink-0 text-slate-400" />
                <p className="text-xs text-slate-500">
                    Liez les transactions d'achat pour calculer le coût
                    d'acquisition de cette vente.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        À compléter
                    </span>
                    <span
                        className={
                            'rounded-full px-2.5 py-0.5 text-sm font-semibold tabular-nums ' +
                            (toFillIsNegative
                                ? 'bg-red-50 text-red-600'
                                : toFillQuantity === 0
                                ? 'bg-green-50 text-green-600'
                                : 'bg-blue-50 text-blue-600')
                        }>
                        {toFillQuantity} {currency?.symbol}
                    </span>
                </div>
                {unitPurchasePrice && (
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                            Prix d'achat unitaire
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-sm font-medium text-slate-700">
                            {unitPurchasePrice}
                        </span>
                    </div>
                )}
            </div>

            {toFillIsNegative && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                    <ExclamationTriangleIcon className="h-4 w-4 shrink-0 text-red-500" />
                    <p className="text-xs text-red-600">
                        La quantité totale des mouvements dépasse la quantité
                        vendue.
                    </p>
                </div>
            )}

            {visibleMovements.length > 0 && (
                <>
                    <div className="grid grid-cols-11 gap-2 px-1">
                        <span className="col-span-8 text-xs font-medium uppercase tracking-wider text-slate-400">
                            Transaction source
                        </span>
                        <span className="col-span-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                            Quantité
                        </span>
                        <span className="col-span-1" />
                    </div>
                    {visibleMovements.map(movement => {
                        const key = movement.id ?? movement.temp_id
                        const isTempId = !!movement.temp_id && !movement.id
                        return (
                            <div
                                key={key}
                                className={
                                    'grid grid-cols-11 gap-2 items-center rounded-lg p-2 -mx-2 ' +
                                    (isTempId
                                        ? 'bg-blue-50/50 border border-dashed border-blue-200'
                                        : 'hover:bg-slate-50')
                                }>
                                <Select
                                    id={'mvt_tx_' + key}
                                    name={'mvt_tx_' + key}
                                    items={{
                                        0: 'Choisir une transaction',
                                        ...movementableTransactions.reduce(
                                            (acc, tx) => {
                                                let name =
                                                    formatDate(
                                                        tx.date,
                                                        true,
                                                        'fr-FR',
                                                    ) + ' |'
                                                if (tx.label) {
                                                    name += ' ' + tx.label.name
                                                }
                                                name +=
                                                    ' ' +
                                                    tx.to_quantity +
                                                    ' ' +
                                                    tx.to_currency.symbol
                                                name +=
                                                    ' | Dispo: ' +
                                                    tx.movementable_quantity
                                                acc[tx.id] = name
                                                return acc
                                            },
                                            {},
                                        ),
                                    }}
                                    className="block w-full col-span-8"
                                    value={movement.from_transaction_id}
                                    onChange={event =>
                                        updateMovement(
                                            key,
                                            {
                                                from_transaction_id:
                                                    event.target.value,
                                            },
                                            isTempId,
                                        )
                                    }
                                />
                                <Input
                                    id={'mvt_qty_' + key}
                                    name={'mvt_qty_' + key}
                                    type="number"
                                    step="0.00000001"
                                    min="0"
                                    placeholder="0.00"
                                    value={movement?.quantity ?? 0}
                                    onChange={event =>
                                        updateMovement(
                                            key,
                                            { quantity: event.target.value },
                                            isTempId,
                                        )
                                    }
                                    className="block col-span-2"
                                />
                                <button
                                    type="button"
                                    className="col-span-1 flex items-center justify-center rounded-lg p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    onClick={() =>
                                        removeMovement(key, isTempId)
                                    }>
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        )
                    })}
                </>
            )}

            <button
                type="button"
                onClick={addBlankMovement}
                className="flex items-center gap-1.5 self-start rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-sm text-slate-500 hover:border-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors">
                <PlusIcon className="h-4 w-4" />
                Ajouter un mouvement
            </button>
        </div>
    )
}

export default Movements
