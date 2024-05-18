import React from 'react'
import Tab from '@/components/Tab'

const Tabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className={'flex flex-row gap-5 border-gray-300 border-b'}>
            <Tab
                title={'Informations'}
                isActive={activeTab === 'informations'}
                setIsActive={() => setActiveTab('informations')}
            />
            <Tab
                title={'Fees'}
                isActive={activeTab === 'fees'}
                setIsActive={() => setActiveTab('fees')}
            />
            <Tab
                title={'Movements'}
                isActive={activeTab === 'movements'}
                setIsActive={() => setActiveTab('movements')}
            />
        </div>
    )
}

export default Tabs
