import React from 'react'
import Sidebar from '../components/SideBar'
import CreateEvent from '../components/CreateEvent'

const CreateEventPage = () => {
    return (
        <div className="App">
            <div className="AppGlass2">
                <Sidebar active={5} />
                <CreateEvent/>
            </div>
        </div>
    )
}

export default CreateEventPage
