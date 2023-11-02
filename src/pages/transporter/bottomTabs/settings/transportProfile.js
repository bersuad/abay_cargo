import React, { useState, useEffect } from 'react';
import { ScrollView, Image, View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import {Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons, SimpleLineIcons} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import userImage from "./../../../../../assets/userava.png";
import placeholder from "./../../../../../assets/placeholder.jpg";

export default function ImagePickerExample() {
  
  return (
    <ScrollView style={{backgroundColor: 'rgba(27, 155, 230, 0.1)'}}>
      <SafeAreaView style={styles.container}>
        <View style={{...styles.iconArea}}>
          <Image style={{...styles.cardImage,  borderRadius: 100, height: 100, width:100}} source={userImage}/>
        </View>
        
        <View style={[styles.boxShadow, styles.groupButton, {marginTop: 20, borderTopLeftRadius:10, borderTopRightRadius:10}]}>
            <Text style={{...styles.cardText, fontSize:18, position: "absolute", left: 20, color: "#1b9be6" }}>Basic Info</Text>
        </View>
        <View style={[styles.boxShadow, styles.groupButton]}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Company Name </Text>
        </View>
        <View style={[styles.boxShadow, styles.groupButton]}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Company Type </Text>
        </View>
        <View style={[styles.boxShadow, styles.groupButton, {borderBottomLeftRadius: 10,borderBottomRightRadius: 10,}]}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Total Fleet Size </Text>
        </View>
        

        {/* Online */}

        <View style={[styles.boxShadow, styles.groupButton, {marginTop: 20, borderTopLeftRadius:10, borderTopRightRadius:10}]}>
            <Text style={{...styles.cardText, fontSize:18, position: "absolute", left: 20, color: "#1b9be6" }}>Contact Auctions</Text>
        </View>
        <View style={[styles.boxShadow, styles.groupButton]}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Offer Load </Text>
        </View>
        <View style={[styles.boxShadow, styles.groupButton]}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Offer Vehicle </Text>
        </View>
        <View style={[styles.boxShadow, styles.groupButton, {borderBottomLeftRadius: 10,borderBottomRightRadius: 10,}]}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Order Confirmation </Text>
        </View>

        <View style={[styles.boxShadow, styles.groupButton, {marginTop: 20, borderTopLeftRadius:10, borderTopRightRadius:10}]}>
            <Text style={{...styles.cardText, fontSize:18, position: "absolute", left: 20, color: "#1b9be6" }}>Address</Text>
        </View>
        <View style={[styles.boxShadow, styles.groupButton]}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Country </Text>
        </View>
        <View style={[styles.boxShadow, styles.groupButton]}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Region </Text>
        </View>
        <View style={[styles.boxShadow, styles.groupButton]}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>City </Text>
        </View>
        <View style={[styles.boxShadow, styles.groupButton]}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Phone </Text>
        </View>
        <View style={[styles.boxShadow, styles.groupButton]}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Alternative Phone </Text>
        </View>
        <View style={[styles.boxShadow, styles.groupButton]}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Email </Text>
        </View>
        <View style={[styles.boxShadow, styles.groupButton, {borderBottomLeftRadius: 10,borderBottomRightRadius: 10,}]}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>P.O Box </Text>
        </View>

        <View style={[styles.boxShadow, styles.groupButton, {marginTop: 20, borderTopRightRadius:10, borderTopLeftRadius: 10}]}>
            <Text style={{...styles.cardText, fontSize:18, position: "absolute", left: 20, color: "#1b9be6" }}>Documents</Text>
        </View>
        <View
        style={[
          {
            flexDirection: 'row',
            width: '94%',
            gap: 15,
            backgroundColor:'#fff', 
            minHeight: 200,
            paddingTop: 15
          },
        ]}>
          <View style={{...styles.iconArea, height: 60, width: 80, marginLeft: 20}}>
            <Text style={{alignSelf: 'left', fontWeight: 500, fontSize: 14, marginTop: 15}}>Tin</Text>
            <View style={{marginLeft: 0, marginTop: 10}}>
              <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}} source={placeholder}/>
              <View style={{position: "absolute", top: 0, right:-35}}>
                <TouchableOpacity style={{backgroundColor: "rgba(25, 120, 142, 0.3)", height: 25, width: 25, borderRadius: 10}}>
                  <MaterialCommunityIcons name="dots-vertical" size={24} color="#19788e" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{...styles.iconArea, height: 60, width: 120, marginLeft: 90}}>
            <Text style={{fontWeight: 500, fontSize: 14, marginTop: 15, }}>Grade Certificate</Text>
            <View style={{marginLeft: -30, marginTop: 10}}>
              <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}} source={placeholder}/>
              <View style={{position: "absolute", top: 0, right:-35}}>
                <TouchableOpacity style={{backgroundColor: "rgba(25, 120, 142, 0.3)", height: 25, width: 25, borderRadius: 10}}>
                  <MaterialCommunityIcons name="dots-vertical" size={24} color="#19788e" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
        </View>        
        <View
        style={[
          {
            flexDirection: 'row',
            width: '94%',
            gap: 15,
            backgroundColor:'#fff', 
            minHeight: 200,
          },
        ]}>
          <View style={{...styles.iconArea, height: 60, width: 120, marginLeft: 20}}>
            <Text style={{alignSelf: 'left', fontWeight: 500, fontSize: 14, marginTop: 15}}>Business License</Text>
            <View style={{marginLeft: -30, marginTop: 10}}>
              <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}} source={placeholder}/>
              <View style={{position: "absolute", top: 0, right:-35}}>
                <TouchableOpacity style={{backgroundColor: "rgba(25, 120, 142, 0.3)", height: 25, width: 25, borderRadius: 10}}>
                  <MaterialCommunityIcons name="dots-vertical" size={24} color="#19788e" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>        

        
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
    marginBottom: 20,
    },
  image: {
    marginBottom: 0,
    height: 100,
    width: 100,
    objectFit: "cover",
    borderRadius: 100,
    marginTop: 15,
    alignSelf:'center',
  },
  logoArea:{
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "rgba(25, 120, 142, 0.2)",
    borderRadius: 10,
    width: '90%',
    height: 45,
    marginBottom: 10,
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
    width: "95%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#19788e",
    color: '#fff',
  },
  loginText: {
    color: '#fff',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    color: '#19788e',
    fontWeight: 'bold'
  },
  HeaderText:{
    flex:1,
    color: '#4F4F4F',
    fontWeight:"bold",
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton:{
    backgroundColor: "#f1f1f1",
    height: 30,
    width: 'auto',
    shadowColor: '#1f1f1f',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 5
  },

  groupButton:{
    width: '94%',
    height: 50,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
  boxShadow:{
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,
  },
  iconArea:{
    height: 90,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
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
    buttonsList:{
        width: '100',
        height: 70,
        marginTop: 30,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    cardText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        color: '#111',
        // fontWeight: "400",
        
    },
});