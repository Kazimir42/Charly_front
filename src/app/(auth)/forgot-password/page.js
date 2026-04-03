'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const Page = () => {
    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus })
    }

    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                    Mot de passe oublié
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Indiquez votre adresse email et nous vous enverrons un lien
                    de réinitialisation.
                </p>
            </div>

            <AuthSessionStatus className="mb-4" status={status} />

            <form onSubmit={submitForm} className="space-y-4">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="vous@exemple.com"
                        className="block mt-1.5 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />
                    <InputError messages={errors.email} className="mt-1.5" />
                </div>

                <Button className="w-full">
                    Envoyer le lien de réinitialisation
                </Button>

                <p className="text-center text-sm text-slate-500">
                    <Link
                        href="/login"
                        className="text-blue-500 hover:text-blue-600 font-medium">
                        Retour à la connexion
                    </Link>
                </p>
            </form>
        </>
    )
}

export default Page
