'use client'

import Header from '@/app/(app)/Header'
import { useDashboardData } from '@/hooks/dashboard'
import { useEffect, useState } from 'react'
import Location from '@/app/(app)/Location'
import SimpleCard from '@/components/SimpleCard'
import EditLocationModal from '@/app/modals/EditLocationModal'
import { useLocationData } from '@/hooks/locations'

const Dashboard = () => {
    const { getDashboard } = useDashboardData()
    const { updateLocation } = useLocationData({})

    const [locationEditModalIsOpen, setLocationEditModalIsOpen] = useState(
        false,
    )
    const [locationDeleteModalIsOpen, setLocationDeleteModalIsOpen] = useState(false)
    const [transactionModalIsOpen, setTransactionModalIsOpen] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState({})
    const [locations, setLocations] = useState([])
    const [cardStats, setCardStats] = useState([])

    useEffect(() => {
        refreshDashboard()
    }, [])

    function refreshDashboard() {
        getDashboard().then(data => {
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
    }

    function openOrCloseLocationEditModal(locationId = null) {
        if (locationEditModalIsOpen) {
            setSelectedLocation({})
            setLocationEditModalIsOpen(!locationEditModalIsOpen)
        } else {
            // Find the selected location
            setSelectedLocation(
                locations.find(location => location.id === locationId),
            )
            setLocationEditModalIsOpen(!locationEditModalIsOpen)
        }
    }

    function openOrCloseLocationDeleteModal(locationId = null) {
        if (locationDeleteModalIsOpen) {
            setSelectedLocation({})
            setLocationDeleteModalIsOpen(!locationDeleteModalIsOpen)
        } else {
            // Find the selected location
            setSelectedLocation(
                locations.find(location => location.id === locationId),
            )
            setLocationDeleteModalIsOpen(!locationDeleteModalIsOpen)
        }
    }

    function openNewTransactionModal(locationId) {
        setTransactionModalIsOpen(!transactionModalIsOpen)
    }

    function _updateLocation(id, data) {
        updateLocation(id, data)
            .then(() => {
                refreshDashboard()
                openOrCloseLocationEditModal()
            })
            .catch(() => {})
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
                            openOrCloseLocationEditModal={
                                openOrCloseLocationEditModal
                            }
                            openNewTransactionModal={openNewTransactionModal}
                            openOrCloseLocationDeleteModal={
                                openOrCloseLocationDeleteModal
                            }
                        />
                    ))}
                </div>
            </div>
            <EditLocationModal
                updateLocation={_updateLocation}
                isOpen={locationEditModalIsOpen}
                setIsOpen={openOrCloseLocationEditModal}
                location={selectedLocation}
            />
        </>
    )
}

export default Dashboard
