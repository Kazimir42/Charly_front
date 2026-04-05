import axios from '@/lib/axios'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/lib/utils'

export const useMovementData = () => {
    const getMovements = async transactionId => {
        return axios
            .get('/api/transactions/' + transactionId + '/movements')
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                if (error.response.status !== 422) throw error
            })
    }

    const createMovement = async (transactionId, data) => {
        return axios
            .post('/api/transactions/' + transactionId + '/movements', data)
            .then(response => {
                toast.success('Mouvement créé avec succès !')
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    const updateMovement = async (transactionId, id, data) => {
        return axios
            .put(
                '/api/transactions/' + transactionId + '/movements/' + id,
                data,
            )
            .then(response => {
                toast.success('Mouvement mis à jour avec succès !')
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    const deleteMovement = async (transactionId, id) => {
        return axios
            .delete('/api/transactions/' + transactionId + '/movements/' + id)
            .then(response => {
                toast.success('Mouvement supprimé avec succès !')
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    return { getMovements, updateMovement, deleteMovement, createMovement }
}
