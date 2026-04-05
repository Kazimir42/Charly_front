import axios from '@/lib/axios'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/lib/utils'

export const useUserData = () => {
    const updateUser = async (id, data) => {
        return axios
            .put('/api/users/' + id, data)
            .then(response => {
                toast.success('Profil mis à jour avec succès !')
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    const changePassword = async data => {
        return axios
            .put('/api/user/password', data)
            .then(response => {
                toast.success(response.data.message)
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    const deleteUser = async (id, data) => {
        return axios
            .delete('/api/users/' + id, { data })
            .then(response => {
                toast.success(response.data.message)
                return response.data
            })
            .catch(error => {
                toast.error(getErrorMessage(error))
                throw error
            })
    }

    return { updateUser, changePassword, deleteUser }
}
