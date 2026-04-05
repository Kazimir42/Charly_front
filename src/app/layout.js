import '@/app/global.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
    title: 'Charly - Gestion de portefeuille crypto & fiscalité',
    description:
        'Suivez votre portefeuille crypto en temps réel, centralisez vos plateformes et générez vos déclarations fiscales.',
}
const RootLayout = ({ children }) => {
    return (
        <html lang="fr">
            <body className="font-sans antialiased">
                {children}
                <ToastContainer />
            </body>
        </html>
    )
}

export default RootLayout
