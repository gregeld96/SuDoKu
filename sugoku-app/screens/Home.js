import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import React, {useState} from 'react';

export default function Home ({ navigation }) {
    const [name, setName] = useState("")
    const [difficulty, setDifficulty] = useState("easy")

    function handlePage () {
        if(!name || !difficulty){
            alert(`Please fill up all the form`)
        } else {
            setName("")
            navigation.navigate('Board', { name, difficulty})
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 32, color: "white"}}>BORED SUGOKU</Text>
            <Text style={styles.title}>Your Name</Text>
            <TextInput style={styles.input} value={name} placeholder="Your Name...." onChangeText={(text) => setName(text)} />
            <Text style={styles.title}>Choose Your Difficulty:</Text>
            <View style={styles.btnSpace}>
                <Button disabled={difficulty === 'easy'} title="Easy" onPress={() => setDifficulty('easy')} />
                <Button disabled={difficulty === 'medium'} title="Medium" onPress={() => setDifficulty('medium')} />
                <Button disabled={difficulty === 'hard'} title="Hard" onPress={() => setDifficulty('hard')} />
                <Button disabled={difficulty === 'random'} title="Random" onPress={() => setDifficulty('random')} />
            </View>
            <Button
                title="Let's Play"
                onPress={() => handlePage()}
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
        color: "white", 
        margin: 20
    },
    input: {
        fontSize: 18, 
        borderBottomWidth: 2,
        width:250, 
        margin: 10, 
        color: "white", 
        borderColor: "white", 
        padding: 10
    },
    btnSpace: {
        marginBottom: 25, 
        flexDirection: 'row'
    }
  });