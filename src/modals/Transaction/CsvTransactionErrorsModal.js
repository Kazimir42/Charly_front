import React from 'react'
import Modal from '@/components/Modal'

const CsvTransactionErrorsModal = ({ errors, setIsOpen, isOpen }) => {
    function openOrClose() {
        setIsOpen(!isOpen)
    }

    return (
        <Modal
            title={"Erreurs d'import CSV"}
            setIsOpen={openOrClose}
            isOpen={isOpen}
            className={''}>
            <div className="overflow-hidden border-b border-gray-200">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className={''}>
                        <tr>
                            <th className={'px-3 py-2 text-left text-red-500'}>
                                Ligne
                            </th>
                            <th className={'px-3 py-2 text-left text-red-500'}>
                                Erreurs
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {errors.map((error, index) => (
                            <tr className={'border-t'} key={index}>
                                <td className={'px-3 py-3.5 pl-5 text-left'}>
                                    {index + 1}
                                </td>
                                <td className={'px-3 py-3.5 text-left'}>
                                    {error.map((message, index2) => (
                                        <p key={index2}>{message}</p>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Modal>
    )
}

export default CsvTransactionErrorsModal
