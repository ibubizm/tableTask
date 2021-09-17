

export const Search = ({ searchByName, reset, searchValue, setSearchValue }) => {

    return (
        <div>
            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="search by first name" />
            <button className="btn clear" onClick={() => setSearchValue('')}>clear</button>
            <button className="btn search" onClick={() => searchByName(searchValue)}>Search</button>
            <button className="btn full" onClick={reset}>reset</button>
        </div>
    )
}