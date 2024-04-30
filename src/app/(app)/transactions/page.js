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
    ArrowDownIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/hooks/auth'
import CurrencyIn from '@/components/CurrencyIn'
import CurrencyOut from '@/components/CurrencyOut'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'

const Transactions = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const searchParams = useSearchParams()

    const {
        getTransactions,
        createTransaction,
        updateTransaction,
        deleteTransaction,
    } = useTransactionData()

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

    useEffect(() => {
        refreshTransactions()
    }, [
        searchParams.get('page'),
        searchParams.get('orderBy'),
        searchParams.get('orderDirection'),
    ])

    function refreshTransactions() {
        let params = searchParams.size ? '?' + searchParams.toString() : ''
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
                })
            }
        })
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

    function getOrderByLink(column) {
        let pathname = window.location.pathname
        let query = ''

        query += '?page=' + (searchParams.get('page') ?? 1)

        if (searchParams.get('orderDirection')) {
            if (searchParams.get('orderDirection') === 'asc') {
                query += '&orderDirection=desc'
            } else {
                query += '&orderDirection=asc'
            }
        } else {
            query += '&orderDirection=desc'
        }

        query += '&orderBy=' + column

        return pathname + query
    }

    function OrderIndicator({ field }) {
        let orderBy = searchParams.get('orderBy')
        let orderDirection = searchParams.get('orderDirection')

        if (orderBy === field) {
            return orderDirection === 'desc' ? (
                <ChevronDownIcon className={'h-4 w-4'} />
            ) : (
                <ChevronUpIcon className={'h-4 w-4'} />
            )
        }
        return null
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
                            <Link
                                key={'date'}
                                href={getOrderByLink('date')}
                                className={
                                    'flex flex-row gap-1 items-center hover:font-bold'
                                }>
                                Date
                                <OrderIndicator field="date" />
                            </Link>,
                            <Link
                                key={'type'}
                                href={getOrderByLink('type')}
                                className={
                                    'flex flex-row gap-1 items-center hover:font-bold'
                                }>
                                Type
                                <OrderIndicator field="type" />
                            </Link>,
                            <Link
                                key={'from_quantity'}
                                href={getOrderByLink('from_quantity')}
                                className={
                                    'text-right justify-end flex flex-row gap-1 items-center hover:font-bold'
                                }>
                                Asset Out
                                <OrderIndicator field="from_quantity" />
                            </Link>,
                            <Link
                                key={'to_quantity'}
                                href={getOrderByLink('to_quantity')}
                                className={
                                    'flex flex-row gap-1 items-center hover:font-bold'
                                }>
                                Asset In
                                <OrderIndicator field="to_quantity" />
                            </Link>,
                            <Link
                                key={'total_price'}
                                href={getOrderByLink('total_price')}
                                className={
                                    'flex flex-row gap-1 items-center hover:font-bold'
                                }>
                                Price
                                <OrderIndicator field="total_price" />
                            </Link>,
                            <Link
                                key={'unit_price'}
                                href={getOrderByLink('unit_price')}
                                className={
                                    'flex flex-row gap-1 items-center hover:font-bold'
                                }>
                                Unit price
                                <OrderIndicator field="unit_price" />
                            </Link>,
                            <Link
                                key={'location_id'}
                                href={getOrderByLink('location_id')}
                                className={
                                    'flex flex-row gap-1 items-center hover:font-bold'
                                }>
                                Location
                                <OrderIndicator field="location_id" />
                            </Link>,
                            '',
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
