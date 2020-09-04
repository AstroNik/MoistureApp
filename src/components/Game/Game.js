import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'

class Game extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Game </Text>
            </View>
        );
    }
}

export default Game

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
