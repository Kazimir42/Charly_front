import React from 'react'
import AccordionCard from '@/components/AccordionCard'

const DocumentCard = ({ title, form, children }) => {
    return (
        <AccordionCard
            header={
                <div className={'flex flex-row items-baseline gap-2 py-3'}>
                    <span
                        className={
                            'font-bold bg-default-primary_lightest rounded-full px-3 py-0.5 text-white'
                        }>
                        {form}
                    </span>
                    <h4 className={'font-semibold text-lg'}>{title}</h4>
                </div>
            }>
            <div className={'p-5'}>{children}</div>
        </AccordionCard>
    )
}

export default DocumentCard
