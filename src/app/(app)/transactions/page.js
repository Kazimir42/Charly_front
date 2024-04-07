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
            if (data) {
                setTransactions(data || [])
            }
        })
    }, [])

    return (
        <>
            <Header title="Transactions" className={'mb-12'} />

            <div className={'pb-6'}>
                <h3 className={'font-semibold text-xl mb-2'}>List</h3>
                <div className="flex flex-col gap-2">
                    <Table header={['test', '123']} content={transactions} />
                </div>
            </div>
        </>
    )
}

export default Transactions
