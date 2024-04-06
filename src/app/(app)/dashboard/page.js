'use client'

import Header from '@/app/(app)/Header'
import { useDashboardData } from '@/hooks/dashboard'
import { useEffect, useState } from 'react'
import Location from '@/app/(app)/Location'

const Dashboard = () => {
    const { getDashboard } = useDashboardData()

    const [, setErrors] = useState([])
    const [, setStatus] = useState(null)
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
            <div className="py-12 flex flex-col gap-2">
                {locations.map((location, index) => (
                    <Location key={index} location={location} />
                ))}
            </div>
        </>
    )
}

export default Dashboard
