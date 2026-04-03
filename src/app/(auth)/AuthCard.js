const AuthCard = ({ logo, children }) => (
    <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 bg-slate-900 items-center justify-center p-12">
            <div className="max-w-md text-center">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-12 w-12 text-blue-500">
                        <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                    </svg>
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
