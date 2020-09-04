import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

export default class Logo extends Component{
    render(){
        return (
            <View style={styles.imageContainer}>
                <Image source={require('../../images/Logo.png')} style={{width: 200, height: 200}}/>
                <Text style={styles.logoText}> Welcome to ECOders </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    imageContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 100,
    },
    logo:{
        width: '50%',
        height: '50%',
    },
    logoText:{
        fontSize: 30,
        textAlign: 'center',
        color: 'white'
    }

});
