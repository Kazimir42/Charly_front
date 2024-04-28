import React from 'react'
import Pagination from '@/components/Pagination'

const Table = ({ header, content, paginationData }) => {
    return (
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                {header.map((item, index) => (
                                    <th
                                        key={index}
                                        scope="col"
                                        className={
                                            'px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ' +
                                            (index === 0
                                                ? ' pl-5 '
                                                : index === header.length - 1
                                                ? 'pr-5'
                                                : '')
                                        }>
                                        {item}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {content.map((lines, index) => (
                                <tr key={index}>
                                    {lines.map((line, index) => (
                                        <td
                                            key={index}
                                            className={
                                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500 ' +
                                                (index === 0
                                                    ? ' pl-5 '
                                                    : index === lines.length - 1
                                                    ? 'pr-5'
                                                    : '')
                                            }>
                                            {line}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {paginationData ? <Pagination paginationData={paginationData} /> : null}
                </div>
            </div>
        </div>
    )
}

export default Table
