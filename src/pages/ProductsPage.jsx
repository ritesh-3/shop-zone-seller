import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import DynamicTable from '../components/DynamicTable/DynamicTable'
import { styles } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProductsShop } from '../redux/slices/productSlice'
import { useImageUploader } from '../components/ImageUploader/ImageUploaderHook'
import { toast } from 'react-toastify'
import { server, userAppURL } from '../ServerConfigs'

const ProductsPage = () => {

    const { deleteImage } = useImageUploader();
    let { products, isLoading } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.seller);
    const [filteredData, setFilteredData] = useState([]);


    useEffect(() => {
        if (products && products.length > 0) {
            setFilteredData(
                products
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
    }, [products]);



    const headers = [
        { title: "Product Name", value: 'name' },
        { title: "Price", value: 'discountPrice' },
        { title: "Stock", value: 'stock' },
        { title: "Sold Out", value: 'sold_out' },
        { title: "Actions", value: 'actions' }
    ]

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductsShop(user._id));
        // console.log(products)
    }, [dispatch]);

    const handleProductDelete = async (res) => {
        try {
            const { _id, images } = res
            if (images && images.length > 0) {
                await Promise.all(images.map(async (imageUrl) => await deleteImage(imageUrl)));
            }
            dispatch(deleteProduct(_id))
        }
        catch (error) {
            console.log(error)
            toast.error("Error occured while deleting image")
        }

    }
    const hanldeViewProduct = (res) => {
        const url = `${userAppURL}product/${res._id}`
        window.open(url,"_blank")
    }

    return (
        <div className='App'>
            <div className="AppGlass2">
                <Sidebar active={1} />
                <div className={`${styles.tableContainer}`}>
                    <h2 className={`${styles.dashboardTitle}`}> All Products</h2>
                    <DynamicTable key={filteredData.length} tableData={filteredData} headers={headers} onDeleteAction={handleProductDelete} onViewAction={hanldeViewProduct} />
                </div>
            </div>
        </div>
    )
}

export default ProductsPage
