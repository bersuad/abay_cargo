import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  useNavigation,
  ScrollView,
  Linking,
  TouchableOpacity,
  ApiConfig,
  AsyncStorage,
  postWithAuthCallWithErrorResponse
} from './../../../../components/index';

export default function ShipperContract() {
  
    const navigation = useNavigation();
    const [userData, setUserData]        = useState([]);


  const getProfileDetails = async() => {
    const user_id = await AsyncStorage.getItem('user_id');
    const api_key = await AsyncStorage.getItem('api_key');
    const customer_id = await AsyncStorage.getItem('customer_id');
    
    
    postWithAuthCallWithErrorResponse(
      ApiConfig.PROFILE,
      JSON.stringify({ user_id, api_key, customer_id }),
  ).then((res) => {
    
    if (res.json.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
        
        AsyncStorage.clear();
        navigation.navigate('TruckLogin');
        return;
    }
    
    if (res.json.result) setProfileDetails(res.json);
    
  });
};

  const openLink = async () => { 
    const user_id = await AsyncStorage.getItem('user_id');
    const api_key = await AsyncStorage.getItem('api_key');
    const customer_id = await AsyncStorage.getItem('customer_id');
    
    
    postWithAuthCallWithErrorResponse(
      ApiConfig.PROFILE,
      JSON.stringify({ user_id, api_key, customer_id }),
    ).then((res) => {
        if (res.json.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
            
            AsyncStorage.clear();
            navigation.navigate('TruckLogin');
            return;
        }
        
        if (res.json.result){
            var url = ApiConfig.BASE_URL_FOR_IMAGES + res.json.profile.contract;
            
            
            // Check if the link can be opened
            const supported = Linking.canOpenURL(url);
        
            if (supported) {
               Linking.openURL(url); // Opens the link in the default browser
            } else {
              console.log(`Can't open this URL: ${url}`);
            }

        }
        
        
    });

  };

  return (
    <ScrollView style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
        <View style={styles.container}>

            <View style={[styles.boxShadow, styles.offers, {marginTop: 0, minHeight: 60}]}>
                <Text style={{...styles.cardText, fontSize:13, textAlign: 'left',padding:10 }}>Shipper’s standard General contract that will be customized based on the type of required services whether it is Transport Market place or Delivery system.</Text>                
            </View>
            <TouchableOpacity style={[styles.boxShadow,]} onPress={()=>{openLink()}}>
                
                    <Text style={{...styles.cardText, fontSize:13, textAlign: 'left' }}>View Full Contract</Text>                
                
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
    // height: 70,
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