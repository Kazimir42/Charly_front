'use client'

import React, {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    forwardRef,
    useCallback,
} from 'react'
import { useAssetData } from '@/hooks/assets'
import Loading from '@/app/(app)/Loading'
import TransactionTypeBubble from '@/components/TransactionTypeBubble'
import CurrencyIn from '@/components/CurrencyIn'
import CurrencyOut from '@/components/CurrencyOut'
import { formatDate } from '@/lib/utils'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

const FlowCard = forwardRef(
    ({ transaction, side, movementableQuantity }, ref) => {
        const isAcquisition = side === 'left'
        const borderColor = isAcquisition
            ? 'border-green-300'
            : 'border-red-300'
        const bgColor = isAcquisition ? 'bg-green-50/50' : 'bg-red-50/50'

        const toQuantity = parseFloat(transaction.to_quantity || 0)
        const usedQuantity = isAcquisition
            ? toQuantity - parseFloat(movementableQuantity || 0)
            : 0
        const progressPercent =
            isAcquisition && toQuantity > 0
                ? Math.min(100, ((usedQuantity / toQuantity) * 100).toFixed(1))
                : 0

        const counterCurrency = isAcquisition
            ? transaction.from_currency
            : transaction.to_currency
        const counterQuantity = isAcquisition
            ? transaction.from_quantity
            : transaction.to_quantity

        return (
            <div
                ref={ref}
                className={`rounded-xl border ${borderColor} ${bgColor} p-3 flex flex-col gap-1.5`}>
                <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-500">
                        {formatDate(transaction.date, true, 'fr-FR')}
                    </span>
                    <TransactionTypeBubble
                        type={transaction.type}
                        label={transaction.label}
                    />
                </div>

                <div>
                    {isAcquisition ? (
                        <CurrencyIn
                            symbol={transaction.to_currency?.symbol}
                            quantity={transaction.to_quantity}
                        />
                    ) : (
                        <CurrencyOut
                            symbol={transaction.from_currency?.symbol}
                            quantity={transaction.from_quantity}
                        />
                    )}
                </div>

                {counterCurrency && (
                    <p className="text-xs text-slate-500">
                        pour {counterQuantity} {counterCurrency.symbol}
                    </p>
                )}

                {transaction.location && (
                    <p className="text-xs text-slate-400">
                        {transaction.location.name}
                    </p>
                )}

                {isAcquisition && (
                    <div className="mt-1">
                        <div className="flex justify-between text-xs text-slate-500 mb-0.5">
                            <span>
                                Utilisé :{' '}
                                {parseFloat(usedQuantity).toLocaleString(
                                    undefined,
                                    {
                                        maximumFractionDigits: 8,
                                    },
                                )}
                            </span>
                            <span>
                                Dispo :{' '}
                                {parseFloat(
                                    movementableQuantity,
                                ).toLocaleString(undefined, {
                                    maximumFractionDigits: 8,
                                })}
                            </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-green-500 transition-all"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    },
)

FlowCard.displayName = 'FlowCard'

const CryptoFlowChart = ({ code }) => {
    const { getAssetFlow } = useAssetData()
    const [flowData, setFlowData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [curves, setCurves] = useState([])

    const containerRef = useRef(null)
    const acquisitionRefs = useRef({})
    const dispositionRefs = useRef({})

    useEffect(() => {
        getAssetFlow(code).then(data => {
            setFlowData(data)
            setIsLoading(false)
        })
    }, [code])

    const computeCurves = useCallback(() => {
        if (!flowData || !containerRef.current) return

        const containerRect = containerRef.current.getBoundingClientRect()
        const newCurves = []

        flowData.acquisitions.forEach(acq => {
            if (!acq.from_movements) return

            acq.from_movements.forEach(movement => {
                const sourceRef = acquisitionRefs.current[acq.id]
                const targetRef =
                    dispositionRefs.current[movement.to_transaction_id]

                if (!sourceRef || !targetRef) return

                const sourceRect = sourceRef.getBoundingClientRect()
                const targetRect = targetRef.getBoundingClientRect()

                const x1 = sourceRect.right - containerRect.left
                const y1 =
                    sourceRect.top + sourceRect.height / 2 - containerRect.top
                const x2 = targetRect.left - containerRect.left
                const y2 =
                    targetRect.top + targetRect.height / 2 - containerRect.top

                const cx = (x1 + x2) / 2

                newCurves.push({
                    key: `${acq.id}-${movement.id}`,
                    x1,
                    y1,
                    x2,
                    y2,
                    cx,
                    quantity: movement.quantity,
                    currencySymbol: flowData.currency?.symbol,
                })
            })
        })

        setCurves(newCurves)
    }, [flowData])

    useLayoutEffect(() => {
        computeCurves()
    }, [flowData, computeCurves])

    useEffect(() => {
        if (!containerRef.current) return
        const observer = new ResizeObserver(() => {
            computeCurves()
        })
        observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [computeCurves])

    if (isLoading) {
        return <Loading fullHeight={false} />
    }

    if (
        !flowData ||
        (!flowData.acquisitions.length && !flowData.dispositions.length)
    ) {
        return (
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-6">
                <InformationCircleIcon className="h-5 w-5 shrink-0 text-slate-400" />
                <p className="text-sm text-slate-500">
                    Aucune transaction trouvée pour cette crypto.
                </p>
            </div>
        )
    }

    return (
        <div ref={containerRef} className="relative">
            <div className="grid grid-cols-[1fr_120px_1fr] gap-y-3 items-start">
                {/* Header */}
                <div className="text-center">
                    <span className="text-xs font-medium uppercase tracking-wider text-green-600">
                        Acquisitions
                    </span>
                </div>
                <div />
                <div className="text-center">
                    <span className="text-xs font-medium uppercase tracking-wider text-red-600">
                        Dispositions
                    </span>
                </div>

                {/* Acquisitions column */}
                <div className="flex flex-col gap-3 pr-2">
                    {flowData.acquisitions.map(acq => (
                        <FlowCard
                            key={acq.id}
                            ref={el => {
                                acquisitionRefs.current[acq.id] = el
                            }}
                            transaction={acq}
                            side="left"
                            movementableQuantity={acq.movementable_quantity}
                        />
                    ))}
                </div>

                {/* Middle spacer */}
                <div />

                {/* Dispositions column */}
                <div className="flex flex-col gap-3 pl-2">
                    {flowData.dispositions.map(disp => (
                        <FlowCard
                            key={disp.id}
                            ref={el => {
                                dispositionRefs.current[disp.id] = el
                            }}
                            transaction={disp}
                            side="right"
                        />
                    ))}
                </div>
            </div>

            {/* SVG curves overlay */}
            {curves.length > 0 && (
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 10 }}>
                    {curves.map(curve => {
                        const midX = (curve.x1 + curve.x2) / 2
                        const midY = (curve.y1 + curve.y2) / 2
                        const label = `${parseFloat(
                            curve.quantity,
                        ).toLocaleString(undefined, {
                            maximumFractionDigits: 8,
                        })} ${curve.currencySymbol}`

                        return (
                            <g key={curve.key}>
                                <path
                                    d={`M ${curve.x1},${curve.y1} C ${curve.cx},${curve.y1} ${curve.cx},${curve.y2} ${curve.x2},${curve.y2}`}
                                    fill="none"
                                    stroke="#94a3b8"
                                    strokeWidth="1.5"
                                    strokeOpacity="0.6"
                                />
                                <rect
                                    x={midX - 50}
                                    y={midY - 10}
                                    width={100}
                                    height={20}
                                    rx={4}
                                    fill="white"
                                    stroke="#e2e8f0"
                                    strokeWidth="1"
                                />
                                <text
                                    x={midX}
                                    y={midY + 4}
                                    textAnchor="middle"
                                    className="text-[10px] fill-slate-600">
                                    {label}
                                </text>
                            </g>
                        )
                    })}
                </svg>
            )}
        </div>
    )
}

export default CryptoFlowChart
