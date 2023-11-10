import React, { useState } from "react";

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
} from "./../../../components/index";
import appPageStyle from "../../../styles/common";



export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <View style={styles.logoArea}>
          <Image style={styles.image} source={TruckLogin} /> 
          <Text style={[styles.buttonText, appPageStyle.secondaryTextColor]}>
            Transporter Login
          </Text>
        </View>
        <StatusBar barStyle = "white-content" hidden = {false} backgroundColor = "rgba(25, 120, 142, 0.3)" translucent = {true}/>
        <View style={styles.inputView}>
          <TextInput
            style={[styles.TextInput, appPageStyle.secondaryTextColor]}
            placeholder="Email Here."
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          /> 
        </View> 
        <View style={styles.inputView}>
          <TextInput
            style={[styles.TextInput, appPageStyle.secondaryTextColor]}
            placeholder="Password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          /> 
        </View> 
        <TouchableOpacity onPress={()=>navigation.navigate('ForgetPassword')}>
          <Text style={{...styles.forgot_button, ...appPageStyle.secondaryTextColor}}>Forgot Password?</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={[styles.loginBtn, appPageStyle.primaryColor]} onPress={()=>navigation.navigate('TransporterDashboard')}>
          <Text style={appPageStyle.primaryTextColor}>LOGIN</Text> 
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
  },
  
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    fontWeight: 'bold'
  },
});