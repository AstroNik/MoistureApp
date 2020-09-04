import React from 'react'
import DeviceSummary from "./DeviceSummary";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

const DeviceList = ({devices, navigation, sensorData}) => {

    if (devices != null) {
        return devices.map((device, index) => {
            return (
                <TouchableOpacity style={styles.detailsBtn} key={index} onPress={() => {
                    navigation.navigate('deviceDetails', {
                        id: index,
                        device: device,
                        sensorData: sensorData[index]
                    })
                }}>
                    <DeviceSummary device={device}/>
                </TouchableOpacity>

            )
        })
    } else {
        return (
            <Text style={{flex:1, justifyContent:'center', alignContent: 'center'}}> No Devices </Text>
        )
    }
}

export default DeviceList

const styles = StyleSheet.create({
    detailsBtn: {
        width: '80%',
        padding: 20,
        backgroundColor: '#dfe6b1',
        marginVertical: 20,
    }
})
