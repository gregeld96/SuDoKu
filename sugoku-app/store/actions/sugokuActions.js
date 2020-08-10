import { SET_BOARD } from './types'

export const setBoard = (board) => {
    return ({
        type: SET_BOARD,
        payload: board
    })
}

export function setBoardAsync () {
    return (dispatch) => {
        fetch('https://sugoku.herokuapp.com/board')
        .then(res => res.json())
        .then(({data}) => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
}