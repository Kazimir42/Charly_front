'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const PasswordReset = () => {
    const searchParams = useSearchParams()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        setEmail(searchParams.get('email'))
    }, [searchParams.get('email')])

    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                    Nouveau mot de passe
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Choisissez un nouveau mot de passe pour votre compte
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
                    />
                    <InputError messages={errors.password} className="mt-1.5" />
                </div>

                <div>
                    <Label htmlFor="passwordConfirmation">
                        Confirmer le mot de passe
                    </Label>
                    <Input
                        id="passwordConfirmation"
                        type="password"
                        value={passwordConfirmation}
                        className="block mt-1.5 w-full"
                        onChange={event =>
                            setPasswordConfirmation(event.target.value)
                        }
                        required
                    />
                    <InputError
                        messages={errors.password_confirmation}
                        className="mt-1.5"
                    />
                </div>

                <Button className="w-full">
                    Réinitialiser le mot de passe
                </Button>
            </form>
        </>
    )
}

export default PasswordReset
