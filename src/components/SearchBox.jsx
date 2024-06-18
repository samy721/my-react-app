const SearchBox = ({ handleSearch }) => {
    return (
        <div className="search-box">
            <input
                placeholder="Search Places..."
                className="search-input"
                type="text"
                name="search"
                onChange={({ target }) => handleSearch(target.value)}
            />
        </div>
    );
};

export default SearchBox;
