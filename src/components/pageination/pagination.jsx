import './pagination.scss'
import { useState } from 'react'

export const Pagination = () => {
    const count = 120
    const limit = 20
    const pageCount = Math.ceil(count / limit)
    const pages = []

    const [activePage, setActivePage] = useState(1)

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    return (
        <div className="pagination">
            <ul>
                {pages.map(p =>
                    <li key={p} onClick={() => setActivePage(p)} className={activePage === p ? 'active' : ''}>{p}</li>
                )}
            </ul>

        </div>
    )
}