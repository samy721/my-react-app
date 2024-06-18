import { useEffect, useState } from "react";
const getPaginationNumbers = (totalCount, itemsPerPage) => {
    const numbers = [];
    const total = Math.ceil(totalCount / itemsPerPage);
    for (let i = 1; i <= total; i++) {
        numbers.push(i);
    }
    return numbers;
};
export const Pagination = ({
    currentPage,
    itemsPerPage,
    totalCount,
    onPageChange,
}) => {
    const [numbers, setNumbers] = useState([]);

    useEffect(() => {
        setNumbers(getPaginationNumbers(totalCount, itemsPerPage));
    }, [totalCount, itemsPerPage]);

    console.log(numbers);
    return (
        <div>
            {currentPage > 1 && (
                <button
                    className="btn-prev-next"
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    Previous
                </button>
            )}

            {numbers.map((number) => (
                <button
                    className="btn"
                    key={number}
                    onClick={() => onPageChange(number)}
                    disabled={number === currentPage}
                >
                    {number}
                </button>
            ))}

            {currentPage < Math.ceil(totalCount / itemsPerPage) && (
                <button
                    className="btn-prev-next"
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next
                </button>
            )}
        </div>
    );
};
