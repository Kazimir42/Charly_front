import axios from '@/lib/axios'
import { toast } from 'react-toastify'

export const useTransactionLabelData = () => {
    const getTransactionLabels = async params => {
        let stringedParams = ''
        if (params) {
            stringedParams = Object.entries(params).reduce((acc, param) => {
                acc += (acc.length ? '&' : '?') + param[0] + '=' + param[1]
                return acc
            }, '')
        }
        return axios
            .get('/api/transaction-labels' + stringedParams)
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                if (error.response.status !== 422) throw error
            })
    }

    return { getTransactionLabels }
}
