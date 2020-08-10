import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'
import Section from './components/Section'
// import { useDispatch, useSelector} from 'react-redux'
// import { setBoardAsync } from './store/actions/sugokuActions'

export default function App() {
  const [board, setBoard] = useState([])
  useEffect(() => {
    axios({
      method: "GET",
      url: 'https://sugoku.herokuapp.com/board'
    })
        .then(({data}) => {
          setBoard(data.board)
        })
        .catch(err => {
            console.log(err)
        })
  })

  return (
      <View style={styles.container}>
        {
          board && board.map((section, index) => (
            <Section key={index} section={section} />
          ))
        }
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
