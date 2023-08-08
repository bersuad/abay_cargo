import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import splash from './../pages/splash';
import HomeRoute from '../pages/login_route';
import TruckLogin from './../pages/transporter_login';
import DriverLogin from './../pages/driver_login';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={ splash }
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen  name="splash" component={splash} />
        <Stack.Screen  name="HomeRoute"  component={HomeRoute} />
        <Stack.Screen  name="TruckLogin"  component={TruckLogin} />
        <Stack.Screen  name="DriverLogin"  component={DriverLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}