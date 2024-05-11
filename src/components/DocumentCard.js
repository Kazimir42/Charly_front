import React from 'react'
import Card from '@/components/Card'

const DocumentCard = ({ title, form, children }) => {
    return (
        <Card>
            <div className={'flex flex-row items-baseline gap-2 mb-4'}>
                <span
                    className={
                        'font-bold bg-default-primary_lightest rounded-full px-3 py-0.5 text-white'
                    }>
                    {form}
                </span>
                <h4 className={'font-semibold text-lg mb-2'}>{title}</h4>
            </div>
            {children}
        </Card>
    )
}

export default DocumentCard
