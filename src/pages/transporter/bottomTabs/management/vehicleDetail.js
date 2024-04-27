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
  StatusBar,
  Image
} from './../../../../components/index';


export default function VehicleDetail(props) {
  
    const navigation = useNavigation();
    const vehicle = props.route.params.details;
    
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
    
    const [vehicleRequest, setVehicleRequest] = useState({ vehicle });
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
        
        
        postWithAuthCallWithErrorResponse(
            ApiConfig.VIEW_ORDER_OFFERED_VEHICLES_DETAILS,
            JSON.stringify({load_id: vehicleRequest.vehicle.trip_id, user_id, api_key, customer_id})
        ).then((res) => {

        if (res.json.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
            setState({ ...state, isLoading: false});  
            console.log('Wrong Data here');
        }
        if(res.json.message === "Insufficient Parameters"){
            setState({ ...state, isLoading: false});
            console.log('no data here')
        }
        
        if (res.json.result)setOfferLoadData(res.json.load_details);
            setState({ ...state, isLoading: false});
        })
        .catch((err) => console.log(err));
        
        return () => {};
        
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
            <Text>Getting Offer Loads</Text>
          </View> 
        )}
      {!state.isLoading &&(
        <View style={{marginTop: 5, marginBottom: 20, width: '100%', alignItems: "center", justifyContent: "center",}}>
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
                    <View style={{marginTop:-18}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Offered Vehicles Detail </Text>
                    </View>
                    <View style={{textAlign: 'justify', fontSize: 15, marginLeft: '-45%', marginTop:15}}>
                        <Text>Reference Number (Offer Vehicle): {offerLoadData.trip_id}</Text>  
                        <Text>Company Name: {offerLoadData.trip_company_name}</Text>
                        <Text>Cargo Type: {offerLoadData.cargo_type}</Text>
                        <Text>Remaining Quantity: 
                        {offerLoadData && offerLoadData.cargo_type === "Container" ? 
                            offerLoadData.trip_pending_quantity === "" ? offerLoadData.quantity : offerLoadData.trip_pending_quantity + " Quintals" : 
                            offerLoadData.cargo_type === "Vehicle" ? offerLoadData.trip_pending_quantity === "" ? offerLoadData.quantity : offerLoadData.trip_pending_quantity + " Vehicles" : 
                                (offerLoadData.cargo_type==="Bulk" || offerLoadData.cargo_type === "Break bulk") ?
                                offerLoadData.trip_pending_quantity === "" ? offerLoadData.quantity : offerLoadData.trip_pending_quantity + " Quintals" : " - "}
                        </Text>
                    </View>
                </View>

                
            </View>
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
                  <View style={{marginTop:-18}}>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>Transporter Details </Text>
                  </View>
                  <View style={{textAlign: 'justify', fontSize: 15, marginLeft: '-45%', marginTop:15}}>
                      <Text>Transporter’s Name: {offerLoadData.transporter}</Text>  
                      <Text>Loading Truck Plate Number: {offerLoadData.plate_no}</Text>
                      <Text>Driver Name: {offerLoadData.driver_name}</Text>
                      <Text>Driver Cell Phone: {offerLoadData.driver_phone_no}</Text>
                      <Text>Trip Status: {offerLoadData.trip_vehicle_status}</Text>
                  </View>
              </View>
              
          </View>
        
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