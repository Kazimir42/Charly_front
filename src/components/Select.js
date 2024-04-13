const Select = ({ items, disabled = false, className, ...props }) => (
    <select
        disabled={disabled}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
        {...props}>
        {Object.entries(items).map(([key, item]) => (
            <option key={key} value={key}>
                {item}
            </option>
        ))}
    </select>
)

export { Select }
