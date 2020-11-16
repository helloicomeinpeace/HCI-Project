import React, { Component} from 'react';
import auth from '@react-native-firebase/auth'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Image, Button} from 'react-native';
export default class Login extends Component {
   constructor(props){
     super(props);
     this.state={
        email:'',
        password: ''
     }
    }

    Login=()=>{
    console.log(this.state.email)
    console.log(this.state.password)
    auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    }
    changeScreen=()=>{
            this.props.navigation.replace("Sign Up")
        }
    render() {
            return(<>
                <View style={styles.container}>
                    <View style={{flex:0.6, height: undefined, width: undefined}}>
                    <Image source={require('../images/book-png-12.png')} />
                    </View>
                    <TextInput style={styles.inputBox}
                    onChangeText={(email) => this.setState({email})}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={()=> this.password.focus()}/>

                    <TextInput style={styles.inputBox}
                    onChangeText={(password) => this.setState({password})}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor = "#002f6c"
                    ref={(input) => this.password = input}
                    />
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={this.Login}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={this.changeScreen}>Don't have an account? Sign Up</Text>
                    </TouchableOpacity>
                </View></>

            )
            }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});