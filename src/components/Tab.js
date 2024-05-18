import React from 'react'

const Tab = ({ title, isActive, setIsActive, className }) => {
    return (
        <button
            type={'button'}
            className={
                (className ?? '') +
                ' pb-1 px-2 ' +
                (isActive
                    ? 'border-b-2 border-default-primary_dark text-default-primary_dark font-semibold'
                    : '')
            }
            onClick={setIsActive}>
            {title}
        </button>
    )
}

export default Tab
