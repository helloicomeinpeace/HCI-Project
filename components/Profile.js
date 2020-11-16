import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'

function Profile(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Tab</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonText: {
            fontSize: 16,
            fontWeight: '500',
            color: '#ffffff',
            textAlign: 'center'
        }
})

export default Profile