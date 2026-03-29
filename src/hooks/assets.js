import axios from '@/lib/axios'
import { toast } from 'react-toastify'

export const useAssetData = () => {
    const getAssets = async () => {
        return axios
            .get('/api/assets')
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
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
                toast.error(error.response.data.message)
                if (error.response.status !== 422) throw error
            })
    }

    return { getAssets, getAsset }
}
