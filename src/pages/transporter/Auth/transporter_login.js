import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,

  //navigation
  useNavigation,
  //image
  TruckLogin,
  //main style
  appPageStyle,

  // API Config
  ApiConfig,
  PostCallWithErrorResponse,
  AsyncStorage,
  NetInfo,
  LogBox,
  ActivityIndicator,
  Toast,
  Ionicons,
  Logo,
  whiteLogo
} from "./../../../components/index";

import SnackBar from 'react-native-snackbar-component';


export default function App() {

  const navigation = useNavigation();
  const [state, setState] = useState({
    device_token: "",
    device_id: "",
    app_version: "",
    app_type: "shipper",
    device_os: "web",
    username: "",
    password: "",
    isLoading: false,
    inputFormat: true,
    icon: "eye-off",
    checkInternet:true,
  });
  const [progress, setProgress] = useState(0);
  
  const [errMsg, setErrMsg] = useState({ username: "", password: "" });
  
  const componentWillMount = () => {
    useEffect( () => {
      // Anything in here is fired on component unmount.
      LogBox.ignoreLogs(['componentWillReceiveProps', 'componentWillMount']);
      this.mounted = true;
      this._checkConnection();
      this.index = 0;
      
      return () => {
        // Anything in here is fired on component unmount.
        setState({ ...state, isLoading: false, checkInternet:true,});
        this.mounted = false;
      }
    }, []);
  }

  const toastWithDurationHandler = (message) => {
    // To make Toast with duration
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      backgroundColor: 'red',
      animation: true,
    });
  };
  
  componentWillMount();

  _changeIcon=()=>{
    setState(prevState =>({ ...state, icon:prevState.icon === 'eye' ? 'eye-off' : 'eye', inputFormat: !prevState.inputFormat }));
  }
  
  _checkConnection = async()=>{
    NetInfo.addEventListener(networkState => {
      if(networkState.isConnected){
        
        setState({...state, checkInternet: true });
      }else{
        setState({...state, checkInternet: false });
        
      }
    });
  }
  
  _login = async () =>{
    setState({ ...state, isLoading: true});
    
    if (state.username === "" || state.password === "") {
      if (state.username === "") {
        setErrMsg({ ...errMsg, username: "** Please Enter Your Email **" });
        setState({ ...state, isLoading: false});
        return;
      }
      
      if (state.password === "") {
        setErrMsg({ ...errMsg, password: "** Please Enter Password **" });
        setState({ ...state, isLoading: false});
        return;
      }
    } 


    PostCallWithErrorResponse(ApiConfig.SHIPPER_LOGIN_API, state)
    .then((data) => {
      if (data.json.message === "Wrong credentials entered") {
        setState({ ...state, isLoading: false});
        toastWithDurationHandler('Wrong Username or Password');
        AsyncStorage.clear();
      }

      if (data.json.message === "Registration Rejected , please see check your inbox") {
        setState({ ...state, isLoading: false});
        toastWithDurationHandler('Wrong username and password inputs, please check your inputs!');
        AsyncStorage.clear();
      }

      if (data.json.message === "Registration in progress") {
        setState({ ...state, isLoading: false});
        toastWithDurationHandler('Registration in progress, Please Contact Abay Support!');
        AsyncStorage.clear();
      }

      if (data.json.message === "Wrong password entered") {
        setState({ ...state, isLoading: false});
        toastWithDurationHandler('Wrong Username or Password');
        AsyncStorage.clear();
      }

      if (data.json.message === "Undefined variable $output") {
        setState({ ...state, isLoading: false});
        toastWithDurationHandler('Wrong Username or Password');
        AsyncStorage.clear();
      }
      
      
      if (data.json.result) {
        setState({ ...state, isLoading: false});
        
        AsyncStorage.setItem("api_key", data.json.api_key);
        
        AsyncStorage.setItem('user_id', data.json.user_id.toString())
        .then((success) => {
          
        })
        .catch((e) => console.log(e));
        AsyncStorage.setItem("customer_id", data.json.customer_id.toString());
        
        AsyncStorage.setItem(
          "userDetails",
          JSON.stringify(data.json.user_details)
        );

        navigation.reset({
          index: 0,
          routes: [{ name: 'TransporterDashboard' }],
        })
        
        // navigation.navigate('TransporterDashboard');
      }
    })
    .catch((error) => {
      setState({ ...state, isLoading: true});
    });

  }
  
  
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={styles.container}>
        <StatusBar barStyle = "white-content" hidden = {false} {...appPageStyle.primaryColor} translucent = {true}/>
          {!state.checkInternet &&(
            <SnackBar visible={true} textMessage="No Internet Connection!" actionHandler={()=>{this._checkConnection()}} actionText="Try Again"/>
          )}
          <View style={styles.logoArea}>
            <Image style={styles.image} source={whiteLogo} /> 
            <Text style={[styles.buttonText, appPageStyle.primaryTextColor, {fontSize: 20}]}>
            Welcome
            </Text>
            <Text style={[styles.buttonText, appPageStyle.primaryTextColor]}>
             Abay Logistics Shipper Login
            </Text>
            
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={[styles.TextInput]}
              placeholder="Email Here."
              placeholderTextColor="#003f5c"
              onChangeText={(username) =>{
                  setErrMsg({ ...errMsg, username: "" });
                  setState({ ...state, username: username})
                }
              } 
              maxLength={50}
              returnKeyLabel = {"Next"}
            /> 
          </View> 
          {errMsg.username.length > 0 && (
            <Text style={{color: '#FF5151', marginTop: 0, position: "absolute"}}>{errMsg.username}</Text>
          )}
          <View style={styles.inputView}>
            <TextInput
              style={[styles.TextInput,]}
              placeholder="Password."
              placeholderTextColor="#010101"
              secureTextEntry={state.inputFormat}
              onChangeText={(password) =>{
                setErrMsg({ ...errMsg, password: "" });
                setState({...state, password: password})}
  
              } 
              maxLength={50}
              returnKeyLabel = {"Go"}
            /> 
            <Ionicons name={state.icon} onPress={()=> this._changeIcon()} size={18} color="#003f5c" style={{position: 'absolute', right: 20}}/>
          </View> 
          {errMsg.password.length > 0 && (
            <Text style={{color: '#FF5151', marginTop: -10, paddingBottom: 10, position: "relative"}}>{errMsg.password}</Text>
          )}
          <TouchableOpacity onPress={()=>navigation.navigate('ForgetPassword')}>
            <Text style={{...styles.forgot_button, ...appPageStyle.primaryTextColor}}>Forgot Password?</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={[styles.loginBtn, appPageStyle.secondaryBackgroundColor]} onPress={()=>this._login()}>
            {!state.isLoading &&(
                <Text style={{...appPageStyle.secondaryTextColor, fontWeight:'bold' }}>LOGIN</Text>
            )}
            {state.isLoading && (
                <ActivityIndicator size="large" {...appPageStyle.secondaryTextColor} />       
            )}
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=>navigation.navigate('Registration')} style={{...styles.loginBtn, borderColor: 'rgba(255, 255, 255, 0.9)', borderWidth:1, width: "90%",}}>
            <Text style={[styles.buttonText, appPageStyle.primaryTextColor,]}>Register</Text> 
          </TouchableOpacity> 
        </View> 
      </ScrollView>
    );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b76b29",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 0,
    height: 120,
    width: 120,
    objectFit: "fill" ,
    marginBottom:10
  },
  logoArea:{
    marginTop: 40,
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 30,
    width: '90%',
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 11,
    fontWeight: 'bold',
    width: '100%',
    backgroundColor:'#fff',
    borderRadius: 30,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    fontSize:18
  },
  loginBtn: {
    width: "90%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    color: '#fff',
  },
  
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});