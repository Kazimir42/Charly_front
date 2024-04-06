import React from 'react'

const SimpleCard = ({ className, name, value }) => {
    return (
        <div
            className={
                'overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 ' +
                className
            }>
            <dt className="truncate text-sm font-medium text-gray-500">
                {name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {value}
            </dd>
        </div>
    )
}

export default SimpleCard
