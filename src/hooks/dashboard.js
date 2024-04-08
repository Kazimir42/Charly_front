import axios from '@/lib/axios'
import { toast } from 'react-toastify'

export const useDashboardData = () => {
    const getDashboard = async () => {
        return axios
            .get('/api/dashboard')
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    return { getDashboard }
}
