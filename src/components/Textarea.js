const Input = ({ disabled = false, className, ...props }) => (
    <textarea
        disabled={disabled}
        className={`${className} rounded-md w-full shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
        {...props}></textarea>
)

export default Input
