const Button = ({ type = 'submit', className, ...props }) => (
    <button
        type={type}
        className={`${
            className ?? ''
        } flex justify-center rounded-md bg-default-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-default-primary_light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-default-primary0 transition duration-200`}
        {...props}
    />
)

export default Button
