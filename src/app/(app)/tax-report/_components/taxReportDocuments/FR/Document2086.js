import React from 'react'

const Document2086 = ({ data }) => {
    return (
        <div>
            <p className={'text-sm text-gray-700 mb-4'}>
                You can base your calculations on the table below and enter the
                values in the tax form.
            </p>

            <table className={'mb-4'}>
                <thead>
                    <tr>
                        <th></th>
                        {data.transfers.map((item, index) => (
                            <th
                                className={
                                    'bg-gray-100 px-4 w-32 py-2 text-center font-semibold text-sm border border-gray-300'
                                }
                                key={index}>
                                Transfer {index}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td
                            className={
                                'bg-gray-100 px-4 py-2 font-semibold text-sm w-20 text-center border border-gray-300 '
                            }>
                            211
                        </td>
                        {data.transfers.map((item, index) => (
                            <td
                                className={
                                    'border border-gray-300 text-center text-sm text-gray-500'
                                }
                                key={index}>
                                {item['211']}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td
                            className={
                                'bg-gray-100 px-4 py-2 font-semibold text-sm w-20 text-center border border-gray-300'
                            }>
                            212
                        </td>
                        {data.transfers.map((item, index) => (
                            <td
                                className={
                                    'border border-gray-300 text-center text-sm text-gray-500'
                                }
                                key={index}>
                                {item['212']}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className={'h-6'}></td>
                    </tr>
                    <tr>
                        <td
                            className={
                                'bg-gray-100 px-4 py-2 font-semibold text-sm w-20 text-center border border-gray-300'
                            }>
                            213
                        </td>
                        {data.transfers.map((item, index) => (
                            <td
                                className={
                                    'border border-gray-300 text-center text-sm text-gray-500'
                                }
                                key={index}>
                                {item['213']}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td
                            className={
                                'bg-gray-100 px-4 py-2 font-semibold text-sm w-20 text-center border border-gray-300'
                            }>
                            214
                        </td>
                        {data.transfers.map((item, index) => (
                            <td
                                className={
                                    'border border-gray-300 text-center text-sm text-gray-500'
                                }
                                key={index}>
                                {item['214']}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td
                            className={
                                'bg-gray-100 px-4 py-2 font-semibold text-sm w-20 text-center border border-gray-300'
                            }>
                            215
                        </td>
                        {data.transfers.map((item, index) => (
                            <td
                                className={
                                    'border border-gray-300 text-center text-sm text-gray-500'
                                }
                                key={index}>
                                {item['215']}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td
                            className={
                                'bg-gray-100 px-4 py-2 font-semibold text-sm w-20 text-center border border-gray-300'
                            }>
                            216
                        </td>
                        {data.transfers.map((item, index) => (
                            <td
                                className={
                                    'border border-gray-300 text-center text-sm text-gray-500'
                                }
                                key={index}>
                                {item['216']}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td
                            className={
                                'bg-gray-100 px-4 py-2 font-semibold text-sm w-20 text-center border border-gray-300'
                            }>
                            217
                        </td>
                        {data.transfers.map((item, index) => (
                            <td
                                className={
                                    'border border-gray-300 text-center text-sm text-gray-500'
                                }
                                key={index}>
                                {item['217']}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td
                            className={
                                'bg-gray-100 px-4 py-2 font-semibold text-sm w-20 text-center border border-gray-300'
                            }>
                            218
                        </td>
                        {data.transfers.map((item, index) => (
                            <td
                                className={
                                    'border border-gray-300 text-center text-sm text-gray-500'
                                }
                                key={index}>
                                {item['218']}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className={'h-6'}></td>
                    </tr>
                    <tr>
                        <td
                            className={
                                'bg-gray-100 px-4 py-2 font-semibold text-sm w-20 text-center border border-gray-300'
                            }>
                            220
                        </td>
                        {data.transfers.map((item, index) => (
                            <td
                                className={
                                    'border border-gray-300 text-center text-sm text-gray-500'
                                }
                                key={index}>
                                {item['220']}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td
                            className={
                                'bg-gray-100 px-4 py-2 font-semibold text-sm w-20 text-center border border-gray-300'
                            }>
                            221
                        </td>
                        {data.transfers.map((item, index) => (
                            <td
                                className={
                                    'border border-gray-300 text-center text-sm text-gray-500'
                                }
                                key={index}>
                                {item['221']}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td
                            className={
                                'bg-gray-100 px-4 py-2 font-semibold text-sm w-20 text-center border border-gray-300'
                            }>
                            222
                        </td>
                        {data.transfers.map((item, index) => (
                            <td
                                className={
                                    'border border-gray-300 text-center text-sm text-gray-500'
                                }
                                key={index}>
                                {item['222']}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td
                            className={
                                'bg-gray-100 px-4 py-2 font-semibold text-sm w-20 text-center border border-gray-300'
                            }>
                            223
                        </td>
                        {data.transfers.map((item, index) => (
                            <td
                                className={
                                    'border border-gray-300 text-center text-sm text-gray-500'
                                }
                                key={index}>
                                {item['223']}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className={'h-6'}></td>
                    </tr>
                    <tr>
                        <td
                            className={
                                'bg-gray-100 px-4 py-2 font-semibold text-sm w-20 text-center border border-gray-300'
                            }>
                            224
                        </td>
                        {data.transfers.map((item, index) =>
                            index === data.transfers.length - 1 ? (
                                <td
                                    className={
                                        'border border-gray-300 text-center text-sm text-gray-500'
                                    }
                                    key={index}>
                                    todo
                                </td>
                            ) : (
                                <td key={index}></td>
                            ),
                        )}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Document2086
