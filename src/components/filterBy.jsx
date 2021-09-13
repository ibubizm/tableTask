import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentState } from '../redux/actions/actions'
import './filter.scss'

export const FilterByState = () => {
    const { states, currentState } = useSelector(({ ItemReducer }) => ItemReducer)
    const [visible, setVisible] = useState(false)
    const sortRef = useRef()

    const dispatch = useDispatch()

    const handleOutsideClick = (e) => {
        if (!e.path.includes(sortRef.current)) {
            setVisible(false)
        }
        else {
            console.log('no')
        }
    }

    const dispatchActiveState = (state) => {
        dispatch(setCurrentState(state))
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
                            onClick={() => dispatchActiveState('all')}
                            className={currentState === 'all' ?
                                'active' : ''}
                        >
                            all
                        </li>
                        {states && states.map((state, index) =>

                            <li
                                onClick={() => dispatchActiveState(state)}
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