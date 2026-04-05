import axios from '@/lib/axios'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/lib/utils'

export const useLocationData = () => {
    const getLocations = async () => {
        return axios
            .get('/api/locations')
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                if (error.response.status !== 422) throw error
            })
    }

    const createLocation = async data => {
        return axios
            .post('/api/locations', data)
            .then(response => {
                toast.success('Compte créé avec succès !')
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    const updateLocation = async (id, data) => {
        return axios
            .put('/api/locations/' + id, data)
            .then(response => {
                toast.success('Compte mis à jour avec succès !')
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    const deleteLocation = async id => {
        return axios
            .delete('/api/locations/' + id)
            .then(response => {
                toast.success('Compte supprimé avec succès !')
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    return { getLocations, updateLocation, deleteLocation, createLocation }
}
