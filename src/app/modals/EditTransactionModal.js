import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Textarea from '@/components/Textarea'
import Button from '@/components/Button'

const EditTransactionModal = ({ transaction, setIsOpen, isOpen, updateTransaction }) => {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [note, setNote] = useState('')

    useEffect(() => {
        setId(transaction?.id ?? '')
        setName(transaction?.name ?? '')
        setNote(transaction?.note ?? '')
    }, [transaction])

    const submitForm = async event => {
        event.preventDefault()

        updateTransaction(id, {
            name,
            note,
        })
    }

    return (
        <Modal
            title={'Edit Transaction'}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            className={''}>
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
                    <Label htmlFor="note">Note</Label>
                    <Textarea
                        id={'note'}
                        className="block mt-1 w-full h-32"
                        onChange={event => setNote(event.target.value)}
                        defaultValue={note}
                    />
                </div>
                <div className={'flex flex-row justify-end'}>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </Modal>
    )
}

export default EditTransactionModal
