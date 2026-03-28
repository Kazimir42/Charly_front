import React, { useEffect, useState } from 'react'
import { useLocationData } from '@/hooks/locations'

const Document3916bis = () => {
    const { getLocations } = useLocationData()
    const [locations, setLocations] = useState([])

    useEffect(() => {
        getLocations().then(data => {
            if (data) {
                setLocations(data)
            }
        })
    }, [])

    return (
        <div>
            <p className={'text-sm text-gray-700 mb-4'}>
                List of digital asset accounts held abroad that must be
                declared.
            </p>

            {locations.length > 0 ? (
                <table className={'w-full'}>
                    <thead>
                        <tr>
                            <th
                                className={
                                    'bg-gray-100 px-4 py-2 text-left font-semibold text-sm border border-gray-300'
                                }>
                                Platform name
                            </th>
                            <th
                                className={
                                    'bg-gray-100 px-4 py-2 text-left font-semibold text-sm border border-gray-300'
                                }>
                                Account number
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map((location, index) => (
                            <tr key={index}>
                                <td
                                    className={
                                        'border border-gray-300 px-4 py-2 text-sm text-gray-700'
                                    }>
                                    {location.name}
                                </td>
                                <td
                                    className={
                                        'border border-gray-300 px-4 py-2 text-sm text-gray-500'
                                    }>
                                    -
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className={'text-sm text-gray-500'}>No locations found.</p>
            )}
        </div>
    )
}

export default Document3916bis
