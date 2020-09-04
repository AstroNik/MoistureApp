import React, {Component} from 'react'
import {ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'
import {forgotPassword} from "../../../store/Actions/AuthActions";

class ForgotPassword extends Component {
    state = {
        email: '',
        emailError: ''
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleSubmit = () => {
        if(this.state.email === ""){
            this.setState({emailError: 'Email Empty'})
        } else if (!this.validateEmail(this.state.email)){
            this.setState({emailError: 'Bad Email Format'})
        }
        else {
            this.props.forgotPassword(this.state.email)
            this.props.navigation.navigate('login')
        }
    }

    render() {
        const {emailAuth} = this.props

        return (
            <ImageBackground source={require('../../images/background.png')}
                             style={styles.image}>
                <View style={styles.container}>
                    <Text style={{fontSize: 40, color: 'white', marginBottom: 40}}> Password Reset </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={"#fff"}
                        onChangeText={(text) => {
                            this.setState({email: text})
                        }}
                    />
                    <TouchableOpacity style={styles.userBtn} onPress={this.handleSubmit}>
                        <Text style={styles.btnText}>Send Email</Text>
                    </TouchableOpacity>

                    <Text style={{color:'red'}}> {emailAuth}</Text>
                    <Text style={{color:'red'}}> {this.state.emailError} </Text>

                    <View style={styles.loginTextContainer}>
                        <Text style={{fontSize: 16}}> Already have an account?</Text>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate('login')
                        }}>
                            <Text style={styles.loginButton}> Login </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ImageBackground>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        emailAuth: state.auth.emailAuth,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (email) => dispatch(forgotPassword(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)

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
    loginTextContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    loginButton: {
        color: "grey",
        fontSize: 17,
        fontWeight: '500',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
})
