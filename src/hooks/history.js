import axios from '@/lib/axios'
import { toast } from 'react-toastify'

export const useHistoryData = () => {
    const getHistory = async () => {
        return axios
            .get('/api/history')
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    return { getHistory }
}
