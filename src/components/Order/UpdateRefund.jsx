import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllOrdersOfUser } from "../../redux/slices/ordersSlice";
import { server } from "../../ServerConfigs";
import { toast } from "react-toastify";
import { styles } from "../../styles/styles";

const OrderRefund = ({ orderId, data }) => {
    const [status, setStatus] = useState("");
    const dispatch = useDispatch();

    const refundHandler = async () => {
        await axios
            .put(
                `${server}/order/order-refund/${orderId}`,
                {
                    status: "Processing refund",
                },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success(res.data.message);
                dispatch(getAllOrdersOfUser(user._id));
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    if (data?.status !== "Processing refund") {
        return null;
      }
    

    return (
        <div>
            <h5 className="font-semibold mb-2">Update Order Refund:</h5>
            <div className="flex gap-3 my-2">
            <select
                className="px-4 py-2 rounded border"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                {[
                    "Processing refund",
                    "Refund Success",
                ]
                    .slice(
                        [
                            "Processing refund",
                            "Refund Success",
                        ].indexOf(data?.status)
                    )
                    .map((option, index) => (
                        <option value={option} key={index}>
                            {option}
                        </option>
                    ))}
            </select>

            <button className={`${styles.gradientButton} w-[200px] text-white `} onClick={refundHandler}>Refund</button>
            </div>
        </div>
    );
};

export default OrderRefund;
