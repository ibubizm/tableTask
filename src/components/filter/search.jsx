import { useState } from "react"

export const Search = ({ searchByName }) => {
    const [value, setValue] = useState('')


    return (
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder="search by first name" />
            <button className="btn clear" onClick={() => setValue('')}>clear</button>
            <button className="btn search" onClick={() => searchByName(value)}>Search</button>
        </div>
    )
}