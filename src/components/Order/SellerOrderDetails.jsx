import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { getAllOrdersOfShop } from "../../redux/slices/ordersSlice";
import { styles } from "../../styles/styles";
import "./orderdetails.css";
import OrderStatusUpdate from "./UpdateOrder";
import OrderRefund from "./UpdateRefund";



const SellerOrderDetails = () => {
    const { orders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.seller);
    const [filteredData, setfilteredData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersOfShop(user?._id));
    }, [dispatch]);

    useEffect(() => {
        if (orders && orders.length > 0) {
            const orderFound = orders.find((item) => item._id === id);
            setfilteredData(orderFound);
        }
    }, [orders])

    const { id } = useParams();



    const renderOrderItems = () => {
        return (
            filteredData?.cart?.map((item, index) => (
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
                    <span className="order-info-value">{filteredData?._id?.slice(0, 8)}</span>
                </div>
                <div className="order-info-row">
                    <h5 className="order-info-label">Placed on:</h5>
                    <span className="order-info-value">
                        {filteredData?.createdAt?.slice(0, 10)}
                    </span>
                </div>
            </div>

            <div className="order-items">
                {renderOrderItems()}
            </div>
            <div className="total-price">
                <h5 className="total-price-label">Total Price:</h5>
                <strong className="total-price-value">₹{filteredData?.totalPrice}</strong>
            </div>

            <div className="shipping-info">
                <h4 className="shipping-info-title">Shipping Address:</h4>
                <p className="text-gray-400 text-base">{`${filteredData?.shippingAddress?.address1}, ${filteredData?.shippingAddress?.address2}, ${filteredData?.shippingAddress?.city}, ${filteredData?.shippingAddress?.zipCode}, ${filteredData?.shippingAddress?.country}`}</p>
            </div>

            <div className="payment-info">
                <h4 className="payment-info-title">Payment Info:</h4>
                <p className="text-base text-red-300">{filteredData?.paymentInfo?.type}</p>
            </div>
            <div className="py-4">
                <OrderStatusUpdate orderId={filteredData?._id} data={filteredData} />
                <OrderRefund orderId={filteredData?._id} data={filteredData} />
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
