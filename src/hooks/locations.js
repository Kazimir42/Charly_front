import axios from '@/lib/axios'
import { toast } from 'react-toastify'

export const useLocationData = () => {
    const getLocations = async () => {
        return axios
            .get('/api/locations')
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                if (error.response.status !== 422) throw error
            })
    }

    const updateLocation = async (id, data) => {
        return axios
            .put('/api/locations/' + id, data)
            .then(response => {
                toast.success('Location updated successfully!')
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const deleteLocation = async (id) => {
        return axios
            .delete('/api/locations/' + id)
            .then(response => {
                toast.success('Location deleted successfully!')
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    return { getLocations, updateLocation, deleteLocation }
}
