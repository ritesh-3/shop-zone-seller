import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import DynamicTable from '../components/DynamicTable/DynamicTable'
import { styles } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useImageUploader } from '../components/ImageUploader/ImageUploaderHook'
import { getAllOrdersOfShop } from '../redux/slices/ordersSlice'
import { useNavigate } from 'react-router-dom'

const OrdersPage = () => {
    let { orders, isLoading } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.seller);
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrdersOfShop(user._id));
    }, [dispatch]);


    useEffect(() => {
        setFilteredData(
            orders && orders
                .map(({ _id, cart, totalPrice, status, createdAt }) => ({
                    _id,
                    quantity: cart.length,
                    totalPrice,
                    status,
                    createdAt
                }))
                .sort((a, b) => a.createdAt.localeCompare(b.createdAt)) // Sort filteredData based on name
        );
    }, [orders]);


    const headers = [
        { title: "Order Id", value: '_id' },
        { title: "Status", value: 'status' },
        { title: "Total Price", value: 'totalPrice' },
        { title: "Quantity", value: 'quantity' },
        { title: "Actions", value: 'actions2' }
    ]



    const hanldeViewEvent = (res) => {
        navigate(`/order/${res._id}`)
    }

    return (
        <div className='App'>
            <div className="AppGlass2">
                <Sidebar active={2} />
                <div className='flex flex-col items-center gap-10 mt-10'>
                    <h2 className={`${styles.dashboardTitle}`}> All Orders</h2>
                    <DynamicTable key={filteredData.length} tableData={filteredData} headers={headers} onViewAction={hanldeViewEvent} />
                </div>
            </div>
        </div>
    )
}

export default OrdersPage
