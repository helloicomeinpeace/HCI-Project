import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'

export default class Home extends React.Component {

logOut(){
auth().signOut().then(() => console.log('User signed out!'))
}
render(){
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={this.logOut}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
   buttonText: {
          fontSize: 16,
          fontWeight: '500',
          color: '#ffffff',
          textAlign: 'center'
      },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  }
})
