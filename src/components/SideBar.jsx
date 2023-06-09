import React, { useState } from "react";
// import "./Sidebar.css";
import Logo from "../assets/logo-color.png";
// import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
// import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../ServerConfigs";
import { toast } from "react-toastify";

const Sidebar = ({ active }) => {
    const [selected, setSelected] = useState(active ?? 0);
    const navigate = useNavigate();

    const [expanded, setExpaned] = useState(false)
    const sidebarVariants = {
        true: {
            left: '0'
        },
        false: {
            left: '-60%'
        }
    }

    const logoutHandler = async () => {
        try {
            await axios.get(`${server}/shop/logout`, { withCredentials: true });
            window.location.reload(true);
            navigate("/login");
        } catch (err) {
            console.log(err)
            toast.error("Unable to Logout !")
        }
    };

    // console.log(window.innerWidth)
    return (
        <>
            <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpaned(!expanded)}>
                <span className="material-symbols-outlined"> {expanded ? 'close' : 'menu'}</span>
            </div>
            <motion.div className='sidebar'
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? `${expanded}` : ''}
            >
                {/* logo */}
                <div className="logo">
                    <img src={Logo} alt="logo" />
                </div>

                <div className="menu">
                    {SidebarData.map((item, index) => {
                        return (

                            <Link to={item.navigateTo}
                                className={selected === index ? "menuItem active" : "menuItem"}
                                key={index}
                                onClick={() => setSelected(index)}
                            >

                                {/* <item.icon /> */}
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span>{item.heading}</span>
                            </Link>
                        );
                    })}

                    <button className="menuItem"
                        onClick={() => logoutHandler()}
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <span>Log Out</span>
                    </button>
                </div>
            </motion.div>
            <Outlet />
        </>
    );
};

export default Sidebar;
