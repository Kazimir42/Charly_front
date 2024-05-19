import React from 'react'
import { TransactionType } from '@/enums/TransactionType'

const Movements = ({ type, quantity, currency, movements }) => {
    function Movement() {
        return <div className={'grid grid-cols-11 gap-2'}>todo</div>
    }

    return (
        <div className={'flex flex-col gap-2'}>
            {type !== TransactionType.OUT ? (
                <p className={'text-gray-500 text-sm'}>
                    This transaction type is not support movements yet.
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
                </>
            )}
        </div>
    )
}

export default Movements
