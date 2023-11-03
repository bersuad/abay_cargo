import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {Entypo, SimpleLineIcons, Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons, AntDesign, Fontisto} from '@expo/vector-icons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import headerImage from "./../../../../../assets/cargodelivary.png";

export default function App() {
  
  const navigation = useNavigation();

  return (
    <View style={{height:'100%', backgroundColor: '#FFF'}}>
        <ScrollView>
        <View style={styles.container}>        
            <Text>Here will be the MOU data text</Text>
        </View>
        </ScrollView>
        <View style={{...styles.buttonStyle, bottom:80, backgroundColor: '#FFF'}}>
            <Text>
                <BouncyCheckbox 
                    size={25}
                    fillColor="#19788e"
                    unfillColor="#FFFFFF"
                    text="I accept the terms & conditions."
                    onPress={(isChecked: boolean) => {}} 
                    textStyle={{
                        textDecorationLine: "none",
                    }}
                />
            </Text>
        </View>
        <TouchableOpacity style={styles.buttonStyle}>
            <Text style={{color: '#fff'}}>Continue</Text>
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: "rgba(25, 120, 142, 0.3)",
    borderRadius: 30,
    width: '90%',
    height: 45,
    marginBottom: 20,
    
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    // marginLeft: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
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
    height: 70,
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
  buttonStyle : {
    backgroundColor: '#19788e',
    width: '98%',
    height: 66,
    justifyContent: 'center',
    alignItems:'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: "center" ,
    borderRadius: 8,
  },
  buttonTextStyle : {
    color:'white',
    fontSize: 45,
    marginBottom: 6
  }
});