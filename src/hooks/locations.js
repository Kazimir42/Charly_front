import axios from '@/lib/axios'

export const useLocationData = () => {
    const getLocations = async (setErrors, setStatus) => {
        setErrors([])
        setStatus(null)

        return axios
            .get('/api/locations')
            .then(response => {
                return response.data
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const updateLocation = async (id, data, setErrors, setStatus) => {
        setErrors([])
        setStatus(null)

        return axios
            .put('/api/locations/' + id, data)
            .then(response => {
                return response.data
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    return { getLocations, updateLocation }
}
