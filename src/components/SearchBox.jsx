import { useEffect, useRef } from "react";

const SearchBox = ({ handleSearch }) => {
    const searchBox = useRef();

    const handleEvent = (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "/") {
            event.preventDefault(); // Prevent the default action if needed
            // Your custom logic here
            searchBox.current.focus();
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleEvent);
        return () => window.removeEventListener("keydown", handleEvent);
    }, []);

    return (
        <div className="search-box">
            <input
                ref={searchBox}
                placeholder="Search Places..."
                className="search-input"
                type="text"
                name="search"
                onChange={({ target }) => handleSearch(target.value)}
            />
            <div className="keyboard-shortcut">Ctrl + /</div>
        </div>
    );
};

export default SearchBox;
