import { styles } from "../../styles/styles"

export const Pagination = ({
    totalPages,
    currentPage,
    paginate,
    handlePreviousPage,
    handleNextPage,
}) => {
    return (
        <div className={`${styles.paginatoreConatiner}`}>
            <button
                className={currentPage === 1 ? "cursor-not-allowed" : ""}
                onClick={handlePreviousPage}
            >
                <span className="material-symbols-outlined">
                    arrow_back
                </span>
            </button>
            <span>Total Pages: {totalPages}</span>
            {/* {totalPages > 1 &&
                Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (pageNumber) => (
                        <li
                            key={pageNumber}
                            className={pageNumber === currentPage ? "active" : ""}
                            onClick={() => paginate(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    )
                )} */}
            <button
                className={currentPage === totalPages ? "cursor-not-allowed" : ""}
                onClick={handleNextPage}
            >
                <span className="material-symbols-outlined">
                    arrow_forward
                </span>
            </button>
        </div>
    );
};