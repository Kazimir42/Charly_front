'use client'

import Header from '@/app/(app)/Header'
import { useDashboardData } from '@/hooks/dashboard'
import { useEffect, useState } from 'react'

function Location({ location }) {
    return <h2>{location.name}</h2>
}

const Dashboard = () => {
    const { getDashboard } = useDashboardData()

    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [locations, setLocations] = useState([])

    useEffect(() => {
        getDashboard(setErrors, setStatus).then(data => {
            if (data) {
                setLocations(data.locations || [])
            }
        })
    }, [])

    return (
        <>
            <Header title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {locations.map((location, index) => (
                            <Location key={index} location={location} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
