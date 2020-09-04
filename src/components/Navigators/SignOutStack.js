import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import {NavigationContainer} from "@react-navigation/native";
import ForgotPassword from "../PasswordReset/ForgotPassword";

const AuthStack = createStackNavigator()

const SignOutStack = () => {
    return (
        <NavigationContainer>
            <AuthStack.Navigator initialRouteName='login' screenOptions={{headerShown: false}}>
                <AuthStack.Screen name='login' component={Login}/>
                <AuthStack.Screen name='signup' component={Signup}/>
                <AuthStack.Screen name='forgotPassword' component={ForgotPassword} />
            </AuthStack.Navigator>
        </NavigationContainer>
    )
}

export default  SignOutStack
