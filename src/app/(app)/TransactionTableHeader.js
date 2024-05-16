import React from 'react'
import Input from '@/components/Input'
import {
    ArrowRightIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from '@heroicons/react/16/solid'
import { Select } from '@/components/Select'
import { TransactionType } from '@/enums/TransactionType'
import Link from 'next/link'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import SelectCombobox from '@/components/SelectCombobox'

const TransactionTableHeader = ({
    searchLocation,
    searchType,
    searchToAsset,
    searchFromAsset,
    searchFromDate,
    setSearchToAsset,
    searchUnitPrice,
    searchTotalPrice,
    searchToDate,
    orderBy,
    orderDirection,
    setSearchFromAsset,
    setSearchFromDate,
    setSearchLocation,
    setSearchToDate,
    setSearchTotalPrice,
    setSearchType,
    setSearchUnitPrice,
    submitForm,
    submitFormWithOrder,
    locations,
    searchTaxable,
    setSearchTaxable,
    currencies,
    multiSelectorIsSelected,
    setMultiSelectorIsSelected,
}) => {
    function HeaderTitle({ title, name, className }) {
        return (
            <button
                key={name}
                onClick={() => submitFormWithOrder(name)}
                className={
                    'flex flex-row gap-1 items-center hover:font-bold  ' +
                    className
                }>
                {title}
                <OrderIndicator field={name} />
            </button>
        )
    }

    function OrderIndicator({ field }) {
        if (orderBy === field) {
            return orderDirection === 'desc' ? (
                <ChevronDownIcon className={'h-4 w-4'} />
            ) : (
                <ChevronUpIcon className={'h-4 w-4'} />
            )
        }
        return null
    }

    return (
        <>
            <tr>
                <th className={'px-3 py-3.5 pl-5 text-left'}></th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    }>
                    <div
                        key={'searchDate'}
                        className={'flex flex-row gap-1 w-fit items-center'}>
                        <Input
                            type={'datetime-local'}
                            className={'text-sm p-1.5 w-28'}
                            name={'searchFromDate'}
                            value={searchFromDate ?? ''}
                            onChange={e => setSearchFromDate(e.target.value)}
                        />
                        <ArrowRightIcon className={'h-4 w-4'} />
                        <Input
                            form={'filterForm'}
                            type={'datetime-local'}
                            className={'text-sm p-1.5 w-28'}
                            name={'searchToDate'}
                            value={searchToDate ?? ''}
                            onChange={e => setSearchToDate(e.target.value)}
                        />
                    </div>
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    }>
                    <Select
                        key={'searchType'}
                        className={'text-sm py-1.5'}
                        name={'searchType'}
                        value={searchType ?? ''}
                        onChange={e => setSearchType(e.target.value)}
                        items={{
                            '': '',
                            IN: TransactionType.IN,
                            OUT: TransactionType.OUT,
                            SWAP: TransactionType.SWAP,
                        }}></Select>
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    }>
                    <SelectCombobox
                        key={'searchFromAsset'}
                        id="searchFromAsset"
                        name="searchFromAsset"
                        className={'text-sm py-1.5 flex flex-row ml-auto w-fit'}
                        placeholder={'Choose an asset'}
                        selectedItem={parseInt(searchFromAsset)}
                        setSelectedItem={setSearchFromAsset}
                        items={[
                            [{ id: 0, name: '' }],
                            ...currencies.reduce((acc, currency) => {
                                acc.push({
                                    id: currency.id,
                                    name: currency.symbol + ' ' + currency.name,
                                    showedName: (
                                        <div
                                            className={
                                                'flex flex-row justify-between gap-1.5'
                                            }>
                                            <span>{currency.name}</span>
                                            <span className={'text-gray-400'}>
                                                {currency.symbol}
                                            </span>
                                        </div>
                                    ),
                                    imageUrl:
                                        process.env.NEXT_PUBLIC_BACKEND_URL +
                                        '/currencies/logo/' +
                                        currency.symbol +
                                        '.svg',
                                })
                                return acc
                            }, []),
                        ]}
                    />
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    }>
                    <SelectCombobox
                        key={'searchToAsset'}
                        id="searchToAsset"
                        name="searchToAsset"
                        className={'text-sm py-1.5 flex flex-row w-fit'}
                        contentClassName={'w-fit'}
                        placeholder={'Choose an asset'}
                        selectedItem={parseInt(searchToAsset)}
                        setSelectedItem={setSearchToAsset}
                        items={[
                            [{ id: 0, name: '' }],
                            ...currencies.reduce((acc, currency) => {
                                acc.push({
                                    id: currency.id,
                                    name: currency.symbol + ' ' + currency.name,
                                    showedName: (
                                        <div
                                            className={
                                                'flex flex-row justify-between gap-1.5'
                                            }>
                                            <span>{currency.name}</span>
                                            <span className={'text-gray-400'}>
                                                {currency.symbol}
                                            </span>
                                        </div>
                                    ),
                                    imageUrl:
                                        process.env.NEXT_PUBLIC_BACKEND_URL +
                                        '/currencies/logo/' +
                                        currency.symbol +
                                        '.svg',
                                })
                                return acc
                            }, []),
                        ]}
                    />
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    }>
                    <Input
                        key={'searchTotalPrice'}
                        type={'number'}
                        className={'text-sm p-1.5'}
                        name={'searchTotalPrice'}
                        value={searchTotalPrice ?? ''}
                        onChange={e => setSearchTotalPrice(e.target.value)}
                    />
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    }>
                    <Input
                        key={'searchUnitPrice'}
                        type={'number'}
                        className={'text-sm p-1.5'}
                        name={'searchUnitPrice'}
                        value={searchUnitPrice ?? ''}
                        onChange={e => setSearchUnitPrice(e.target.value ?? '')}
                    />
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    }>
                    <Select
                        key={'searchLocation'}
                        className={'text-sm py-1.5'}
                        name={'searchLocation'}
                        value={searchLocation ?? ''}
                        onChange={e => setSearchLocation(e.target.value)}
                        items={locations?.reduce(
                            (accumulator, location) => {
                                accumulator[location.id] = location.name
                                return accumulator
                            },
                            { '': '' },
                        )}></Select>
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    }>
                    <Input
                        key={'searchTaxable'}
                        type={'checkbox'}
                        className={'text-sm p-2'}
                        name={'searchTaxable'}
                        checked={searchTaxable}
                        value={searchTaxable}
                        onChange={e =>
                            setSearchTaxable(e.target.checked ? 1 : 0)
                        }
                    />
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900 pr-5'
                    }>
                    <form
                        key={'filterForm'}
                        id={'filterForm'}
                        className={'flex flex-row justify-end gap-1'}
                        onSubmit={submitForm}>
                        <Link
                            href={'/transactions'}
                            className="hover:text-gray-700 text-gray-500 p-1 duration-100 transition">
                            <CloseIcon className="h-6 w-6" />
                        </Link>
                        <button
                            type={'submit'}
                            className="hover:text-gray-700 text-gray-500 p-1 duration-100 transition">
                            <MagnifyingGlassIcon className="h-6 w-6" />
                        </button>
                    </form>
                </th>
            </tr>
            <tr>
                <th className={'px-3 py-3.5 pl-5 text-left'}>
                    <Input
                        checked={multiSelectorIsSelected}
                        onChange={setMultiSelectorIsSelected}
                        type="checkbox"
                        className={'h-5 w-5'}
                    />
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900 '
                    }>
                    <HeaderTitle key={'date'} title={'Date'} name={'date'} />
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    }>
                    <HeaderTitle key={'type'} title={'Type'} name={'type'} />
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    }>
                    <HeaderTitle
                        key={'from_quantity'}
                        title={'Asset Out'}
                        name={'from_quantity'}
                        className={'ml-auto'}
                    />
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    }>
                    <HeaderTitle
                        key={'to_quantity'}
                        title={'Asset In'}
                        name={'to_quantity'}
                    />
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    }>
                    <HeaderTitle
                        key={'total_price'}
                        title={'Price'}
                        name={'total_price'}
                    />
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    }>
                    <HeaderTitle
                        key={'unit_price'}
                        title={'Unit price'}
                        name={'unit_price'}
                    />
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    }>
                    <HeaderTitle
                        key={'location_id'}
                        title={'Location'}
                        name={'location_id'}
                    />
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    }>
                    <HeaderTitle
                        key={'taxable'}
                        title={'Taxable'}
                        name={'taxable'}
                    />
                </th>
                <th
                    className={
                        'px-3 py-3.5 text-left text-sm font-semibold text-gray-900 pr-5'
                    }></th>
            </tr>
        </>
    )
}

export default TransactionTableHeader
