import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Login from './Login.js'
import SignUp from './SignUp.js'
import Home from './Home.js'
import Profile from './Profile.js'
import Loading from './Loading.js'
import Chats from './Chats.js'


const auth = createStackNavigator();
const Tab = createBottomTabNavigator()
function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home}/>
      <Tab.Screen name='Profile' component={Profile} />
      <Tab.Screen name='Chats' component={Chats}/>
    </Tab.Navigator>
  )
}
const Nav = () => {
  return (
    <NavigationContainer>
          <auth.Navigator
          screenOptions={{headerShown:false}}>
            <auth.Screen
              name="Loading"
              component={Loading}
              options={{ title: 'Loading' }}
            />
            <auth.Screen
              name="Login"
              component={Login}
              options={{ title: 'Login' }}
            />
            <auth.Screen
              name="Sign Up"
              component={SignUp}
              options={{ title: 'Sign Up' }}
            />
            <auth.Screen
              name="MainTabNavigator"
              component={MainTabNavigator}
              options={{ title: 'Main Tab Navigator' }}
            />
           </auth.Navigator>
     </NavigationContainer>
     );
};

export default Nav;
