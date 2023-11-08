import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SimpleLineIcons,
  MaterialIcons,
  AntDesign,
  Fontisto,
  Entypo,
  useNavigation,
  ScrollView,
  headerImage
} from './../../../../components/index';

export default function App() {
  
  const navigation = useNavigation();

  return (
    <ScrollView style={{backgroundColor: 'rgba(27, 155, 230, 0.1)'}}>
        <View style={styles.container}>
        <Text style={styles.HeaderText}>Select Report Type</Text>
        
        <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]}>
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60 }}>Vehicle Tracking & Tracing
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10}}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]}>
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60 }}>Payment Status
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10}}/>
        </TouchableOpacity>


        <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]}>
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60 }}>Driver Report
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10}}/>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]} onPress={()=>navigation.navigate('FAQView')}>
          
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60 }}>Vehicle Working With Abay
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10}}/>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]} onPress={()=>navigation.navigate('ContactUs')}>
          
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60 }}>History
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10}}/>
        </TouchableOpacity>
        
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
    color: 'rgba(25, 120, 142, 0.9)',
    fontWeight:"bold",
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
});