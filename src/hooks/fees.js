import axios from '@/lib/axios'
import { toast } from 'react-toastify'

export const useFeeData = () => {
    const getFees = async transactionId => {
        return axios
            .get('/api/transactions/' + transactionId + '/fees')
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                if (error.response.status !== 422) throw error
            })
    }

    const createFee = async (transactionId, data) => {
        return axios
            .post('/api/transactions/' + transactionId + '/fees', data)
            .then(response => {
                toast.success('Fee created successfully!')
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const updateFee = async (transactionId, id, data) => {
        return axios
            .put('/api/transactions/' + transactionId + '/fees/' + id, data)
            .then(response => {
                toast.success('Fee updated successfully!')
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const deleteFee = async (transactionId, id) => {
        return axios
            .delete('/api/transactions/' + transactionId + '/fees/' + id)
            .then(response => {
                toast.success('Fee deleted successfully!')
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    return { getFees, updateFee, deleteFee, createFee }
}
