import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Textarea from '@/components/Textarea'
import Button from '@/components/Button'
import { useLocationData } from '@/hooks/locations'

const EditLocationModal = ({ location, setIsOpen, isOpen }) => {
    const { updateLocation } = useLocationData({})

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [note, setNote] = useState('')
    const [errors, setErrors] = useState([]) //TODO : Do better
    const [status, setStatus] = useState(null) //TODO : Do better

    useEffect(() => {
        setId(location.id ?? '')
        setName(location.name ?? '')
        setNote(location.note ?? '')
    }, [location])

    const submitForm = async event => {
        event.preventDefault()

        updateLocation(
            id,
            {
                name,
                note,
            },
            setErrors,
            setStatus,
        )
            .then(() => {
                console.log('ok')
            })
            .catch(() => {
                console.log('pas ok')
            })
    }

    return (
        <Modal
            title={'Edit Location'}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            className={'flex flex-col gap-4'}>
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    value={name}
                    label={'Name'}
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
                    label={'Note'}
                    className="block mt-1 w-full h-32"
                    required
                    onChange={event => setNote(event.target.value)}
                    defaultValue={note}></Textarea>
            </div>
            <div className={'flex flex-row justify-end'}>
                <Button onClick={submitForm}>Save</Button>
            </div>
        </Modal>
    )
}

export default EditLocationModal
