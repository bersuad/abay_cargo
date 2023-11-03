
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Driver,
  ForgetPassword,
  ScrollView
} from "./../components/index";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
          <View style={styles.logoArea}>
              <Image style={styles.image} source={ForgetPassword} /> 
              <Text style={styles.buttonText}>
                  Forgot Password?
              </Text>
          </View>
          <StatusBar barStyle = "white-content" hidden = {false} backgroundColor = "rgba(25, 120, 142, 0.3)" translucent = {true}/>
          <View style={styles.inputView}>
              <TextInput
              style={styles.TextInput}
              placeholder="Your email here."
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
              /> 
          </View> 
          
          <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginText}>SEND</Text> 
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
    height: 150,
    width: 150,
    objectFit: "contain",
    marginTop: -30
  },
  logoArea:{
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
    backgroundColor: "#19788e",
    color: '#fff',
    marginBottom: 25
  },
  loginText: {
    color: '#fff',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    color: '#19788e',
    fontWeight: 'bold'
  },
});