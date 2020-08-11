import { SET_BOARD, SET_STATUS } from './types'
import axios from 'axios'

export const setBoard = (board) => {
    return ({
        type: SET_BOARD,
        payload: board
    })
}

export const setStatus = (status) => {
    return ({
        type: SET_STATUS,
        payload: status
    })
}

export function setBoardAsync (difficulty) {
    return (dispatch) => {
        axios({
          method: "GET",
          url: `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`
        })
        .then(({data}) => {
          dispatch(setBoard(data.board))
        })
        .catch(err => {
            console.log(err)
        })
    }
}