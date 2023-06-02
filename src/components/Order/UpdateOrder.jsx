import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllOrdersOfUser } from "../../redux/slices/ordersSlice";
import { server } from "../../ServerConfigs";
import { toast } from "react-toastify";
import { styles } from "../../styles/styles";

const OrderStatusUpdate = ({ orderId, data }) => {
    const [status, setStatus] = useState("");
    const dispatch = useDispatch();

    const updateStatusHandler = async () => {
        await axios
            .put(
                `${server}/order/update-order-status/${orderId}`,
                {
                    status,
                },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success("Order updated!");
                dispatch(getAllOrdersOfUser(user._id));
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    return (
        <div>
            <h5 className="text-xl font-semibold">Update Status:</h5>
            <div className="flex gap-3 my-2">
                <select
                    className="px-4 py-2 rounded border w-[50%]"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {[
                        "Processing",
                        "Transferred to delivery partner",
                        "Shipping",
                        "Received",
                        "On the way",
                        "Delivered",
                    ]
                        .slice(
                            [
                                "Processing",
                                "Transferred to delivery partner",
                                "Shipping",
                                "Received",
                                "On the way",
                                "Delivered",
                            ].indexOf(data?.status)
                        )
                        .map((option, index) => (
                            <option value={option} key={index}>
                                {option}
                            </option>
                        ))}
                </select>
                <button className={`${styles.gradientButton2} p-2 text-white w-[200px]`} onClick={updateStatusHandler}>Update</button>
            </div>
        </div>
    );
};

export default OrderStatusUpdate;
