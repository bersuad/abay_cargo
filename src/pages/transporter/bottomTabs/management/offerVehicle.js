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


export default function OfferVehicle() {
  
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
      
    
      // componentWillMount();
      
    
      // refresh page
      
      // const [refreshing, setRefreshing] = React.useState(false);
    
      // const onRefresh = React.useCallback(() => {
      //   setRefreshing(true);
      //   setTimeout(() => {
      //     setRefreshing(false);
      //   }, 2000);
      // }, []);
      
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
            ApiConfig.DIRECT_ORDERS_OFFERED_VEHICLES, JSON.stringify({ user_id, api_key, customer_id })
            // ApiConfig.DIRECT_ORDERS_OFFERED_VEHICLES_ONLINE, JSON.stringify({ ...customerData }) ** for direct order options **
        ).then((res) => {

        if (res.json.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
          setState({ ...state, isLoading: false});  
          navigation.navigate('TruckLogin');
          setState({ ...state, isLoading: false});  
          AsyncStorage.clear();
        }
        if(res.json.message === "Insufficient Parameters"){
            setState({ ...state, isLoading: false});
            console.log('no data here')
        }
        console.log(res.json);
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
    <ScrollView style={{backgroundColor: 'rgba(27, 155, 230, 0.1)'}}>
        {state.isLoading &&(
          <View style={styles.container}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#fff" translucent = {true}/>
            <ActivityIndicator size="large" {...appPageStyle.secondaryTextColor} /> 
            <Text>Getting Offer Vehicles</Text>
          </View> 
        )}
      {!state.isLoading &&(
        <View style={{marginTop: 5, marginBottom: 20, width: '100%', alignItems: "center", justifyContent: "center",}}>
        {offerLoadData.offer_list &&
              offerLoadData.offer_list.length &&
              offerLoadData.offer_list.map((offer, key) => (
                
                <View style={[styles.boxShadow, {minHeight: 150, width: '94%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
                    <View
                    style={[
                        {
                        flexDirection: 'row',
                        width: '90%',
                        gap: 15,
                        paddingTop: 10
                        },
                    ]}>
                        <View style={{...styles.iconArea, ...appPageStyle.primaryColor, height: 50, width: 50, borderRadius: 100, marginLeft: 0}}>
                            <MaterialCommunityIcons name="notebook-check" size={30} color="#fff" />
                        </View>
                        <View style={{textAlign: 'justify'}}>
                            <TouchableOpacity onPress={()=>navigation.navigate('OfferDetail', {details: offer})}>
                              <Text style={{fontWeight: 'bold', ...appPageStyle.secondaryTextColor}}>Ref. No: {offer.load_reference_no}</Text>
                            </TouchableOpacity>
                            {/* <Text style={{textAlign: 'justify',...appPageStyle.secondaryTextColor, fontSize:11}}>{offer.estimated_start_date}</Text>     */}
                            <Text style={{textAlign: 'justify', fontSize:11}}>{offer.estimated_start_date}</Text>    
                            <Text style={{textAlign:'justify'}}>Cargo Type: {offer.cargo_type}</Text>
                            <Text style={{textAlign:'justify'}}>Container Type: {offer.container_type}</Text>
                            <Text style={{textAlign:'justify'}}>Rem Quantity: {offer.quantity} {offer.unit}</Text>
                            <Text style={{textAlign:'justify', minWidth: 250, maxWidth:350}}>
                            From: {offer.trip_start_country +
                                ", " +
                                offer.trip_start_city}{" "}
                            </Text>
                            <Text style={{textAlign:'justify', minWidth: 250, maxWidth:350}}>
                                To: {offer.trip_end_country +
                                " " +
                                offer.trip_end_city
                            }
                            </Text>
                            <TouchableOpacity style={{marginTop: 8, marginBottom:8}} onPress={()=>navigation.navigate('VehicleDetail', {details: offer})}>
                                <Text style={{...appPageStyle.secondaryTextColor, fontWeight:'bold'}}>View More....</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{position: "absolute", bottom: 0, right:0, marginTop: 10,justifyContent: "center"}}>
                            <TouchableOpacity style={{...appPageStyle.primaryColor, height: 35, width: 100, borderRadius: 10, alignItems: "center", justifyContent: "center",}}>
                                <Text style={{...appPageStyle.primaryTextColor}}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{position: "absolute", top: 0, right:0, marginTop: 50,justifyContent: "center"}}>
                            <TouchableOpacity style={{...appPageStyle.secondaryBackgroundColor, height: 35, width: 100, borderRadius: 10, alignItems: "center", justifyContent: "center",}}>
                                <Text style={{...appPageStyle.secondaryTextColor}}>Cancel</Text>
                            </TouchableOpacity>
                        </View> */}
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