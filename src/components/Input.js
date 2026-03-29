const Input = ({ disabled = false, className, ...props }) => (
    <input
        disabled={disabled}
        className={`${className} rounded-lg border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
        {...props}
    />
)

export default Input
