import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home.js'
import Profile from './Profile.js'

const Tab = createBottomTabNavigator()
function MainTabNavigator() {
  return (
   <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home}/>
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
   </NavigationContainer>
  )
}

export default MainTabNavigator