import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Transition } from '@headlessui/react'

const Modal = ({ setIsOpen, isOpen, title, children, className }) => {
    const toggleModal = () => setIsOpen(!isOpen)

    const handleBackgroundClick = event => {
        if (event.target === event.currentTarget) {
            toggleModal()
        }
    }

    return (
        <Transition show={isOpen} as={React.Fragment}>
            <div className="fixed inset-0 z-50 flex justify-center items-center">
                <Transition.Child
                    as={React.Fragment}
                    enter="transition-opacity ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        aria-hidden="true"
                        onClick={handleBackgroundClick}></div>
                </Transition.Child>
                <Transition.Child
                    as={React.Fragment}
                    enter="transition ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95">
                    <div className="relative p-4 w-full max-w-3xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {title}
                                </h3>
                                <button
                                    type="button"
                                    className="hover:bg-gray-50 hover:text-default-primary rounded-lg p-1"
                                    onClick={toggleModal}>
                                    <span className="sr-only">Close modal</span>
                                    <XMarkIcon
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            <div className={`p-4 ${className}`}>{children}</div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Transition>
    )
}

export default Modal
