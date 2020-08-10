import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Block from './Block'

function Section ({section}) {
    return (
        <View style={{flexDirection: 'row'}}>
            {
                section && section.map((block, index) => (
                    <Block key={index} block={block} />
                ))
            }
        </View>
    )
}

export default Section