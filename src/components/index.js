import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Animated,
  BackHandler, 
  LogBox, 
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import { SafeAreaView } from 'react-native-safe-area-context';

import * as ImagePicker from 'expo-image-picker';

import {
  Ionicons,
  MaterialCommunityIcons, 
  FontAwesome5, 
  MaterialIcons, 
  SimpleLineIcons,
  AntDesign, 
  Fontisto,
  Entypo,
} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import BouncyCheckbox from "react-native-bouncy-checkbox";
//images
import Logo from './../../assets/splash_logo.png';
import Driver from './../../assets/driver.png';
import Truck from './../../assets/truck.png';
import ForgetPassword from './../../assets/password.gif';
import TruckLogin from './../../assets/transporter.gif';
import DriverLogin from './../../assets/driver.gif';
import cardBackground from "./../../assets/cardimage.jpg";
import headerImage from "./../../assets/cargodelivary.png";
import userImage from "./../../assets/userava.png";
import placeholder from "./../../assets/placeholder.jpg";

import Collapsible from 'react-native-collapsible';

export {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
  Animated,
  BackHandler, 
  LogBox, 
  StatusBar, 
  BouncyCheckbox,
  SafeAreaView,
  ImagePicker,

  createMaterialBottomTabNavigator,
  createAppContainer,  
  // navigation
  useNavigation,
  NavigationContainer,
  createStackNavigator, 
  HeaderBackButton,
  Collapsible,
  
  //icons
  Ionicons,
  MaterialCommunityIcons, 
  FontAwesome5, 
  MaterialIcons, 
  SimpleLineIcons,
  AntDesign, 
  Fontisto,
  Entypo,

  //Images
  Driver,
  Logo,
  Truck,
  ForgetPassword,
  TruckLogin,
  DriverLogin,
  cardBackground,
  headerImage,
  userImage,
  placeholder,
};