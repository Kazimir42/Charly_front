'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

const LoginLinks = () => {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <div className="flex items-center gap-4">
            {user ? (
                <Link
                    href="/dashboard"
                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
                    Tableau de bord
                </Link>
            ) : (
                <>
                    <Link
                        href="/login"
                        className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors">
                        Connexion
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
                        Inscription
                    </Link>
                </>
            )}
        </div>
    )
}

export default LoginLinks
