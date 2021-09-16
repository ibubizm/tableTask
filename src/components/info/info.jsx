import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './info.scss'

export const Info = () => {
    const [item, setItem] = useState({})
    const { currentItem } = useSelector(({ ItemReducer }) => ItemReducer)

    useEffect(() => {
        setItem(currentItem)
    }, [currentItem])

    return (
        <div className="body">
            {!Object.keys(item).length === 0 ?
                <div className="content">
                    <ul className="list">
                        <li className="list__item">Profile info:</li>
                        <li className="list__item">Selected profile: {`${item.firstName} ${item.lastName}`}</li>
                        <li className="list__item">Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis sed veniam dolorem impedit, fugiat culpa quis ipsum consequatur porro dolorum eius ducimus perspiciatis quam voluptate recusandae omnis illum. Nisi nobis inventore officiis! </li>
                        <li className="list__item">Address: {item.adress.streetAddress}</li>
                        <li className="list__item">City: {item.adress.city}</li>
                        <li className="list__item">State: {item.adress.state}</li>
                        <li className="list__item">Index: {item.adress.zip}</li>
                    </ul>
                </div>
                :
                <span>not data</span>
            }
        </div>
    )
}