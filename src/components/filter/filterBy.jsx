import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { dispatchCurrentState } from "../../redux/actions/actions"
import './filter.scss'

export const FilterByState = ({ filterState }) => {
    const dispatch = useDispatch()
    const { states } = useSelector(({ ItemReducer }) => ItemReducer)
    const [currentState, setCurrentState] = useState('all')
    const [visible, setVisible] = useState(false)
    const sortRef = useRef()

    const handleOutsideClick = (e) => {
        try {
            if (!e.path.includes(sortRef.current)) {
                setVisible(false)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const activeState = (state) => {
        filterState(state)
        setCurrentState(state)
        dispatch(dispatchCurrentState(state))
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