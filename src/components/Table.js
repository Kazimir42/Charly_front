import React from 'react'
import Pagination from '@/components/Pagination'
import TableHeader from '@/components/TableHeader'

const Table = ({ header, content, paginationData }) => {
    return (
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden sm:rounded-xl">
                    <table className="min-w-full divide-y divide-slate-200">
                        <TableHeader>{header}</TableHeader>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {content.map((lines, index) => (
                                <tr key={index} className="hover:bg-slate-50">
                                    {lines.map((line, index) => (
                                        <td
                                            key={index}
                                            className={
                                                'whitespace-nowrap px-3 py-4 text-sm text-slate-600 ' +
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
                    {paginationData ? (
                        <Pagination paginationData={paginationData} />
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Table
