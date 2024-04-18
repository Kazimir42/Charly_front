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
import { formatPrice } from '@/lib/utils'
import { TransactionType } from '@/enums/TransactionType'
import CurrencyBubble from '@/components/CurrencyBubble'
import { PencilIcon } from '@heroicons/react/24/outline'

const Transactions = () => {
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
    const [selectedTransaction, setSelectedTransaction] = useState({})

    useEffect(() => {
        refreshTransactions()
    }, [])

    function refreshTransactions() {
        getTransactions().then(data => {
            if (data) {
                let formatedData = []

                data.forEach(line => {
                    let quantity = 0
                    if (line.type === TransactionType.BUY) {
                        quantity = line.to_quantity
                    } else if (line.type === TransactionType.SELL) {
                        quantity = line.from_quantity
                    }

                    formatedData.push([
                        line.date,
                        <TransactionTypeBubble type={line.type} />,
                        <CurrencyBubble
                            symbol={line.asset.currency.symbol}
                            name={line.asset.currency.name}
                        />,
                        quantity,
                        formatPrice(line.total_price),
                        formatPrice(line.unit_price),
                        line.location.name,
                        <button>
                            <PencilIcon className={'h-5 w-5'} />
                        </button>,
                    ])
                })

                setTransactions(formatedData || [])
            }
        })
    }

    function openOrCloseTransactionCreateModal(transactionId = null) {
        if (transactionCreateModalIsOpen) {
            setSelectedTransaction({})
            setTransactionCreateModalIsOpen(!transactionCreateModalIsOpen)
        } else {
            // Find the selected transaction
            setSelectedTransaction(
                transactions.find(
                    transaction => transaction.id === transactionId,
                ),
            )
            setTransactionCreateModalIsOpen(!transactionCreateModalIsOpen)
        }
    }

    function openOrCloseTransactionEditModal(transactionId = null) {
        if (transactionEditModalIsOpen) {
            setSelectedTransaction({})
            setTransactionEditModalIsOpen(!transactionEditModalIsOpen)
        } else {
            // Find the selected transaction
            setSelectedTransaction(
                transactions.find(
                    transaction => transaction.id === transactionId,
                ),
            )
            setTransactionEditModalIsOpen(!transactionEditModalIsOpen)
        }
    }

    function openOrCloseTransactionDeleteModal(transactionId = null) {
        if (transactionDeleteModalIsOpen) {
            setSelectedTransaction({})
            setTransactionDeleteModalIsOpen(!transactionDeleteModalIsOpen)
        } else {
            // Find the selected transaction
            setSelectedTransaction(
                transactions.find(
                    transaction => transaction.id === transactionId,
                ),
            )
            setTransactionDeleteModalIsOpen(!transactionDeleteModalIsOpen)
        }
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
                            'Asset',
                            'Quantity',
                            'Price',
                            'Unit price',
                            'Location',
                        ]}
                        content={transactions}
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
                title={'Delete transaction: ' + selectedTransaction?.name}
                content={'Care : you cannot restore it'}
            />
        </>
    )
}

export default Transactions
