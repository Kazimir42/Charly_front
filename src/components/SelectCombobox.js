import { useEffect, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { Combobox } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SelectCombobox({
    id,
    name,
    placeholder,
    items,
    required,
    selectedItem,
    setSelectedItem,
    className,
    contentClassName,
}) {
    const [query, setQuery] = useState('')
    const [selectedLocalItem, setSelectedLocalItem] = useState(null)

    const filteredItems =
        query === ''
            ? items
            : items.filter(item => {
                  return item.name.toLowerCase().includes(query.toLowerCase())
              })

    useEffect(() => {
        if (selectedItem && items) {
            setSelectedLocalItem(items.find(item => item.id === selectedItem))
        } else {
            setSelectedLocalItem(null)
        }
    }, [selectedItem, items])

    return (
        <Combobox
            as="div"
            value={selectedLocalItem ?? ''}
            onChange={item => {
                setQuery('')
                setSelectedItem(item.id)
            }}>
            <div className={'relative ' + contentClassName}>
                <Combobox.Input
                    placeholder={placeholder}
                    id={id}
                    name={name}
                    required={!!required}
                    className={
                        'rounded-md shadow-sm border-gray-300 focus:border-default-primary_lightest focus:ring focus:ring-default-primary_lightest focus:ring-opacity-50 pr-12 w-full ' +
                        className
                    }
                    onChange={event => setQuery(event.target.value)}
                    displayValue={item => item?.name}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </Combobox.Button>

                {filteredItems.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full text-sm overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {filteredItems.map(item => (
                            <Combobox.Option
                                key={item.id}
                                value={item}
                                className={({ active }) =>
                                    classNames(
                                        'relative cursor-default select-none py-2 pl-3 pr-9 hover:cursor-pointer focus:outline-none',
                                        active
                                            ? 'bg-gray-100'
                                            : 'text-gray-900',
                                    )
                                }>
                                {({ active, selected }) => (
                                    <>
                                        <div className="flex items-center">
                                            {item.imageUrl ? (
                                                <img
                                                    src={item.imageUrl}
                                                    alt=""
                                                    className="h-6 w-6 flex-shrink-0 rounded-full"
                                                />
                                            ) : (
                                                <div
                                                    className={'h-6 w-6'}></div>
                                            )}
                                            <span
                                                className={classNames(
                                                    'ml-3 truncate',
                                                    selected && 'font-semibold',
                                                )}>
                                                {item.name}
                                            </span>
                                        </div>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                    active
                                                        ? 'text-default-primary'
                                                        : 'text-default-primary',
                                                )}>
                                                <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    )
}
