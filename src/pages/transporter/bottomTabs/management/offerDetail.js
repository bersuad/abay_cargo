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


export default function OfferDetail(props) {
  
    const navigation = useNavigation();
    const offer = props.route.params.details;
    
    // return;
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
    
    const [vehicleRequest, setVehicleRequest] = useState({ offer });
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
            ApiConfig.GOODS_DETAILS,
            JSON.stringify({ user_id, api_key, customer_id, load_id: vehicleRequest.offer.trip_id ? vehicleRequest.offer.trip_id : vehicleRequest.offer.trip_vehicle_trip_id })
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
        console.log(offerLoadData)
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
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>From </Text>
                    </View>
                    <View style={{textAlign: 'justify', fontSize: 15, marginLeft: '-10%', marginTop:10}}>
                        <Text>Country: {offerLoadData.trip_start_country}</Text>  
                        <Text>Cargo Type: {offerLoadData.trip_start_city}</Text>
                        <Text>Container Type: {offerLoadData.trip_start_address}</Text>
                        <Text>Estimated Start Date: {offerLoadData.trip_start_date}</Text>
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
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>To </Text>
                    </View>
                    <View style={{textAlign: 'justify', fontSize: 15, marginLeft: '-10%', marginTop:10}}>
                        <Text>Country: {offerLoadData.trip_end_country}</Text>  
                        <Text>Cargo Type: {offerLoadData.trip_end_city}</Text>
                        <Text>Container Type: {offerLoadData.trip_end_address}</Text>
                        <Text>Estimated Start Date: {offerLoadData.trip_end_date}</Text>
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
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Good Detail </Text>
                    </View>
                    <View style={{textAlign: 'justify', fontSize: 15, marginLeft: '-10%', marginTop:10, width: '100%'}}>
                        <Text>Company Name: {offerLoadData.trip_company_name}</Text>  
                        <Text>Cargo Type: {offerLoadData.cargo_type}</Text>
                        <Text>Quantity: {offerLoadData.quantity}</Text>
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
                    {console.log(ApiConfig.BASE_URL_FOR_IMAGES + offerLoadData.trip_insurance)}
                    <View style={{marginTop:-15}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Good Detail </Text>
                    </View>
                    <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.01)", position: "absolute", left: 20}}>
                      <Image style={styles.cardImage} 
                        source={{
                          uri: ApiConfig.BASE_URL_FOR_IMAGES+offerLoadData.trip_image_url,
                        }}/>
                    </View>
                    <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.01)", position: "absolute", left: 20}}>
                        <Image style={styles.cardImage} 
                        source={{
                            uri: ApiConfig.BASE_URL_FOR_IMAGES+offerLoadData.trip_image_url,
                        }}/>
                    </View>
                    <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.01)", position: "absolute", left: 20}}>
                        <Image style={styles.cardImage} 
                        source={{
                            uri: ApiConfig.BASE_URL_FOR_IMAGES+offerLoadData.trip_insurance,
                        }}/>
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