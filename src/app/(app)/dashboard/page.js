'use client'

import Header from '@/app/(app)/Header'
import { useDashboardData } from '@/hooks/dashboard'
import { useEffect, useState } from 'react'
import Location from '@/app/(app)/Location'
import SimpleCard from '@/components/SimpleCard'
import EditLocationModal from '@/app/modals/EditLocationModal'

const Dashboard = () => {
    const { getDashboard } = useDashboardData()

    const [, setErrors] = useState([])
    const [, setStatus] = useState(null)
    const [locationModalIsOpen, setLocationModalIsOpen] = useState(false)
    const [transactionModalIsOpen, setTransactionModalIsOpen] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState({})
    const [locations, setLocations] = useState([])
    const [cardStats, setCardStats] = useState([])

    useEffect(() => {
        getDashboard(setErrors, setStatus).then(data => {
            if (data) {
                setLocations(data.locations || [])
                // TODO
                setCardStats([
                    {
                        name: 'name',
                        value: 'TODO €',
                    },
                    {
                        name: 'name',
                        value: 'TODO €',
                    },
                    {
                        name: 'name',
                        value: 'TODO €',
                    },
                ])
            }
        })
    }, [])

    function openLocationEditModal(locationId) {
        if (locationModalIsOpen) {
            // It's open, we want to close

            setSelectedLocation({})
            setLocationModalIsOpen(!locationModalIsOpen)
        } else {
            // We want to open

            // Find the selected location
            setSelectedLocation(
                locations.find(location => location.id === locationId),
            )
            setLocationModalIsOpen(!locationModalIsOpen)
        }
    }

    function openNewTransactionModal(locationId) {
        setTransactionModalIsOpen(!transactionModalIsOpen)
    }

    return (
        <>
            <Header title="Dashboard" className={'mb-12'} />

            <div className={'pb-6'}>
                <h3 className={'font-semibold text-xl mb-2'}>Stats</h3>
                <div className={'flex flex-row gap-4 mb-4'}>
                    {cardStats.map((cardStat, index) => (
                        <SimpleCard
                            key={index}
                            className={'grow'}
                            name={cardStat.name}
                            value={cardStat.value}
                        />
                    ))}
                </div>
            </div>

            <div className={'pb-6'}>
                <h3 className={'font-semibold text-xl mb-2'}>Locations</h3>
                <div className="flex flex-col gap-2">
                    {locations.map((location, index) => (
                        <Location
                            key={index}
                            location={location}
                            openLocationEditModal={openLocationEditModal}
                            openNewTransactionModal={openNewTransactionModal}
                        />
                    ))}
                </div>
            </div>
            <EditLocationModal
                isOpen={locationModalIsOpen}
                setIsOpen={openLocationEditModal}
                location={selectedLocation}
            />
        </>
    )
}

export default Dashboard
