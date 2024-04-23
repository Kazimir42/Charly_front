const Input = ({ disabled = false, className, ...props }) => (
    <input
        disabled={disabled}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:border-default-primary_lightest focus:ring focus:ring-default-primary_lightest focus:ring-opacity-50`}
        {...props}
    />
)

export default Input
