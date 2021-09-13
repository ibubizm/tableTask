import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentItem, setAllStates, setAllItems } from '../redux/actions/actions'
import './table.scss'
import { useSortableData } from './sorting'
import { useSelector } from 'react-redux'




export const Table = () => {
    const dispatch = useDispatch()
    const [objList, setObjList] = useState([])

    const { items, requestSort, sortConfig } = useSortableData(objList);
    const { currentState, allItems, search } = useSelector(({ ItemReducer }) => ItemReducer)

    useEffect(() => {
        let set = new Set()
        axios('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json')
            .then(({ data }) => {
                dispatch(setAllItems(data))
                setObjList(data)
                data.forEach(i => {
                    set.add(i.adress.state)
                })
                const arr = Array.from(set)
                dispatch(setAllStates(arr))
            })
    }, [])

    useEffect(() => {
        searchByName()
    }, [search])

    useEffect(() => {
        filterState()
    }, [currentState])

    const searchByName = () => {
        if (search === '') {
            setObjList(allItems)
        }
        else {
            const newObj = allItems.filter(i => i.firstName == search)
            setObjList(newObj)
        }
    }

    const filterState = () => {
        if (currentState === 'all') {
            setObjList(allItems)
        }
        else {
            const newObj = allItems.filter(i => i.adress.state == currentState)
            setObjList(newObj)
        }
    }

    const dis = (obj) => {
        dispatch(setCurrentItem(obj))
    }

    return (
        <table style={{ border: '2px solid black', margin: '0 auto' }} >
            <thead>
                <tr>
                    <th onClick={() => requestSort('id')}>id</th>
                    <th onClick={() => requestSort('firstName')}>First name</th>
                    <th onClick={() => requestSort('lastName')}>last name</th>
                    <th onClick={() => requestSort('email')}>Email</th>
                    <th onClick={() => requestSort('phone')}>Phone</th>
                    <th onClick={() => requestSort('state')}>State</th>
                </tr>

            </thead>
            <tbody>
                {items.map(i =>
                    <tr onClick={() => dis(i)} key={`${i.id}_${i.firstName}`}>
                        <th className="box">{i.id}</th>
                        <th className="box">{i.firstName}</th>
                        <th className="box">{i.lastName}</th>
                        <th className="box">{i.email}</th>
                        <th className="box">{i.phone}</th>
                        <th className="box">{i.adress.state}</th>
                    </tr>
                )}
            </tbody>

        </table>
    )
}