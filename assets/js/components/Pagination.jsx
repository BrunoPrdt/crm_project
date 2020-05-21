import React from 'react';

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Pagination = (props) => {
    const {currentPage, itemsPerPage, length, onPageChange} = props;
    const pageCount = Math.ceil(length/itemsPerPage);
    const PAGES = [];

    for (let i =1 ; i <= pageCount; i++){
        PAGES.push(i);
    }

    return (
        <div>
            <ul className="pagination pagination-sm">
                <li className={"page-item " + (currentPage === 1 && "disabled")}>
                    <button className="page-link" onClick={() => onPageChange(currentPage-1)}>&laquo;</button>
                </li>
                {PAGES.map((page, index) => {
                    return (
                        <li
                            className={"page-item" + (currentPage === page ? " active" : "")}
                            key={index}
                        >
                            <button className="page-link"
                                    onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    )
                })}
                <li className={"page-item " + (currentPage === PAGES.length && "disabled")}>
                    <button className="page-link" onClick={() => onPageChange(currentPage+1)}>&raquo;</button>
                </li>
            </ul>
        </div>
    );
};

/**
 *
 * @param items
 * @param currentPage
 * @param itemsPerPage
 * @returns {*}
 */
Pagination.getData = (items,currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return  items.slice(start, start + itemsPerPage);
};

export default Pagination;