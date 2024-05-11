import React from 'react'

const CardDescriptionList = ({ title, titleDesc, lines }) => {
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            {title || titleDesc ? (
                <div className="px-4 py-6 sm:px-6">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                        {title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                        {titleDesc}
                    </p>
                </div>
            ) : (
                ''
            )}
            <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    {lines.map((line, i) => (
                        <div
                            key={i}
                            className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="font-semibold text-sm text-gray-900">
                                {line.name}
                            </dt>
                            <dd className="whitespace-nowrap text-sm text-gray-500 ">
                                {line.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}

export default CardDescriptionList
