import React from 'react'
import { toast } from 'react-toastify'

const CustomToast = ({ closeToast }) => (
    <div style={{ backgroundColor: 'blue', padding: '20px' }}>
        <h4 style={{ color: 'white' }}>Succès !</h4>
        <p style={{ color: 'white' }}>Compte mis à jour avec succès !</p>
        <button onClick={closeToast}>Fermer</button>
    </div>
)

toast(<CustomToast />, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
})
