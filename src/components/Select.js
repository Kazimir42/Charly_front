const Select = ({ items, disabled = false, className, ...props }) => (
    <select
        disabled={disabled}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:border-default-primary_lightest focus:ring focus:ring-default-primary_lightest focus:ring-opacity-50`}
        {...props}>
        {Object.entries(items).map(([key, item]) => (
            <option key={key} value={key}>
                {item}
            </option>
        ))}
    </select>
)

export { Select }
