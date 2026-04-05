import axios from '@/lib/axios'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/lib/utils'

export const useDashboardData = () => {
    const getDashboard = async () => {
        return axios
            .get('/api/dashboard')
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    return { getDashboard }
}
