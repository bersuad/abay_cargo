import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  MaterialIcons,
  TextInput,
  useNavigation,
  ScrollView,
  MaterialCommunityIcons
} from './../../../../components/index';

export default function App() {
  
  const navigation = useNavigation();

  return (
    <ScrollView style={{backgroundColor: 'rgba(27, 155, 230, 0.1)'}}>
        <View style={styles.container}>

            <View style={[styles.boxShadow, styles.offers, {marginTop: 0, height: 100}]}>
                <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 10, marginLeft: 1, marginTop: 20, top: 1 }}>Get In Touch With Us</Text>

                <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.01)", position: "absolute", left: 20, top: 45}}>
                    <MaterialCommunityIcons name="email-send" size={28} color="rgba(25, 120, 142, 0.9)" />
                </View>
                <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60, color: '#121212', marginTop: 55, top: 1 }}>contact@abaylogistics.com</Text>
                <MaterialIcons name="arrow-forward-ios" size={18} color="#fff" style={{position: "absolute", right: 10}}/>
            </View>

            <View style={[styles.boxShadow, styles.offers, {marginTop: 0, height: 'auto'}]}>
                <Text style={{position: "relative", left: 0, top: 20, fontSize:13, textAlign:'left', paddingBottom: 0, fontWeight: 'bold' }}>Subject</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Your Subject "
                        placeholderTextColor="#003f5c"
                    /> 
                </View>
                
                <Text style={{alignSelf:'auto', fontSize:13, textAlign:'left', paddingBottom: 0, fontWeight: 'bold' }}>Message</Text>
                <View style={{...styles.inputView, height: 180, marginTop: 10}}>
                    <TextInput
                        style={{...styles.TextInput, height:180, textAlignVertical: 'top'}}
                        multiline={true}
                        numberOfLines={10}
                        placeholder="Your Message "
                        placeholderTextColor="#003f5c"
                    /> 
                </View>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText}>SEND</Text> 
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
    backgroundColor: "rgba(25, 120, 142, 0.3)",
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
    backgroundColor: "#19788e",
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
    TextInput: {
        height: 50,
        padding: 10,
    },
});