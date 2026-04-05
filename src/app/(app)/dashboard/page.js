'use client'

import Header from '@/app/(app)/Header'
import { useDashboardData } from '@/hooks/dashboard'
import { useEffect, useState } from 'react'
import Loading from '@/app/(app)/Loading'
import Location from '@/app/(app)/dashboard/_components/Location'
import SimpleCard from '@/components/SimpleCard'
import EditLocationModal from '@/modals/Location/EditLocationModal'
import { useLocationData } from '@/hooks/locations'
import DeleteModal from '@/modals/DeleteModal'
import Button from '@/components/Button'
import CreateLocationModal from '@/modals/Location/CreateLocationModal'
import TreemapAllocation from '@/app/(app)/dashboard/_components/stats/TreemapAllocation'
import TotalValueHistory from '@/app/(app)/dashboard/_components/stats/TotalValueHistory'
import CreateTransactionModal from '@/modals/Transaction/CreateTransactionModal'
import { useTransactionData } from '@/hooks/transactions'
import { useAuth } from '@/hooks/auth'
import { formatPrice } from '@/lib/utils'
import ProfitLossPrice from '@/components/ProfitLossPrice'
import PercentageBubble from '@/components/PercentageBubble'
import { useFeeData } from '@/hooks/fees'
import { useMovementData } from '@/hooks/movements'
import { getAllocationColor } from '@/lib/allocationColors'
import OnboardingStepper from '@/app/(app)/dashboard/_components/OnboardingStepper'

const Dashboard = () => {
    const { user } = useAuth({
        middleware: 'auth',
    })
    const { getDashboard } = useDashboardData()
    const { updateLocation, deleteLocation, createLocation } = useLocationData()
    const { createTransaction } = useTransactionData()
    const { createFee } = useFeeData()
    const { createMovement } = useMovementData()

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
    const [locationColorMap, setLocationColorMap] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [onboardingStep, setOnboardingStep] = useState(0)

    useEffect(() => {
        refreshDashboard()
    }, [])

    function refreshDashboard() {
        getDashboard().then(data => {
            if (data) {
                const locs = data.locations || []
                setLocations(locs)

                // Detect onboarding state
                const hasLocations = locs.length > 0
                const hasAssets = locs.some(
                    loc => loc.assets && loc.assets.length > 0,
                )
                if (!hasLocations) {
                    setOnboardingStep(1)
                    setIsLoading(false)
                    return
                }
                if (!hasAssets) {
                    setOnboardingStep(2)
                    setIsLoading(false)
                    return
                }
                setOnboardingStep(0)

                setCardStats([
                    {
                        name: 'Valeur totale actuelle',
                        value: formatPrice(
                            data.stats.current_total_value
                                ?.value_per_fiat_currencies?.[
                                user.currency_symbol
                            ],
                            user.currency_symbol,
                        ),
                    },
                    {
                        name: 'Total investi',
                        value: formatPrice(
                            data.stats.total_value_invested
                                ?.value_per_fiat_currencies?.[
                                user.currency_symbol
                            ],
                            user.currency_symbol,
                        ),
                    },
                    {
                        name: 'Total vendu',
                        value: formatPrice(
                            data.stats.total_sold_value
                                ?.value_per_fiat_currencies?.[
                                user.currency_symbol
                            ],
                            user.currency_symbol,
                        ),
                    },
                    {
                        name: 'P/L non réalisé',
                        value: (
                            <div>
                                <ProfitLossPrice
                                    value={
                                        data.stats.unrealized_profit_loss
                                            ?.value_per_fiat_currencies?.[
                                            user.currency_symbol
                                        ]
                                    }
                                    symbol={user.currency_symbol}
                                />
                                <span className="text-sm font-medium">
                                    <PercentageBubble
                                        className={''}
                                        withFont={true}
                                        value={
                                            data.stats
                                                .unrealized_profit_loss_percentage
                                                ?.value
                                        }
                                    />
                                </span>
                            </div>
                        ),
                    },
                    {
                        name: 'P/L réalisé',
                        value: (
                            <ProfitLossPrice
                                value={
                                    data.stats.realized_profit_loss
                                        ?.value_per_fiat_currencies?.[
                                        user.currency_symbol
                                    ]
                                }
                                symbol={user.currency_symbol}
                            />
                        ),
                    },
                ])
                setAllocationStats(data.stats.allocation)
                setTotalValueHistoryStats(data.stats.total_value_history)

                // Build location → color map from allocation order
                if (data.stats.allocation?.locations) {
                    const ids = Object.keys(data.stats.allocation.locations)
                    const colorMap = {}
                    ids.forEach((id, index) => {
                        colorMap[id] = getAllocationColor(index, ids.length)
                    })
                    setLocationColorMap(colorMap)
                }
                setIsLoading(false)
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
            .catch(() => {
                // Erreur déjà affichée via toast dans le hook
            })
    }

    function _deleteLocation(id) {
        deleteLocation(id)
            .then(() => {
                refreshDashboard()
                openOrCloseLocationDeleteModal()
            })
            .catch(() => {
                // Erreur déjà affichée via toast dans le hook
            })
    }

    function _createLocation(data) {
        createLocation(data)
            .then(() => {
                refreshDashboard()
                openOrCloseLocationCreateModal()
            })
            .catch(() => {
                // Erreur déjà affichée via toast dans le hook
            })
    }

    async function _createTransaction(data) {
        let createdTransaction = await createTransaction(data.transaction)

        for (const fee of data.fees) {
            await createFee(createdTransaction.id, fee)
        }

        for (const movement of data.movements) {
            await createMovement(createdTransaction.id, movement)
        }

        refreshDashboard()
        openOrCloseTransactionCreateModal()
    }

    function handleOnboardingAction(step) {
        if (step === 1) {
            openOrCloseLocationCreateModal()
        } else if (step === 2) {
            openOrCloseTransactionCreateModal()
        }
    }

    if (isLoading) {
        return <Loading fullHeight={false} />
    }

    if (onboardingStep > 0) {
        return (
            <>
                <Header title="Tableau de bord" className={'mb-4'} />
                <OnboardingStepper
                    currentStep={onboardingStep}
                    onStepAction={handleOnboardingAction}
                />
                <CreateLocationModal
                    createLocation={_createLocation}
                    isOpen={locationCreateModalIsOpen}
                    setIsOpen={openOrCloseLocationCreateModal}
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

    return (
        <>
            <Header title="Tableau de bord" className={'mb-4'} />

            <div className={'pb-6'}>
                <div className={'flex flex-row flex-wrap gap-4 mb-4'}>
                    {cardStats.map((cardStat, index) => (
                        <SimpleCard
                            key={index}
                            className={'grow'}
                            name={cardStat.name}>
                            {cardStat.value}
                        </SimpleCard>
                    ))}
                </div>
                <div className={'grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4'}>
                    <SimpleCard
                        className={'col-span-1 lg:col-span-2'}
                        childrenClass={'h-[400px]'}
                        name={'Historique de la valeur totale'}>
                        <TotalValueHistory
                            totalValues={totalValueHistoryStats}
                        />
                    </SimpleCard>
                    <SimpleCard
                        className={'col-span-1'}
                        name={'Répartition'}
                        childrenClass={'h-[400px]'}>
                        <TreemapAllocation allocations={allocationStats} />
                    </SimpleCard>
                </div>
            </div>

            <div className={'pb-6'}>
                <div
                    className={
                        'flex flex-row items-center mb-2 justify-between'
                    }>
                    <h3 className={'font-semibold text-xl'}>Plateformes</h3>
                    <Button onClick={openOrCloseLocationCreateModal}>
                        + Ajouter
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    {locations.map((location, index) => (
                        <Location
                            key={index}
                            location={location}
                            color={locationColorMap[location.id]}
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
                title={'Supprimer la plateforme : ' + selectedLocation?.name}
                content={
                    'En supprimant une plateforme, les actifs associés seront supprimés et la plateforme sera retirée des transactions (mais les transactions ne seront pas supprimées)'
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
