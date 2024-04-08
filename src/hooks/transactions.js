import axios from '@/lib/axios'
import { toast } from 'react-toastify'

export const useTransactionData = () => {
    const getTransactions = async (setErrors, setStatus) => {
        setErrors([])
        setStatus(null)

        return axios
            .get('/api/transactions')
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    return { getTransactions }
}
