const Label = ({ className, children, ...props }) => (
    <label
        className={`${
            className ?? ''
        } block text-xs font-medium uppercase tracking-wider text-slate-500`}
        {...props}>
        {children}
    </label>
)

export default Label
