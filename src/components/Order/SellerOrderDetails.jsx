import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { getAllOrdersOfUser } from "../../redux/slices/ordersSlice";
import { styles } from "../../styles/styles";
import "./orderdetails.css";
import { server } from "../../ServerConfigs";
import { toast } from "react-toastify";
import OrderStatusUpdate from "./UpdateOrder";
import OrderRefund from "./UpdateRefund";



const SellerOrderDetails = () => {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [rating, setRating] = useState(1);

    const { orders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user?._id));
    }, [dispatch]);

    const { id } = useParams();
    const data = orders && orders.find((item) => item._id === id);


    const refundHandler = async () => {
        await axios.put(`${server}/order/order-refund/${id}`, {
            status: "Processing refund"
        }).then((res) => {
            toast.success(res.data.message);
            dispatch(getAllOrdersOfUser(user?._id));
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    };

    const renderOrderItems = () => {
        return (
            data?.cart.map((item, index) => (
                <div className="order-item" key={index}>
                    <div className="item-image">
                        <img src={item.images[0]} alt="" className="image" />
                    </div>
                    <div className="item-details">
                        <h5 className="item-name">{item.name}</h5>
                        <h5 className="item-price">
                            ₹{item.discountPrice} x {item.qty}
                        </h5>
                    </div>
                </div>
            ))
        );
    };



    return (
        <div className="order-details shadow-md">
            <div className="order-details-header">
                <h1 className="order-details-title">Order Details</h1>
            </div>

            <div className="order-info">
                <div className="order-info-row">
                    <h5 className="order-info-label">Order ID:</h5>
                    <span className="order-info-value">{data?._id?.slice(0, 8)}</span>
                </div>
                <div className="order-info-row">
                    <h5 className="order-info-label">Placed on:</h5>
                    <span className="order-info-value">
                        {data?.createdAt?.slice(0, 10)}
                    </span>
                </div>
            </div>

            <div className="order-items">
                {renderOrderItems()}
            </div>
            <div className="total-price">
                <h5 className="total-price-label">Total Price:</h5>
                <strong className="total-price-value">₹{data?.totalPrice}</strong>
            </div>

            <div className="shipping-info">
                <h4 className="shipping-info-title">Shipping Address:</h4>
                <p className="text-gray-400 text-base">{`${data?.shippingAddress?.address1}, ${data?.shippingAddress?.address2}, ${data?.shippingAddress?.city}, ${data?.shippingAddress?.zipCode}, ${data?.shippingAddress?.country}`}</p>
            </div>

            <div className="payment-info">
                <h4 className="payment-info-title">Payment Info:</h4>
                <p className="text-base text-red-300">{data?.paymentInfo?.type}</p>
            </div>
            <div className="py-4">
                <OrderStatusUpdate orderId={data?._id} data={data} />
                <OrderRefund orderId={data?._id} data={data} />
            </div>
            <div>
                <Link to={'/orders'} >
                    <button className={`${styles.primaryButton} `}>Go back</button>
                </Link>
            </div>
        </div>
    );
};

export default SellerOrderDetails;
