import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Logo from "../Logo/Logo";
import {connect} from "react-redux";
import {signIn} from "../../../store/Actions/AuthActions";

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = () => {
        this.props.signIn(this.state)
    }

    render() {
        const {authError} = this.props;
        return (
            <ImageBackground source={require('../../images/background.png')}
                             style={styles.image}>
                <View style={styles.container}>
                    <Logo/>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={"#fff"}
                        onChangeText={(text) => {
                            this.setState({email: text})
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={"#fff"}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({password: text})
                        }}
                    />
                    <TouchableOpacity style={styles.userBtn} onPress={this.handleSubmit}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>

                    <Text style={{color: 'red'}}>
                        {authError}
                    </Text>

                    <View style={styles.signupTextContainer}>
                        <Text style={{fontSize: 16}}> Don't have an account yet?</Text>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('signup');
                        }}>
                            <Text style={styles.signupButton}> Signup </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{marginBottom: 40}} onPress={() => {
                        this.props.navigation.navigate('forgotPassword');
                    }}>
                        <Text style={{color: 'grey'}}> Forgot Password? </Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '70%',
        backgroundColor: '#dae3d2',
        padding: 15,
        marginVertical: 10,
        borderRadius: 25,
        fontSize: 16,
        color: '#fff',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    userBtn: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        width: '70%',
        borderRadius: 25,
        textAlign: 'center',
    },
    btnText: {
        fontSize: 18,
        textAlign: 'center'
    },
    signupTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    signupButton: {
        color: "grey",
        fontSize: 17,
        fontWeight: '500',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});
