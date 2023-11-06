import React from 'react';

import {
  NavigationContainer,
  createStackNavigator,
  View,
  TouchableOpacity,
  FontAwesome5
} from './../components/index'

// Pages List
import splash from './../pages/splash';
import HomeRoute from '../pages/login_route';
import TruckLogin from '../pages/transporter/Auth/transporter_login';
import DriverLogin from '../pages/driver/driver_login';
import ForgetPassword from './../pages/forget_password';
import Registration from '../pages/transporter/Auth/transporterRegistration';
import TransporterDashboard from '../pages/transporter/transporterTab';
import ActionBarImage from './../pages/headerImage';
import NotificationBar from '../pages/transporter/transporterNotification';
import ProfileSetting from '../pages/transporter/bottomTabs/settings/transportProfile';
import transporterVehiclesSearch from '../pages/transporter/bottomTabs/management/vehiclesSearch';
import transporterDriverSearch from '../pages/transporter/bottomTabs/management/driverSearch';
import transporterFreights from '../pages/transporter/bottomTabs/management/transporterFreights';
import transporterMOU from '../pages/transporter/bottomTabs/management/transporterMOU';
import transporterContract from '../pages/transporter/bottomTabs/management/transporterContract';
import NotificationList from '../pages/transporter/notificationList'

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

        <Stack.Screen
          name="ForgetPassword"
          title="Forget Password"
          component={ForgetPassword} 
          options={{
            headerShown: true,
            headerTitle:'Forget Password',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#19788e',
            },
            headerTintColor: '#fff'
          }}
          
        />

        <Stack.Screen
          name="Registration"
          title="Registration"
          component={Registration} 
          options={{
            headerShown: true,
            headerTitle:'Transporter Registration',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#19788e',
            },
            headerTintColor: '#fff'
          }}
          
        />

        {/* Main Dashboard  */}
        <Stack.Screen
          name="TransporterDashboard"
          title="TransporterDashboard"
          component={TransporterDashboard} 
          options={{
            headerShown: true,
            headerTitle:'Cargo & Delivery',
            headerStyle: {
              backgroundColor: '#fff',
              shadowColor: '#1f1f1f',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 3,
            },
            headerTintColor: '#19788e',
            headerBackTitleVisible: false,
            headerLeft: ()=> <ActionBarImage/>,
            headerRight: ()=> <NotificationBar />,
          }}
          
        />

        <Stack.Screen
          name="ProfileSetting"
          title="Profile Setting"
          component={ProfileSetting} 
          options={{
            headerShown: true,
            headerTitle:'Profile Setting',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            headerRight: ()=> 
            <View>
              <TouchableOpacity style={{flexDirection: 'row', height: "100%", marginTop: 10}}>
                <FontAwesome5 name="edit" size={24} color="#19788e" style={{marginRight: 25, marginTop: 6}}/>
              </TouchableOpacity>
          </View>,
          }}
          
        />

        <Stack.Screen
          name="transporterVehiclesSearch"
          title="Vehicles Search"
          component={transporterVehiclesSearch} 
          options={{
            headerShown: true,
            headerTitle:'Vehicles Search',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />

        <Stack.Screen
          name="transporterDriverSearch"
          title="Driver Search"
          component={transporterDriverSearch} 
          options={{
            headerShown: true,
            headerTitle:'Driver Search',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />

        <Stack.Screen
          name="transporterFreights"
          title="Freights"
          component={transporterFreights} 
          options={{
            headerShown: true,
            headerTitle:'Freights',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />
        <Stack.Screen
          name="transporterMOU"
          title="MOU Process"
          component={transporterMOU} 
          options={{
            headerShown: true,
            headerTitle:'MOU Process',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />
        <Stack.Screen
          name="transporterContract"
          title="Contract"
          component={transporterContract} 
          options={{
            headerShown: true,
            headerTitle:'Contract',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />
        
        <Stack.Screen
          name="NotificationList"
          title="Notifications"
          component={NotificationList} 
          options={{
            headerShown: true,
            headerTitle:'Notifications',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />

      </Stack.Navigator>
      
    </NavigationContainer>
  );
}