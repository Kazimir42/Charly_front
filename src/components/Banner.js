import React from 'react'

const Banner = ({ className }) => {
    return (
        <div
            className={
                'flex items-center gap-x-6 bg-default-primary px-6 py-2.5 sm:px-3.5 sm:before:flex-1 ' +
                className
            }>
            <p className="text-sm leading-6 text-white">
                <a href="#">
                    <strong className="font-semibold">It's an alpha :)</strong>
                </a>
            </p>
            <div className="flex flex-1 justify-end" />
        </div>
    )
}

export default Banner
