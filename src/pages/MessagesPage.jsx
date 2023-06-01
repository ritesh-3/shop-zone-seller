import React from 'react'
import Sidebar from '../components/SideBar'
import { styles } from '../styles/styles'

const MessagesPage = () => {
    return (
        <div className='App'>
            <div className="AppGlass2">
                <Sidebar active={6} />
                <div className='flex flex-col items-center gap-10 mt-10'>
                    <h2 className={`${styles.dashboardTitle}`}>Messages</h2>
                    {/* <DynamicTable key={filteredData.length} tableData={filteredData} headers={headers} onViewAction={hanldeViewEvent} /> */}
                </div>
            </div>
        </div>
    )
}

export default MessagesPage
