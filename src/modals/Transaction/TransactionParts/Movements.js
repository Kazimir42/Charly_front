import React from 'react'
import { TransactionType } from '@/enums/TransactionType'
import Button from '@/components/Button'
import { Select } from '@/components/Select'
import { formatDate } from '@/lib/utils'
import Input from '@/components/Input'
import { TrashIcon } from '@heroicons/react/24/outline'

const Movements = ({
    movementableTransactions,
    date,
    type,
    quantity,
    currency,
    movements,
    setMovements,
    toFillQuantity,
}) => {
    function Movement(movement) {
        movement = movement.movement

        return (
            <div className={'grid grid-cols-11 gap-2'}>
                <Select
                    id={'transaction_' + movement.id ?? movement.temp_id}
                    name={'transaction_' + movement.id ?? movement.temp_id}
                    items={{
                        0: 'Choose a transaction',
                        ...movementableTransactions.reduce(
                            (acc, transaction) => {
                                let name =
                                    ' ' +
                                    formatDate(
                                        transaction.date,
                                        true,
                                        'fr-FR',
                                    ) +
                                    ' |'
                                if (transaction.label) {
                                    name += ' ' + transaction.label.name
                                }
                                name +=
                                    ' ' +
                                    transaction.to_quantity +
                                    ' ' +
                                    transaction.to_currency.symbol

                                name +=
                                    ' | FILLABLE QTY : ' +
                                    transaction.movementable_quantity

                                acc[transaction.id] = name
                                return acc
                            },
                            {},
                        ),
                    }}
                    className="block w-full col-span-8"
                    value={movement.from_transaction_id}
                    onChange={event =>
                        updateMovement(
                            movement.id ?? movement.temp_id,
                            {
                                from_transaction_id: event.target.value,
                            },
                            !!movement.temp_id,
                        )
                    }
                />
                <Input
                    id={'quantity_' + movement.id ?? movement.temp_id}
                    name={'quantity_' + movement.id ?? movement.temp_id}
                    type="number"
                    step={'0.01'}
                    min={'0'}
                    placeholder={'Quantity'}
                    value={movement?.quantity ?? 0}
                    onChange={event =>
                        updateMovement(
                            movement.id ?? movement.temp_id,
                            { quantity: event.target.value },
                            !!movement.temp_id,
                        )
                    }
                    className="block col-span-2"
                />
                <button
                    type={'button'}
                    className="hover:text-gray-700 p-1 duration-100 transition text-gray-500 text-right"
                    onClick={() =>
                        removeMovement(
                            movement.id ?? movement.temp_id,
                            !!movement.temp_id,
                        )
                    }>
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>
        )
    }

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

    // Possibility to update by tempId for movements not saved on database
    function updateMovement(id, newMovement, isTempId = false) {
        const newMovements = movements.map(movement => {
            if ((isTempId ? movement.temp_id : movement.id) === id) {
                return { ...movement, ...newMovement }
            }
            return movement
        })

        setMovements(newMovements)
    }

    // Possibility to delete by tempId for movements not saved on database
    function removeMovement(id, isTempId = false) {
        let newMovements = []

        // Fee not add on database, we can remove it from array
        if (isTempId) {
            newMovements = movements.reduce((acc, cur) => {
                if (cur.temp_id !== id) {
                    acc.push(cur)
                }
                return acc
            }, [])
        } else {
            // Fee is on database, pass is_deleted to true
            newMovements = movements.map(fee => {
                if (fee.id === id) {
                    return { ...fee, is_deleted: true }
                }
                return fee
            })
        }

        setMovements(newMovements)
    }

    return (
        <div className={'flex flex-col gap-2'}>
            {type !== TransactionType.OUT ? (
                <p className={'text-gray-500 text-sm'}>
                    This transaction type is not support movements yet.
                </p>
            ) : !quantity || !currency || !date ? (
                <p className={'text-gray-500 text-sm'}>
                    Tou should set date, sold currency and quantity of the
                    currency to add movements.{' '}
                </p>
            ) : (
                <>
                    <p className={'text-gray-500 text-sm'}>
                        Here you can link other transactions to calculate the
                        average purchase price
                    </p>
                    <p className={'font-bold text-sm text-gray-500'}>
                        To fill :{' '}
                        <span className={'text-default-primary'}>
                            {toFillQuantity} {currency?.symbol}
                        </span>
                    </p>
                    {movements.map((movement, i) => {
                        if (!movement.is_deleted) {
                            return <Movement key={i} movement={movement} />
                        }
                    })}
                    <Button
                        type={'button'}
                        onClick={() => addBlankMovement()}
                        className={'w-fit'}>
                        + Add movements
                    </Button>
                </>
            )}
        </div>
    )
}

export default Movements
