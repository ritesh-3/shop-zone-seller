import React from 'react'
import Sidebar from '../components/SideBar'
import CreateProduct from '../components/CreateProduct'

const CreateProductPage = () => {
    return (
        <div className="App">
            <div className="AppGlass2">
                <Sidebar active={4} />
                <CreateProduct />
            </div>
        </div>
    )
}

export default CreateProductPage
