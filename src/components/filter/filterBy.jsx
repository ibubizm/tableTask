import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import './filter.scss'

export const FilterByState = ({ filterState }) => {
    const { states } = useSelector(({ ItemReducer }) => ItemReducer)
    const [currentState, setCurrentState] = useState('all')
    const [visible, setVisible] = useState(false)
    const sortRef = useRef()

    const handleOutsideClick = (e) => {
        if (!e.path.includes(sortRef.current)) {
            setVisible(false)
        }
        else {
            console.log('')
        }
    }

    const activeState = (state) => {
        filterState(state)
        setCurrentState(state)
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick)
    }, [])

    return (
        <div ref={sortRef} onClick={() => setVisible(!visible)} className="sort">
            <div className="sort_button" >
                <span>sorted: </span>
                <span>{currentState ? currentState : ' by state'}</span>
            </div>

            {visible &&
                <div className="sort__list">
                    <ul>
                        <li
                            onClick={() => activeState('all')}
                            className={currentState === 'all' ?
                                'active' : ''}
                        >
                            all
                        </li>
                        {states && states.map((state, index) =>

                            <li
                                onClick={() => activeState(state)}
                                className={currentState === state ?
                                    'active' : ''}
                                key={`${state}`}>
                                {state}
                            </li>
                        )}
                    </ul>
                </div>}
        </div>
    )
}