import React from 'react'
import { Menu, Transition } from '@headlessui/react'

const Dropdown = ({
    align = 'right',
    width = 48,
    contentClasses = 'py-1 bg-white',
    trigger,
    children,
    openDirection = 'down',
}) => {
    let alignmentClasses

    switch (width) {
        case '48':
            width = 'w-48'
            break
    }

    let directionClasses = ''

    if (openDirection === 'up') {
        directionClasses = 'bottom-full mb-2'
    } else {
        directionClasses = 'mt-2'
    }

    switch (align) {
        case 'left':
            alignmentClasses = `origin-bottom-left left-0 ${
                openDirection === 'up' ? 'bottom-full' : ''
            }`
            break
        case 'top':
            alignmentClasses = `origin-top ${
                openDirection === 'up' ? 'bottom-full' : ''
            }`
            break
        case 'right':
        default:
            alignmentClasses = `origin-bottom-right right-0 ${
                openDirection === 'up' ? 'bottom-full' : ''
            }`
            break
    }

    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <Menu.Button as={React.Fragment}>{trigger}</Menu.Button>

                    <Transition
                        show={open}
                        enter={
                            openDirection === 'down'
                                ? 'transition ease-out duration-200'
                                : ''
                        }
                        enterFrom={
                            // Todo : fix me
                            openDirection === 'down'
                                ? 'transform opacity-0 scale-95'
                                : ''
                        }
                        enterTo={
                            // Todo : fix me
                            openDirection === 'down'
                                ? 'transform opacity-100 scale-100'
                                : ''
                        }
                        leave={
                            // Todo : fix me
                            openDirection === 'down'
                                ? 'transition ease-in duration-75'
                                : ''
                        }
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <div
                            className={`absolute z-50 ${directionClasses} ${width} rounded-md shadow-lg ${alignmentClasses}`}>
                            <Menu.Items
                                className={`rounded-md focus:outline-none ring-1 ring-black ring-opacity-5 ${contentClasses}`}
                                static>
                                {children}
                            </Menu.Items>
                        </div>
                    </Transition>
                </>
            )}
        </Menu>
    )
}

export default Dropdown
