const Select = ({ items, disabled = false, className, ...props }) => (
    <select
        disabled={disabled}
        className={`${className} rounded-lg border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
        {...props}>
        {Object.entries(items).map(([key, item]) => (
            <option key={key} value={key}>
                {item}
            </option>
        ))}
    </select>
)

export { Select }
