import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SimpleLineIcons,
  MaterialIcons,
  TextInput,
  useNavigation,
  ScrollView,
  MaterialCommunityIcons,
  appPageStyle,
  multipartPostCall,
  Toast,
  AsyncStorage,
  ApiConfig,
  ActivityIndicator
} from './../../../../components/index';

export default function ChangePassword() {
  
  const navigation = useNavigation();
  const [state, setState] = useState({
    isLoading: false,
  });

  const [changePasswordData, setChangePasswordData] = useState({
    current_password: "",
    new_password: "",
  });

  const [customer_id, setMyClientID]        = useState('');
  const [api_key, setAPI_KEY]               = useState('');
  const [user_id, setMyUserID]              = useState('');

  const toastWithDurationHandler = (message) => {
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      backgroundColor: 'red',
      animation: true,
    });
  };

  const successWithDurationHandler = (message) => {
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      backgroundColor: 'green',
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  const findEmptyFields = () => {
    setState({ ...state, isLoading: true});  
    for (const key in changePasswordData) {
      const value = changePasswordData[key];
      
      if(value == "" || value == null || value == undefined) {
        toastWithDurationHandler("Please check your "+key+" !");
        return;
      }
      
    }
    changePassword();
  };

  const changePassword= async () =>{
    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');
    
    await AsyncStorage.getItem('customer_id').then((myClientID) => {
        setMyClientID(myClientID);
    });
    
    await AsyncStorage.getItem('api_key').then(value =>{
        setAPI_KEY(value);
    });

    await AsyncStorage.getItem('user_id').then(value =>{
        setMyUserID(value);
    });

    
    let details = JSON.stringify({
      customer_id: customer_id,
      api_key: api_key,
      user_id: user_id,
      current_password: changePasswordData.current_password,
      new_password: changePasswordData.new_password,
    });
    
    
    multipartPostCall(ApiConfig.CHANGE_PASSWORD, details)
      .then((res) => {
        
        if (res.message === 
          "Invalid user authentication,Please try to relogin with exact credentials.") {
          
          navigation.navigate('TruckLogin');
              
          AsyncStorage.clear();
        }
        if (res.message === "Incorrect Password")
        {
          toastWithDurationHandler(res.message);
          setState({ ...state, isLoading: false});  
        }

        if (res.message === "Password Changed Successfully")
        {
          successWithDurationHandler(res.message+" Please Login again");

          setTimeout(function () {
            setState({ ...state, isLoading: false});  
            navigation.navigate('TruckLogin');
              
            AsyncStorage.clear();
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <ScrollView style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
        <View style={styles.container}>

            <View style={[styles.boxShadow, styles.offers, {marginTop: 0, minHeight: 60}]}>
                <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 10, marginLeft: 1, marginTop: 20, top: 1 }}>Change Password</Text>
            </View>
            

            <View style={[styles.boxShadow, styles.offers, {marginTop: 0, height: 'auto'}]}>
                <Text style={{position: "relative", left: 0, top: 20, fontSize:13, textAlign:'left', paddingBottom: 0, fontWeight: 'bold' }}>Old Password</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Old Password "
                        placeholderTextColor="#003f5c"
                        onChangeText={(text) =>{
                            setChangePasswordData({ ...changePasswordData, current_password: text})
                        }}
                    /> 
                </View>
                
                <Text style={{position: "relative", left: 0, top: 20, fontSize:13, textAlign:'left', paddingBottom: 0, fontWeight: 'bold' }}>New Password</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="New Password "
                        placeholderTextColor="#003f5c"
                        onChangeText={(text) =>{
                            setChangePasswordData({ ...changePasswordData, new_password:  text})
                        }}
                    /> 
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={()=>findEmptyFields()}>
                  {!state.isLoading &&(
                    <Text style={styles.loginText}>Change Password</Text> 
                  )}
                  {state.isLoading && (
                    <ActivityIndicator size="small" {...appPageStyle.primaryTextColor} />       
                  )}
                </TouchableOpacity> 
            </View>
        </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
    marginTop: 20,
  },
  image: {
    marginBottom: 0,
    height: 100,
    width: 100,
    objectFit: "contain",
  },
  logoArea:{
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "rgba(240,138,41, 0.3)",
    borderRadius: 8,
    width: '90%',
    height: 45,
    marginBottom: 20,
    marginTop: 30,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "90%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    ...appPageStyle.primaryColor,
    color: '#fff',
    marginBottom: 10
  },
  loginText: {
    color: '#fff',
  },
  cardText: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
    color: '#111',
    fontWeight: "600",
  },
  boxShadow:{
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,
  },
  welcomeCard:{
    minHeight: 200,
    minWidth: '94%',
    padding: 15,
    alignContent: 'flex-start',
    textAlign: "left",
    alignItems: "flex-start",
    top: 0,
  },
  cardImage:{
    opacity: 0.9,
    height: 50,
    width: 50,
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 1
  },
  listCard:{
    flex: 1, 
    backgroundColor: '#fafafa', 
    height: 100, 
    width: 100, 
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconArea:{
    height: 40,
    width: 40,
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  offers:{
    width: '94%',
    minHeight: 70,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badge:{
    height: 20, 
    width:20, 
    alignItems: "center", 
    justifyContent: "center", 
    borderRadius: 100,
  },
    HeaderText:{
        flex:1,
        color: '#4F4F4F',
        fontWeight:"bold",
        fontSize: 18,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    TextInput: {
        height: 50,
        padding: 10,
    },
});