import axios from 'axios'
import * as Localization from 'expo-localization';

export const createDevice = (device) => {
    return (dispatch, getState) => {

        dispatch({type: 'CREATE_DEVICE', device})
    }
}

export const getDevices = () => {
    return (dispatch, getState) => {
        let state = getState();
        return axios.post("https://www.ecoders.ca/getSensorData", {
            uid: state.firebase.auth.uid
        }, {
            headers: {
                "Authorization": `Bearer ${state.firebase.auth.stsTokenManager.accessToken}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(({data}) => {
            dispatch({type: 'GET_DEVICE_DATA', devices: data})
        }, (error) => {
            dispatch({type: 'GET_DEVICE_DATA_ERROR', err: error})
        })
    }
}

export const getUniqueDeviceData = () => {
    return (dispatch, getState) => {
        let state = getState();
        return axios.post("https://www.ecoders.ca/uniqueDeviceData", {
            uid: state.firebase.auth.uid,
            timezone: Localization.timezone,
        }, {
            headers: {
                "Authorization": `Bearer ${state.firebase.auth.stsTokenManager.accessToken}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(({data}) => {
            dispatch({type: 'GET_SENSOR_DATA', sensorData: data})
        }, (error) => {
            console.log(error)
            dispatch({type: 'GET_DEVICE_DATA_ERROR', err: error})
        })
    }
}
