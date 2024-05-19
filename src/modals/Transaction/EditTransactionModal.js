import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import { useLocationData } from '@/hooks/locations'
import { useCurrencyData } from '@/hooks/currencies'
import { CurrencyType } from '@/enums/CurrencyType'
import { TransactionType } from '@/enums/TransactionType'
import In from '@/modals/Transaction/TransactionParts/In'
import Out from '@/modals/Transaction/TransactionParts/Out'
import Swap from '@/modals/Transaction/TransactionParts/Swap'
import { useTransactionLabelData } from '@/hooks/transactionLabels'
import TransactionTypeBubble from '@/components/TransactionTypeBubble'
import Fees from '@/modals/Transaction/TransactionParts/Fees'
import Tabs from '@/modals/Transaction/_components/Tabs'
import Movements from '@/modals/Transaction/TransactionParts/Movements'
import { useFeeData } from '@/hooks/fees'
import { useMovementData } from '@/hooks/movements'

const EditTransactionModal = ({
    transaction,
    setIsOpen,
    isOpen,
    updateTransaction,
}) => {
    const { getLocations } = useLocationData()
    const { getCurrencies } = useCurrencyData()
    const { getTransactionLabels } = useTransactionLabelData()
    const { getFees } = useFeeData()
    const { getMovements } = useMovementData()

    const [id, setId] = useState('')
    const [transactionLabel, setTransactionLabel] = useState(0)
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
    const [taxable, setTaxable] = useState(false)

    const [fees, setFees] = useState([])
    const [movements, setMovements] = useState([])

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
        if (transaction) {
            setId(transaction?.id ?? '')
            setType(transaction?.type ?? '')
            setTransactionLabel(transaction?.transaction_label_id ?? 0)
            setDate(transaction?.date ?? '')
            setToCurrency(transaction?.to_currency_id ?? 0)
            setToQuantity(transaction?.to_quantity ?? 0)
            setFromCurrency(transaction?.from_currency_id ?? 0)
            setFromQuantity(transaction?.from_quantity ?? 0)
            setLocation(transaction?.location_id ?? 0)
            setHash(transaction?.hash ?? '')
            setFromAddress(transaction?.from_address ?? '')
            setToAddress(transaction?.to_address ?? '')
            setNote(transaction?.note ?? '')
            setTaxable(transaction?.taxable ?? false)

            getFees(transaction?.id).then(data =>
                setFees(data.debug ? [] : data ?? []),
            )

            getMovements(transaction?.id).then(data =>
                setMovements(data.debug ? [] : data ?? []),
            )
        }
    }, [transaction])

    const submitForm = async event => {
        event.preventDefault()

        updateTransaction(id, {
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
                            checked={TransactionType.IN === type}
                            className=""
                            onChange={event => setType(event.target.value)}
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
                            checked={TransactionType.OUT === type}
                            className=""
                            onChange={event => setType(event.target.value)}
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
                            checked={TransactionType.SWAP === type}
                            className=""
                            onChange={event => setType(event.target.value)}
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
            title={'Edit Transaction'}
            setIsOpen={setIsOpen}
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
                                movements={[
                                    {
                                        quantity: 1,
                                        from_currency_id: 1,
                                        to_currency_id: 2,
                                    },
                                    {
                                        quantity: 2,
                                        from_currency_id: 1,
                                        to_currency_id: 2,
                                    },
                                    {
                                        quantity: 3,
                                        from_currency_id: 1,
                                        to_currency_id: 2,
                                    },
                                ]}
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

export default EditTransactionModal
