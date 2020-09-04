import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'

class PlantDatabase extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Plant Database </Text>
            </View>
        );
    }
}

export default PlantDatabase

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
