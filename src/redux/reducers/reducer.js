const initialState = {
    currentItem: {},
    states: [],
    currentState: 'all',
    allItems: [],
    search: ''
}

export function ItemReducer(state = initialState, action) {
    switch (action.type) {
        case 'CURRENT_OBJ':
            return {
                ...state,
                currentItem: action.payload
            }
        case 'ALL_STATES':
            return {
                ...state,
                states: action.payload
            }
        case 'CURRENT_STATE':
            return {
                ...state,
                currentState: action.payload
            }
        case 'ALL_ITEMS':
            return {
                ...state,
                allItems: action.payload
            }
        case 'SEARCH_NAME':
            return {
                ...state,
                search: action.payload
            }

        default:
            return state;
    }
}