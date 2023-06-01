import React from 'react'
import Sidebar from '../components/SideBar'
import MainDash from '../components/MainDash'
import RightSide from '../components/RightSide'

const DashboardPage = () => {
    return (
        <div className="App">
            <div className="AppGlass">
                <Sidebar active={0} />
                <MainDash />
                <RightSide />
            </div>
        </div>
    )
}

export default DashboardPage
