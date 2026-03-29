import React from 'react'

const Card = ({ children }) => {
    return (
        <div
            className={
                'overflow-hidden rounded-xl bg-white px-4 py-5 border border-slate-200 sm:p-6 grow'
            }>
            {children}
        </div>
    )
}

export default Card
