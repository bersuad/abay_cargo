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
  PermissionsAndroid,
  ActivityIndicator,
  // ToastAndroid,
  RefreshControl,
  Keyboard,
  Modal,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  Linking
} from "react-native";

import Toast from 'react-native-root-toast';

import ApiConfig from "./../api/ApiConfig";
import {PostCallWithErrorResponse, postWithAuthCallWithErrorResponse, postMultipartWithAuthCallWithErrorResponse, multipartPostCall, multipartPostCallWithErrorResponse} from "./../api/ApiServices";

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";


//images
import Logo from './../../assets/splash_logo.png';
import Truck from './../../assets/truck.png';
import ForgetPassword from './../../assets/password.gif';
import TruckLogin from './../../assets/transporter.gif';
import DriverLogin from './../../assets/driver.gif';
import cardBackground from "./../../assets/cardimage.jpg";
import headerImage from "./../../assets/shipper_banner.png";
import userImage from "./../../assets/userava.png";
import placeholder from "./../../assets/placeholder.jpg";
import fileIcon from "./../../assets/file.png";

import Collapsible from 'react-native-collapsible';
import appPageStyle from "../styles/common";
import AppContext from "./AppContext";
import whiteLogo from "./../../assets/white-abay-logo.png";

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
  KeyboardAvoidingView,
  FlatList,
  StatusBar, 
  BouncyCheckbox,
  SafeAreaView,
  ImagePicker,
  PermissionsAndroid,
  ActivityIndicator,
  Keyboard,
  Modal,
  Platform,

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
  Logo,
  Truck,
  ForgetPassword,
  TruckLogin,
  DriverLogin,
  cardBackground,
  headerImage,
  userImage,
  placeholder,
  fileIcon,
  whiteLogo,

  //main styling
  appPageStyle,

  // API Config
  ApiConfig,
  PostCallWithErrorResponse,
  postWithAuthCallWithErrorResponse,
  postMultipartWithAuthCallWithErrorResponse,
  multipartPostCall,
  multipartPostCallWithErrorResponse,
  // storage
  AsyncStorage,

  // internet
  NetInfo,
  // ToastAndroid,
  Toast,
  RefreshControl,
  AppContext,
  Linking
};