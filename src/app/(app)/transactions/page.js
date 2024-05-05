'use client'

import Header from '@/app/(app)/Header'
import { useEffect, useState } from 'react'
import { useTransactionData } from '@/hooks/transactions'
import Table from '@/components/Table'
import Button from '@/components/Button'
import CreateTransactionModal from '@/app/modals/CreateTransactionModal'
import DeleteModal from '@/app/modals/DeleteModal'
import EditTransactionModal from '@/app/modals/EditTransactionModal'
import TransactionTypeBubble from '@/components/TransactionTypeBubble'
import { formatDate, formatPrice } from '@/lib/utils'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/hooks/auth'
import CurrencyIn from '@/components/CurrencyIn'
import CurrencyOut from '@/components/CurrencyOut'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCurrencyData } from '@/hooks/currencies'
import { useLocationData } from '@/hooks/locations'
import TransactionLabelBubble from '@/components/TransactionLabelBubble'
import TransactionTableHeader from '@/app/(app)/TransactionTableHeader'

const Transactions = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const searchParams = useSearchParams()
    const router = useRouter()

    const {
        getTransactions,
        createTransaction,
        updateTransaction,
        deleteTransaction,
    } = useTransactionData()

    const { getCurrencies } = useCurrencyData()

    const { getLocations } = useLocationData()

    const [
        transactionCreateModalIsOpen,
        setTransactionCreateModalIsOpen,
    ] = useState(false)
    const [
        transactionEditModalIsOpen,
        setTransactionEditModalIsOpen,
    ] = useState(false)
    const [
        transactionDeleteModalIsOpen,
        setTransactionDeleteModalIsOpen,
    ] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [paginationData, setPaginationData] = useState(null)
    const [formattedTransactions, setFormattedTransactions] = useState([])
    const [selectedTransaction, setSelectedTransaction] = useState(null)
    const [currencies, setCurrencies] = useState([])
    const [locations, setLocations] = useState([])

    // Query params
    const [searchFromDate, setSearchFromDate] = useState('')
    const [searchToDate, setSearchToDate] = useState('')
    const [searchType, setSearchType] = useState('')
    const [searchFromAsset, setSearchFromAsset] = useState('')
    const [searchToAsset, setSearchToAsset] = useState('')
    const [searchTotalPrice, setSearchTotalPrice] = useState('')
    const [searchUnitPrice, setSearchUnitPrice] = useState('')
    const [searchLocation, setSearchLocation] = useState('')
    const [page, setPage] = useState('')
    const [orderBy, setOrderBy] = useState('')
    const [orderDirection, setOrderDirection] = useState('')

    useEffect(() => {
        // Queries
        setSearchFromDate(searchParams.get('searchFromDate'))
        setSearchToDate(searchParams.get('searchToDate'))
        setSearchType(searchParams.get('searchType'))
        setSearchFromAsset(searchParams.get('searchFromAsset'))
        setSearchToAsset(searchParams.get('searchToAsset'))
        setSearchTotalPrice(searchParams.get('searchTotalPrice'))
        setSearchUnitPrice(searchParams.get('searchUnitPrice'))
        setSearchLocation(searchParams.get('searchLocation'))
        setPage(searchParams.get('page'))
        setOrderBy(searchParams.get('orderBy'))
        setOrderDirection(searchParams.get('orderDirection'))

        refreshTransactions()
    }, [searchParams.toString()])

    function refreshTransactions() {
        let params = searchParams.size ? '?' + searchParams.toString() : ''

        const paramsWithoutPage = new URLSearchParams(window.location.search)
        paramsWithoutPage.delete('page')

        getTransactions(params).then(data => {
            if (data) {
                setTransactions(data.data)
                setPaginationData({
                    current_page: data.current_page,
                    per_page: data.per_page,
                    last_page: data.last_page,
                    from: data.from,
                    to: data.to,
                    total: data.total,
                    links: data.links,
                    prev_page_url: data.prev_page_url,
                    next_page_url: data.next_page_url,
                    current_query: paramsWithoutPage.toString(),
                })
            }
        })
        getCurrencies().then(setCurrencies)
        getLocations().then(setLocations)
    }

    useEffect(() => {
        if (transactions) {
            formatTransactionData()
        }
    }, [transactions])

    function formatTransactionData() {
        const formattedData = transactions.map(line => {
            let currencyIn = {}
            let currencyOut = {}
            currencyIn.symbol = line.to_currency?.symbol ?? null
            currencyIn.quantity = line.to_quantity ?? 0
            currencyOut.symbol = line.from_currency?.symbol ?? null
            currencyOut.quantity = line.from_quantity ?? 0

            return [
                formatDate(line.date, true, 'fr-FR'),
                <div
                    key={'type'}
                    className={'flex flex-row gap-1 items-center'}>
                    <TransactionTypeBubble
                        type={line.type}
                        label={line?.label}
                    />
                </div>,
                currencyOut.symbol ? (
                    <CurrencyOut
                        className={'ml-auto'}
                        symbol={currencyOut.symbol}
                        quantity={currencyOut.quantity}
                    />
                ) : (
                    ''
                ),
                currencyIn.symbol ? (
                    <CurrencyIn
                        symbol={currencyIn.symbol}
                        quantity={currencyIn.quantity}
                    />
                ) : (
                    ''
                ),
                formatPrice(
                    line.total_price_per_fiat_currencies[user.currency_symbol],
                    user.currency_symbol,
                ),
                formatPrice(
                    line.unit_price_per_fiat_currencies[user.currency_symbol],
                    user.currency_symbol,
                ),
                line.location?.name ?? '',
                <div
                    key={'actions'}
                    className="flex flex-row gap-2 justify-end">
                    <button
                        onClick={() => openOrCloseTransactionEditModal(line.id)}
                        className="hover:text-gray-700 p-1 duration-100 transition">
                        <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() =>
                            openOrCloseTransactionDeleteModal(line.id)
                        }
                        className="hover:text-gray-700 p-1 duration-100 transition">
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>,
            ]
        })
        setFormattedTransactions(formattedData)
    }

    const openOrCloseTransactionCreateModal = () => {
        setTransactionCreateModalIsOpen(!transactionCreateModalIsOpen)
    }

    const openOrCloseTransactionEditModal = (transactionId = null) => {
        setSelectedTransaction(
            transactions.find(
                transaction => transaction.id === transactionId,
            ) || null,
        )
        setTransactionEditModalIsOpen(!transactionEditModalIsOpen)
    }

    const openOrCloseTransactionDeleteModal = transactionId => {
        setSelectedTransaction(
            transactions.find(
                transaction => transaction.id === transactionId,
            ) || null,
        )
        setTransactionDeleteModalIsOpen(!transactionDeleteModalIsOpen)
    }

    function _updateTransaction(id, data) {
        updateTransaction(id, data)
            .then(() => {
                refreshTransactions()
                openOrCloseTransactionEditModal()
            })
            .catch(() => {})
    }

    function _deleteTransaction(id) {
        deleteTransaction(id)
            .then(() => {
                refreshTransactions()
                openOrCloseTransactionDeleteModal()
            })
            .catch(() => {})
    }

    function _createTransaction(data) {
        createTransaction(data)
            .then(() => {
                refreshTransactions()
                openOrCloseTransactionCreateModal()
            })
            .catch(() => {})
    }

    function submitFormWithOrder(name) {
        let tempData = {
            orderBy: name,
        }

        setOrderBy(name)

        if (orderDirection) {
            if (orderDirection === 'asc') {
                setOrderDirection('desc')
                tempData.orderDirection = 'desc'
            } else {
                setOrderDirection('asc')
                tempData.orderDirection = 'asc'
            }
        } else {
            setOrderDirection('asc')
            tempData.orderDirection = 'asc'
        }

        submitForm(null, tempData)
    }

    function submitForm(e = null, tempData = {}) {
        if (e) {
            e.preventDefault()
        }

        const queryParams = new URLSearchParams()

        if (tempData?.orderBy || orderBy) {
            queryParams.append('orderBy', tempData?.orderBy ?? orderBy)
        }
        if (tempData?.orderDirection || orderDirection) {
            queryParams.append(
                'orderDirection',
                tempData?.orderDirection ?? orderDirection,
            )
        }
        if (searchFromDate) {
            queryParams.append('searchFromDate', searchFromDate)
        }
        if (searchToDate) {
            queryParams.append('searchToDate', searchToDate)
        }
        if (searchType) {
            queryParams.append('searchType', searchType)
        }
        if (searchFromAsset) {
            queryParams.append('searchFromAsset', searchFromAsset)
        }
        if (searchToAsset) {
            queryParams.append('searchToAsset', searchToAsset)
        }
        if (searchTotalPrice) {
            queryParams.append('searchTotalPrice', searchTotalPrice)
        }
        if (searchUnitPrice) {
            queryParams.append('searchUnitPrice', searchUnitPrice)
        }
        if (searchLocation) {
            queryParams.append('searchLocation', searchLocation)
        }

        router.push(`/transactions?${queryParams.toString()}`)
    }

    return (
        <>
            <div className={'flex flex-row items-center justify-between mb-4'}>
                <Header title="Transactions" />
                <Button onClick={openOrCloseTransactionCreateModal}>
                    + Add new
                </Button>
            </div>

            <div className={'pb-6'}>
                <div className="flex flex-col gap-2">
                    <Table
                        header={
                            <TransactionTableHeader
                                submitForm={submitForm}
                                submitFormWithOrder={submitFormWithOrder}
                                orderDirection={orderDirection}
                                setOrderDirection={setOrderDirection}
                                orderBy={orderBy}
                                setOrderBy={setOrderBy}
                                searchType={searchType}
                                setSearchType={setSearchType}
                                setSearchFromDate={setSearchFromDate}
                                searchFromDate={searchFromDate}
                                setSearchToDate={setSearchToDate}
                                searchToDate={searchToDate}
                                setSearchFromAsset={setSearchFromAsset}
                                searchFromAsset={searchFromAsset}
                                setSearchToAsset={setSearchToAsset}
                                searchToAsset={searchToAsset}
                                setSearchTotalPrice={setSearchTotalPrice}
                                searchTotalPrice={searchTotalPrice}
                                setSearchUnitPrice={setSearchUnitPrice}
                                searchUnitPrice={searchUnitPrice}
                                setSearchLocation={setSearchLocation}
                                searchLocation={searchLocation}
                                currencies={currencies}
                                locations={locations}
                            />
                        }
                        content={formattedTransactions}
                        paginationData={paginationData}
                    />
                </div>
            </div>

            <CreateTransactionModal
                createTransaction={_createTransaction}
                isOpen={transactionCreateModalIsOpen}
                setIsOpen={openOrCloseTransactionCreateModal}
            />

            <EditTransactionModal
                updateTransaction={_updateTransaction}
                isOpen={transactionEditModalIsOpen}
                setIsOpen={setTransactionEditModalIsOpen}
                transaction={selectedTransaction ?? null}
            />
            <DeleteModal
                id={selectedTransaction?.id ?? null}
                deleteObject={_deleteTransaction}
                isOpen={transactionDeleteModalIsOpen}
                setIsOpen={openOrCloseTransactionDeleteModal}
                title={'Delete transaction'}
                content={'Care, you cannot restore it'}
            />
        </>
    )
}

export default Transactions
