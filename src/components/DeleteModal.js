import React from 'react'
import Modal from '@/components/Modal'
import Button from '@/components/Button'

const DeleteModal = ({
    id,
    setIsOpen,
    isOpen,
    deleteObject,
    title,
    content,
}) => {
    const submitForm = async event => {
        event.preventDefault()

        deleteObject(id)
    }

    return (
        <Modal
            title={title}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            className={''}>
            <form className={'flex flex-col gap-4'} onSubmit={submitForm}>
                <div className={'block font-medium text-sm text-gray-700'}>
                    {content}
                </div>
                <div className={'flex flex-row justify-end'}>
                    <Button
                        type="submit"
                        className={'bg-red-500 hover:bg-red-600'}>
                        Delete
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default DeleteModal
