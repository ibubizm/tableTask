
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentItem } from '../../redux/actions/actions'
import './table.scss'
import { useSortableData } from '../filter/sorting'
import { useEffect, useState } from 'react'

const columnTitle = [
    {
        name: 'id',
        title: 'ID'
    },
    {
        name: 'firstName',
        title: 'First name'
    },
    {
        name: 'lastName',
        title: 'Last name'
    },
    {
        name: 'email',
        title: 'Email'
    },
    {
        name: 'phone',
        title: 'Phone'
    },
    {
        name: 'state',
        title: 'State'
    }
]

export const Table = ({ currentItems, setListObj }) => {
    const dispatch = useDispatch()
    const [active, setActive] = useState({})
    const { allItems, currentState } = useSelector(({ ItemReducer }) => ItemReducer)

    const { items, requestSort, sortConfig } = useSortableData(allItems);

    const info = (obj) => {
        dispatch(setCurrentItem(obj))
        setActive({
            id: obj.id,
            firstName: obj.firstName
        })
    }

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? `${sortConfig.direction} column_name` : 'column_name';
    };

    const sort = (i) => {
        requestSort(i.name)

    }

    useEffect(() => {
        setListObj(items)
    }, [items])

    return (
        <table border="1" style={{ borderCollapse: 'collapse', margin: '0 auto' }}>
            <thead>
                <tr>
                    {columnTitle.map(i =>
                        <th key={`${i.name}_${i.title}`} className={getClassNamesFor(i.name)} onClick={() => sort(i)}>{i.title}</th>
                    )}
                </tr>

            </thead>
            <tbody>
                {currentItems.map(i =>
                    <tr className={active.id === i.id && active.firstName === i.firstName ? 'active' : ''} onClick={() => info(i)} key={`${i.id}_${i.firstName}`}>
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