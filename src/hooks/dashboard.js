import axios from '@/lib/axios'

export const useDashboardData = () => {
    const getDashboard = async (setErrors, setStatus) => {
        setErrors([])
        setStatus(null)

        return axios
            .get('/api/dashboard')
            .then(response => {
                return response.data
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    return { getDashboard }
}
