import React, { useState, useEffect } from "react";

import {
  useNavigation,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Toast,
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
import { Dialog } from 'react-native-simple-dialogs';


export default function AuctionDetails(props) {
  
    const navigation = useNavigation();
    const bid = props.route.params;

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
        to_date:'',
        dialogVisible:false
      });
    
    const [dates, setDates] = useState({
        startDate: "",
        endDate: "",
      });
    const [customer_id, setMyClientID]        = useState('');
    const [api_key, setAPI_KEY]               = useState('');
    const [user_id, setMyUserID]              = useState('');
    const [offerLoadData, setOfferLoadData ]  = useState();
    const [bestBid, setBestBid ]              = useState([]);
    const [user_details, setUserDetails]      = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [bidCommission, setBidCommission] = useState(0);
    const [dialogState, setDialogState] = useState(false);
    const [rejectDialogState, setRejectDialogState] = useState(false);

    const successWithDurationHandler = (message) => {
        let toast = Toast.show(message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          backgroundColor: 'green',
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      };
  
      const toastWithDurationHandler = (message) => {
        let toast = Toast.show(message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          backgroundColor: 'red',
          animation: true,
        });
      };
      
    const rejectDirectOrder = async () => {
        
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
        ApiConfig.REJECT_DIRECT_ORDER,
        JSON.stringify({ user_id, api_key, customer_id, load_id: bid.offer.trip_id })
        )
        .then((res) => {
            if (res.json.message === 
            "Invalid user authentication,Please try to relogin with exact credentials.") {
                setState({ ...state, isLoading: false});  
                navigation.navigate('TruckLogin');
                setState({ ...state, isLoading: false});  
                AsyncStorage.clear();
            }
            if (res.json.result) {
                setState({ ...state, actionLoading: false});
                toastWithDurationHandler('Offer Rejected');
                setTimeout(function () {
                  navigation.navigate('OnlineOfferVehicle')
                }, 3000);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const acceptDirectOrder = async () => {

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
          ApiConfig.ACCEPT_DIRECT_ORDER,
          JSON.stringify({ user_id, api_key, customer_id, load_id: bid.offer.trip_id })
        )
          .then((res) => {
          
            if (res.json.message === 
              "Invalid user authentication,Please try to relogin with exact credentials.") {
                setState({ ...state, isLoading: false});  
                navigation.navigate('TruckLogin');
                setState({ ...state, isLoading: false});  
                AsyncStorage.clear();
            }
            if (res.json.result) {
                setState({ ...state, actionLoading: false});
                successWithDurationHandler('Offer Accepted');
                setTimeout(function () {
                  navigation.navigate('OnlineOfferVehicle')
                }, 3000);
            }
          })
          .catch((err) => {
            console.log(err);
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
        ApiConfig.AUCTION_DETAILS,
        JSON.stringify({ user_id, api_key, customer_id, load_id: bid.offer.trip_id, })
        ).then((res) => {
            
        if (res.json.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
          setState({ ...state, isLoading: false});  
          navigation.navigate('TruckLogin');
          setState({ ...state, isLoading: false});  
          AsyncStorage.clear();
        }
            if(res.json.message === "Insufficient Parameters"){
                setState({ ...state, isLoading: false});
            }
            
            if (res.json.result){
                setTotalPrice(res.json.best_bid.rate);
                setOfferLoadData(res.json.auction_details);
                setBestBid(res.json.best_bid);
                setState({ ...state, isLoading: false});
            }
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
      <Dialog
        visible={dialogState}
        title="Accept the offer"
        onTouchOutside={() => setDialogState(!dialogState)} >
        
        <View
          style={[
              {
              flexDirection: 'row',
              width: '100%',
              gap: 15,
              paddingTop: 10,
              marginBottom:10
              },
          ]}>
          <View style={{position: "relative", top: 0, right:0, marginTop: 25,justifyContent: "center"}}>
              <TouchableOpacity style={{...appPageStyle.primaryColor, height: 35, width: 150, borderRadius: 10, alignItems: "center", justifyContent: "center",}} 
                  onPress={()=>{acceptDirectOrder()}}
              >
                  <Text style={{...appPageStyle.primaryTextColor}}>Accept</Text>
              </TouchableOpacity>
          </View>
          <View style={{position: "relative", top: 0, right:0, marginTop: 25,justifyContent: "center"}}>
              <TouchableOpacity style={{...appPageStyle.secondaryBackgroundColor, height: 35, width: 150, borderRadius: 10, alignItems: "center", justifyContent: "center",}} 
              onPress={() => setDialogState(!dialogState)}>
                  {!state.actionLoading &&(
                      <Text style={appPageStyle.secondaryTextColor}>Close</Text>
                  )}
                  {state.actionLoading && (
                      <ActivityIndicator size="small" {...appPageStyle.secondaryTextColor} />       
                  )}
              </TouchableOpacity>
          </View>
      </View>
      </Dialog>

      <Dialog
        visible={rejectDialogState}
        title="Reject the offer"
        onTouchOutside={() => setRejectDialogState(!rejectDialogState)} >
        
        <View
          style={[
              {
              flexDirection: 'row',
              width: '100%',
              gap: 15,
              paddingTop: 10,
              marginBottom:10
              },
          ]}>
          <View style={{position: "relative", top: 0, right:0, marginTop: 25,justifyContent: "center"}}>
              <TouchableOpacity style={{...appPageStyle.secondaryBackgroundColor, height: 35, width: 150, borderRadius: 10, alignItems: "center", justifyContent: "center",}} 
                  onPress={()=>{rejectDirectOrder()}}
              >
                  <Text style={{...appPageStyle.secondaryTextColor}}>Reject</Text>
              </TouchableOpacity>
          </View>
          <View style={{position: "relative", top: 0, right:0, marginTop: 25,justifyContent: "center"}}>
              <TouchableOpacity style={{...appPageStyle.secondaryBackgroundColor, height: 35, width: 150, borderRadius: 10, alignItems: "center", justifyContent: "center",}} 
              onPress={() => setRejectDialogState(!rejectDialogState)}>
                  {!state.actionLoading &&(
                      <Text style={appPageStyle.secondaryTextColor}>Close</Text>
                  )}
                  {state.actionLoading && (
                      <ActivityIndicator size="small" {...appPageStyle.secondaryTextColor} />       
                  )}
              </TouchableOpacity>
          </View>
      </View>
      </Dialog>
        {state.isLoading &&(
          <View style={styles.container}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#fff" translucent = {true}/>
            <ActivityIndicator size="large" {...appPageStyle.secondaryTextColor} /> 
            <Text>Getting Offer Vehicles</Text>
          </View> 
        )}
      {!state.isLoading &&(
        <View style={{marginTop: 5, marginBottom: 20, width: '100%', alignItems: "center", justifyContent: "center",}}>
        
        {offerLoadData &&
            <View>
                <View style={[styles.boxShadow, {minHeight: 150, width: '94%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
                    <View
                    style={[
                        {
                        flexDirection: 'row',
                        width: '90%',
                        gap: 15,
                        paddingTop: 10,
                        paddingLeft:25,
                        paddingRight:25,
                        paddingBottom:10
                        },
                    ]}>
                        <View style={{textAlign: 'justify', width: '100%'}}>
                            <View>
                              <Text style={{fontWeight: 'bold', ...appPageStyle.secondaryTextColor, margin: 10}}>Auction Details</Text>
                            </View>
                            <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>Auction Name: {offerLoadData.auction_name}</Text>
                            <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>Auction Duration: {offerLoadData.duration}</Text>
                            <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>Auction Type: {offerLoadData.auction_type}</Text>
                            <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>Start Date: {offerLoadData.auction_start_date}</Text>
                            <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>Expiry Date: {offerLoadData.auction_end_date}</Text>
                        </View>
                        
                    </View>
                </View>
                <View style={[styles.boxShadow, {minHeight: 150, width: '94%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>

                    <View
                    style={[
                        {
                        flexDirection: 'row',
                        width: '90%',
                        gap: 15,
                        paddingTop: 10,
                        paddingLeft:25,
                        paddingRight:25,
                        paddingBottom:10
                        },
                    ]}>
                        <View style={{textAlign: 'justify', width: '100%'}}>
                            <View>
                              <Text style={{fontWeight: 'bold', ...appPageStyle.secondaryTextColor, margin: 10}}>Best Offer</Text>
                            </View>
                            <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>Transporter ID: {bestBid.transporter_name}</Text>
                            <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>Bid Date: {bestBid.date}</Text>
                            <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>Bid Value (ETB): {bestBid.rate}</Text>
                            <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>Commission Fee (ETB): {bestBid.commission_rate}%</Text>
                            <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>Total Bidding (ETB): {(parseInt(totalPrice) + parseInt(totalPrice) * (bestBid.commission_rate/100)) }</Text>
                        </View>
                        
                    </View>
                </View>
                
                <TouchableOpacity onPress={()=>navigation.navigate('DetailsOfferGoods', {details: bestBid.load_id})} style={{marginTop: 20}}>
                    <Text style={{fontWeight: 'bold', ...appPageStyle.secondaryTextColor}}>View Goods Details</Text>
                </TouchableOpacity>
                <View
                    style={[
                        {
                        flexDirection: 'row',
                        width: '100%',
                        gap: 15,
                        paddingTop: 10,
                        marginBottom:10
                        },
                    ]}>
                    <View style={{position: "relative", top: 0, right:0, marginTop: 25,justifyContent: "center"}}>
                        <TouchableOpacity style={{...appPageStyle.primaryColor, height: 35, width: 150, borderRadius: 10, alignItems: "center", justifyContent: "center",}} 
                            onPress={()=>setDialogState(!dialogState)}
                        >
                            <Text style={{...appPageStyle.primaryTextColor}}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{position: "relative", top: 0, right:0, marginTop: 25,justifyContent: "center"}}>
                        <TouchableOpacity style={{...appPageStyle.secondaryBackgroundColor, height: 35, width: 150, borderRadius: 10, alignItems: "center", justifyContent: "center",}} 
                        onPress={() => setRejectDialogState(!rejectDialogState)}>
                            {!state.actionLoading &&(
                                <Text style={appPageStyle.secondaryTextColor}>X Reject</Text>
                            )}
                            {state.actionLoading && (
                                <ActivityIndicator size="small" {...appPageStyle.secondaryTextColor} />       
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        }
        {!offerLoadData ? <View><Text>No Online Data</Text></View>:'' }
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