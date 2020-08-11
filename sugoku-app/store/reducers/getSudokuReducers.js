import { SET_BOARD, SET_STATUS } from '../actions/types'

const initalState = {
    board: [],
    status: false
}

export default (state = initalState, action) => {
    switch(action.type) {
        case SET_BOARD:
            return {...state, board: action.payload}
        case SET_STATUS:
            return {...state, status: action.payload}
        default:
            return state
    }
}