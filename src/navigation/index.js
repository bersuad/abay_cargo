import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

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
      >
        <Stack.Screen  
          name="splash" 
          component={splash} 
          options={{headerShown: false}}
        />
        <Stack.Screen options={{headerShown: false}}  name="HomeRoute"  component={HomeRoute} />
        <Stack.Screen  
          name="TruckLogin" 
          component={TruckLogin} 
          options={{
            headerShown: true,
            headerTitle:'Transporter Login',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#19788e',
            },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen
          name="DriverLogin"
          title="Driver Login"
          component={DriverLogin} 
          options={{
            headerShown: true,
            headerTitle:'Driver Login',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#19788e',
            },
            headerTintColor: '#fff'
          }}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}