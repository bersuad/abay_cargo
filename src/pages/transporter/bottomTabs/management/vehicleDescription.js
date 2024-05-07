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
  multipartPostCall,
  ActivityIndicator,
  PostCallWithErrorResponse,
  StatusBar,
  Image
} from './../../../../components/index';


export default function VehicleDescription(props) {
  
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
      
    
    //  console.log(vehicleRequest);
      
        const _getDashboardDetails = async() => {
            multipartPostCall(
                ApiConfig.VEHICLE_DETAILS,
                JSON.stringify({ vehicle_id: vehicle, user_id, api_key, customer_id })
            ).then((res) => {
                
                  console.log(res);
                  setState({ ...state, isLoading: false});
                })
                .catch((err) => console.log(err));
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
            <Text>Getting Driver Detail</Text>
          </View> 
        )}
      {!state.isLoading &&(
        <View style={{marginTop: 5, marginBottom: 20, width: '100%', alignItems: "center", justifyContent: "center",}}>
            <View style={[styles.boxShadow, {minHeight: 200, width: '94%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
            
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
                        <Image style={styles.cardImage} 
                            source={{
                                uri: ApiConfig.BASE_URL_FOR_IMAGES +
                                vehicleRequest.profile_pic,
                                headers: { 'Accept': 'image/*'}
                        }}/>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>{vehicleRequest.driver_name} </Text>
                    </View>
                </View>
                <View style={{textAlign: 'justify', fontSize: 15, marginTop:15, marginLeft: '-25%'}}>
                    
                    <Text><Text style={{fontWeight: 'bold'}}>Email:</Text> {vehicleRequest.email}</Text>  
                    <Text><Text style={{fontWeight: 'bold'}}>House No: </Text>{vehicleRequest.house_no}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Mobile Number: </Text>{vehicleRequest.mobile_number}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>P.O Box: </Text>{vehicleRequest.po_box}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Country: </Text>{vehicleRequest.user_country}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Region: </Text>{vehicleRequest.region}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Woreda: </Text>{vehicleRequest.woreda}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Zone: </Text>{vehicleRequest.zone} </Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Birth Date: </Text>{vehicleRequest.birthdate} </Text>
                </View>

                
            </View>
            <View style={[styles.boxShadow, {minHeight: 250, width: '94%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
        
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
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>Driver Details </Text>
                  </View>
              </View>
                <View style={{textAlign: 'justify', fontSize: 15, marginLeft: '-45%', marginTop:15}}>
                    <Text>Issue Date: {vehicleRequest.license_issue_date}</Text>  
                    <Text>Expire Date: {vehicleRequest.license_expiry_date}</Text>
                    <Text>License Grade: {vehicleRequest.license_grade}</Text>
                    <Text>License Number: {vehicleRequest.licence_number}</Text>
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