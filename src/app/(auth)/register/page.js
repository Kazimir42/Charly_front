'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const Page = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = event => {
        event.preventDefault()

        register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
        })
    }

    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                    Inscription
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Créez votre compte pour commencer
                </p>
            </div>

            <form onSubmit={submitForm} className="space-y-4">
                <div>
                    <Label htmlFor="name">Nom</Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        className="block mt-1.5 w-full"
                        onChange={event => setName(event.target.value)}
                        required
                        autoFocus
                    />
                    <InputError messages={errors.name} className="mt-1.5" />
                </div>

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
                        autoComplete="new-password"
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

                <Button className="w-full mt-2">Inscription</Button>

                <p className="text-center text-sm text-slate-500">
                    Déjà inscrit ?{' '}
                    <Link
                        href="/login"
                        className="text-blue-500 hover:text-blue-600 font-medium">
                        Se connecter
                    </Link>
                </p>
            </form>
        </>
    )
}

export default Page
