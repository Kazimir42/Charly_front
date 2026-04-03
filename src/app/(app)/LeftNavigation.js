import { Fragment, useEffect, useState } from 'react'
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import {
    Bars3Icon,
    ChartPieIcon,
    MagnifyingGlassIcon,
    HashtagIcon,
    HomeIcon,
    XMarkIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline'

import { useAuth } from '@/hooks/auth'
import { useAssetData } from '@/hooks/assets'
import Dropdown from '@/components/Dropdown'
import DropdownLink, { DropdownButton } from '@/components/DropdownLink'
import { usePathname } from 'next/navigation'
import { WalletIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const LeftNavigation = ({ user }) => {
    const pathname = usePathname()
    const { logout } = useAuth()

    const { getAssets } = useAssetData()

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [assets, setAssets] = useState([])

    useEffect(() => {
        getAssets().then(data => {
            if (!data) return
            const grouped = {}
            data.forEach(asset => {
                const symbol = asset.currency?.symbol
                if (symbol && !grouped[symbol]) {
                    grouped[symbol] = {
                        id: asset.id,
                        name: asset.currency?.name,
                        initial: symbol,
                    }
                }
            })
            setAssets(Object.values(grouped))
        })
    }, [])

    const navigation = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: HomeIcon,
            current: pathname === '/dashboard',
        },
        {
            name: 'Transactions',
            href: '/transactions',
            icon: HashtagIcon,
            current: pathname === '/transactions',
        },
        {
            name: 'History',
            href: '/history',
            icon: MagnifyingGlassIcon,
            current: pathname === '/history',
        },
        {
            name: 'Tax report',
            href: '/tax-report/' + (new Date().getFullYear() - 1),
            icon: DocumentTextIcon,
            current: pathname.includes('/tax-report/'),
        },
        {
            name: 'Stats',
            href: '/stats',
            icon: ChartPieIcon,
            current: pathname === '/stats',
        },
    ]

    return (
        <>
            <Transition show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50 lg:hidden"
                    onClose={setSidebarOpen}>
                    <TransitionChild
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </TransitionChild>

                    <div className="fixed inset-0 flex">
                        <TransitionChild
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full">
                            <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <TransitionChild
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button
                                            type="button"
                                            className="-m-2.5 p-2.5"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }>
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </TransitionChild>
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-2">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <WalletIcon
                                            className={'h-8 w-8 text-white'}
                                        />
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul
                                            role="list"
                                            className="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul
                                                    role="list"
                                                    className="-mx-2 space-y-1">
                                                    {navigation.map(item => (
                                                        <li key={item.name}>
                                                            <Link
                                                                href={item.href}
                                                                className={classNames(
                                                                    item.current
                                                                        ? 'bg-slate-800 text-white'
                                                                        : 'text-slate-400 hover:text-white hover:bg-slate-800',
                                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                                                )}>
                                                                <item.icon
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'text-white'
                                                                            : 'text-slate-500 group-hover:text-white',
                                                                        'h-6 w-6 shrink-0',
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                            <li>
                                                <div className="text-xs font-semibold leading-6 text-slate-500">
                                                    Locations
                                                </div>
                                                <ul
                                                    role="list"
                                                    className="-mx-2 mt-2 space-y-1">
                                                    {assets.map(asset => {
                                                        const href =
                                                            '/assets/' +
                                                            asset.initial
                                                        const isCurrent =
                                                            pathname === href
                                                        return (
                                                            <li
                                                                key={
                                                                    asset.initial
                                                                }>
                                                                <Link
                                                                    href={href}
                                                                    className={classNames(
                                                                        isCurrent
                                                                            ? 'bg-slate-800 text-white'
                                                                            : 'text-slate-400 hover:text-white hover:bg-slate-800',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                                                    )}>
                                                                    <span
                                                                        className={classNames(
                                                                            isCurrent
                                                                                ? 'text-blue-400 border-blue-400'
                                                                                : 'text-slate-400 border-slate-600 group-hover:border-blue-400 group-hover:text-blue-400',
                                                                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium',
                                                                        )}>
                                                                        {
                                                                            asset.initial
                                                                        }
                                                                    </span>
                                                                    <span className="truncate">
                                                                        {
                                                                            asset.name
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>

            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6">
                    <div className="flex h-16 shrink-0 items-center gap-2">
                        <WalletIcon className={'h-8 w-8 text-white'} />
                        <span className={'text-white font-bold text-xl'}>
                            Charly
                        </span>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map(item => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-slate-800 text-white'
                                                        : 'text-slate-400 hover:text-white hover:bg-slate-800',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                                )}>
                                                <item.icon
                                                    className={classNames(
                                                        item.current
                                                            ? 'text-white'
                                                            : 'text-slate-500 group-hover:text-white',
                                                        'h-6 w-6 shrink-0',
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <div className="text-xs font-semibold leading-6 text-slate-500">
                                    Your assets
                                </div>
                                <ul
                                    role="list"
                                    className="-mx-2 mt-2 space-y-1">
                                    {assets.map(asset => {
                                        const href = '/assets/' + asset.initial
                                        const isCurrent = pathname === href
                                        return (
                                            <li
                                                key={asset.initial}
                                                className={'flex w-full'}>
                                                <Link
                                                    href={href}
                                                    className={classNames(
                                                        isCurrent
                                                            ? 'bg-slate-800 text-white'
                                                            : 'text-slate-400 hover:text-white hover:bg-slate-800',
                                                        'group grow flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                                    )}>
                                                    <span
                                                        className={classNames(
                                                            isCurrent
                                                                ? 'text-blue-400 border-blue-400'
                                                                : 'text-slate-400 border-slate-600 group-hover:border-blue-400 group-hover:text-blue-400',
                                                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium',
                                                        )}>
                                                        {asset.initial}
                                                    </span>
                                                    <span className="truncate content-center">
                                                        {asset.name}
                                                    </span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                            <li className="-mx-6 mt-auto">
                                <Dropdown
                                    align="right"
                                    width="48"
                                    openDirection="up"
                                    trigger={
                                        <button className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-slate-300 hover:bg-slate-800 w-full ">
                                            <span className="sr-only">
                                                Your profile
                                            </span>
                                            <span aria-hidden="true">
                                                {user?.name}
                                            </span>

                                            <div className="ml-auto">
                                                <svg
                                                    className="fill-current h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </button>
                                    }>
                                    <DropdownLink href={'/my-account'}>
                                        My account
                                    </DropdownLink>
                                    <DropdownButton onClick={logout}>
                                        Logout
                                    </DropdownButton>
                                </Dropdown>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                    onClick={() => setSidebarOpen(true)}>
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
                    Dashboard
                </div>
                <Dropdown
                    align="right"
                    width="48"
                    trigger={
                        <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                            <div>{user?.name}</div>

                            <div className="ml-1">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </button>
                    }>
                    <DropdownLink href={'/my-account'}>My account</DropdownLink>
                    <DropdownButton onClick={logout}>Logout</DropdownButton>
                </Dropdown>
            </div>
        </>
    )
}

export default LeftNavigation
