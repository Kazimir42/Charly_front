const AuthCard = ({ logo, children }) => (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-50">
        <div>{logo}</div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white border border-slate-200 overflow-hidden sm:rounded-2xl">
            {children}
        </div>
    </div>
)

export default AuthCard
