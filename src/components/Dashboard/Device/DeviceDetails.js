import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import {VictoryArea, VictoryChart, VictoryTheme} from "victory-native";
import axios from "axios";
import * as Localization from "expo-localization";
import Header from "../../Header/Header";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const DeviceDetails = (props) => {
    const {auth, device, sensorData, navigation} = props
    const localTime = moment(device.dateTime).format("dddd MMMM DD, h:mm a ").toString()
    const [dateBtn, setDateBtn] = useState(moment().format("DD/MM/YYYY").toString())
    const [chartData, setChartData] = useState(null)
    const today = new Date()
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const screenWidth = Math.round(Dimensions.get('window').width);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDateBtn(moment(selectedDate).format("DD/MM/YYYY").toString())
        axios.post("https://www.ecoders.ca/specificDate", {
            uid: auth.uid,
            deviceId: device.deviceId,
            date: moment(selectedDate).toISOString(),
            timezone: Localization.timezone,
        }).then(({data}) => {
            console.log(data)
            let newData
            if (data != null) {
                newData = data.map(dataSet => {
                    const container = {};
                    container.x = new Date(moment(dataSet.dateTime).toString())
                    container.y = dataSet.soilMoisturePercent
                    return container
                })
                setChartData(newData)
            }
            if (newData == null) {
                setChartData(null)
            }
        }, (error) => {
            console.log(error)
        })
    };

    const showMode = (currentMode) => {
        setShow(true);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    useEffect(() => {
        if (sensorData != null) {
            let data
            data = sensorData.map(data => {
                let container = {}
                container.x = new Date(data.dateTime)
                container.y = data.soilMoisturePercent
                return container
            })
            setChartData(data)
        }
    }, [sensorData])


    return (
        <View style={styles.container}>
            <Header navigation={navigation} backOption={true} headerTitle={"Detail"}/>
            <View style={styles.pageContent}>
                <View style={styles.deviceContainer}>
                    <View style={{width: "100%", flexDirection: 'column'}}>
                        <Text style={styles.deviceDetails}> Name - {device.deviceName}</Text>
                        <Text style={styles.deviceDetails}> Plant Location - </Text>
                        <Text style={styles.deviceDetails}> Last Updated - {localTime} </Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row', marginVertical: 15,}}>
                    <View style={{marginHorizontal: 10}}>
                        <Icon
                            name='calendar'
                            color='black'
                            size={30}
                        />
                    </View>
                    <View style={{marginHorizontal: 10}}>
                        <TouchableOpacity onPress={showDatepicker} style={styles.calendarBtn}>
                            <Text style={styles.calBtnText}> {dateBtn} </Text>
                        </TouchableOpacity>
                        {show && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                maximumDate={today}
                                onChange={onChange}
                            />
                        )}
                    </View>
                </View>

                <View>
                    {(chartData != null) ? (
                        <VictoryChart width={screenWidth} height={500} theme={VictoryTheme.material}
                                      animate={{
                                          duration: 1000,
                                          onLoad: {duration: 1000}
                                      }}>
                            <VictoryArea
                                style={{
                                    data: {
                                        stroke: "blue",
                                        fill: "blue", opacity: 0.1,
                                        strokeWidth: 2,
                                    },
                                    parent: {border: "1px solid #ccc"}
                                }}
                                data={chartData}
                                domain={
                                    {
                                        x: [new Date(moment(date).startOf('day').toISOString()), new Date(moment(date).endOf('day').toISOString())],
                                        y: [0, 100]
                                    }
                                }
                            />
                        </VictoryChart>
                    ) : (
                        <View style={styles.noChartData}>
                            <Text style={{fontSize: 18}}> No Data For Today </Text>
                        </View>
                    )

                    }

                </View>
            </View>
        </View>
    )
}

const mapStateToProps = (state, ownProps) => {
    const device = ownProps.route.params.device;
    const sensorData = ownProps.route.params.sensorData;
    return {
        auth: state.firebase.auth,
        device: device,
        sensorData: sensorData
    }
}

export default connect(mapStateToProps)(DeviceDetails)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    pageContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
    },
    deviceContainer: {
        marginVertical: 25,
    },
    noChartData: {
        marginTop: '50%',
    },
    deviceDetails: {
        fontSize: 17
    },
    calendarBtn: {
        height: 45,
        backgroundColor: 'skyblue',
        padding: 10,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    calBtnText: {
        fontSize: 16,
        color: 'white',
    },
})
