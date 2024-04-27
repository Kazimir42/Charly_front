import axios from '@/lib/axios'
import { toast } from 'react-toastify'

export const useCountryData = () => {
    const getCountries = async () => {
        return axios
            .get('/api/countries')
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                if (error.response.status !== 422) throw error
            })
    }

    return { getCountries }
}
