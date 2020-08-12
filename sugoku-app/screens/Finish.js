import { StyleSheet, View, Text, Button } from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default function Finish ({ route, navigation}) {
    const { name, status, time } = route.params
    const [ value, setValue ] = useState('');
    let keys = []
    let valueData = []
    let newArr = []

    const readItemFromStorage = async () => {
        keys = await AsyncStorage.getAllKeys()
        valueData = await AsyncStorage.multiGet(keys)
        setValue(valueData);
    };

    const storeData = async (key,value) => {
        try {
          const newData = await AsyncStorage.setItem(key, value)
        } catch (e) {
          console.log(e)
        }
      }

    useEffect(() => {
          storeData(name, String(time))
      })

    useEffect(() => {
        readItemFromStorage();
      }, []);
    
    console.log(value)
    if(value.length > 0){
        newArr = value.sort((x, y) => +x[1] - +y[1]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>LEADERBOARD</Text>
            <View style={{flexDirection: "column", borderWidth: 2, margin: 10, borderColor: "white"}}>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.tableHeader}>Rank</Text>
                    <Text style={styles.tableHeader}>Name</Text>
                    <Text style={styles.tableHeader}>Record Time</Text>
                </View>
                {
                    newArr.length > 0 && newArr.map((character, index) =>(
                        <View key={character[0]} style={{flexDirection: "row"}}>
                            <Text style={styles.tableData}>{index + 1}</Text>
                            <Text style={styles.tableData}>{character[0]}</Text>
                            <Text style={styles.tableData}>{character[1]}</Text>
                        </View>
                    ))
                }
            </View>
            {
                status === true ? <Text style={styles.quotes}>CONGRATULATION TO REACH THE END OF THE GAME</Text>
                : <Text style={styles.quotes}>YOU NOOB, MOVE ON NOW</Text>
            }
            <Button style={styles.btnSpace}
                title="Restart"
                onPress={() =>
                navigation.navigate('Start')
                }
            />
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
    title: {
      fontSize: 36,
      textAlign: "center",
      color: "white",
      textShadowColor: "#BBE1FA", 
      fontWeight: "800"
    },
    btnSpace: { 
      margin: 10
    },
    tableHeader: {
        borderWidth: 1, 
        borderColor:"white", 
        width: 100, 
        color: "white", 
        textAlign: "center", 
        fontWeight: "600"
    },
    tableData: {
        borderWidth: 1, 
        borderColor:"white", 
        width: 100, 
        color: "white", 
        textAlign: "center"
    },
    quotes: {
        textShadowColor: "#1B262C", 
        color: "white", 
        margin:15
    }
  });