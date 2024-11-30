import React, { useState, useEffect } from 'react';
import {
  useNavigation,
  ScrollView,
  View,
  StyleSheet,
  Text,
  MaterialIcons,
  SafeAreaView,
  TouchableOpacity
} from './../../../components/index';

export default function ImagePickerExample() {
  const navigation = useNavigation();
  return (
    <ScrollView 
      style={{backgroundColor: 'rgba(240, 138, 41, 0.03)'}}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.HeaderText}>Transport Marketplace</Text>
        <View style={[styles.boxShadow, styles.groupButton, {marginTop: 20, borderRadius:10}]}>
          <TouchableOpacity style={[styles.boxShadow, styles.groupButton]} onPress={()=>navigation.navigate('OfferLoad')}>
              <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Offer Load </Text>
              <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10,}}/>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.boxShadow, styles.groupButton, {marginTop: 20, borderTopLeftRadius:10, borderTopRightRadius:10}]}>
            <Text style={{...styles.cardText, fontSize:18, position: "absolute", left: 20, color: "#1b9be6" }}>Direct Order </Text>
        </View>
        <TouchableOpacity style={[styles.boxShadow, styles.groupButton]} onPress={()=>navigation.navigate('OfferVehicle')}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Offer Vehicle </Text>
            <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10,}}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.boxShadow, styles.groupButton]} onPress={()=>navigation.navigate('OrderConfirm')}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Order Confirmation </Text>
            <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10,}}/>
        </TouchableOpacity>
        

        {/* Online */}

        <View style={[styles.boxShadow, styles.groupButton, {marginTop: 20, borderTopLeftRadius:10, borderTopRightRadius:10}]}>
            <Text style={{...styles.cardText, fontSize:18, position: "absolute", left: 20, color: "#1b9be6" }}>Online Auctions</Text>
        </View>
        
        <TouchableOpacity style={[styles.boxShadow, styles.groupButton]} onPress={()=>navigation.navigate('OnlineOfferVehicle')}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Offer Vehicle </Text>
            <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10,}}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.boxShadow, styles.groupButton]} onPress={()=>navigation.navigate('OnlineOrderConfirm')}>
            <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Order Confirmation </Text>
            <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10,}}/>
        </TouchableOpacity>
        
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
    height: 40,
    width: 40,
    backgroundColor: 'green',
    borderRadius: 10,
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