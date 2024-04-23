const Input = ({ disabled = false, className, ...props }) => (
    <textarea
        disabled={disabled}
        className={`${className} rounded-md w-full shadow-sm border-gray-300 focus:border-default-primary_lightest focus:ring focus:ring-default-primary_lightest focus:ring-opacity-50`}
        {...props}></textarea>
)

export default Input
