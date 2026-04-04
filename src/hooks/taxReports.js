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
                throw error
            })
    }

    const createTaxReport = async data => {
        return axios
            .post('/api/tax-reports', data)
            .then(response => {
                toast.success('Rapport fiscal créé avec succès !')
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const updateTaxReport = async (year, data) => {
        return axios
            .put('/api/tax-reports/' + year, data)
            .then(response => {
                toast.success('Rapport fiscal mis à jour avec succès !')
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
                toast.success('Rapport fiscal supprimé avec succès !')
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const exportPdf = async year => {
        return axios
            .get('/api/tax-reports/' + year + '/export-pdf', {
                responseType: 'blob',
            })
            .then(response => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data]),
                )
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', 'rapport-fiscal-' + year + '.pdf')
                document.body.appendChild(link)
                link.click()
                link.remove()
                window.URL.revokeObjectURL(url)
            })
            .catch(error => {
                toast.error('Erreur lors du téléchargement du PDF')
                throw error
            })
    }

    const exportCsv = async year => {
        return axios
            .get('/api/tax-reports/' + year + '/export-csv', {
                responseType: 'blob',
            })
            .then(response => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data]),
                )
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', 'rapport-fiscal-' + year + '.csv')
                document.body.appendChild(link)
                link.click()
                link.remove()
                window.URL.revokeObjectURL(url)
            })
            .catch(error => {
                toast.error('Erreur lors du téléchargement du CSV')
                throw error
            })
    }

    return {
        getTaxReport,
        createTaxReport,
        updateTaxReport,
        deleteTaxReport,
        exportPdf,
        exportCsv,
    }
}
