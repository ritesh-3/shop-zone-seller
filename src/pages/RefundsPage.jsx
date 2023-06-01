import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import DynamicTable from '../components/DynamicTable/DynamicTable'
import { styles } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useImageUploader } from '../components/ImageUploader/ImageUploaderHook'
import { toast } from 'react-toastify'
import { deleteEvent, getAllEventsOfShop } from '../redux/slices/eventSlice'
import { getAllOrdersOfShop } from '../redux/slices/ordersSlice'

const RefundsPage = () => {
    const { orders, isLoading } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.seller);
    const [refundOrders, setrefundOrders] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersOfShop(user._id));
    }, [dispatch]);

    useEffect(() => {
        const filteredOrders = orders && orders.filter((item) => item.status === "Processing refund" || item.status === "Refund Success");
        setrefundOrders(filteredOrders)
    }, [orders])


    const headers = [
        { title: "Order Id", value: '_id' },
        { title: "Status", value: 'status' },
        { title: "Total Price", value: 'totalPrice' },
        { title: "Quantity", value: 'quantity' },
        // { title: "Actions", value: 'actions2' }
    ]



    return (
        <div className='App'>
            <div className="AppGlass2">
                <Sidebar active={8} />
                <div className={`${styles.tableContainer}`}>
                    <h2 className={`${styles.dashboardTitle}`}> All Refunds</h2>
                    <DynamicTable key={refundOrders.length} tableData={refundOrders} headers={headers}/>
                </div>
            </div>
        </div>
    )
}

export default RefundsPage
