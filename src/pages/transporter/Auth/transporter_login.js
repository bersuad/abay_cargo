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
  Animated,
  ActivityIndicator,
  Toast,
  Ionicons,
} from "./../../../components/index";

import SnackBar from 'react-native-snackbar-component';


export default function App() {

  const navigation = useNavigation();
  const [state, setState] = useState({
    device_token: "",
    device_id: "",
    app_version: "",
    app_type: "transporter",
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
      this.animation = new Animated.Value(0);
      
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
        // this._requestAccess();
        console.log('connected');
        this.setState({ checkInternet: false });
      }else{
        this.setState({ checkInternet: true });
        console.log('not connected');
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
    
    PostCallWithErrorResponse(ApiConfig.TRANSPORTER_LOGIN_API, state)
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

      if (data.json.message === "Wrong password entered") {
        setState({ ...state, isLoading: false});
        toastWithDurationHandler('Wrong Username or Password');
        AsyncStorage.clear();
      }
      
      console.log(data.json);
      if (data.json.result) {
        setState({ ...state, isLoading: false});
        
        AsyncStorage.setItem("api_key", data.json.api_key);
        
        AsyncStorage.setItem('user_id', data.json.user_id.toString())
        .then((success) => {
          console.log("succesfully saved in asyncestorage");
        })
        .catch((e) => console.log(e));
        AsyncStorage.setItem("customer_id", data.json.customer_id.toString());
        
        AsyncStorage.setItem(
          "userDetails",
          JSON.stringify(data.json.user_details)
        );
        
        navigation.navigate('TransporterDashboard');
      }
    })
    .catch((error) => {
      // navigate("/ForgetPassword");
      setState({ ...state, isLoading: true});
      console.log(error);
    });

  }
  
  
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={styles.container}>
        <StatusBar barStyle = "white-content" hidden = {false} {...appPageStyle.primaryColor} translucent = {true}/>
          {!state.checkInternet &&(
            <SnackBar visible={true} textMessage="No Internet Connection!" actionHandler={()=>{console.log("snackbar button clicked!")}} actionText="Try Again"/>
          )}
          <View style={styles.logoArea}>
            <Image style={styles.image} source={TruckLogin} /> 
            <Text style={[styles.buttonText, appPageStyle.secondaryTextColor]}>
              Abay Transporter Login
            </Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={[styles.TextInput, appPageStyle.secondaryTextColor]}
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
              style={[styles.TextInput, appPageStyle.secondaryTextColor]}
              placeholder="Password."
              placeholderTextColor="#003f5c"
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
            <Text style={{...styles.forgot_button, ...appPageStyle.secondaryTextColor}}>Forgot Password?</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={[styles.loginBtn, appPageStyle.primaryColor]} onPress={()=>this._login()}>
            {!state.isLoading &&(
                <Text style={appPageStyle.primaryTextColor}>LOGIN</Text>
            )}
            {state.isLoading && (
                <ActivityIndicator size="small" {...appPageStyle.primaryTextColor} />       
            )}
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=>navigation.navigate('Registration')}>
            <Text style={[styles.buttonText, appPageStyle.secondaryTextColor, {marginTop: 25, marginBottom: 25,}]}>Register</Text> 
          </TouchableOpacity> 
        </View> 
      </ScrollView>
    );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 0,
    height: 100,
    width: 100,
    objectFit: "contain",
  },
  logoArea:{
    marginTop: 40,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "rgba(25, 120, 142, 0.3)",
    borderRadius: 30,
    width: '90%',
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    // marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "90%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    color: '#fff',
    // paddingTop: 20
  },
  
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    fontWeight: 'bold'
  },
});