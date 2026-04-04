'use client'

import { CheckIcon } from '@heroicons/react/24/outline'

const steps = [
    {
        number: 1,
        title: 'Créer une plateforme',
        description:
            'Ajoutez votre première plateforme (ex: Binance, Coinbase...)',
    },
    {
        number: 2,
        title: 'Ajouter une transaction',
        description:
            'Enregistrez votre premier achat, vente ou échange de crypto.',
    },
    {
        number: 3,
        title: 'Voir votre tableau de bord',
        description:
            'Vos statistiques et votre portefeuille apparaîtront automatiquement.',
    },
]

const OnboardingStepper = ({ currentStep, onStepAction }) => {
    return (
        <div className="mx-auto max-w-2xl py-16">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-semibold text-slate-900">
                    Bienvenue sur Charly
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                    Configurez votre portefeuille en quelques étapes.
                </p>
            </div>

            <div className="flex items-start justify-center">
                {steps.map((step, index) => {
                    const isCompleted = step.number < currentStep
                    const isActive = step.number === currentStep

                    return (
                        <div key={step.number} className="flex items-start">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                        isCompleted
                                            ? 'border-blue-500 bg-blue-500 text-white'
                                            : isActive
                                            ? 'border-blue-500 bg-white text-blue-500'
                                            : 'border-slate-200 bg-white text-slate-400'
                                    }`}>
                                    {isCompleted ? (
                                        <CheckIcon className="h-5 w-5" />
                                    ) : (
                                        <span className="text-sm font-semibold">
                                            {step.number}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-3 w-40 text-center">
                                    <p
                                        className={`text-sm font-medium ${
                                            isActive
                                                ? 'text-slate-900'
                                                : 'text-slate-500'
                                        }`}>
                                        {step.title}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        {step.description}
                                    </p>

                                    {isActive && step.number < 3 && (
                                        <button
                                            onClick={() =>
                                                onStepAction(step.number)
                                            }
                                            className="mt-3 rounded-lg bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                                            {step.number === 1
                                                ? 'Créer'
                                                : 'Ajouter'}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {index < steps.length - 1 && (
                                <div
                                    className={`mt-5 h-0.5 w-16 ${
                                        step.number < currentStep
                                            ? 'bg-blue-500'
                                            : 'bg-slate-200'
                                    }`}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default OnboardingStepper
