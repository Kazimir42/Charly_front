import axios from '@/lib/axios'
import { toast } from 'react-toastify'

export const useTaxReportData = () => {
    const getTaxReport = async year => {
        return axios
            .get('/api/tax-reports/' + year)
            .then(response => {
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const createTaxReport = async data => {
        return axios
            .post('/api/tax-reports', data)
            .then(response => {
                toast.success('Tax report created successfully!')
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const updateTaReport = async (year, data) => {
        return axios
            .put('/api/tax-reports/' + year, data)
            .then(response => {
                toast.success('Tax report updated successfully!')
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const deleteTaxReport = async year => {
        return axios
            .delete('/api/tax-reports/' + year)
            .then(response => {
                toast.success('Tax report deleted successfully!')
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    return { getTaxReport, createTaxReport, updateTaReport, deleteTaxReport }
}
