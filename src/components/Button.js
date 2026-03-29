const variants = {
    primary:
        'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900',
    secondary:
        'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900',
}

const Button = ({
    type = 'submit',
    variant = 'primary',
    className,
    ...props
}) => (
    <button
        type={type}
        className={`${
            className ?? ''
        } flex justify-center rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 transition duration-200 ${
            variants[variant] ?? variants.primary
        }`}
        {...props}
    />
)

export default Button
