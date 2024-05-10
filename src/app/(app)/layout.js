'use client'

import { useAuth } from '@/hooks/auth'
import Loading from '@/app/(app)/Loading'
import LeftNavigation from '@/app/(app)/LeftNavigation'
import Banner from '@/components/Banner'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading fullHeight={true} />
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Banner className={'lg:hidden flex'} />

            <LeftNavigation user={user} />

            <main className="lg:pl-72 lg:py-0 py-10">
                <Banner className={'mb-10 hidden lg:flex'} />
                <div className="px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
        </div>
    )
}

export default AppLayout
