import React from 'react'

const example = [
    {
        211: 0,
        212: 1,
        213: 2,
        214: 3,
        215: 4,
        216: 5,
        217: 6,
        218: 7,
        220: 8,
        221: 10,
        222: 11,
        223: 12,
    },
    {
        211: 0,
        212: 1,
        213: 2,
        214: 3,
        215: 4,
        216: 5,
        217: 6,
        218: 7,
        220: 8,
        221: 10,
        222: 11,
        223: 12,
    },
    {
        211: 0,
        212: 1,
        213: 2,
        214: 3,
        215: 4,
        216: 5,
        217: 6,
        218: 7,
        220: 8,
        221: 10,
        222: 11,
        223: 12,
    },
]

const Document2086 = () => {
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
                        {example.map((item, index) => (
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
                        {example.map((item, index) => (
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
                        {example.map((item, index) => (
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
                        {example.map((item, index) => (
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
                        {example.map((item, index) => (
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
                        {example.map((item, index) => (
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
                        {example.map((item, index) => (
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
                        {example.map((item, index) => (
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
                        {example.map((item, index) => (
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
                        {example.map((item, index) => (
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
                        {example.map((item, index) => (
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
                        {example.map((item, index) => (
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
                        {example.map((item, index) => (
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
                        {example.map((item, index) =>
                            index === example.length - 1 ? (
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
