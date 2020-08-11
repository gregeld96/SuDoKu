import { StyleSheet, View, Text, Button } from 'react-native';
import React from 'react';

export default function Finish ({ route, navigation}) {
    const { name, status } = route.params
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            {
                status === true ? <Text style={{textShadowColor: "blue", color: "white", margin:15}}>CONGRATULATION TO REACH THE END OF THE GAME</Text>
                : <Text style={{textShadowColor: "blue", color: "white", margin:15}}>YOU NOOB, MOVE ON NOW</Text>
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
      fontSize: 24,
      textAlign: "center",
      color: "white"
    },
    btnSpace: { 
      margin: 10
    }
  });