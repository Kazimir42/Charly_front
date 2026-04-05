import React from 'react'

const Banner = ({ className }) => {
    return (
        <div
            className={
                'flex items-center gap-x-6 bg-amber-500 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 ' +
                className
            }>
            <p className="text-sm leading-6 text-amber-950">
                <strong className="font-semibold">POC — Démonstration</strong>
                <span className="ml-1">
                    — Ce projet est une démonstration technique. Les données
                    affichées sont fictives.
                </span>
            </p>
            <div className="flex flex-1 justify-end" />
        </div>
    )
}

export default Banner
