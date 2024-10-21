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
        multipartPostCall(
            ApiConfig.VEHICLE_DETAILS,
            JSON.stringify({ vehicle_id: vehicle, user_id, api_key, customer_id })
        ).then((res) => {
          console.log(res);
          if (res.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
            setState({ ...state, isLoading: false});  
            navigation.navigate('TruckLogin');            
          }
          if (res.result)setVehicleRequest(res.vehicle_details);
            setState({ ...state, isLoading: false});
            // vehicleRequest?.images?.map((img, index) => {
            //   console.log(img.vehicle_image_url)
            // });
          })
            .catch((err) => console.log(err));
    };

    const componentWillMount = () => {
        
      useEffect(() => {
      
        // Anything in here is fired on component unmount.
        this.mounted = true;
        _getDashboardDetails();
    
        return () => {     
          setState({ ...state, isLoading: true, checkInternet:true,});
          this.mounted = false;   
        }
      }, []);
    }
    componentWillMount();
    const imageUrl = encodeURI(ApiConfig.BASE_URL_FOR_IMAGES + vehicleRequest.vehicle_image);
    
    
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
            <View style={[styles.boxShadow, {minHeight: 290, width: '94%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
                <View
                  style={[
                      {
                      flexDirection: 'row',
                      width: '92%',
                      gap: 15,
                      paddingTop: 10
                      },
                  ]}>
                      <View style={{marginTop:0}}>
                          <Text style={{fontWeight: 'bold', fontSize: 20}}>Vehicle Info </Text>
                      </View>
                  </View>
            
                <View
                style={[
                    {
                    flexDirection: 'row',
                    width: '92%',
                    gap: 15,
                    paddingTop: 10
                    },
                ]}>
                  <ScrollView horizontal style={{ marginTop: 10 }}>
                    {vehicleRequest?.images?.map((img, index) => {
                      const imageUrl = ApiConfig.BASE_URL_FOR_IMAGES + img.vehicle_image_url.replace('//', '/');
                      console.log('Loading image from URL:', imageUrl);

                      return (
                        <View key={index} style={styles.imageContainer}>
                          <Image
                            style={styles.image}
                            source={{
                              uri: imageUrl,
                              headers: {
                                'Accept': 'image/*',
                              },
                            }}
                            onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
                          />
                        </View>
                      );
                    })}
                  </ScrollView>

                    <View style={{marginTop:-18}}>
                      {vehicleRequest?.images?.map((img, index) => {
                        <Image style={styles.cardImage} 
                            source={{
                              uri: img.vehicle_image_url,
                              headers: {
                                'Accept': 'image/*',
                            }
                        }}
                        onError={(error) => console.log('Image load error:', error.nativeEvent.error)}/>
                      })
                      }
                    </View>
                </View>
                
                <View style={{textAlign: 'justify', fontSize: 15, marginTop:15, marginLeft: '-25%'}}>
                    
                    <Text><Text style={{fontWeight: 'bold'}}>Plate No:</Text> {vehicleRequest.plate_number}</Text>  
                    <Text><Text style={{fontWeight: 'bold'}}>Vehicle Type: </Text>{vehicleRequest.vehicle_name}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Chassis Number: </Text>{vehicleRequest.vehicle_chassis_no}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Gross Weight: </Text>{vehicleRequest.vehicle_gross_weight}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Model: </Text>{vehicleRequest.vehicle_model_no}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Year of Manufacture: </Text>{vehicleRequest.year_manufacture}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Motor Number: </Text>{vehicleRequest.vehicle_motor_no}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Vehicle Load Capacity: </Text>{vehicleRequest.vehicle_capacity} </Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Initial km: </Text>{vehicleRequest.vehicle_initial_km} </Text>
                </View>

                
            </View>
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
                          <Text style={{fontWeight: 'bold', fontSize: 20}}>GPS Availability </Text>
                      </View>
                  </View>
            
                
                <View style={{textAlign: 'justify', fontSize: 15, marginTop:5, marginLeft: '-25%'}}>
                    
                    <Text><Text style={{fontWeight: 'bold'}}>Vendor Name:</Text> {vehicleRequest.vehicle_vendor_name}</Text>  
                    <Text><Text style={{fontWeight: 'bold'}}>Vendor Contact: </Text>{vehicleRequest.vehicle_vendor_contact}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Vendor Platform: </Text>{vehicleRequest.vehicle_vendor_platform}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Vendor Address: </Text>{vehicleRequest.vehicle_vendor_address}</Text>
                </View>                
            </View>
            <View style={[styles.boxShadow, {minHeight: 250, width: '94%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
              <View
              style={[
                  {
                  flexDirection: 'row',
                  width: '92%',
                  gap: 15,
                  paddingTop: 1
                  },
              ]}>
                  <View style={{marginTop:-50}}>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>Documents </Text>
                  </View>
              </View>
        
                <View style={{textAlign: 'justify', fontSize: 15, marginLeft: '-45%', marginTop:5}}>
                    <Text><Text style={{fontWeight: 'bold'}}>Insurance Copy:</Text> {vehicleRequest.license_issue_date}</Text>  
                    <Text><Text style={{fontWeight: 'bold'}}>Issue Date:</Text> {vehicleRequest.vehicle_insurance_issue_date}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Expiry Date:</Text> {vehicleRequest.vehicle_insurance_expiry}</Text>
                    <Text><Text style={{fontWeight: 'bold'}}>Insurance Company:</Text> {vehicleRequest.vehicle_insurance_company}</Text>
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
      height: "100%",
      width: "auto",
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
  });