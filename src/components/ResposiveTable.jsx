import React, { useState } from "react";
import { tableDataStub } from "../Data/Data";
// import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";


const makeStyle = (status) => {
    if (status === "Approved") {
        return {
            background: "rgb(145 254 159 / 47%)",
            color: "green",
        };
    } else if (status === "Pending") {
        return {
            background: "#ffadad8f",
            color: "red",
        };
    } else {
        return {
            background: "#59bfff",
            color: "white",
        };
    }
};

function ExpandableTile({ row }) {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="expandable-tile">
            <div className="tile-header">
                <div className="tile-header-info">
                    <div className="product-name">{row.name}</div>
                    <div className="status" style={makeStyle(row.status)}>
                        {row.status}
                    </div>
                </div>
                <div className="toggle-icon" onClick={handleToggle}>
                    <span className="material-symbols-outlined">
                        {expanded ? ' expand_less' : 'expand_more'}
                    </span>
                    {/* {expanded ? <AiOutlineUp /> : <AiOutlineDown />} */}
                </div>
            </div>
            {expanded && (
                <div className="tile-details">
                    <div>
                        <strong>Tracking ID:</strong> {row.trackingId}
                    </div>
                    <div>
                        <strong>Date:</strong> {row.date}
                    </div>
                </div>
            )}
        </div>
    );
}

const ResponsiveTable = ({ tableData }) => {
    // console.log(tableData)
    const data = (tableData && tableData.length > 0) ? tableData : tableDataStub

    const isMobile = window.innerWidth <= 768;

    return (
        <div className="Table">
            {isMobile ? (
                <div className="expandable-tile-container">
                    {data.map((row, index) => (
                        <ExpandableTile key={index} row={row} />
                    ))}
                </div>
            ) : (
                <div className="custom-table-container">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Tracking ID</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.name}</td>
                                    <td>{row.trackingId}</td>
                                    <td>{row.date}</td>
                                    <td>
                                        <span className="status" style={makeStyle(row.status)}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}
        </div>
    );
}

export default ResponsiveTable;
