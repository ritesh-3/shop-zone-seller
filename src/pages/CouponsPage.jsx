import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import DynamicTable from '../components/DynamicTable/DynamicTable'
import { styles } from '../styles/styles'
import Modal from '../components/ModalComponent/Modal'
import { CreateCouponForm } from '../Data/FormData'
import { useDispatch, useSelector } from 'react-redux'
import DynamicForm from '../components/DynamicForm/DynamicForm'
import { toast } from 'react-toastify'
import axios from 'axios'
import { server } from '../ServerConfigs'

const ModalContainer = ({ isOpen, closeModal, handleSubmit }) => {
    const { products } = useSelector((state) => state.products);


    let mappedCouponForm = [];
    if (products && products.length > 0) {
        mappedCouponForm = CreateCouponForm.map((field) => {
            if (field.name === 'selectedProducts' && field.type === 'option') {
                const options = products.map((product) => ({
                    value: product._id,
                    label: product.name,
                }));

                return { ...field, options };
            }
            return field;
        });

    }



    return (
        <div>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <DynamicForm fields={mappedCouponForm} onSubmit={handleSubmit} submitBtnName='Create' />
            </Modal>
        </div>
    )
}



const CouponsPage = () => {
    const { user } = useSelector((state) => state.seller);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [coupouns, setCoupouns] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [errmsg, seterrmsg] = useState(null);

    //Loading Coupos of Shop
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${server}/coupon/get-coupon/${user._id}`, { withCredentials: true })
            .then((res) => {
                setIsLoading(false);
                setCoupouns(res.data.couponCodes);
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false);
            });
    }, []);

    // Filtering Coupoun list to render in UI
    useEffect(() => {
        if (coupouns && coupouns.length > 0) {
            setfilteredData(
                coupouns
                    .map(({ _id, name, value, minAmount, maxAmount }) => ({
                        _id,
                        name,
                        value,
                        minAmount,
                        maxAmount
                    }))
                    .sort((a, b) => a.name.localeCompare(b.name)) // Sort filteredData based on name
            );
        }
    }, [coupouns]);
    // Configuring Hedaers to render in UI
    const headers = [
        { title: "Coupon Code", value: 'name' },
        { title: "Discount", value: 'value' },
        { title: "Minimum Amount", value: 'minAmount' },
        { title: "Maximum Amount", value: 'maxAmount' },
        { title: "Discount", value: 'value' },
        { title: "Actions", value: 'actions' }
    ]

    //Invoked on delete
    const handleEventDelete = (resp) => {
        console.log(resp)
        axios.delete(`${server}/coupon/delete-coupon/${resp._id}`, { withCredentials: true }).then((res) => {
            toast.success("Coupon code deleted succesfully!");
            removeCouponFromist(resp.id)
        })
    }

    const removeCouponFromist = (id) => {
        const updatedCoupouns = coupouns.filter(item => item._id !== id)
        setCoupouns(updatedCoupouns);
    }

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    //Invoked on Form Submit 
    const handleSubmit = (values, actions) => {
        const couponPyaload = {
            name: values.name,
            minAmount: values.minAmount,
            maxAmount: values.maxAmount,
            selectedProducts: values.selectedProducts,
            value: values.discouptPercentage,
            shopId: user._id,
        }

        let createCoupounPromise = axios.post(`${server}/coupon/create-coupon-code`, couponPyaload, { withCredentials: true })
            .then((res) => {
                setIsOpen(false);
                actions.resetForm();
                setCoupouns([...coupouns, res.data.coupounCode])

            })
            .catch((error) => {
                seterrmsg(error.response.data.message)
                console.log(error.response.data.message)
            });

        toast.promise(createCoupounPromise, {
            pending: 'Creating...',
            success: "Coupon code created successfully!",
            error: errmsg
        })
    }

    return (
        <div className='App'>
            <div className="AppGlass2">
                <Sidebar active={7} />
                <div className='p-10'>
                    <div className='flex justify-between'>
                        <h2 className={`${styles.dashboardTitle}`}>Coupons</h2>
                        <button onClick={openModal} className={`${styles.gradientButton2}`}>
                            <span className={`${styles.gradientButton2_span}`}>
                                Create Coupon
                            </span>
                        </button>
                    </div>
                    <DynamicTable key={filteredData.length} tableData={filteredData} headers={headers} onDeleteAction={handleEventDelete} />
                </div>
            </div>
            <ModalContainer isOpen={isOpen} closeModal={closeModal} handleSubmit={handleSubmit} />
        </div>
    )
}

export default CouponsPage
