import { WalletIcon } from '@heroicons/react/24/solid'

const ApplicationLogo = ({ className }) => (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
        <WalletIcon className="h-8 w-8 text-slate-900" />
        <span className="text-xl font-bold text-slate-900">Charly</span>
    </div>
)

export default ApplicationLogo
