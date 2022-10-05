import { View, Text } from 'react-native'
import React from 'react'
import Login from './screens/Login'
import Home from './screens/Home'
import ManageCar from './screens/ManageCar'
import Register from './screens/Register'
import AddCar from './screens/AddCar'


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ManageCar" component={ManageCar} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddCar" component={AddCar} />
    </Stack.Navigator>
  </NavigationContainer>

  )
}