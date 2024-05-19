import axios from '@/lib/axios'
import { toast } from 'react-toastify'

export const useTransactionData = () => {
    const getTransactions = async params => {
        return axios
            .get('/api/transactions' + params)
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const getMovementableTransactions = async (id, params) => {
        return axios
            .get('/api/transactions/' + id + '/movementables' + params)
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const createTransaction = async data => {
        return axios
            .post('/api/transactions', data)
            .then(response => {
                toast.success('Transaction created successfully!')
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const updateTransaction = async (id, data) => {
        return axios
            .put('/api/transactions/' + id, data)
            .then(response => {
                toast.success('Transaction updated successfully!')
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const deleteTransaction = async id => {
        return axios
            .delete('/api/transactions/' + id)
            .then(response => {
                toast.success('Transaction deleted successfully!')
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    return {
        getTransactions,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        getMovementableTransactions,
    }
}
