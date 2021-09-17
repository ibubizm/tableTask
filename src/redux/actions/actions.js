

export function setCurrentItem(obj) {
    return {
        type: 'CURRENT_OBJ',
        payload: obj
    }

}

export function dispatchCurrentState(state) {
    return {
        type: 'CURRENT_STATE',
        payload: state
    }
}

export function setAllStates(list) {
    return {
        type: 'ALL_STATES',
        payload: list
    }
}

export function setAllItems(data) {
    return {
        type: 'ALL_ITEMS',
        payload: data
    }
}

export function searchName(name) {
    return {
        type: 'SEARCH_NAME',
        payload: name
    }
}