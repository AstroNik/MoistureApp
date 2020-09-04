import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

class FindPlant extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Find a Plant </Text>
            </View>
        );
    }
}

export default FindPlant

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
