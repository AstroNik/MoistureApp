import AuthReducer from "./AuthReducer";
import {combineReducers} from "redux";
import {firebaseReducer} from 'react-redux-firebase'
import DeviceReducer from "./DeviceReducer";

const RootReducer = combineReducers({
    auth: AuthReducer,
    device: DeviceReducer,
    firebase: firebaseReducer
})

export default RootReducer
