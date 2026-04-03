import React from 'react'
import Button from '@/components/Button'

const CreateTaxReportForm = ({ submitCreateForm }) => {
    return (
        <form onSubmit={submitCreateForm} className={'flex flex-col'}>
            <h3 className={'font-semibold text-xl mb-2'}>
                Aucun rapport fiscal trouvé
            </h3>
            <p className={'block font-medium text-sm text-gray-700 mb-4'}>
                Le rapport fiscal est basé sur les transactions effectuées dans
                l'année sélectionnée pour la résidence fiscale indiquée dans le
                profil.
            </p>
            <Button className={'w-fit'}>Créer le rapport</Button>
        </form>
    )
}

export default CreateTaxReportForm
