import { useRef, useState } from "react";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";
import Loader from "./components/Loader";
import axios from "axios";
import { Pagination } from "./components/Pagination";

function App() {
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(5);
    const [perPageItems, setPerPageItems] = useState(3);
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    let x = useRef();
    const [limitError, setLimitError] = useState(false);

    const fetchData = async (newPage) => {
        var options = {
            method: "GET",
            url: import.meta.env.VITE_API_URL,
            params: {
                countryIds: "IN",
                namePrefix: search,
                limit: limit,
                offset: newPage ? newPage - 1 : page - 1,
            },
            headers: {
                "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
                "x-rapidapi-key": import.meta.env.VITE_API_KEY, // get key from https://rapidapi.com/wirefreethought/api/geodb-cities/
            },
        };
        try {
            const { data } = await axios.request(options);
            console.log(data);
            setData(data.data);
            setPageData(data.data.slice(0, perPageItems));
            setPage(data.metadata.currentOffset + 1);
            setTotalCount(data.metadata.totalCount);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        if (limitError) {
            return;
        }
        setLoading(true);
        setSearch(query);
        setPage(1);

        if (x.current) {
            clearTimeout(x.current);
        }
        x.current = setTimeout(fetchData, 1000);
    };

    const handlePageChange = (newPage) => {
        console.log(newPage);
        setPage(newPage);
        fetchData(newPage);
    };

    const handleLimit = (limit) => {
        if (limit > 10) {
            setLimitError(true);
        } else {
            setLimitError(false);
        }
        setLimit(limit);
    };
    const handleDefaultView = (limit) => {
        console.log(limit);
        setPerPageItems(limit);
        setPageData(data.slice(0, limit));
    };
    return (
        <>
            <SearchBox handleSearch={handleSearch}></SearchBox>

            <Table
                search={search}
                pageData={pageData}
                loading={loading}
            ></Table>

            {data.length > 0 ? (
                <Pagination
                    currentPage={page}
                    itemsPerPage={limit}
                    totalCount={totalCount}
                    onPageChange={handlePageChange}
                ></Pagination>
            ) : (
                <></>
            )}
            <div className="flex col gap-10">
                <label htmlFor="limit">Limit To Fetch Items From Server</label>
                <input
                    type="number"
                    name="limit"
                    id="limit"
                    value={limit}
                    className={limitError ? "error" : ""}
                    onChange={({ target }) => handleLimit(+target.value)}
                />
                <div className={"error " + (limitError ? "show" : "hide")}>
                    please put limit up to 10
                </div>
                <label htmlFor="itemsOnPage">Defalult Items On Page</label>
                <input
                    type="number"
                    name="itemsOnPage"
                    id="itemsOnPage"
                    value={perPageItems}
                    onChange={({ target }) => handleDefaultView(+target.value)}
                />
            </div>
        </>
    );
}

export default App;
