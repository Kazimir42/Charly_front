import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import Buy from '@/app/modals/TransactionParts/Buy'
import { useLocationData } from '@/hooks/locations'
import { useCurrencyData } from '@/hooks/currencies'

const CreateTransactionModal = ({ setIsOpen, isOpen, createTransaction }) => {
    const { getLocations } = useLocationData()
    const { getCurrencies } = useCurrencyData()

    const [type, setType] = useState(null)
    const [date, setDate] = useState('')
    const [boughtAsset, setBoughtAsset] = useState(0)
    const [boughtQuantity, setBoughtQuantity] = useState(0)
    const [spentAsset, setSpentAsset] = useState(0)
    const [spentQuantity, setSpentQuantity] = useState(0)
    const [location, setLocation] = useState(0)
    const [hash, setHash] = useState('')
    const [receptionAddress, setReceptionAddress] = useState('')
    const [note, setNote] = useState('')

    const [locations, setLocations] = useState([])
    const [fiatCurrencies, setFiatCurrencies] = useState([])
    const [cryptoCurrencies, setCryptoCurrencies] = useState([])

    useEffect(() => {
        if (isOpen) {
            getLocations().then(setLocations)
            getCurrencies({ type: 'FIAT' }).then(setFiatCurrencies)
            getCurrencies({ type: 'CRYPTO' }).then(setCryptoCurrencies)
        }
    }, [isOpen])

    const submitForm = async event => {
        event.preventDefault()

        console.log(boughtAsset)

        createTransaction({
            type,
            date,
            from_currency_id: spentAsset,
            from_quantity: spentQuantity,
            to_currency_id: boughtAsset,
            to_quantity: boughtQuantity,
            location_id: location,
            hash,
            to_address: receptionAddress,
            note,
        })
    }

    function openOrClose() {
        setType(null)
        setDate('')
        setBoughtAsset(0)
        setBoughtQuantity(0)
        setSpentAsset(0)
        setSpentQuantity(0)
        setLocation(0)
        setHash('')
        setReceptionAddress('')
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
                            <Label htmlFor="buy">Buy</Label>
                            <Input
                                id="buy"
                                type="radio"
                                name={'type'}
                                value={'BUY'}
                                className=""
                                onChange={event => setType(event.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        <div className={'flex flex-row gap-2'}>
                            <Label htmlFor="sell">Sell</Label>
                            <Input
                                id="sell"
                                type="radio"
                                name={'type'}
                                value={'SELL'}
                                className=""
                                onChange={event => setType(event.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        <div className={'flex flex-row gap-2'}>
                            <Label htmlFor="receive">Receive</Label>
                            <Input
                                id="receive"
                                type="radio"
                                name={'type'}
                                value={'RECEIVE'}
                                className=""
                                onChange={event => setType(event.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        <div className={'flex flex-row gap-2'}>
                            <Label htmlFor="withdraw">Withdraw</Label>
                            <Input
                                id="withdraw"
                                type="radio"
                                name={'type'}
                                value={'WITHDRAW'}
                                className=""
                                onChange={event => setType(event.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        <div className={'flex flex-row gap-2'}>
                            <Label htmlFor="swap">Swap</Label>
                            <Input
                                id="swap"
                                type="radio"
                                name={'type'}
                                value={'SWAP'}
                                className=""
                                onChange={event => setType(event.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className={'mb-2'}>Informations</h4>
                    {type === 'BUY' ? (
                        <Buy
                            date={date}
                            setDate={setDate}
                            boughtAsset={boughtAsset}
                            setBoughtAsset={setBoughtAsset}
                            boughtQuantity={boughtQuantity}
                            setBoughtQuantity={setBoughtQuantity}
                            spentAsset={spentAsset}
                            setSpentAsset={setSpentAsset}
                            spentQuantity={spentQuantity}
                            setSpentQuantity={setSpentQuantity}
                            location={location}
                            setLocation={setLocation}
                            hash={hash}
                            setHash={setHash}
                            receptionAddress={receptionAddress}
                            setReceptionAddress={setReceptionAddress}
                            note={note}
                            setNote={setNote}
                            locations={locations}
                            fiatCurrencies={fiatCurrencies}
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
