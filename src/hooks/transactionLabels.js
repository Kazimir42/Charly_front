import axios from '@/lib/axios'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/lib/utils'

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
                toast.error(getErrorMessage(error))
                if (error.response.status !== 422) throw error
            })
    }

    return { getTransactionLabels }
}
