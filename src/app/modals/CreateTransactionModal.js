import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import Buy from '@/app/modals/TransactionParts/Buy'
import Sell from '@/app/modals/TransactionParts/Sell'
import { useLocationData } from '@/hooks/locations'
import { useCurrencyData } from '@/hooks/currencies'
import { CurrencyType } from '@/enums/CurrencyType'
import { TransactionType } from '@/enums/TransactionType'
import { useAuth } from '@/hooks/auth'
import Swap from '@/app/modals/TransactionParts/Swap'

const CreateTransactionModal = ({
    setIsOpen,
    isOpen,
    createTransaction,
    defaultLocation,
}) => {
    const { getLocations } = useLocationData()
    const { getCurrencies } = useCurrencyData()
    const { user } = useAuth({
        middleware: 'auth',
    })

    const [type, setType] = useState('')
    const [date, setDate] = useState('')
    const [toCurrency, setToCurrency] = useState(0)
    const [toQuantity, setToQuantity] = useState(0)
    const [fromCurrency, setFromCurrency] = useState(0)
    const [fromQuantity, setFromQuantity] = useState(0)
    const [location, setLocation] = useState(0)
    const [hash, setHash] = useState('')
    const [fromAddress, setFromAddress] = useState('')
    const [toAddress, setToAddress] = useState('')
    const [note, setNote] = useState('')

    const [locations, setLocations] = useState([])
    const [fiatCurrencies, setFiatCurrencies] = useState([])
    const [cryptoCurrencies, setCryptoCurrencies] = useState([])

    useEffect(() => {
        if (isOpen) {
            getLocations().then(setLocations)
            getCurrencies({ type: CurrencyType.FIAT }).then(setFiatCurrencies)
            getCurrencies({ type: CurrencyType.CRYPTO }).then(
                setCryptoCurrencies,
            )
        }
    }, [isOpen])

    useEffect(() => {
        if (defaultLocation) {
            setLocation(defaultLocation.id)
        }
    }, [defaultLocation])

    useEffect(() => {
        if (type === TransactionType.BUY) {
            setFromCurrency(user.currency_id ?? 0)
            setToCurrency(0)
        } else if (type === TransactionType.SELL) {
            setToCurrency(user.currency_id ?? 0)
            setFromCurrency(0)
        } else if (type === TransactionType.SWAP) {
            setToCurrency(0)
            setFromCurrency(0)
        }
    }, [type])

    const submitForm = async event => {
        event.preventDefault()

        createTransaction({
            type,
            date,
            from_currency_id: fromCurrency,
            from_quantity: fromQuantity,
            to_currency_id: toCurrency,
            to_quantity: toQuantity,
            location_id: location > 0 ? location : null,
            hash,
            to_address: toAddress,
            from_address: fromAddress,
            note,
        })

        openOrClose()
    }

    function openOrClose() {
        setType(null)
        setDate('')
        setToCurrency(0)
        setToQuantity(0)
        setFromCurrency(0)
        setFromQuantity(0)
        setLocation(0)
        setHash('')
        setFromAddress('')
        setToAddress('')
        setNote('')
        setIsOpen(!isOpen)
    }

    return (
        <Modal
            title={'New Transaction'}
            setIsOpen={openOrClose}
            isOpen={isOpen}
            className={''}>
            <form className={'flex flex-col gap-4'} onSubmit={submitForm}>
                <div>
                    <h4 className={'mb-2'}>Type of transaction*</h4>
                    <div className={'flex flex-row gap-4 justify-between'}>
                        <div className={'flex flex-row gap-2'}>
                            <Label htmlFor="buy" className={'cursor-pointer'}>
                                Buy
                            </Label>
                            <Input
                                id="buy"
                                type="radio"
                                name={'type'}
                                value={TransactionType.BUY}
                                className="cursor-pointer"
                                onChange={event => setType(event.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        <div className={'flex flex-row gap-2'}>
                            <Label htmlFor="sell" className={'cursor-pointer'}>
                                Sell
                            </Label>
                            <Input
                                id="sell"
                                type="radio"
                                name={'type'}
                                value={TransactionType.SELL}
                                className="cursor-pointer"
                                onChange={event => setType(event.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        <div className={'flex flex-row gap-2'}>
                            <Label
                                htmlFor="receive"
                                className={'cursor-pointer'}>
                                Receive
                            </Label>
                            <Input
                                id="receive"
                                type="radio"
                                name={'type'}
                                value={TransactionType.RECEIVE}
                                className="cursor-pointer"
                                onChange={event => setType(event.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        <div className={'flex flex-row gap-2'}>
                            <Label
                                htmlFor="withdraw"
                                className={'cursor-pointer'}>
                                Withdraw
                            </Label>
                            <Input
                                id="withdraw"
                                type="radio"
                                name={'type'}
                                value={TransactionType.WITHDRAW}
                                className="cursor-pointer"
                                onChange={event => setType(event.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        <div className={'flex flex-row gap-2'}>
                            <Label htmlFor="swap" className={'cursor-pointer'}>
                                Swap
                            </Label>
                            <Input
                                id="swap"
                                type="radio"
                                name={'type'}
                                value={TransactionType.SWAP}
                                className="cursor-pointer"
                                onChange={event => setType(event.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className={'mb-2'}>Informations</h4>
                    {type === TransactionType.BUY ? (
                        <Buy
                            date={date}
                            setDate={setDate}
                            toCurrency={toCurrency}
                            setToCurrency={setToCurrency}
                            toQuantity={toQuantity}
                            setToQuantity={setToQuantity}
                            fromCurrency={fromCurrency}
                            setFromCurrency={setFromCurrency}
                            fromQuantity={fromQuantity}
                            setFromQuantity={setFromQuantity}
                            location={location}
                            setLocation={setLocation}
                            hash={hash}
                            setHash={setHash}
                            toAddress={toAddress}
                            setToAddress={setToAddress}
                            note={note}
                            setNote={setNote}
                            locations={locations}
                            fiatCurrencies={fiatCurrencies}
                            cryptoCurrencies={cryptoCurrencies}
                        />
                    ) : null}

                    {type === TransactionType.SELL ? (
                        <Sell
                            date={date}
                            setDate={setDate}
                            toCurrency={toCurrency}
                            setToCurrency={setToCurrency}
                            toQuantity={toQuantity}
                            setToQuantity={setToQuantity}
                            fromCurrency={fromCurrency}
                            setFromCurrency={setFromCurrency}
                            fromQuantity={fromQuantity}
                            setFromQuantity={setFromQuantity}
                            location={location}
                            setLocation={setLocation}
                            hash={hash}
                            setHash={setHash}
                            fromAddress={fromAddress}
                            setFromAddress={setFromAddress}
                            note={note}
                            setNote={setNote}
                            locations={locations}
                            fiatCurrencies={fiatCurrencies}
                            cryptoCurrencies={cryptoCurrencies}
                        />
                    ) : null}

                    {type === TransactionType.SWAP ? (
                        <Swap
                            date={date}
                            setDate={setDate}
                            toCurrency={toCurrency}
                            setToCurrency={setToCurrency}
                            toQuantity={toQuantity}
                            setToQuantity={setToQuantity}
                            fromCurrency={fromCurrency}
                            setFromCurrency={setFromCurrency}
                            fromQuantity={fromQuantity}
                            setFromQuantity={setFromQuantity}
                            location={location}
                            setLocation={setLocation}
                            hash={hash}
                            setHash={setHash}
                            toAddress={toAddress}
                            setToAddress={setToAddress}
                            fromAddress={fromAddress}
                            setFromAddress={setFromAddress}
                            note={note}
                            setNote={setNote}
                            locations={locations}
                            cryptoCurrencies={cryptoCurrencies}
                        />
                    ) : null}
                </div>

                <div className={'flex flex-row justify-end'}>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateTransactionModal
