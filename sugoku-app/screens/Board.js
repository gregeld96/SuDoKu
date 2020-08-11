import Board from '../components/Board'
import { StyleSheet, View, Button } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux'
import CountDown from 'react-native-countdown-component';

export default function GameBoard ({ navigation, route }) {
    const { name, difficulty } = route.params
    const status = useSelector(state => state.sugoku.status)
    let stop = ""
    console.log(status)
    if(status === false) stop = true
    else stop = false

    return (
        <View style={styles.container}>
            <CountDown
                until={180}
                size={30}
                onFinish={() => navigation.navigate('Finish', { name, status })}
                digitStyle={{backgroundColor: '#FFF'}}
                digitTxtStyle={{color: '#1CC625'}}
                timeLabelStyle={{color: "white"}}
                timeToShow={['M', 'S']}
                running={stop}
                timeLabels={{m: 'MM', s: 'SS'}}
            />
            <Board difficulty={difficulty} name={name} />
            {
                !status ?  <Button
                title="Giving Up"
                onPress={() =>
                navigation.navigate('Finish', { name, status })
                } />
                : <Button
                title="Finished"
                onPress={() =>
                navigation.navigate('Finish', { name, status })
                } />
            }    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#221F3B',
      alignItems: 'center',
      justifyContent: 'center',
    },
});