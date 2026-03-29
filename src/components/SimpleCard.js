import React from 'react'

const SimpleCard = ({ className, name, children, childrenClass }) => {
    return (
        <div
            className={
                'overflow-hidden rounded-xl bg-white px-4 py-5 border border-slate-200 sm:p-6 ' +
                className
            }>
            <dt className="truncate text-xs font-medium uppercase tracking-wider text-slate-400">
                {name}
            </dt>
            <dd
                className={
                    'mt-1 text-2xl font-medium tabular-nums tracking-tight text-gray-900 ' +
                    childrenClass
                }>
                {children}
            </dd>
        </div>
    )
}

export default SimpleCard
