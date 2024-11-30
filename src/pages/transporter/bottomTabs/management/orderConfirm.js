import React, { useState, useEffect } from "react";

import {
  useNavigation,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  MaterialCommunityIcons,
  appPageStyle,
  AsyncStorage,
  RefreshControl,
  LogBox,
  ApiConfig,
  postWithAuthCallWithErrorResponse,
  postMultipartWithAuthCallWithErrorResponse,
  ActivityIndicator,
  StatusBar
} from './../../../../components/index';


export default function OrderConfirm() {
  
    const navigation = useNavigation();

    const [state, setState] = useState({
        isLoading: true,
        checkInternet:true,
        tariffExportList:'',
        tariffImprotList:'',
        customerData:'',
        customer_id:'',
        user_id:'',
        api_key: '',
        from_date:'',
        to_date:''
      });
    
      const [dates, setDates] = useState({
        startDate: "",
        endDate: "",
      });
      const [customer_id, setMyClientID]        = useState('');
      const [api_key, setAPI_KEY]               = useState('');
      const [user_id, setMyUserID]              = useState('');
      const [offerLoadData, setOfferLoadData ]  = useState([]);
      const [user_details, setUserDetails]      = useState('');
      
        const _getDashboardDetails = async() => {
        setState({ ...state, isLoading: true});  

        const user_id = await AsyncStorage.getItem('user_id');
        const customer_id = await AsyncStorage.getItem('customer_id');
        const api_key = await AsyncStorage.getItem('api_key');
        
        await AsyncStorage.getItem('customer_id').then((myClientID) => {
            setMyClientID(myClientID);
        });
        
        await AsyncStorage.getItem('api_key').then(value =>{
            setAPI_KEY(value);
        });
    
        await AsyncStorage.getItem('user_id').then(value =>{
            setMyUserID(value);
        });
    
        await AsyncStorage.getItem('userDetails').then(value =>{
            setUserDetails(value);
        });    
    
        postMultipartWithAuthCallWithErrorResponse(
            ApiConfig.DIRECT_ORDERS_ORDER_CONFIRMATION_, JSON.stringify({ user_id, api_key, customer_id })
        ).then((res) => {
        
        if (res.json.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
          setState({ ...state, isLoading: false});  
          AsyncStorage.clear();
          navigation.navigate('TruckLogin');
        }
        if(res.json.message === "Insufficient Parameters"){
          setState({ ...state, isLoading: false});
        }
        
        if (res.json.result)setOfferLoadData(res.json);
            setState({ ...state, isLoading: false});
        });
        
    };

    useEffect(() => {
      
        // Anything in here is fired on component unmount.
        this.mounted = true;
        _getDashboardDetails();
    
        return () => {     
          setState({ ...state, isLoading: true, checkInternet:true,});
          this.mounted = false;   
        }
    }, []);
    
    return (
    <ScrollView 
      style={{backgroundColor: 'rgba(240, 138, 41, 0.03)'}}
    >
        {state.isLoading &&(
          <View style={styles.container}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#fff" translucent = {true}/>
            <ActivityIndicator size="large" {...appPageStyle.secondaryTextColor} /> 
            <Text>Loading</Text>
          </View> 
        )}
      {!state.isLoading &&(
        <View style={{marginTop: 5, marginBottom: 20, width: '100%', alignItems: "center", justifyContent: "center",}}>
        {offerLoadData.load_list &&
              offerLoadData.load_list.length &&
              offerLoadData.load_list.map((load, key) => (
                
                <View style={[styles.boxShadow, {minHeight: 150, width: '94%', backgroundColor: '#fff', marginBottom:3, marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
                    <View
                    style={[
                        {
                        flexDirection: 'row',
                        width: '100%',
                        gap: 15,
                        paddingTop: 10,
                        paddingLeft: 15
                        },
                    ]}>
                        <View style={{textAlign: 'justify'}}>
                            <Text><Text style={{fontWeight:'bold', fontSize:15}}>Reference Number (Offer Vehicle):</Text> {load.trip_reference_no}</Text>
                            <Text><Text style={{fontWeight:'bold', fontSize:15}}>Operation Number:</Text> {load.trip_operation_no}</Text>    
                            <Text><Text style={{fontWeight:'bold', fontSize:15}}>Transporter:</Text> {load.transporter}</Text>
                            <Text><Text style={{fontWeight:'bold', fontSize:15}}>Shipper:</Text> {load.shipper}</Text>
                            {/* <Text><Text style={{fontWeight:'bold', fontSize:15}}>Quantity:</Text> {load.quantity} {load.unit}</Text> */}
                            <Text><Text style={{fontWeight:'bold', fontSize:15}}>Loading Place:</Text> {load.loading_place}</Text>
                            <Text><Text style={{fontWeight:'bold', fontSize:15}}>Received On  :</Text> {load.received_on}</Text>
                            <Text><Text style={{fontWeight:'bold', fontSize:15}}>Expected Loading Time  :</Text> {load.trip_start_date}</Text>
                        </View>
                        
                    </View>
                    <TouchableOpacity onPress={()=>navigation.navigate('ViewOfferLoad', {details: load.trip_id})} style={{...appPageStyle.primaryColor, height: 45, width: "100%", borderBottomRightRadius: 10, borderBottomLeftRadius:10, alignItems: "center", justifyContent: "center", marginTop:3, marginBottom:0}}>
                        <Text style={{...appPageStyle.primaryTextColor}}>View More</Text>
                    </TouchableOpacity>
                </View>
        ) )}
        </View>
      )}
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: '100%',
      marginTop: 10,
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
      marginTop: 10,
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