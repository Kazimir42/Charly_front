'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                    Connexion
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Accédez à votre espace de gestion
                </p>
            </div>

            <AuthSessionStatus className="mb-4" status={status} />

            <form onSubmit={submitForm} className="space-y-4">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        placeholder="vous@exemple.com"
                        className="block mt-1.5 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />
                    <InputError messages={errors.email} className="mt-1.5" />
                </div>

                <div>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        className="block mt-1.5 w-full"
                        onChange={event => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"
                    />
                    <InputError messages={errors.password} className="mt-1.5" />
                </div>

                <div className="flex items-center justify-between">
                    <label
                        htmlFor="remember_me"
                        className="inline-flex items-center">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            className="rounded border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            onChange={event =>
                                setShouldRemember(event.target.checked)
                            }
                        />
                        <span className="ml-2 text-sm text-slate-500">
                            Se souvenir de moi
                        </span>
                    </label>
                    <Link
                        href="/forgot-password"
                        className="text-sm text-blue-500 hover:text-blue-600">
                        Mot de passe oublié ?
                    </Link>
                </div>

                <Button className="w-full mt-2">Connexion</Button>

                <p className="text-center text-sm text-slate-500">
                    Pas encore de compte ?{' '}
                    <Link
                        href="/register"
                        className="text-blue-500 hover:text-blue-600 font-medium">
                        Créer un compte
                    </Link>
                </p>
            </form>
        </>
    )
}

export default Login
