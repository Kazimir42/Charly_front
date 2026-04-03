import Link from 'next/link'
import AuthCard from '@/app/(auth)/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'

export const metadata = {
    title: 'Charly',
}

const Layout = ({ children }) => {
    return (
        <div className="font-sans text-gray-900 antialiased">
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo />
                    </Link>
                }>
                {children}
            </AuthCard>
        </div>
    )
}

export default Layout
