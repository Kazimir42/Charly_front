import React from 'react'

const TransactionLabelBubble = ({ name, className }) => {
    return (
        <div>
            <span className={'text-xs px-2 bg-gray-100 rounded-full font-semibold ' + className}>
                {name}
            </span>
        </div>
    )
}

export default TransactionLabelBubble
