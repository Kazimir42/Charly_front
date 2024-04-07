'use client'

import Header from '@/app/(app)/Header'
import { useDashboardData } from '@/hooks/dashboard'
import { useEffect, useState } from 'react'
import Location from '@/app/(app)/Location'
import SimpleCard from '@/components/SimpleCard'
import { useTransactionData } from '@/hooks/transactions'
import Table from '@/components/Table'

const Transactions = () => {
    const { getTransactions } = useTransactionData()

    const [, setErrors] = useState([])
    const [, setStatus] = useState(null)
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        getTransactions(setErrors, setStatus).then(data => {
            console.log(data)
            if (data) {
                let formatedData = []

                data.forEach(line => {
                    formatedData.push([
                        line.date_transaction,
                        line.type,
                        line.asset.currency.name,
                        line.to_quantity,
                        line.transaction_price,
                        line.to_unit_price,
                        line.location.name,
                    ])
                })

                setTransactions(formatedData || [])
            }
        })
    }, [])

    return (
        <>
            <Header title="Transactions" className={'mb-12'} />

            <div className={'pb-6'}>
                <h3 className={'font-semibold text-xl mb-2'}>List</h3>
                <div className="flex flex-col gap-2">
                    <Table header={['Date', 'Type', 'Asset', 'Quantity', 'Price', 'Unit price', 'Location']} content={transactions} />
                </div>
            </div>
        </>
    )
}

export default Transactions
