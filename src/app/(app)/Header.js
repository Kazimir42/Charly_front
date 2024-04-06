const Header = ({ className, title }) => {
    return (
        <header>
            <h2 className={'font-semibold text-3xl ' + className}>{title}</h2>
        </header>
    )
}

export default Header
