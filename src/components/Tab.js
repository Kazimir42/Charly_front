import React from 'react'

const Tab = ({ title, isActive, setIsActive, className }) => {
    return (
        <button
            type={'button'}
            className={
                (className ?? '') +
                ' pb-1 px-2 ' +
                (isActive
                    ? 'border-b-2 border-slate-900 text-slate-900 font-semibold'
                    : '')
            }
            onClick={setIsActive}>
            {title}
        </button>
    )
}

export default Tab
