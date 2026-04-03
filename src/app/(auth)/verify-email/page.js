'use client'

import Button from '@/components/Button'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const Page = () => {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState(null)

    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                    Vérification de l'email
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Merci pour votre inscription ! Veuillez vérifier votre
                    adresse email en cliquant sur le lien que nous venons de
                    vous envoyer. Si vous n'avez pas reçu l'email, nous vous en
                    enverrons un autre.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">
                    Un nouveau lien de vérification a été envoyé à l'adresse
                    email fournie lors de l'inscription.
                </div>
            )}

            <div className="flex flex-col gap-3">
                <Button
                    className="w-full"
                    onClick={() => resendEmailVerification({ setStatus })}>
                    Renvoyer l'email de vérification
                </Button>

                <button
                    type="button"
                    className="text-sm text-slate-500 hover:text-slate-700 text-center"
                    onClick={logout}>
                    Déconnexion
                </button>
            </div>
        </>
    )
}

export default Page
