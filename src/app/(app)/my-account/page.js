'use client'

import Header from '@/app/(app)/Header'
import Label from '@/components/Label'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import Loading from '@/app/(app)/Loading'
import { useRouter } from 'next/navigation'
import { useUserData } from '@/hooks/users'
import { CurrencyType } from '@/enums/CurrencyType'
import { useCurrencyData } from '@/hooks/currencies'
import { Select } from '@/components/Select'
import { useCountryData } from '@/hooks/countries'
import Modal from '@/components/Modal'

const MyAccount = () => {
    const { user, logout } = useAuth({
        middleware: 'auth',
    })
    const { updateUser, changePassword, deleteUser } = useUserData()
    const { getCurrencies } = useCurrencyData()
    const { getCountries } = useCountryData()
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [currency, setCurrency] = useState(0)
    const [taxResidence, setTaxResidence] = useState(0)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')

    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const [deletePassword, setDeletePassword] = useState('')

    const [fiatCurrencies, setFiatCurrencies] = useState([])
    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setName(user.name)
        setCurrency(user.currency_id)
        setTaxResidence(user.tax_residence_id)
        setEmail(user.email)
    }, [])

    useEffect(() => {
        Promise.all([
            getCurrencies({ type: CurrencyType.FIAT }).then(setFiatCurrencies),
            getCountries().then(setCountries),
        ]).then(() => setIsLoading(false))
    }, [])

    function submitForm(event) {
        event.preventDefault()

        updateUser(user.id, {
            name,
            currency_id: currency,
            tax_residence_id: taxResidence,
        })
            .then(() => {
                refreshAccount()
            })
            .catch(() => {})
    }

    function submitPasswordForm(event) {
        event.preventDefault()

        changePassword({
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: newPasswordConfirmation,
        })
            .then(() => {
                setCurrentPassword('')
                setNewPassword('')
                setNewPasswordConfirmation('')
            })
            .catch(() => {})
    }

    function submitDeleteAccount(event) {
        event.preventDefault()

        deleteUser(user.id, { password: deletePassword })
            .then(() => {
                setDeleteModalIsOpen(false)
                logout()
            })
            .catch(() => {})
    }

    function refreshAccount() {
        router.refresh()
    }

    if (isLoading) {
        return <Loading fullHeight={false} />
    }

    return (
        <>
            <Header title="Mon compte" className={'mb-4'} />

            <div className={'pb-6 max-w-3xl'}>
                <h3 className={'font-semibold text-xl mb-2'}>Profil</h3>

                <form className={'flex flex-col gap-4'} onSubmit={submitForm}>
                    <div>
                        <Label htmlFor="name">Nom*</Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="block mt-1 w-full"
                            onChange={event => setName(event.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">Email*</Label>
                        <Input
                            id="email"
                            type="text"
                            value={email}
                            disabled={true}
                            className="block mt-1 w-full"
                            required
                        />
                    </div>

                    <div className={'flex flex-row justify-end'}>
                        <Button type="submit">Enregistrer</Button>
                    </div>
                </form>
            </div>

            <div className={'pb-6 max-w-3xl'}>
                <h3 className={'font-semibold text-xl mb-2'}>Paramètres</h3>

                <form className={'flex flex-col gap-4'} onSubmit={submitForm}>
                    <div>
                        <Label htmlFor="currency">Devise par défaut*</Label>
                        <Select
                            id="from_currency"
                            name="from_currency"
                            items={{
                                0: 'Choisir un actif',
                                ...fiatCurrencies.reduce(
                                    (acc, fiatCurrency) => {
                                        acc[fiatCurrency.id] = fiatCurrency.name
                                        return acc
                                    },
                                    {},
                                ),
                            }}
                            className="block w-full mt-1"
                            value={currency}
                            onChange={event => setCurrency(event.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <div>
                        <Label htmlFor="currency">Résidence fiscale*</Label>
                        <Select
                            id="tax_residence"
                            name="tax_residence"
                            items={{
                                0: 'Choisir un pays',
                                ...countries.reduce((acc, country) => {
                                    acc[country.id] = country.name
                                    return acc
                                }, {}),
                            }}
                            className="block w-full mt-1"
                            value={taxResidence}
                            onChange={event =>
                                setTaxResidence(event.target.value)
                            }
                            required
                            autoFocus
                        />
                    </div>

                    <div className={'flex flex-row justify-end'}>
                        <Button type="submit">Enregistrer</Button>
                    </div>
                </form>
            </div>

            <div className={'pb-6 max-w-3xl'}>
                <h3 className={'font-semibold text-xl mb-2'}>Sécurité</h3>

                <form
                    className={'flex flex-col gap-4'}
                    onSubmit={submitPasswordForm}>
                    <div>
                        <Label htmlFor="current_password">
                            Mot de passe actuel*
                        </Label>
                        <Input
                            id="current_password"
                            type="password"
                            value={currentPassword}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setCurrentPassword(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="new_password">
                            Nouveau mot de passe*
                        </Label>
                        <Input
                            id="new_password"
                            type="password"
                            value={newPassword}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setNewPassword(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="new_password_confirmation">
                            Confirmer le nouveau mot de passe*
                        </Label>
                        <Input
                            id="new_password_confirmation"
                            type="password"
                            value={newPasswordConfirmation}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setNewPasswordConfirmation(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className={'flex flex-row justify-end'}>
                        <Button type="submit">Changer le mot de passe</Button>
                    </div>
                </form>
            </div>

            <div className={'pb-6 max-w-3xl'}>
                <h3 className={'font-semibold text-xl mb-2 text-red-600'}>
                    Zone dangereuse
                </h3>
                <p className={'text-sm text-slate-500 mb-4'}>
                    La suppression de votre compte est irréversible. Toutes vos
                    données seront définitivement supprimées.
                </p>
                <Button
                    type="button"
                    className={'bg-red-500 hover:bg-red-600'}
                    onClick={() => setDeleteModalIsOpen(true)}>
                    Supprimer mon compte
                </Button>
            </div>

            <Modal
                title={'Supprimer votre compte'}
                setIsOpen={() => setDeleteModalIsOpen(false)}
                isOpen={deleteModalIsOpen}>
                <form
                    className={'flex flex-col gap-4'}
                    onSubmit={submitDeleteAccount}>
                    <p className={'text-sm text-slate-600'}>
                        Cette action est irréversible. Veuillez saisir votre mot
                        de passe pour confirmer.
                    </p>
                    <div>
                        <Label htmlFor="delete_password">Mot de passe*</Label>
                        <Input
                            id="delete_password"
                            type="password"
                            value={deletePassword}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setDeletePassword(event.target.value)
                            }
                            required
                            autoFocus
                        />
                    </div>
                    <div className={'flex flex-row justify-end'}>
                        <Button
                            type="submit"
                            className={'bg-red-500 hover:bg-red-600'}>
                            Confirmer la suppression
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default MyAccount
