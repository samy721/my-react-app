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
            setLoading(true);
            const { data } = await axios.request(options);
            console.log(data);
            setData(data.data);
            setPage(data.metadata.currentOffset + 1);
            setTotalCount(data.metadata.totalCount);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
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
        console.log(limit);
        setLimit(limit);
    };

    return (
        <>
            <SearchBox handleSearch={handleSearch}></SearchBox>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <p>Table</p>
                    <Table pageData={data}></Table>
                </>
            )}
            {data.length && (
                <Pagination
                    currentPage={page}
                    itemsPerPage={perPageItems}
                    totalCount={totalCount}
                    onPageChange={handlePageChange}
                ></Pagination>
            )}
            <label htmlFor="limit"></label>
            <input
                type="number"
                name="limit"
                id="limit"
                value={limit}
                onChange={({ target }) => handleLimit(+target.value)}
            />
        </>
    );
}

export default App;
