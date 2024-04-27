'use client'

import Header from '@/app/(app)/Header'
import Label from '@/components/Label'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserData } from '@/hooks/users'
import { CurrencyType } from '@/enums/CurrencyType'
import { useCurrencyData } from '@/hooks/currencies'
import { Select } from '@/components/Select'
import { useCountryData } from '@/hooks/countries'

const MyAccount = () => {
    const { user } = useAuth({
        middleware: 'auth',
    })
    const { updateUser } = useUserData()
    const { getCurrencies } = useCurrencyData()
    const { getCountries } = useCountryData()
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [currency, setCurrency] = useState(0)
    const [taxResidence, setTaxResidence] = useState(0)

    const [fiatCurrencies, setFiatCurrencies] = useState([])
    const [countries, setCountries] = useState([])

    useEffect(() => {
        setName(user.name)
        setCurrency(user.currency_id)
        setTaxResidence(user.tax_residence_id)
        setEmail(user.email)
    }, [])

    useEffect(() => {
        getCurrencies({ type: CurrencyType.FIAT }).then(setFiatCurrencies)
        getCountries().then(setCountries)
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

    function refreshAccount() {
        router.refresh()
    }

    return (
        <>
            <Header title="My account" className={'mb-4'} />

            <div className={'pb-6 max-w-3xl'}>
                <h3 className={'font-semibold text-xl mb-2'}>Profile</h3>

                <form className={'flex flex-col gap-4'} onSubmit={submitForm}>
                    <div>
                        <Label htmlFor="name">Name*</Label>
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
                            onChange={event => setName(event.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <div className={'flex flex-row justify-end'}>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </div>

            <div className={'pb-6 max-w-3xl'}>
                <h3 className={'font-semibold text-xl mb-2'}>Settings</h3>

                <form className={'flex flex-col gap-4'} onSubmit={submitForm}>
                    <div>
                        <Label htmlFor="currency">Default currency*</Label>
                        <Select
                            id="from_currency"
                            name="from_currency"
                            items={{
                                0: 'Choose an asset',
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
                        <Label htmlFor="currency">Tax residence*</Label>
                        <Select
                            id="tax_residence"
                            name="tax_residence"
                            items={{
                                0: 'Choose a country',
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
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default MyAccount
