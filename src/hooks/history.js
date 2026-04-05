import axios from '@/lib/axios'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/lib/utils'

export const useHistoryData = () => {
    const getHistory = async () => {
        return axios
            .get('/api/history')
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    return { getHistory }
}
