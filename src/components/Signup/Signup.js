import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux'
import {signUp} from "../../../store/Actions/AuthActions";

class Signup extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        formErrors: '',
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    handleSubmit = () => {
        if(this.state.firstName === ""){
            this.setState({formErrors: 'First Name Empty!'})
        }
        else if(this.state.lastName === ""){
            this.setState({formErrors: 'Last Name Empty!'})
        }
        else if (this.state.email === ""){
            this.setState({formErrors: 'Email Empty!'})
        }
        else if(!this.validateEmail(this.state.email)){
            this.setState({formErrors: 'Email is Poorly Formmated!'})
        }
        else if(this.state.password ===""){
            this.setState({formErrors: 'Password Empty!'})
        } else {
            this.setState({formErrors: ''})
            if(this.props.authError === null){
                this.props.signUp(this.state)
                this.props.navigation.pop()
            }
        }
    }

    render() {
        const {authError} = this.props
        return (
            <ImageBackground source={require('../../images/background.png')}
                             style={styles.image}>
                <View style={styles.container}>
                    <Text style={{fontSize: 40, color:'white', marginBottom: 30}}>Signup</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        placeholderTextColor={"#fff"}
                        onChangeText={(text) => {
                            this.setState({firstName: text})
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        placeholderTextColor={"#fff"}
                        onChangeText={(text) => {
                            this.setState({lastName: text})
                        }}
                    />
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
                        secureTextEntry
                        onChangeText={(text) => {
                            this.setState({password: text})
                        }}
                    />

                    <TouchableOpacity style={styles.userBtn} onPress={this.handleSubmit}>
                        <Text style={styles.btnText}>Signup</Text>
                    </TouchableOpacity>

                    <Text style={{color: 'red'}}>
                        {this.state.formErrors}
                    </Text>
                    <Text style={{marginBottom: 20, color:'red'}}>
                        {authError}
                    </Text>



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
        );
    }

    // }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);


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
        marginVertical: 10,
        backgroundColor: '#fff',
        paddingVertical: 15,
        width: '70%',
        borderRadius: 25,
        textAlign: 'center',
        marginBottom: 40,
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
});
