import React from 'react'
import {StyleSheet, Text, View} from "react-native";
import moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BatteryCheck from "./BatteryCheck";

const DeviceSummary = ({device}) => {
    const nameDisplay = device.deviceName ? device.deviceName : "Device Name Required"
    const localTime = moment(device.dateTime).format("h:mm a DD/MM").toString()

    return (
        <View style={styles.container}>
            <View style={{width:"85%"}}>
                <Text style={styles.deviceName}> {nameDisplay} </Text>
                <Text style={styles.timeText}> Last Updated: {localTime}</Text>
                <Text> Device ID: {device.deviceId} </Text>
            </View>
            <View style={styles.iconContainer}>
                <View style={styles.moistureContainer}>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={styles.iconText}>
                            {device.soilMoisturePercent}
                        </Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                            <Icon
                                name="water"
                                color='#59bcd4'
                                size={25}/>
                    </View>
                </View>
                <View style={styles.batteryContainer}>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={styles.iconText}>
                            {device.battery}
                        </Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <BatteryCheck battery={device.battery}/>
                    </View>
                </View>

            </View>

        </View>
    )
}

export default DeviceSummary

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        alignContent:'center',
        alignItems:'center',
    },
    deviceName: {
        fontSize: 18
    },
    timeText: {
        fontSize: 14
    },
    iconContainer: {
        flexDirection: 'column',
        width: '20%'
    },
    moistureContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
    },
    batteryContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
    },
    iconText: {
        fontSize: 16,
    }
})
