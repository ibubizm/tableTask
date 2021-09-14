
import { useDispatch } from 'react-redux'
import { setCurrentItem } from '../../redux/actions/actions'
import './table.scss'
import { useSortableData } from '../filter/sorting'
import { useState } from 'react'

export const Table = ({ currentItems }) => {
    const dispatch = useDispatch()
    const [active, setActive] = useState('')

    const { items, requestSort, sortConfig } = useSortableData(currentItems);

    const info = (obj) => {
        dispatch(setCurrentItem(obj))
        setActive(obj.id)
    }

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? `${sortConfig.direction} column_name` : 'column_name';
    };
    return (
        <table border="1" style={{ borderCollapse: 'collapse', margin: '0 auto' }}>
            <thead>
                <tr>
                    <th className={getClassNamesFor('id')} onClick={() => requestSort('id')}>id</th>
                    <th className={getClassNamesFor('firstName')} onClick={() => requestSort('firstName')}>First name</th>
                    <th className={getClassNamesFor('lastName')} onClick={() => requestSort('lastName')}>last name</th>
                    <th className={getClassNamesFor('email')} onClick={() => requestSort('email')}>Email</th>
                    <th className={getClassNamesFor('phone')} onClick={() => requestSort('phone')}>Phone</th>
                    <th className={getClassNamesFor('state')} onClick={() => requestSort('state')}>State</th>
                </tr>

            </thead>
            <tbody>
                {items.map(i =>
                    <tr className={active === i.id ? 'active' : ''} onClick={() => info(i)} key={`${i.id}_${i.firstName}`}>
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