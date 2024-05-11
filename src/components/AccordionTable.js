import React, { useState } from 'react'

const AccordionTable = ({ header, headerContent, content }) => {
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
                            'flex flex-row items-center w-full text-left'
                        }>
                        <div className="inline-block w-[3%]">
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
                        {header.map((item, index) => (
                            <React.Fragment key={index}>{item}</React.Fragment>
                        ))}
                    </div>
                </div>
            </h2>
            <div
                id="accordion-collapse-body-1"
                className={`${isOpen ? '' : 'hidden'}`}
                aria-labelledby="accordion-collapse-heading-1">
                <div className="border rounded-b-lg border-gray-200 bg-white">
                    <div className="w-full text-left">
                        {headerContent ? (
                            <div
                                className={
                                    'px-5 py-2 border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500'
                                }>
                                <div className="inline-block w-[3%]" />
                                {headerContent.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {item}
                                    </React.Fragment>
                                ))}
                            </div>
                        ) : (
                            ''
                        )}

                        {content.length ? (
                            content.map((items, index) => (
                                <div
                                    className={
                                        'flex flex-row items-center px-5 py-2 border-b border-gray-100 text-sm text-gray-700'
                                    }
                                    key={index}>
                                    <div className="inline-block w-[3%]" />
                                    {items.map((item, itemIndex) => (
                                        <React.Fragment key={itemIndex}>
                                            {item}
                                        </React.Fragment>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <div
                                className={
                                    'flex flex-row items-center px-5 py-2 border-b border-gray-100 text-sm text-gray-700'
                                }>
                                <div className="inline-block w-[3%]" />
                                <div className={'inline-block'}>Empty :(</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccordionTable
