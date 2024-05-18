import React from 'react'

const Movements = ({ movements }) => {
    function Movement() {
        return <div className={'grid grid-cols-11 gap-2'}>todo</div>
    }

    return (
        <div className={'flex flex-col gap-2'}>
            <p className={'text-gray-500 text-sm'}>
                Here you can link other transactions to calculate the average
                purchase price
            </p>
            {movements.map((movement, i) => (
                <Movement key={i} movement={movement} />
            ))}
        </div>
    )
}

export default Movements
