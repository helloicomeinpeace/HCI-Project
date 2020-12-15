import React, { Component} from 'react';
import ImagePicker from 'react-native-image-picker';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Image} from 'react-native';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'


export default class SignUp extends Component {
   constructor(props){
     super(props);
     this.state={
        email:'',
        password: '',
        confirmPassword: ''
     }
    }

    saveData=()=>{
    auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
        console.log('User account created & signed in!');
        database()
          .ref('/users/' + auth().currentUser.uid + '/')
          .set({
            email: this.state.email,
            profileSet: false
          })
          .then(() => console.log('Data set.'));
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });

    }
    changeScreen=()=>{
                this.props.navigation.replace("Login")
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
                    <TextInput style={styles.inputBox}
                    onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    placeholderTextColor = "#002f6c"
                    ref={(input) => this.confirmPassword = input}
                    />

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={this.saveData}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={this.changeScreen}>Already have an account? Login</Text>
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