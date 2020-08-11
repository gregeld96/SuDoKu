import React, { useEffect, useState} from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector} from 'react-redux'
import { setBoardAsync, setStatus } from '../store/actions/sugokuActions'

export default function Board({ difficulty, name }) {
  const dispatch = useDispatch()
  const board = useSelector(state => state.sugoku.board)
  const [newBoard, setNew] = useState([])
  const [message, setMessage] = useState("")
  
  useEffect(() => {
    dispatch(setBoardAsync(difficulty))
  }, [])

  useEffect(() => {
    setNew(board)
  }, [board])

  useEffect(() => {
    if(message === 'solved') {
      dispatch(setStatus(true))
    } else {
      dispatch(setStatus(false))
    }
  }, [message])

  function blockHandler (text, position) {
    if(+text === isNaN){
      const anotherBoard = JSON.parse(JSON.stringify(newBoard))
      anotherBoard[position.indexOne][position.indexTwo] = 0
      setNew(anotherBoard)
    } else {
      const anotherBoard = JSON.parse(JSON.stringify(newBoard))
      anotherBoard[position.indexOne][position.indexTwo] = Number(text)
      setNew(anotherBoard)
    }
  }

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

  function solveBoard () {
    const solveBoard = {
      board: board
    }

    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(solveBoard),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then((response) => {
        setNew(response.solution)
        setMessage("")
      })
      .catch(console.warn)
  }

  function validateBoard() {
    const validationBoard = {
      board: newBoard
    }

    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(validationBoard),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then((response) => {
        setMessage(response.status)
      })
      .catch(console.warn)
  }

  return (
      <View>
        <Text style={styles.title}>{!message || message === 'broken' || message === 'unsolved' ? name : message}</Text>
        {
          newBoard.length > 0 && newBoard.map((section, indexOne) => {
            const thirdChild = ((indexOne + 1) % 3) === 0 ? 2 : 0
            const firstChild = (indexOne === 0) ? 2 : null
            return (
              <View key={indexOne} style={{borderColor: "white", flexDirection: 'row', borderBottomWidth: thirdChild, borderTopWidth: firstChild}}>
              {
                  section && section.map((block, indexTwo) => {
                      const thirdChild = ((indexTwo + 1) % 3) === 0 ? 3 : 0
                      const firstChild = (indexTwo === 0) ? 3 : null
                      return (
                        <View key={indexTwo} style={{ height: 30, width: 30, borderWidth: 0.5, borderColor: 'gray', padding:1, borderRightWidth: thirdChild, borderLeftWidth: firstChild }}>
                            {
                                <TextInput 
                                    style={{textAlign:"center", fontSize: 15, color: "white"}} 
                                    maxLength={1}  
                                    value={block > 0 ? String(block) : ""} 
                                    onChangeText={(text) => blockHandler(text, {indexOne, indexTwo})}
                                    editable={board[indexOne][indexTwo] === 0 ? true : false}
                                    selectTextOnFocus={block === 0 ? true : false}
                                    keyboardType={'numeric'}
                                />
                            }          
                        </View>
                      )
                  })
                }
              </View>
            )
          })
        }
        <View style={styles.btnSpace}>
          <Button title="Solved" onPress={() => solveBoard()} />
          <Button title="Validate" onPress={() => validateBoard()} />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221F3B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "white"
  },
  btnSpace: {
    flexDirection: 'row', 
    margin: 10, 
    justifyContent: "space-around"
  }
});