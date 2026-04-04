import axios from '@/lib/axios'
import { toast } from 'react-toastify'

export const useUserData = () => {
    const updateUser = async (id, data) => {
        return axios
            .put('/api/users/' + id, data)
            .then(response => {
                toast.success('User updated successfully!')
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
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
                toast.error(error.response.data.message)
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
                toast.error(error.response.data.message)
                throw error
            })
    }

    return { updateUser, changePassword, deleteUser }
}
