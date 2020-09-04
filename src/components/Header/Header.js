import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/Octicons'

class Header extends Component {
    render() {
        let title = ""
        if(this.props.headerTitle === "Dash"){
            title = "Dashboard"
        }
        if(this.props.headerTitle === "Detail"){
            title = "Device Details"
        }

        return (
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.headerButton}>
                        {!this.props.backOption ? (
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.toggleDrawer()
                            }}>
                                <Icon
                                    name='three-bars'
                                    size={25}
                                    color='#000'
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.goBack()
                            }}>
                                <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                                    <Icon
                                        name='chevron-left'
                                        size={25}
                                        color='#000'
                                    />
                                    <Text style={{fontSize: 18, marginHorizontal: 10}}> Back</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.headerTitle}>
                        <Text style={styles.title}> {title} </Text>
                    </View>
                    <View style={styles.spacing}>

                    </View>
                </View>
            </View>
        )
    }
}

export default Header

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 38,
        backgroundColor: 'grey',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 10,
        zIndex: 1000,
    },
    headerContent: {
        flexDirection: 'row',
    },
    headerButton: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    headerTitle: {
        flexGrow: 1,
        width:'50%',
    },
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 25,
    },
    spacing: {
        width: '20%',
        flexGrow: 1,
    }
})
