import '@/app/global.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
    title: 'Charly',
}
const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
                <ToastContainer />
            </body>
        </html>
    )
}

export default RootLayout
