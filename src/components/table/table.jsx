
import { useDispatch } from 'react-redux'
import { setCurrentItem } from '../../redux/actions/actions'
import './table.scss'
import { useSortableData } from '../filter/sorting'


export const Table = ({ currentItems }) => {
    const dispatch = useDispatch()

    const { items, requestSort, sortConfig } = useSortableData(currentItems);

    const info = (obj) => {
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
                    <tr onClick={() => info(i)} key={`${i.id}_${i.firstName}`}>
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