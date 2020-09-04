import React, {Component} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {getDevices, getUniqueDeviceData} from "../../../store/Actions/DeviceActions";
import DeviceList from "./Device/DeviceList";
import Header from "../Header/Header";
import {connect} from "react-redux";
import Loading from '../Loading/Loading'
import {getUserData} from "../../../store/Actions/AuthActions";


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.props.getDevices()
        this.props.getUniqueDeviceData()
        this.props.getUserData()
        this.wait().then(() => {
            this.setState({refreshing: false});
        });
    }


    componentDidMount() {
        this.props.getDevices()
        this.props.getUniqueDeviceData()
        this.props.getUserData()
    }

    render() {
        const {devices, navigation, sensorData} = this.props
        if (this.props.deviceLoaded === false) {
            return <Loading/>
        } else {
            return (
                <View style={styles.container}>
                    <Header navigation={navigation} backOption={false} headerTitle={"Dash"}/>
                    <ScrollView ontentContainerStyle={{flexGrow: 1, justifyContent: 'center'}} refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/>}>
                        <View style={styles.scrollView}>
                            <DeviceList devices={devices} navigation={navigation} sensorData={sensorData}/>
                        </View>
                    </ScrollView>
                </View>

            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        devices: state.device.devices,
        deviceLoaded: state.device.devicesLoaded,
        sensorData: state.device.sensorData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDevices: () => dispatch(getDevices()),
        getUniqueDeviceData: () => dispatch(getUniqueDeviceData()),
        getUserData: () => dispatch(getUserData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        alignItems: 'center',
    },
});
