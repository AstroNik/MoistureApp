import React from 'react'
import Dashboard from "../Dashboard/Dashboard";
import {NavigationContainer} from "@react-navigation/native";
import DeviceDetails from "../Dashboard/Device/DeviceDetails";
import {createDrawerNavigator} from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import Notifications from "../Notifications/Notifications";
import PlantDatabase from "../PlantDatabase/PlantDatabase";
import Game from "../Game/Game";
import Settings from "../Settings/Settings";
import FindPlant from "../FindPlant/FindPlant";

const Drawer = createDrawerNavigator()

const SignInStack = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Dashboard' drawerContent={(props) => <DrawerContent {...props}/>}>
                <Drawer.Screen
                    name='Dashboard'
                    component={Dashboard}
                />
                <Drawer.Screen
                    name="deviceDetails"
                    component={DeviceDetails}
                />
                <Drawer.Screen
                    name="Notifications"
                    component={Notifications}
                />
                <Drawer.Screen
                    name="FindPlant"
                    component={FindPlant}
                />
                <Drawer.Screen
                    name="PlantDatabase"
                    component={PlantDatabase}
                />
                <Drawer.Screen
                    name="Game"
                    component={Game}
                />
                <Drawer.Screen
                    name="Settings"
                    component={Settings}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default SignInStack
