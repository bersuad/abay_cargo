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
import Ionicons from '@expo/vector-icons/Ionicons';


import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import cardBackground from "./../../../assets/cardimage.jpg";
import headerImage from "./../../../assets/cargodelivary.png";

export default function App() {
  
  const navigation = useNavigation();

  return (
    <ScrollView style={{backgroundColor: 'rgba(27, 155, 230, 0.15)'}}>
      <View style={styles.container}>
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#fff" translucent = {true}/>
        <ImageBackground source={cardBackground} resizeMode="cover" style={styles.welcomeCard}>
          <Text style={styles.cardText}>WELCOME.., </Text>
          <Text style={{...styles.cardText, fontSize:18, }}>transporter company</Text>
          <Image style={styles.cardImage} source={headerImage}/>
          <Text style={{...styles.cardText, fontSize: 13, marginTop: 50, color: "#1b9be6"}}>GET </Text>
          <Text style={{...styles.cardText, fontSize: 13, marginTop: 0, color: "#1b9be6"}}>STARTED! </Text>
        </ImageBackground>

        <View
          style={[
            styles.container,
            {
              flexDirection: 'row',
              width: '94%',
              gap: 15,
              shadowColor: '#1f1f1f',
              shadowOffset: {width: -2, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 1,
              marginTop: 30
            },
          ]}>
          <View style={styles.listCard}>
              <View style={styles.iconArea}>
                <Ionicons name="md-arrow-swap" size={15} color="rgba(255,255,255,0.5)" />
              </View>
              <Text style={{...styles.cardText, fontSize:13, }}>Vehicles</Text>
          </View>
          <View style={styles.listCard}>
              <View style={styles.iconArea}>
                <Ionicons name="md-arrow-swap" size={15} color="rgba(255,255,255,0.5)" />
              </View>
              <Text style={{...styles.cardText, fontSize:13, }}>Drivers</Text>
          </View>
          <View style={styles.listCard}>
            <View style={styles.iconArea}>
              <Ionicons name="md-swap-horizontal " size={15} color="rgba(255,255,255,0.5)" />
            </View>
            <Text style={{...styles.cardText, fontSize:13, }}>Frights</Text>
          </View>
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
  welcomeCard:{
    height: 200,
    minWidth: '94%',
    shadowColor: '#1f1f1f',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    padding: 15,
    alignContent: 'flex-start',
    textAlign: "left",
    alignItems: "flex-start",
    // marginTop: 20,
    top: 0,
    borderRadius: 30,
  },
  cardImage:{
    position: "absolute",
    right: 0,
    top:0,
    opacity: 0.9,
    height: 110,
    width: 110,
    marginTop: 20,
    marginRight: 5,
  },
  listCard:{
    flex: 1, 
    backgroundColor: '#f1f1f1', 
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
  }
});