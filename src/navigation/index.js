import React from 'react';
import { LogBox } from 'react-native';
import {
  NavigationContainer,
  createStackNavigator,
  View,
  TouchableOpacity,
  FontAwesome5
} from './../components/index';
import appPageStyle from '../styles/common';

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
import NotificationList from '../pages/transporter/notificationList';
import FAQView from '../pages/transporter/bottomTabs/settings/FAQ';
import ContactUs from '../pages/transporter/bottomTabs/settings/contactus';
import AboutUs from '../pages/transporter/bottomTabs/settings/aboutus';
import Terms from '../pages/transporter/bottomTabs/settings/termsandconditions';
import Privacy from '../pages/transporter/bottomTabs/settings/privacy';
import Report from '../pages/transporter/bottomTabs/settings/report';
import OfferLoad from '../pages/transporter/bottomTabs/management/offerLoads';
import OfferVehicle from '../pages/transporter/bottomTabs/management/offerVehicle';
import OrderConfirm from '../pages/transporter/bottomTabs/management/orderConfirm';
import OnlineOfferLoad from '../pages/transporter/bottomTabs/management/onlineOfferLoad';
import OnlineOfferVehicle from '../pages/transporter/bottomTabs/management/onlineVehicle';
import OnlineOrderConfirm from '../pages/transporter/bottomTabs/management/onlineConfirm';
import OfferDetail from '../pages/transporter/bottomTabs/management/offerDetail';
import VehicleDetail from '../pages/transporter/bottomTabs/management/vehicleDetail';
import DeriverDetail from '../pages/transporter/bottomTabs/management/driverDetail';
import VehicleDescription from '../pages/transporter/bottomTabs/management/vehicleDescription';
import ReportForm from '../pages/transporter/bottomTabs/settings/reportForm';
import AddNewDriver from '../pages/transporter/bottomTabs/management/addDriver';
import AddNewVehicle from '../pages/transporter/bottomTabs/management/addVehicle';

const Stack = createStackNavigator();
export default function App() {
  LogBox.ignoreAllLogs();
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
          title="Abay Transporter Login"
          component={TruckLogin} 
          options={{
            headerShown: false,
            headerTitle:'Abay Transporter Login',
            headerStyle: appPageStyle.primaryColor,
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="DriverLogin"
          title="Driver Login"
          component={DriverLogin} 
          options={{
            headerBackTitleVisible: false,
            headerShown: true,
            headerTitle:'Driver Login',
            headerStyle: appPageStyle.primaryColor,
            headerTintColor: '#fff',
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
            headerTitle:'Abay Transporter',
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

        <Stack.Screen
          name="FAQView"
          title="FAQ"
          component={FAQView}
          options={{
            headerShown: true,
            headerTitle:'Frequently Asked Questions',
            headerBackTitle: 'Back',
            headerStyle:{
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
          }}
        />

        <Stack.Screen
          name='ContactUs'
          title="Contact Us"
          component={ContactUs}
          options={{
            headerShown: true,
            headerTitle: "Contact Us",
            headerBackTitle: "back",
            headerStyle:{
              backgroundColor: '#fff'
            },
            headerTintColor: '#19788e',
          }}
        />
        
        <Stack.Screen
          name='AboutUs'
          title="About Us"
          component={AboutUs}
          options={{
            headerShown: true,
            headerTitle: "About Us",
            headerBackTitle: "back",
            headerStyle:{
              backgroundColor: '#fff'
            },
            headerTintColor: '#19788e',
          }}
        />

        <Stack.Screen
          name='Terms'
          title="Terms & Conditions"
          component={Terms}
          options={{
            headerShown: true,
            headerTitle: "Terms & Conditions",
            headerBackTitle: "back",
            headerStyle:{
              backgroundColor: '#fff'
            },
            headerTintColor: '#19788e',
          }}
        />

        <Stack.Screen
          name='Privacy'
          title="Privacy Policy"
          component={Privacy}
          options={{
            headerShown: true,
            headerTitle: "Privacy Policy",
            headerBackTitle: "back",
            headerStyle:{
              backgroundColor: '#fff'
            },
            headerTintColor: '#19788e',
          }}
        />

        <Stack.Screen
          name='Report'
          title="Reports"
          component={Report}
          options={{
            headerShown: true,
            headerTitle: "Reports",
            headerBackTitle: "back",
            headerStyle:{
              backgroundColor: '#fff'
            },
            headerTintColor: '#19788e',
          }}
        />

        <Stack.Screen
          name="OfferLoad"
          title="Offer Load"
          component={OfferLoad} 
          options={{
            headerShown: true,
            headerTitle:'Offer Load',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />

        <Stack.Screen
          name="OfferVehicle"
          title="Offer Vehicle"
          component={OfferVehicle} 
          options={{
            headerShown: true,
            headerTitle:'Offer Vehicle',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />

        <Stack.Screen
          name="OrderConfirm"
          title="Order Confirmation"
          component={OrderConfirm} 
          options={{
            headerShown: true,
            headerTitle:'Order Confirmation',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />

        <Stack.Screen
          name="OnlineOfferLoad"
          title="Online Offer"
          component={OnlineOfferLoad} 
          options={{
            headerShown: true,
            headerTitle:'Direct Offer',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />

        <Stack.Screen
          name="OnlineOfferVehicle"
          title="Online Offer"
          component={OnlineOfferVehicle} 
          options={{
            headerShown: true,
            headerTitle:'Direct Vehicle Offer',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />

        <Stack.Screen
          name="OnlineOrderConfirm"
          title="Direct Confirmation"
          component={OnlineOrderConfirm} 
          options={{
            headerShown: true,
            headerTitle:'Direct Confirmation Offer',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />


        <Stack.Screen
          name="OfferDetail"
          title="Offer Detail"
          component={OfferDetail} 
          options={{
            headerShown: true,
            headerTitle:'Offer Detail',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />

      <Stack.Screen
          name="VehicleDetail"
          title="Vehicle Detail"
          component={VehicleDetail} 
          options={{
            headerShown: true,
            headerTitle:'Vehicle Detail',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />

        <Stack.Screen
          name="DeriverDetail"
          title="Driver Detail"
          component={DeriverDetail} 
          options={{
            headerShown: true,
            headerTitle:'Driver Detail',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />

        <Stack.Screen
          name="VehicleDescription"
          title="Vehicle Description"
          component={VehicleDescription} 
          options={{
            headerShown: true,
            headerTitle:'Vehicle Description',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />

        <Stack.Screen
          name="ReportForm"
          title="Report Form"
          component={ReportForm} 
          options={{
            headerShown: true,
            headerTitle:'Report Form',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#19788e',
            },
            headerTintColor: '#fff',
            
          }}
          
        />

      <Stack.Screen
          name="AddNewDriver"
          title="Add New Driver"
          component={AddNewDriver} 
          options={{
            headerShown: true,
            headerTitle:'Add New Driver',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#19788e',
            
          }}
          
        />
        <Stack.Screen
          name="AddNewVehicle"
          title="Add New Vehicle"
          component={AddNewVehicle} 
          options={{
            headerShown: true,
            headerTitle:'Add New Vehicle',
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