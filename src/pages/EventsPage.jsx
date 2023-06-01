import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import DynamicTable from '../components/DynamicTable/DynamicTable'
import { styles } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useImageUploader } from '../components/ImageUploader/ImageUploaderHook'
import { toast } from 'react-toastify'
import { deleteEvent, getAllEventsOfShop } from '../redux/slices/eventSlice'

const EventsPage = () => {

    const { deleteImage } = useImageUploader();
    let { events, isLoading } = useSelector((state) => state.events);
    const { user } = useSelector((state) => state.seller);
    const [filteredData, setFilteredData] = useState([]);


    useEffect(() => {
        if (events && events.length > 0) {
            setFilteredData(
                events
                    .map(({ _id, images, name, discountPrice, stock, sold_out }) => ({
                        images,
                        _id,
                        name,
                        discountPrice,
                        stock,
                        sold_out,
                    }))
                    .sort((a, b) => a.name.localeCompare(b.name)) // Sort filteredData based on name
            );
        }
    }, [events]);


    const headers = [
        { title: "Product Name", value: 'name' },
        { title: "Price", value: 'discountPrice' },
        { title: "Stock", value: 'stock' },
        { title: "Sold Out", value: 'sold_out' },
        { title: "Actions", value: 'actions' }
    ]

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventsOfShop(user._id));
        console.log(events)
    }, [dispatch]);

    const handleEventDelete = async (res) => {
        try {
            const { _id, images } = res
            if (images && images.length > 0) {
                await Promise.all(images.map(async (imageUrl) => await deleteImage(imageUrl)));
            }
            dispatch(deleteEvent(_id))
        }
        catch (error) {
            console.log(error)
            toast.error("Error occured while deleting image")
        }

    }
    const hanldeViewEvent = (res) => {
        console.log(res)
    }

    return (
        <div className='App'>
            <div className="AppGlass2">
                <Sidebar active={3} />
                <div className={`${styles.tableContainer}`}>
                    <h2 className={`${styles.dashboardTitle}`}> All Events</h2>
                    <DynamicTable key={filteredData.length} tableData={filteredData} headers={headers} onDeleteAction={handleEventDelete} onViewAction={hanldeViewEvent} />
                </div>
            </div>
        </div>
    )
}

export default EventsPage
