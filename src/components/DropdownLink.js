import Link from 'next/link'
import { MenuItem } from '@headlessui/react'

const DropdownLink = ({ children, className, ...props }) => (
    <MenuItem>
        {({ active }) => (
            <Link
                {...props}
                className={
                    className
                        ? `w-full block ${className}`
                        : `w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
                              active ? 'bg-slate-50' : ''
                          } focus:outline-none transition duration-150 ease-in-out`
                }>
                {children}
            </Link>
        )}
    </MenuItem>
)

export const DropdownButton = ({ children, className, ...props }) => (
    <MenuItem>
        {({ active }) => (
            <button
                onClick={e => {
                    e.preventDefault()
                }}
                className={
                    className
                        ? `w-full ${className}`
                        : `w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
                              active ? 'bg-slate-50' : ''
                          } focus:outline-none transition duration-150 ease-in-out`
                }
                {...props}>
                {children}
            </button>
        )}
    </MenuItem>
)

export default DropdownLink
