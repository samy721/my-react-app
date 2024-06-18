const Table = ({ pageData }) => {
    console.log(pageData);
    return (
        <table className="table">
            <thead className="thead">
                <tr>
                    <th className="th">#</th>
                    <th className="th">Place Name</th>
                    <th className="th">Country</th>
                </tr>
            </thead>
            <tbody>
                {pageData.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <td className="td">{index + 1}</td>
                            <td className="td">{item.name}</td>
                            <td className="td">
                                <img
                                    src={`https://flagsapi.com/${item.countryCode}/flat/64.png`}
                                    alt={item.countryCode}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;
