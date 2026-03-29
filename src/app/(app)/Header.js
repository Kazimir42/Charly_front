const Header = ({ className, title }) => {
    return (
        <header>
            <h2
                className={
                    'font-semibold text-2xl text-slate-900 ' + className
                }>
                {title}
            </h2>
        </header>
    )
}

export default Header
