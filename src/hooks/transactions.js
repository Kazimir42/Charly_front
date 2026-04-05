import axios from '@/lib/axios'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/lib/utils'

export const useTransactionData = () => {
    const getTransaction = async id => {
        return axios
            .get('/api/transactions/' + id)
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    const getTransactions = async params => {
        return axios
            .get('/api/transactions' + params)
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    const getMovementableTransactions = async params => {
        let stringedParams = ''
        if (params) {
            stringedParams = Object.entries(params).reduce((acc, param) => {
                acc += (acc.length ? '&' : '?') + param[0] + '=' + param[1]
                return acc
            }, '')
        }

        return axios
            .get('/api/transactions/movementables' + stringedParams)
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    const createTransaction = async data => {
        return axios
            .post('/api/transactions', data)
            .then(response => {
                toast.success('Transaction créée avec succès !')
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    const updateTransaction = async (id, data) => {
        return axios
            .put('/api/transactions/' + id, data)
            .then(response => {
                toast.success('Transaction mise à jour avec succès !')
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    const deleteTransaction = async id => {
        return axios
            .delete('/api/transactions/' + id)
            .then(response => {
                toast.success('Transaction supprimée avec succès !')
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    const simulateImport = async data => {
        return axios
            .post('/api/transactions/simulate-import', data)
            .then(response => {
                toast.success('Simulation réussie !')
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    const realImport = async data => {
        return axios
            .post('/api/transactions/import', data)
            .then(response => {
                toast.success('Import réussi !')
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    return {
        getTransaction,
        getTransactions,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        simulateImport,
        realImport,
        getMovementableTransactions,
    }
}
