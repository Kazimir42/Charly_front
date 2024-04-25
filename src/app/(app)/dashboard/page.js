'use client'

import Header from '@/app/(app)/Header'
import { useDashboardData } from '@/hooks/dashboard'
import { useEffect, useState } from 'react'
import Location from '@/app/(app)/Location'
import SimpleCard from '@/components/SimpleCard'
import EditLocationModal from '@/app/modals/EditLocationModal'
import { useLocationData } from '@/hooks/locations'
import DeleteModal from '@/app/modals/DeleteModal'
import Button from '@/components/Button'
import CreateLocationModal from '@/app/modals/CreateLocationModal'
import TreemapAllocation from '@/app/stats/TreemapAllocation'
import TotalValueHistory from '@/app/stats/TotalValueHistory'
import CreateTransactionModal from '@/app/modals/CreateTransactionModal'
import { useTransactionData } from '@/hooks/transactions'

const Dashboard = () => {
    const { getDashboard } = useDashboardData()
    const { updateLocation, deleteLocation, createLocation } = useLocationData()
    const { createTransaction } = useTransactionData()

    const [locationCreateModalIsOpen, setLocationCreateModalIsOpen] = useState(
        false,
    )
    const [locationEditModalIsOpen, setLocationEditModalIsOpen] = useState(
        false,
    )
    const [locationDeleteModalIsOpen, setLocationDeleteModalIsOpen] = useState(
        false,
    )
    const [
        transactionCreateModalIsOpen,
        setTransactionCreateModalIsOpen,
    ] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState({})
    const [locations, setLocations] = useState([])
    const [cardStats, setCardStats] = useState([])
    const [allocationStats, setAllocationStats] = useState([])
    const [totalValueHistoryStats, setTotalValueHistoryStats] = useState([])

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
                        name: 'Total invested',
                        value: 'TODO €',
                    },
                    {
                        name: 'Total value',
                        value: 'TODO €',
                    },
                    {
                        name: 'Profit / Loss',
                        value: 'TODO €',
                    },
                    {
                        name: 'Profit / Loss by %',
                        value: 'TODO €',
                    },
                ])
                setAllocationStats(data.stats.allocation)
                setTotalValueHistoryStats(data.stats.total_value_history)
            }
        })
    }

    function openOrCloseLocationCreateModal() {
        setLocationCreateModalIsOpen(!locationCreateModalIsOpen)
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

    const openOrCloseTransactionCreateModal = (locationId = null) => {
        if (transactionCreateModalIsOpen) {
            setSelectedLocation({})
            setTransactionCreateModalIsOpen(!transactionCreateModalIsOpen)
        } else {
            // Find the selected location
            setSelectedLocation(
                locations.find(location => location.id === locationId),
            )
            setTransactionCreateModalIsOpen(!transactionCreateModalIsOpen)
        }
    }

    function _updateLocation(id, data) {
        updateLocation(id, data)
            .then(() => {
                refreshDashboard()
                openOrCloseLocationEditModal()
            })
            .catch(() => {})
    }

    function _deleteLocation(id) {
        deleteLocation(id)
            .then(() => {
                refreshDashboard()
                openOrCloseLocationDeleteModal()
            })
            .catch(() => {})
    }

    function _createLocation(data) {
        createLocation(data)
            .then(() => {
                refreshDashboard()
                openOrCloseLocationCreateModal()
            })
            .catch(() => {})
    }

    function _createTransaction(data) {
        createTransaction(data)
            .then(() => {
                refreshDashboard()
                openOrCloseTransactionCreateModal()
            })
            .catch(() => {})
    }

    return (
        <>
            <Header title="Dashboard" className={'mb-6'} />

            <div className={'pb-6'}>
                <div className={'flex flex-row gap-4 mb-4'}>
                    {cardStats.map((cardStat, index) => (
                        <SimpleCard
                            key={index}
                            className={'grow'}
                            name={cardStat.name}>
                            {cardStat.value}
                        </SimpleCard>
                    ))}
                </div>
                <div className={'grid grid-cols-3 gap-4 mb-4'}>
                    <SimpleCard
                        className={'col-span-2'}
                        childrenClass={'h-[200px]'}
                        name={'Total value history'}>
                        <TotalValueHistory
                            totalValues={totalValueHistoryStats}
                        />
                    </SimpleCard>
                    <SimpleCard
                        className={'col-span-1'}
                        name={'Allocation'}
                        childrenClass={'h-[200px]'}>
                        <TreemapAllocation allocations={allocationStats} />
                    </SimpleCard>
                </div>
            </div>

            <div className={'pb-6'}>
                <div
                    className={
                        'flex flex-row items-center mb-2 justify-between'
                    }>
                    <h3 className={'font-semibold text-xl'}>Locations</h3>
                    <Button onClick={openOrCloseLocationCreateModal}>
                        + Add new
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    {locations.map((location, index) => (
                        <Location
                            key={index}
                            location={location}
                            openOrCloseLocationEditModal={
                                openOrCloseLocationEditModal
                            }
                            openOrCloseLocationDeleteModal={
                                openOrCloseLocationDeleteModal
                            }
                            openNewTransactionModal={
                                openOrCloseTransactionCreateModal
                            }
                        />
                    ))}
                </div>
            </div>
            <CreateLocationModal
                createLocation={_createLocation}
                isOpen={locationCreateModalIsOpen}
                setIsOpen={openOrCloseLocationCreateModal}
            />
            <EditLocationModal
                updateLocation={_updateLocation}
                isOpen={locationEditModalIsOpen}
                setIsOpen={openOrCloseLocationEditModal}
                location={selectedLocation ?? null}
            />
            <DeleteModal
                id={selectedLocation?.id ?? null}
                deleteObject={_deleteLocation}
                isOpen={locationDeleteModalIsOpen}
                setIsOpen={openOrCloseLocationDeleteModal}
                title={'Delete location: ' + selectedLocation?.name}
                content={
                    'By deleted a location it will delete the child assets and remove the location from the transactions (but the transactions will not be deleted)'
                }
            />
            <CreateTransactionModal
                createTransaction={_createTransaction}
                isOpen={transactionCreateModalIsOpen}
                setIsOpen={openOrCloseTransactionCreateModal}
                defaultLocation={selectedLocation}
            />
        </>
    )
}

export default Dashboard
