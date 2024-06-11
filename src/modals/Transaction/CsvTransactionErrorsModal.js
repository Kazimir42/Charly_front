import React from 'react'
import Modal from '@/components/Modal'
import { useAuth } from '@/hooks/auth'

const CsvTransactionErrorsModal = ({ errors, setIsOpen, isOpen }) => {
    const { user } = useAuth({
        middleware: 'auth',
    })

    function openOrClose() {
        setIsOpen(!isOpen)
    }

    return (
        <Modal
            title={'CSV Import Errors'}
            setIsOpen={openOrClose}
            isOpen={isOpen}
            className={''}>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className={'bg-red-400'}>
                        <tr>
                            <th
                                className={
                                    'px-3 py-3.5 pl-5 text-left text-white'
                                }>
                                Row
                            </th>
                            <th className={'px-3 py-3.5 text-left text-white'}>
                                Errors
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
