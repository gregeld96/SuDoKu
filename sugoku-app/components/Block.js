import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

function Block ({block, index}) {
    const [number, setNum] = useState('');
    const currentIndex = index + 1

    useEffect(() => {
        setNum(String(block))
    }, [])

    return (
        <View style={{ height: 20, borderWidth: 0.5, borderColor: 'gray', padding:1 }}>
            <TextInput style={{textAlign:"center"}} keyboardType={'numeric'} onChangeText={text => setNum(text)} value={number} maxLength={1} />
        </View>
    )
}

const styles = StyleSheet.create({
    thirdChild: {
        borderRightWidth: 3
    },
    otherChild: {
        borderRightWidth: 1
    }
})

export default Block