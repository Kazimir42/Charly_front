import React from 'react'

const Card = ({ children }) => {
    return (
        <div
            className={
                'overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 grow'
            }>
            {children}
        </div>
    )
}

export default Card
