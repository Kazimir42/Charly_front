import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ ...props }) => {
        await csrf()

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const login = async ({ ...props }) => {
        await csrf()

        axios
            .post('/login', props)
            .then(() => {
                toast.success('gm')
                mutate()
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const forgotPassword = async ({ email }) => {
        await csrf()

        axios
            .post('/forgot-password', { email })
            .then(response => {
                toast.success(response.data.status)
                return response.data
            })
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const resetPassword = async ({ ...props }) => {
        await csrf()

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                toast.error(error.response.data.message)
                throw error
            })
    }

    const resendEmailVerification = () => {
        axios.post('/email/verification-notification').then(response => {
            toast.success(response.data.status)
            return response.data
        })
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
