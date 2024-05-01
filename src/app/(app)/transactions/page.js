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
import {
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/hooks/auth'
import CurrencyIn from '@/components/CurrencyIn'
import CurrencyOut from '@/components/CurrencyOut'
import { useRouter, useSearchParams } from 'next/navigation'
import {
    ArrowRightIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from '@heroicons/react/16/solid'
import Input from '@/components/Input'
import { Select } from '@/components/Select'
import { TransactionType } from '@/enums/TransactionType'
import { useCurrencyData } from '@/hooks/currencies'
import { useLocationData } from '@/hooks/locations'

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

    const [formData, setFormData] = useState({
        searchFromDate: searchParams.get('searchFromDate'),
        searchToDate: searchParams.get('searchToDate'),
        searchType: searchParams.get('searchType'),
        searchFromAsset: searchParams.get('searchFromAsset'),
        searchToAsset: searchParams.get('searchToAsset'),
        searchTotalPrice: searchParams.get('searchTotalPrice'),
        searchUnitPrice: searchParams.get('searchUnitPrice'),
        searchLocation: searchParams.get('searchLocation'),
        page: searchParams.get('page'),
        orderBy: searchParams.get('orderBy'),
        orderDirection: searchParams.get('orderDirection'),
    })

    useEffect(() => {
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
                <TransactionTypeBubble type={line.type} />,
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
                <div className="flex flex-row gap-2 justify-end">
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

    function OrderIndicator({ field }) {
        if (formData.orderBy === field) {
            return formData.orderDirection === 'desc' ? (
                <ChevronDownIcon className={'h-4 w-4'} />
            ) : (
                <ChevronUpIcon className={'h-4 w-4'} />
            )
        }
        return null
    }

    function HeaderTitle({ title, name, className }) {
        return (
            <button
                key={name}
                onClick={() => submitFormWithOrder(name)}
                className={
                    'flex flex-row gap-1 items-center hover:font-bold  ' +
                    className
                }>
                {title}
                <OrderIndicator field={name} />
            </button>
        )
    }

    const handleFilterChange = e => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    function submitFormWithOrder(name) {
        formData.orderBy = name

        if (formData.orderDirection) {
            if (formData.orderDirection === 'asc') {
                formData.orderDirection = 'desc'
            } else {
                formData.orderDirection = 'asc'
            }
        } else {
            formData.orderDirection = 'desc'
        }

        submitForm()
    }

    function submitForm(e = null) {
        if (e) {
            e.preventDefault()
        }

        const queryParams = new URLSearchParams()

        for (const key in formData) {
            if (formData[key]) {
                queryParams.append(key, formData[key])
            }
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
                        header={[
                            <HeaderTitle
                                key={'date'}
                                title={'Date'}
                                name={'date'}
                            />,
                            <HeaderTitle
                                key={'type'}
                                title={'Type'}
                                name={'type'}
                            />,
                            <HeaderTitle
                                key={'from_quantity'}
                                title={'Asset Out'}
                                name={'from_quantity'}
                                className={'ml-auto'}
                            />,
                            <HeaderTitle
                                key={'to_quantity'}
                                title={'Asset In'}
                                name={'to_quantity'}
                            />,
                            <HeaderTitle
                                key={'total_price'}
                                title={'Price'}
                                name={'total_price'}
                            />,
                            <HeaderTitle
                                key={'unit_price'}
                                title={'Unit price'}
                                name={'unit_price'}
                            />,
                            <HeaderTitle
                                key={'location_id'}
                                title={'Location price'}
                                name={'location_id'}
                            />,
                            '',
                        ]}
                        filter={[
                            <div
                                className={
                                    'flex flex-row gap-1 w-fit items-center'
                                }>
                                <Input
                                    form={'filterForm'}
                                    type={'datetime-local'}
                                    className={'text-sm p-1.5 w-28'}
                                    name={'searchFromDate'}
                                    value={formData.searchFromDate}
                                    onChange={handleFilterChange}
                                />
                                <ArrowRightIcon className={'h-4 w-4'} />
                                <Input
                                    form={'filterForm'}
                                    type={'datetime-local'}
                                    className={'text-sm p-1.5 w-28'}
                                    name={'searchToDate'}
                                    value={formData.searchToDate}
                                    onChange={handleFilterChange}
                                />
                            </div>,
                            <Select
                                form={'filterForm'}
                                className={'text-sm py-1.5'}
                                name={'searchType'}
                                value={formData.searchType}
                                onChange={handleFilterChange}
                                items={{
                                    '': '',
                                    BUY: TransactionType.BUY,
                                    SELL: TransactionType.SELL,
                                    RECEIVE: TransactionType.RECEIVE,
                                    SEND: TransactionType.SEND,
                                    SWAP: TransactionType.SWAP,
                                }}></Select>,
                            <Select
                                form={'filterForm'}
                                className={
                                    'text-sm py-1.5 flex flex-row ml-auto'
                                }
                                name={'searchFromAsset'}
                                value={formData.searchFromAsset}
                                onChange={handleFilterChange}
                                items={currencies?.reduce(
                                    (accumulator, currency) => {
                                        accumulator[currency.id] = currency.name
                                        return accumulator
                                    },
                                    { '': '' },
                                )}></Select>,
                            <Select
                                form={'filterForm'}
                                className={'text-sm py-1.5'}
                                name={'searchToAsset'}
                                value={formData.searchToAsset}
                                onChange={handleFilterChange}
                                items={currencies?.reduce(
                                    (accumulator, currency) => {
                                        accumulator[currency.id] = currency.name
                                        return accumulator
                                    },
                                    { '': '' },
                                )}></Select>,
                            <Input
                                form={'filterForm'}
                                type={'number'}
                                className={'text-sm p-1.5'}
                                name={'searchTotalPrice'}
                                value={formData.searchTotalPrice}
                                onChange={handleFilterChange}
                            />,
                            <Input
                                form={'filterForm'}
                                type={'number'}
                                className={'text-sm p-1.5'}
                                name={'searchUnitPrice'}
                                value={formData.searchUnitPrice}
                                onChange={handleFilterChange}
                            />,
                            <Select
                                form={'filterForm'}
                                className={'text-sm py-1.5'}
                                name={'searchLocation'}
                                value={formData.searchLocation}
                                onChange={handleFilterChange}
                                items={locations?.reduce(
                                    (accumulator, location) => {
                                        accumulator[location.id] = location.name
                                        return accumulator
                                    },
                                    { '': '' },
                                )}></Select>,
                            <form
                                id={'filterForm'}
                                className={'flex flex-row justify-end'}
                                onSubmit={submitForm}>
                                <button
                                    type={'submit'}
                                    className="hover:text-gray-700 text-gray-500 p-1 duration-100 transition">
                                    <MagnifyingGlassIcon className="h-6 w-6" />
                                </button>
                            </form>,
                        ]}
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
