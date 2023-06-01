import React, { useState } from "react";
import { tableDataStub } from "../../Data/Data";
import { ExpandableTile } from './ExpandableTile'
import "./DynamicTable2.css"
import { DynamicTablePaginationConfigs } from "../../constants/Constants";
import { Pagination } from "./Pagination";


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



const ResponsiveTable = ({ tableData, headers, onDeleteAction, onViewAction, enablePaginator = true }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(DynamicTablePaginationConfigs.itemsPerPage);
    let data = [];

    if (tableData && tableData.length > 0) {
        data = tableData
    } else {
        data = tableDataStub
        headers = [
            { title: "Name", value: 'name' },
            { title: "Tracking Id", value: 'trackingId' },
            { title: "Date", value: 'date' },
            { title: "Status", value: 'status' },
        ]
    }

    const deleteActionClicked = (resp) => {
        onDeleteAction(resp);
    }
    const viewActionClicked = (resp) => {
        onViewAction(resp);
    }


    const isMobile = window.innerWidth <= 768;

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="Table">
            {isMobile ? (
                <div className="expandable-tile-container">
                    {currentItems.map((row, index) => (
                        <ExpandableTile key={index} row={row} headers={headers} onDeleteAction={deleteActionClicked} onViewAction={viewActionClicked} />
                    ))}
                    {
                        enablePaginator && (
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                paginate={paginate}
                                handlePreviousPage={handlePreviousPage}
                                handleNextPage={handleNextPage}
                            />
                        )
                    }

                </div>
            ) : (
                <div className="custom-table-container">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                {headers.map((header, index) => (
                                    <th key={index}>{header.title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((row, index) => (
                                <tr key={index}>
                                    {headers.map((header, index) => (
                                        <td key={index}>
                                            {(() => {
                                                switch (header.value) {
                                                    case 'status':
                                                        return (
                                                            <span className="status" style={makeStyle(row.status)}>
                                                                {row.status}
                                                            </span>
                                                        );
                                                    case 'actions':
                                                        return (
                                                            <div className="table-actions ">
                                                                <span className="material-symbols-outlined text-blue-400 hover:text-blue-600" onClick={() => viewActionClicked(row)}>  visibility   </span>
                                                                <span className="material-symbols-outlined text-red-400 hover:text-red-600" onClick={() => deleteActionClicked(row)}>  delete   </span>
                                                            </div>
                                                        );
                                                    case 'actions2':
                                                        return (
                                                            <div className="table-actions ">
                                                                <span className="material-symbols-outlined text-blue-400 hover:text-blue-600" onClick={() => viewActionClicked(row)}>  read_more   </span>
                                                            </div>
                                                        );
                                                    default:
                                                        return (
                                                            <div className="table-data-content">
                                                                {row[header.value]}
                                                            </div>
                                                        )
                                                }
                                            })()}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {
                        enablePaginator && (
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                paginate={paginate}
                                handlePreviousPage={handlePreviousPage}
                                handleNextPage={handleNextPage}
                            />
                        )
                    }

                </div>
            )}
        </div>
    );
};



export default ResponsiveTable;
