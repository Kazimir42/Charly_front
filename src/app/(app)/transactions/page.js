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

const Transactions = () => {
    const { user } = useAuth({ middleware: 'auth' })

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
    const [formattedTransactions, setFormattedTransactions] = useState([])
    const [selectedTransaction, setSelectedTransaction] = useState(null)

    useEffect(() => {
        refreshTransactions()
    }, [])

    function refreshTransactions() {
        getTransactions().then(data => {
            if (data) {
                setTransactions(data)
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
            currencyIn.symbol = line.to_currency.symbol
            currencyIn.quantity = line.to_quantity
            currencyOut.symbol = line.from_currency.symbol
            currencyOut.quantity = line.from_quantity

            return [
                formatDate(line.date, true, 'fr-FR'),
                <TransactionTypeBubble type={line.type} />,
                <CurrencyOut
                    symbol={currencyOut.symbol}
                    quantity={currencyOut.quantity}
                />,
                <CurrencyIn
                    symbol={currencyIn.symbol}
                    quantity={currencyIn.quantity}
                />,
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

    return (
        <>
            <Header title="Transactions" className={'mb-12'} />

            <div className={'pb-6'}>
                <div
                    className={
                        'flex flex-row items-center mb-2 justify-between'
                    }>
                    <h3 className={'font-semibold text-xl'}>List</h3>
                    <Button onClick={openOrCloseTransactionCreateModal}>
                        + Add new
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    <Table
                        header={[
                            'Date',
                            'Type',
                            'Asset Out',
                            'Asset In',
                            'Price',
                            'Unit price',
                            'Location',
                            '',
                        ]}
                        content={formattedTransactions}
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
