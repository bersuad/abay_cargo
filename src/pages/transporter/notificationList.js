import React, { useState } from "react";

import{
  Ionicons,
  MaterialCommunityIcons, 
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  
} from './../../components/index';



export default  function App(){
    
    return(
        <ScrollView style={{backgroundColor: 'rgba(27, 155, 230, 0.1)'}}>
            <View style={{marginTop: 20, marginBottom: 20, width: '100%', alignItems: "center", justifyContent: "center",}}>
                <View style={[styles.boxShadow, {height: 99, width: '94%', backgroundColor: '#fff', marginTop: 20, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
                    <View
                    style={[
                    {
                        flexDirection: 'row',
                        width: '90%',
                        gap: 15,
                        
                    },
                    ]}>
                    <View style={{...styles.iconArea, backgroundColor: "#19788e", height: 30, width: 30, borderRadius: 99, marginLeft: 0}}>
                      <Ionicons name="md-notifications" size={15} color="#fff"/>
                    </View>
                    <View >
                        <Text style={{textAlign:'justify', width: '50%',}}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.....
                        </Text>
                    </View>
                    </View>
                    <View style={{position: "absolute", bottom: 6, right:20}}>
                      <Text>02 Oct 2023 03:31 PM</Text>
                    </View>
                </View>
                <View style={[styles.boxShadow, {height: 99, width: '94%', backgroundColor: '#fff', marginTop: 20, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
                    <View
                    style={[
                    {
                        flexDirection: 'row',
                        width: '90%',
                        gap: 15,
                        
                    },
                    ]}>
                    <View style={{...styles.iconArea, backgroundColor: "#19788e", height: 30, width: 30, borderRadius: 99, marginLeft: 0}}>
                      <Ionicons name="md-notifications" size={15} color="#fff"/>
                    </View>
                    <View >
                        <Text style={{textAlign:'justify', width: '50%',}}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.....
                        </Text>
                    </View>
                    </View>
                    <View style={{position: "absolute", bottom: 6, right:20}}>
                      <Text>02 Oct 2023 03:31 PM</Text>
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
      borderRadius: 10,
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
    }
  });