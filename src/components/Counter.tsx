import React from 'react';
import { View, Text, StyleSheet } from "react-native"
import { useAppSelector } from "../app/hooks"

const Counter = () => {

    const counter = useAppSelector (state => state.counter.value)

    return(
        <View style = {{alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Counter</Text>
            <Text style ={{fontSize: 62, color: 'green', fontWeight: 'bold'}}>{counter}</Text>
        </View>
    )
}

export default Counter