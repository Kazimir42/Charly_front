import LoginLinks from '@/app/LoginLinks'
import { CharlyIcon } from '@/components/ApplicationLogo'
import Link from 'next/link'

const features = [
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                />
            </svg>
        ),
        title: 'Suivi en temps réel',
        description:
            'Visualisez la valeur de votre portefeuille crypto à tout moment avec des graphiques clairs et des données actualisées.',
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
            </svg>
        ),
        title: 'Rapports fiscaux',
        description:
            'Générez automatiquement vos déclarations fiscales conformes à la réglementation française. Plus de prise de tête.',
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                />
            </svg>
        ),
        title: 'Multi-plateformes',
        description:
            "Centralisez vos actifs depuis toutes vos plateformes d'échange en un seul endroit pour une vue d'ensemble complète.",
    },
]

export default function Home() {
    return (
        <div className="bg-white">
            {/* Header */}
            <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <nav
                    className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
                    aria-label="Global">
                    <Link href="/" className="flex items-center gap-2.5">
                        <CharlyIcon className="h-8 w-8" />
                        <span className="text-xl font-bold text-slate-900">
                            Charly
                        </span>
                    </Link>
                    <LoginLinks />
                </nav>
            </header>

            {/* Hero */}
            <section className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true">
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-200 to-blue-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm text-slate-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            Nouveau : Rapports fiscaux 2025
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                            Maîtrisez vos{' '}
                            <span className="text-blue-500">cryptos</span>,
                            <br />
                            simplifiez vos impôts.
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-slate-500 sm:text-xl">
                            Suivez votre portefeuille en temps réel, centralisez
                            vos plateformes et générez vos déclarations fiscales
                            en quelques clics.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-4">
                            <Link
                                href="/register"
                                className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition-colors">
                                Créer un compte gratuitement
                            </Link>
                            <Link
                                href="/login"
                                className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                                Se connecter
                            </Link>
                        </div>
                    </div>

                    <div className="mt-20 sm:mt-24">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-3">
                            <img
                                src="/preview.png"
                                alt="Aperçu de l'application Charly"
                                className="rounded-xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true">
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-200 to-blue-500 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </section>

            {/* Features */}
            <section className="border-t border-slate-100 bg-slate-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Tout ce qu&apos;il vous faut
                        </h2>
                        <p className="mt-4 text-lg text-slate-500">
                            Une solution complète pour gérer vos investissements
                            crypto au quotidien.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
                        {features.map(feature => (
                            <div
                                key={feature.title}
                                className="rounded-xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-md">
                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                                    {feature.icon}
                                </div>
                                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-t border-slate-100 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Conçu pour les investisseurs crypto français
                        </h2>
                        <p className="mt-4 text-lg text-slate-500">
                            Charly est pensé pour simplifier la gestion et la
                            fiscalité de vos actifs numériques.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-500">
                                127+
                            </div>
                            <div className="mt-2 text-sm text-slate-500">
                                Cryptomonnaies supportées
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-500">
                                100%
                            </div>
                            <div className="mt-2 text-sm text-slate-500">
                                Conforme à la fiscalité française
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-500">
                                Gratuit
                            </div>
                            <div className="mt-2 text-sm text-slate-500">
                                Aucun frais caché, open source
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-slate-100 bg-slate-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Prêt à reprendre le contrôle ?
                        </h2>
                        <p className="mt-4 text-lg text-slate-400">
                            Créez votre compte en quelques secondes et commencez
                            à suivre vos investissements dès maintenant.
                        </p>
                        <div className="mt-10">
                            <Link
                                href="/register"
                                className="rounded-lg bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition-colors">
                                Commencer gratuitement
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-100 bg-white py-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex items-center gap-2.5">
                            <CharlyIcon className="h-6 w-6" />
                            <span className="text-sm font-semibold text-slate-900">
                                Charly
                            </span>
                        </div>
                        <p className="text-sm text-slate-400">
                            &copy; {new Date().getFullYear()} Charly. Tous
                            droits réservés.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
