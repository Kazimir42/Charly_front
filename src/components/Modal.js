import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const Modal = ({ setIsOpen, isOpen, title, children, className}) => {
    const toggleModal = () => setIsOpen(!isOpen)

    return (
        <>
            {isOpen && (
                <div
                    className="overflow-y-auto overflow-x-hidden fixed top-0 bg-black bg-opacity-50 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full flex"
                    aria-hidden="true">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                                <h3 className="text-lg font-semibold text-gray-900 ">
                                    {title}
                                </h3>
                                <button
                                    type="button"
                                    className="  hover:bg-gray-50 hover:text-indigo-600 rounded-lg p-1 "
                                    onClick={toggleModal}>
                                    <span className="sr-only">Close modal</span>
                                    <XMarkIcon
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            <div className={' p-4 ' + className}>{children}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal
