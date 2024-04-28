import React from 'react'
import Link from 'next/link'

const Pagination = ({ paginationData }) => {
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    href={
                        paginationData.prev_page_url
                            ? '?' + paginationData.prev_page_url.split('?')[1]
                            : ''
                    }
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                </Link>
                <Link
                    href={
                        paginationData.next_page_url
                            ? '?' + paginationData.next_page_url.split('?')[1]
                            : ''
                    }
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium">
                            {paginationData.from}
                        </span>{' '}
                        to{' '}
                        <span className="font-medium">{paginationData.to}</span>{' '}
                        of{' '}
                        <span className="font-medium">
                            {paginationData.total}
                        </span>{' '}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination">
                        {paginationData.links.map((link, index) => (
                            <Link
                                key={index}
                                href={
                                    link.url ? '?' + link.url.split('?')[1] : ''
                                }
                                aria-current="page"
                                className={
                                    'relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold ' +
                                    (link.active
                                        ? 'bg-default-primary text-white'
                                        : 'text-gray-900 hover:bg-gray-100 ring-1 ring-inset ring-gray-300 ') +
                                    ' ' +
                                    (index === 0 ? 'rounded-l-md' : '') +
                                    ' ' +
                                    (index === paginationData.links.length - 1
                                        ? 'rounded-r-md'
                                        : '')
                                }>
                                {index === 0
                                    ? '<'
                                    : index === paginationData.links.length - 1
                                    ? '>'
                                    : link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Pagination
