import React, { useState } from 'react'
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import Buy from '@/app/modals/TransactionParts/Buy'

const CreateTransactionModal = ({
    setIsOpen,
    isOpen,
    createTransaction,
    locations,
}) => {
    const [type, setType] = useState(null)
    const [date, setDate] = useState('')
    const [boughtAsset, setBoughtAsset] = useState(0)
    const [boughtQuantity, setBoughtQuantity] = useState(0)
    const [spentAsset, setSpentAsset] = useState(0)
    const [spentQuantity, setSpentQuantity] = useState(0)
    const [location, setLocation] = useState(0)

    const submitForm = async event => {
        event.preventDefault()

        createTransaction({
            type,
            date,
        })

        setType('')
    }

    function openOrClose() {
        setType(null)
        setDate(null)
        setBoughtAsset(null)
        setBoughtQuantity(null)
        setSpentAsset(null)
        setSpentQuantity(null)
        setLocation(null)
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
                                value={'buy'}
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
                                value={'sell'}
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
                                value={'receive'}
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
                                value={'withdraw'}
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
                                value={'swap'}
                                label={'Swap'}
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
                    {type === 'buy' ? (
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
                            locations={locations}
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
