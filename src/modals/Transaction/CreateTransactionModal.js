import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import In from '@/modals/Transaction/TransactionParts/In'
import Out from '@/modals/Transaction/TransactionParts/Out'
import { useLocationData } from '@/hooks/locations'
import { useCurrencyData } from '@/hooks/currencies'
import { CurrencyType } from '@/enums/CurrencyType'
import { TransactionType } from '@/enums/TransactionType'
import { useAuth } from '@/hooks/auth'
import Swap from '@/modals/Transaction/TransactionParts/Swap'
import TransactionTypeBubble from '@/components/TransactionTypeBubble'
import { useTransactionLabelData } from '@/hooks/transactionLabels'
import Fees from '@/modals/Transaction/TransactionParts/Fees'
import Tabs from '@/modals/Transaction/_components/Tabs'
import Movements from '@/modals/Transaction/TransactionParts/Movements'
import { useTransactionData } from '@/hooks/transactions'

const CreateTransactionModal = ({
    setIsOpen,
    isOpen,
    createTransaction,
    defaultLocation,
}) => {
    const { getLocations } = useLocationData()
    const { getCurrencies } = useCurrencyData()
    const { getTransactionLabels } = useTransactionLabelData()
    const { getMovementableTransactions } = useTransactionData()

    const { user } = useAuth({
        middleware: 'auth',
    })

    const [type, setType] = useState('IN')
    const [transactionLabel, setTransactionLabel] = useState(0)
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
    const [taxable, setTaxable] = useState(false)

    const [fees, setFees] = useState([])
    const [movements, setMovements] = useState([])
    const [movementableTransactions, setMovementableTransactions] = useState([])

    const [locations, setLocations] = useState([])
    const [fiatCurrencies, setFiatCurrencies] = useState([])
    const [cryptoCurrencies, setCryptoCurrencies] = useState([])
    const [transactionLabelsIn, setTransactionLabelsIn] = useState([])
    const [transactionLabelsOut, setTransactionLabelsOut] = useState([])

    const [activeTab, setActiveTab] = useState('informations')

    useEffect(() => {
        if (isOpen) {
            getLocations().then(setLocations)
            getCurrencies({ type: CurrencyType.FIAT }).then(setFiatCurrencies)
            getCurrencies({ type: CurrencyType.CRYPTO }).then(
                setCryptoCurrencies,
            )
            getTransactionLabels({ type: TransactionType.IN }).then(
                setTransactionLabelsIn,
            )
            getTransactionLabels({ type: TransactionType.OUT }).then(
                setTransactionLabelsOut,
            )
        }
    }, [isOpen])

    useEffect(() => {
        if (defaultLocation) {
            setLocation(defaultLocation.id)
        }
    }, [defaultLocation])

    useEffect(() => {
        if (type === TransactionType.IN) {
            setFromCurrency(user.currency_id ?? 0)
            setToCurrency(0)
        } else if (type === TransactionType.OUT) {
            setToCurrency(user.currency_id ?? 0)
            setFromCurrency(0)
        } else if (type === TransactionType.SWAP) {
            setToCurrency(0)
            setFromCurrency(0)
        }
    }, [type, isOpen])

    // Fetch transactions movementables
    useEffect(() => {
        if (
            fromQuantity &&
            fromCurrency &&
            type === TransactionType.OUT &&
            date &&
            activeTab === 'movements'
        ) {
            getMovementableTransactions({
                date: date,
                fromCurrencyId: fromCurrency,
                fromQuantity: fromQuantity,
            }).then(setMovementableTransactions)
        }
    }, [activeTab])

    const submitForm = async event => {
        event.preventDefault()

        createTransaction({
            transaction: {
                type,
                date,
                transaction_label_id:
                    transactionLabel > 0 ? transactionLabel : null,
                from_currency_id: fromCurrency,
                from_quantity: fromQuantity,
                to_currency_id: toCurrency,
                to_quantity: toQuantity,
                location_id: location > 0 ? location : null,
                hash,
                to_address: toAddress,
                from_address: fromAddress,
                note,
                taxable,
            },
            fees: fees,
            movements: movements,
        })

        openOrClose()
    }

    function openOrClose() {
        setType('IN')
        setDate('')
        setTransactionLabel(0)
        setToCurrency(0)
        setToQuantity(0)
        setFromCurrency(0)
        setFromQuantity(0)
        setLocation(0)
        setHash('')
        setFromAddress('')
        setToAddress('')
        setNote('')
        setTaxable(false)
        setActiveTab('informations')
        setIsOpen(!isOpen)
    }

    function getToFillQuantity() {
        let quantityOnMovements = 0

        movements.map(movement => {
            if (!movement.is_deleted) {
                quantityOnMovements += parseFloat(movement.quantity)
            }
        })

        return fromQuantity - quantityOnMovements
    }

    function Types() {
        return (
            <div>
                <h4 className={'mb-2'}>Type of transaction*</h4>
                <div className={'flex flex-row gap-4'}>
                    <div
                        className={
                            'flex flex-row gap-1 bg-gray-100 items-center pl-3 pr-2 py-1.5 rounded-full'
                        }>
                        <Input
                            id="in"
                            type="radio"
                            name={'type'}
                            value={TransactionType.IN}
                            className="cursor-pointer"
                            onChange={event => setType(event.target.value)}
                            checked={type === TransactionType.IN}
                            required
                        />
                        <Label htmlFor="in" className={'cursor-pointer'}>
                            <TransactionTypeBubble type={TransactionType.IN} />
                        </Label>
                    </div>

                    <div
                        className={
                            'flex flex-row gap-1 bg-gray-100 items-center pl-3 pr-2 py-1.5 rounded-full'
                        }>
                        <Input
                            id="out"
                            type="radio"
                            name={'type'}
                            value={TransactionType.OUT}
                            className="cursor-pointer"
                            onChange={event => setType(event.target.value)}
                            checked={type === TransactionType.OUT}
                            required
                        />
                        <Label htmlFor="out" className={'cursor-pointer'}>
                            <TransactionTypeBubble type={TransactionType.OUT} />
                        </Label>
                    </div>

                    <div
                        className={
                            'flex flex-row gap-1 bg-gray-100 items-center pl-3 pr-2 py-1.5 rounded-full'
                        }>
                        <Input
                            id="swap"
                            type="radio"
                            name={'type'}
                            value={TransactionType.SWAP}
                            className="cursor-pointer"
                            onChange={event => setType(event.target.value)}
                            checked={type === TransactionType.SWAP}
                            required
                        />
                        <Label htmlFor="swap" className={'cursor-pointer'}>
                            <TransactionTypeBubble
                                type={TransactionType.SWAP}
                            />
                        </Label>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Modal
            title={'New Transaction'}
            setIsOpen={openOrClose}
            isOpen={isOpen}
            className={''}>
            <form className={'flex flex-col gap-4'} onSubmit={submitForm}>
                <Types />
                <div>
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className={'px-4 py-4 bg-gray-50 rounded-b-md'}>
                        {activeTab === 'informations' ? (
                            type === TransactionType.IN ? (
                                <In
                                    date={date}
                                    setDate={setDate}
                                    transactionLabel={transactionLabel}
                                    setTransactionLabel={setTransactionLabel}
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
                                    transactionLabels={transactionLabelsIn}
                                />
                            ) : type === TransactionType.OUT ? (
                                <Out
                                    date={date}
                                    setDate={setDate}
                                    transactionLabel={transactionLabel}
                                    setTransactionLabel={setTransactionLabel}
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
                                    transactionLabels={transactionLabelsOut}
                                    taxable={taxable}
                                    setTaxable={setTaxable}
                                />
                            ) : type === TransactionType.SWAP ? (
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
                            ) : null
                        ) : activeTab === 'fees' ? (
                            <Fees
                                fees={fees}
                                setFees={setFees}
                                currencies={[
                                    ...fiatCurrencies,
                                    ...cryptoCurrencies,
                                ]}
                            />
                        ) : (
                            <Movements
                                type={type}
                                quantity={fromQuantity}
                                currency={cryptoCurrencies.find(
                                    crypto =>
                                        crypto.id === parseInt(fromCurrency),
                                )}
                                date={date}
                                movementableTransactions={
                                    movementableTransactions
                                }
                                movements={movements}
                                setMovements={setMovements}
                                toFillQuantity={getToFillQuantity()}
                            />
                        )}
                    </div>
                </div>

                <div className={'flex flex-row justify-end'}>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateTransactionModal
