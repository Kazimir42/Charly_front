import React, { useState } from 'react'
import Modal from '@/components/Modal'
import Button from '@/components/Button'
import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

const CsvTransactionModal = ({ sendCsv, setIsOpen, isOpen, isSimulation }) => {
    const [uploadedFile, setUploadedFile] = useState(null)
    const [dragActive, setDragActive] = useState(false)

    const submitForm = async event => {
        event.preventDefault()

        const formData = new FormData()
        formData.append('file', uploadedFile)

        sendCsv(formData, isSimulation)

        if (!isSimulation) {
            openOrClose()
        }
    }

    function openOrClose() {
        setUploadedFile(null)
        setIsOpen(!isOpen)
    }

    const handleFileUpload = event => {
        const file = event.target.files[0]
        if (file && file.type === 'text/csv') {
            setUploadedFile(file)
        }
    }

    const handleDragOver = event => {
        event.preventDefault()
        setDragActive(true)
    }

    const handleDragLeave = () => {
        setDragActive(false)
    }

    const handleDrop = event => {
        event.preventDefault()
        setDragActive(false)
        const file = event.dataTransfer.files[0]
        if (file && file.type === 'text/csv') {
            setUploadedFile(file)
        }
    }

    return (
        <Modal
            title={'Import CSV'}
            setIsOpen={openOrClose}
            isOpen={isOpen}
            className={''}>
            {isSimulation ? (
                <p className={'text-gray-600'}>
                    Vous pouvez télécharger le fichier CSV d'exemple{' '}
                    <a
                        className={'text-default-primary underline'}
                        href={
                            process.env.NEXT_PUBLIC_BACKEND_URL +
                            '/csv/import_example.csv'
                        }
                        download>
                        ici
                    </a>
                </p>
            ) : (
                <p className={'text-gray-600'}>
                    Simulation OK, vous pouvez maintenant envoyer le fichier.
                </p>
            )}
            <form className={'flex flex-col gap-4'} onSubmit={submitForm}>
                {isSimulation ? (
                    <div
                        className={`col-span-full ${
                            dragActive
                                ? 'border-blue-500'
                                : 'border-gray-900/25'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}>
                        <div
                            className={
                                'mt-2 flex justify-center rounded-lg border-2 border-dashed px-6 py-10 duration-100 ' +
                                (dragActive
                                    ? 'border-default-primary bg-indigo-50'
                                    : 'border-gray-300')
                            }>
                            <div className="text-center">
                                <DocumentArrowDownIcon
                                    className="mx-auto h-12 w-12 text-gray-300"
                                    aria-hidden="true"
                                />
                                <div className="mt-4 inline text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="inline cursor-pointer font-semibold text-default-primary hover:text-default-primary_dark hover:underline">
                                        <span>Importer un fichier</span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                            accept="text/csv"
                                            onChange={handleFileUpload}
                                        />
                                    </label>
                                    <span className="pl-1">
                                        ou glisser-déposer
                                    </span>
                                </div>
                                {uploadedFile ? (
                                    <p className="mt-2 text-sm text-gray-500">
                                        {uploadedFile?.name}
                                    </p>
                                ) : (
                                    <p className="text-xs leading-5 text-gray-600">
                                        CSV jusqu'à 10 Mo
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="mt-2 text-sm text-gray-500">
                        {uploadedFile?.name}
                    </p>
                )}

                <div className={'flex flex-row justify-end'}>
                    <Button type="submit">
                        {isSimulation ? 'Simuler' : 'Envoyer'}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default CsvTransactionModal
