const Input = ({ disabled = false, className, ...props }) => (
    <textarea
        disabled={disabled}
        className={`${className} rounded-lg w-full border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
        {...props}></textarea>
)

export default Input
