import axios from '@/lib/axios'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/lib/utils'

export const useAssetData = () => {
    const getAssets = async () => {
        return axios
            .get('/api/assets')
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                if (error.response.status !== 422) throw error
            })
    }

    const getAsset = async id => {
        return axios
            .get('/api/assets/' + id)
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                if (error.response.status !== 422) throw error
            })
    }

    const getAssetFlow = async code => {
        return axios
            .get('/api/assets/' + code + '/flow')
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                if (error.response.status !== 422) throw error
            })
    }

    return { getAssets, getAsset, getAssetFlow }
}
