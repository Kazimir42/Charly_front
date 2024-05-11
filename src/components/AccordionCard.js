import React, { useState } from 'react'

const AccordionTable = ({ header, children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div id="accordion-collapse" data-accordion="collapse">
            <h2 id="accordion-collapse-heading-1">
                <div
                    className={
                        'flex items-center hover:cursor-pointer bg-white justify-between w-full px-5 py-3 font-medium rtl:text-right border-gray-200 focus:ring-2 focus:ring-gray-200 gap-3 ' +
                        (isOpen
                            ? 'border-t border-l border-r rounded-t-lg'
                            : 'border rounded-lg')
                    }
                    onClick={toggleAccordion}
                    aria-expanded={isOpen}
                    aria-controls="accordion-collapse-body-1">
                    <div
                        className={
                            'flex flex-row items-center w-full text-left gap-4'
                        }>
                        <div className="inline-block">
                            <svg
                                className={`w-3 h-3 shrink-0 text-gray-500 ${
                                    isOpen ? '' : 'rotate-180'
                                }`}
                                aria-hidden="true"
                                fill="none"
                                viewBox="0 0 10 6">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </div>
                        {header}
                    </div>
                </div>
            </h2>
            <div
                id="accordion-collapse-body-1"
                className={`${isOpen ? '' : 'hidden'}`}
                aria-labelledby="accordion-collapse-heading-1">
                <div className="border rounded-b-lg border-gray-200 bg-white">
                    <div className="w-full text-left">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default AccordionTable
