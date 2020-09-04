import React from 'react'
import {View} from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const BatteryCheck = (props) => {
    let battery = <Icon/>

    if(props.battery < 10){
        battery = ( <Icon
            name={"battery-outline"}
            color='black'
            size={25}/> )
    }
    else if(props.battery >= 10 || props.battery <= 90){
        battery = ( <Icon
            name={"battery-" + props.battery.toString()}
            color='black'
            size={25}/> )
    }
    else if(props.battery > 90){
        battery = ( <Icon
            name={"battery"}
            color='black'
            size={25}/> )
    }

    return(
        <View>
            {battery}
        </View>
    )
}

export default BatteryCheck
