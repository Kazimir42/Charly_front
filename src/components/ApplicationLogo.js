export const CharlyIcon = ({ className }) => (
    <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}>
        <rect width="32" height="32" rx="8" fill="#3B82F6" />
        <path
            d="M20 11a7 7 0 1 0 0 10"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
        />
        <path
            d="M20 11l4-4m0 0h-3m3 0v3"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const ApplicationLogo = ({ className, dark = false }) => (
    <div className={`flex items-center gap-2.5 ${className ?? ''}`}>
        <CharlyIcon className="h-8 w-8" />
        <span
            className={`text-xl font-bold ${
                dark ? 'text-white' : 'text-slate-900'
            }`}>
            Charly
        </span>
    </div>
)

export default ApplicationLogo
