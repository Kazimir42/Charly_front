import { CharlyIcon } from '@/components/ApplicationLogo'

const AuthCard = ({ logo, children }) => (
    <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 bg-slate-900 items-center justify-center p-12">
            <div className="max-w-md text-center">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <CharlyIcon className="h-12 w-12" />
                    <span className="text-3xl font-bold text-white">
                        Charly
                    </span>
                </div>
                <p className="text-lg text-slate-400 leading-relaxed">
                    Gérez vos cryptos en toute simplicité.
                    <br />
                    Suivez vos investissements et simplifiez vos déclarations
                    fiscales.
                </p>
            </div>
        </div>

        <div className="flex w-full lg:w-1/2 flex-col items-center justify-center bg-slate-50 px-6 py-12">
            <div className="w-full max-w-sm">
                <div className="mb-8 lg:hidden">{logo}</div>
                <div className="rounded-xl border border-slate-200 bg-white px-6 py-8 sm:px-8">
                    {children}
                </div>
            </div>
        </div>
    </div>
)

export default AuthCard
