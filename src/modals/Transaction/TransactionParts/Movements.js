import React, { useEffect } from 'react'
import { TransactionType } from '@/enums/TransactionType'
import Button from '@/components/Button'
import { Select } from '@/components/Select'
import { formatDate } from '@/lib/utils'

const Movements = ({
    movementableTransactions,
    date,
    type,
    quantity,
    currency,
    movements,
    setMovements,
}) => {
    function Movement(movement) {
        movement = movement.movement;

        return (
            <div className={'grid grid-cols-11 gap-2'}>
                <Select
                    id={'transaction_' + movement.id ?? movement.temp_id}
                    name={'transaction_' + movement.id ?? movement.temp_id}
                    items={{
                        0: 'Choose a transaction',
                        ...movementableTransactions.reduce(
                            (acc, transaction) => {
                                let name = ' ' + formatDate(transaction.date, true, 'fr-FR') + ' |'
                                if (transaction.label) {
                                    name += ' ' + transaction.label.name
                                }
                                name += ' ' + transaction.to_quantity + ' ' + transaction.to_currency.symbol

                                acc[transaction.id] = name
                                return acc
                            },
                            {},
                        ),
                    }}
                    className="block w-full col-span-6"
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

        console.log(newMovements)

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
                            {quantity} {currency?.symbol}
                        </span>
                    </p>
                    {movements.map((movement, i) => (
                        <Movement key={i} movement={movement} />
                    ))}
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
