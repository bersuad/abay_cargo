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
  ActivityIndicator,
  StatusBar,
  Toast
} from './../../../../components/index';


export default function OfferLoad() {
  
    const navigation = useNavigation();

    const [state, setState] = useState({
        isLoading: true,
        actionLoading: false,
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
      
    
      const [refreshing, setRefreshing] = React.useState(false);
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          _getDashboardDetails();
          setRefreshing(false);
        }, 2000);
      }, []);

      const toastWithDurationHandler = (message) => {
        // To make Toast with duration
        let toast = Toast.show(message, {
          duration: Toast.durations.LONG,
          backgroundColor: 'red',
          animation: true,
        });
      };

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
  
      postWithAuthCallWithErrorResponse(
          ApiConfig.DRIRECT_ORDER_OFFER_GOODS, JSON.stringify({ user_id, api_key, customer_id }),
      ).then((res) => {
        
      if (res.json.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
          setState({ ...state, isLoading: false});  
      }
      if(res.json.message === "Insufficient Parameters"){
          setState({ ...state, isLoading: false});
      }
      
      if (res.json.result)setOfferLoadData(res.json);
          setState({ ...state, isLoading: false});
      });
      
    };

    const reject = (loads) => {
      setState({ ...state, actionLoading: true});
      postWithAuthCallWithErrorResponse(
        ApiConfig.DIRECT_ORDER_OFFER_GOODS_VEHICLE_REJECT,
        JSON.stringify({ user_id, api_key, customer_id,  load_id: loads.trip_id  })
      ).then((res) => {
        
        if (res.json.message === 
          "Invalid user authentication,Please try to relogin with exact credentials.") {
            navigation.navigate('Registration');
        }
        if (res.json.result) {
          _getDashboardDetails();
          setState({ ...state, actionLoading: false});
          toastWithDurationHandler(loads.load_reference_no+' Offer Rejected');
        }
      });
    };

    useEffect(() => {
        this.mounted = true;
        _getDashboardDetails();
    
        return () => {     
          setState({ ...state, isLoading: true, checkInternet:true,});
          this.mounted = false;   
        }
    }, []);
    
    return (
    <ScrollView style={{backgroundColor: 'rgba(27, 155, 230, 0.1)'}}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >
        {state.isLoading &&(
          <View style={styles.container}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#fff" translucent = {true}/>
            <ActivityIndicator size="large" {...appPageStyle.secondaryTextColor} /> 
            <Text>Getting Offer Loads</Text>
          </View> 
        )}
      {!state.isLoading &&(
        <View style={{marginTop: 5, marginBottom: 20, width: '100%', alignItems: "center", justifyContent: "center",}}>
        {offerLoadData.load_list &&
              offerLoadData.load_list.length &&
              offerLoadData.load_list.map((loads, key) => (
                
                <View style={[styles.boxShadow, {minHeight: 150, width: '94%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
                    <View
                    style={[
                        {
                        flexDirection: 'row',
                        width: '92%',
                        gap: 15,
                        paddingTop: 10
                        },
                    ]}>
                        <View style={{...styles.iconArea, ...appPageStyle.primaryColor, height: 50, width: 50, borderRadius: 100, marginLeft: 0}}>
                            <MaterialCommunityIcons name="notebook-check" size={30} color="#fff" />
                        </View>
                        <View style={{textAlign: 'justify'}}>
                            <TouchableOpacity onPress={()=>navigation.navigate('OfferDetail', {details: loads})}>
                              <Text style={{fontWeight: 'bold', ...appPageStyle.secondaryTextColor}}>Ref. No: {loads.load_reference_no}</Text>
                            </TouchableOpacity>
                            <Text style={{textAlign: 'justify', fontSize:11}}>{loads.vehicle_availability_date}</Text>    
                            <Text style={{textAlign:'justify'}}>Cargo Type: {loads.cargo_type}</Text>
                            <Text style={{textAlign:'justify'}}>Container Type: {loads.container_type}</Text>
                            <Text style={{textAlign:'justify'}}>Rem Quantity: {loads.quantity} {loads.unit}</Text>
                            <Text style={{textAlign:'justify', minWidth: 250, maxWidth:350}}>
                            From: {loads.trip_start_country +
                                ", " +
                                loads.trip_start_city}{" "}
                            </Text>
                            <Text style={{textAlign:'justify', minWidth: 250, maxWidth:350}}>
                                To: {loads.trip_end_country +
                                " " +
                                loads.trip_end_city
                            }
                            </Text>
                          <View
                          style={[
                              {
                              flexDirection: 'row',
                              width: '92%',
                              gap: 15,
                              paddingTop: 10,
                              marginBottom:10
                              },
                          ]}>
                            <View style={{position: "relative", top: 0, right:0, marginTop: 25,justifyContent: "center"}}>
                                <TouchableOpacity style={{...appPageStyle.primaryColor, height: 35, width: 100, borderRadius: 10, alignItems: "center", justifyContent: "center",}} 
                                  onPress={()=> navigation.navigate('DirectOfferNewVehicle', { loads })}
                                >
                                    <Text style={{...appPageStyle.primaryTextColor}}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{position: "relative", top: 0, right:0, marginTop: 25,justifyContent: "center"}}>
                                <TouchableOpacity style={{...appPageStyle.secondaryBackgroundColor, height: 35, width: 100, borderRadius: 10, alignItems: "center", justifyContent: "center",}} onPress={()=>{reject(loads)}}>
                                    {!state.actionLoading &&(
                                        <Text style={appPageStyle.secondaryTextColor}>Cancel</Text>
                                    )}
                                    {state.actionLoading && (
                                        <ActivityIndicator size="small" {...appPageStyle.secondaryTextColor} />       
                                    )}
                                </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                    </View>
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