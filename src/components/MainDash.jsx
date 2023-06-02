import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../redux/slices/ordersSlice";
import { getAllProductsShop } from "../redux/slices/productSlice";
import ResponsiveTable from "./DynamicTable/DynamicTable";
import { cardsDataStub } from "../Data/Data";
import CardsContainer from "./CardComponent/CardsContainer";

const MainDash = () => {

    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.seller);
    const { products } = useSelector((state) => state.products);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        dispatch(getAllOrdersOfShop(user._id));
        dispatch(getAllProductsShop(user._id));
    }, [dispatch]);

    useEffect(() => {
        setFilteredData(
            orders
                .map(({ _id, cart, totalPrice, status,createdAt }) => ({
                    _id,
                    createdAt,
                    quantity: cart.length,
                    totalPrice,
                    status
                }))
                .sort((a, b) => a.createdAt.localeCompare(b.createdAt)) // Sort filteredData based on name
        );
    }, [orders]);

    const availableBalance = user?.availableBalance.toFixed(2);

    const headers = [
        { title: "Order Id", value: '_id' },
        { title: "Status", value: 'status' },
        { title: "Total Price", value: 'totalPrice' },
        { title: "Quantity", value: 'quantity' }
    ]

    const cardData = [
        {
            title: "Account Balance",
            barValue: Math.round((products.length / 100) * 100),
            value: availableBalance,
            navigateTo: '/cash..'
        },
        {
            title: "All Products",
            barValue: Math.round((products.length / 100) * 100),
            value: products.length,
            navigateTo: '/products'
        },
        {
            title: "All Orders",
            barValue: Math.round((orders.length / 100) * 100),
            value: orders.length,
            navigateTo: '/orders'
        }
    ];

    // Function to populate data and get updated array
    function updateCardsData(cardData) {
        const updatedCardsData = cardsDataStub.map((card, index) => {
            const updatedCard = { ...card };
            updatedCard.barValue = cardData[index].barValue;
            updatedCard.title = cardData[index].title;
            updatedCard.value = cardData[index].value;
            updatedCard.subtitle = cardData[index].subtitle;
            updatedCard.navigateTo = cardData[index].navigateTo;
            return updatedCard;
        });

        return updatedCardsData;
    }

    const updatedCardData = updateCardsData(cardData);

    return (
        <div className="MainDash">
            <h1 className={`${styles.dashboardTitle}`}> Dashboard</h1>
            <CardsContainer cardData={updatedCardData} />
            <h1 className={`${styles.dashboardTitle} mt-3`}>Recent Orders</h1>
            <ResponsiveTable key={filteredData.length} tableData={filteredData} headers={headers} enablePaginator={false} />
        </div>
    );
};

export default MainDash;
