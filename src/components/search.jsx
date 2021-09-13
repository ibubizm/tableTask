import { useState } from "react"
import { useDispatch } from "react-redux"
import { searchName } from "../redux/actions/actions"


export const Search = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()



    return (
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder="search by name" />
            <button onClick={() => dispatch(searchName(value))}>Search</button>
        </div>
    )
}