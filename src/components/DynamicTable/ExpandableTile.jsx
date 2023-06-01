import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";


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



export const ExpandableTile = ({ row, headers, onDeleteAction, onViewAction }) => {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };


    const deleteActionClicked = (resp) => {
        onDeleteAction(resp);
    }
    const viewActionClicked = (resp) => {
        onViewAction(resp);
    }
    return (
        <div className="expandable-tile">
            <div className="tile-header">
                <div className="tile-header-info">
                    {/* <div className="">{row.name}</div> */}
                    <div className="">{row[headers[0].value]}</div>
                </div>
                <div className="toggle-icon" onClick={handleToggle}>
                    <span className="material-symbols-outlined">
                        {expanded ? "expand_less" : "expand_more"}
                    </span>
                </div>
            </div>
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div className="tile-details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {headers.map((header, index) => (
                            <React.Fragment key={index}>
                                <div>
                                    {(() => {
                                        switch (header.value) {
                                            case 'status':
                                                return (
                                                    <div className="tile-content">
                                                        <strong>{header.title}</strong>
                                                        <span className="status" style={makeStyle(row.status)}>
                                                            {row.status}
                                                        </span>
                                                    </div>

                                                );
                                            case 'actions':
                                                return (
                                                    <div className="tile-content">
                                                        <strong>{header.title}</strong>
                                                        <div className="table-actions ">
                                                            <span className="material-symbols-outlined text-blue-400 hover:text-blue-600" onClick={() => viewActionClicked(row)}>  visibility   </span>
                                                            <span className="material-symbols-outlined text-red-400 hover:text-red-600" onClick={() => deleteActionClicked(row)}>  delete   </span>
                                                        </div>
                                                    </div>

                                                );
                                                case 'actions2':
                                                    return (
                                                        <div className="tile-content">
                                                             <strong>{header.title}</strong>
                                                            <span className="material-symbols-outlined text-blue-400 hover:text-blue-600" onClick={() => viewActionClicked(row)}>  read_more   </span>
                                                        </div>
                                                    );
                                            default: return (
                                                <div className="tile-content">
                                                    <strong>{header.title}</strong> {row[header.value]}
                                                </div>
                                            )

                                        }
                                    })()}

                                </div>
                            </React.Fragment>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}