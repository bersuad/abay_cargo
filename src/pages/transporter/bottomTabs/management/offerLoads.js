import React, { useState, useEffect } from "react";

import {
  useNavigation,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
  appPageStyle,
  AsyncStorage,
  RefreshControl,
  LogBox,
  ApiConfig,
  postWithAuthCallWithErrorResponse,
  ActivityIndicator,
  StatusBar,
  Toast,
  TextInput,
  Keyboard,
  Image
} from './../../../../components/index';
import { Badge } from 'react-native-paper';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


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

    
    const _getTheExcel = async () =>{
      var data = offerLoadData;
      var ws = XLSX.utils.json_to_sheet(data);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Offer Good List");
      const wbout = XLSX.write(wb, {
        type: 'base64',
        bookType: "xlsx"
      });
      const uri = FileSystem.cacheDirectory + 'OfferGoodList.xlsx';
      await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64
      });
    
      await Sharing.shareAsync(uri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: 'MyWater data',
        UTI: 'com.microsoft.excel.xlsx'
      });
    }

    const getList=(text)=>{
      if(text === ''){
        _getDashboardDetails();
        setState({  ...state, searchData: false });
      }else{
        const newData = offerLoadData.filter(
          function (item) {
            const itemData = item.trip_reference_no
              ? item.trip_reference_no.toUpperCase()
              : ''.toUpperCase();
            const status = item.trip_status
              ? item.trip_status.toUpperCase()
              : ''.toUpperCase();
            const start = item.trip_start_country
              ? item.trip_start_country.toUpperCase()
              : ''.toUpperCase();
            const end = item.trip_end_country
              ? item.trip_end_country.toUpperCase()
              : ''.toUpperCase();
            const cargo = item.cargo_type
              ? item.cargo_type.toUpperCase()
              : ''.toUpperCase();
            const est_date = item.estimated_arrival_date
              ? item.estimated_arrival_date.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            
            return itemData.indexOf(textData) > -1 ?
            itemData.indexOf(textData) > -1
            :
            status.indexOf(textData) > -1
            ?
            start.indexOf(textData) > -1
            :
            end.indexOf(textData) > -1
            ?
            cargo.indexOf(textData) > -1
            :
            est_date.indexOf(textData) > -1
        });
        
        if(newData.length === 0){
          setState({  ...state, searchData: true });
          setOfferLoadData(newData);
        }else{
          setOfferLoadData(newData);
          setState({  ...state, searchData: false });
        }
      }
    }

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
        ApiConfig.OFFER_LOAD_LIST, JSON.stringify({ user_id, api_key, customer_id }),
      ).then((res) => {
        
      if (res.json.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
          setState({ ...state, isLoading: false});  
      }
      if(res.json.message === "Insufficient Parameters"){
          setState({ ...state, isLoading: false});
      }
      
      if (res.json.result)setOfferLoadData(res.json.load_list);
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
          this.mounted = true;   
        }
    }, []);
    
    return (
    <ScrollView style={{backgroundColor: 'rgba(240, 138, 41, 0.03)'}}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >
        {state.isLoading &&(
          <View style={styles.container}>
            <ActivityIndicator size="large" {...appPageStyle.secondaryTextColor} /> 
            <Text>Getting Offer Loads</Text>
          </View> 
        )}
      {!state.isLoading &&(
        <View style={styles.container}>        
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Search"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => getList(text) }
              onSubmitEditing={Keyboard.dismiss}
              returnKeyType='search'
              contextMenuHidden={true}
              disableFullscreenUI={true}
              cursorColor="#111"
            /> 
            <Ionicons name="search" size={24} color="#555" style={{position: "absolute", right: 10, top: 10}}/>
          </View> 
          <View style={{flex: 1, alignSelf: "flex-start", position: "absolute", top: 68, left: 15, marginBottom:15}}>
            <TouchableOpacity onPress={()=>_getTheExcel()} style={{backgroundColor: 'rgba(1, 138, 40, 0.88)', height: 40, width: "auto", borderRadius: 100, alignContent: "center", alignItems: "center", justifyContent: "center", paddingLeft: 10, paddingRight: 10}}>
              <Text style={{color: '#fff', fontSize: 15}}><MaterialCommunityIcons name="microsoft-excel" size={20} color="white" /> Download Offer</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignSelf: "flex-end", position: "relative", bottom:0, right: 25, marginBottom:10}}>
            <TouchableOpacity onPress={()=>navigation.navigate('AddOffer')} style={{...appPageStyle.primaryColor, height: 40, width: "auto", borderRadius: 100, alignContent: "center", alignItems: "center", justifyContent: "center", paddingLeft: 10, paddingRight: 10}}>
              <Text style={{color: '#fff'}}> <AntDesign name="plus" size={15} color="white" /> Add Offer</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 5, marginBottom: 20, width: '100%', alignItems: "center", justifyContent: "center",}}>
          {offerLoadData &&
                offerLoadData.length > 0 &&
                offerLoadData.map((loads, key) => (
                  
                  <View style={[styles.boxShadow, {minHeight: 150, width: '94%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
                      <View style={{position: "absolute", right: 5, top: 5}}>
                        {
                          loads.trip_status === 'approved' ?
                            <Badge status='success' style={{backgroundColor: 'green'}}>{loads.trip_status}</Badge>
                          : loads.trip_status === 'requested' ?
                            <Badge status='success' style={{backgroundColor: '#ED7014'}}>{loads.trip_status}</Badge> 
                          : loads.trip_status === 'rejected' ? 
                            <Badge status='success' style={{backgroundColor: '#F91717'}}>{loads.trip_status}</Badge> 
                          : loads.trip_status === 'confirmed' ? 
                            <Badge status='success' style={{backgroundColor: '#42AE21'}}>{loads.trip_status}</Badge> 
                          :
                            <Badge status='primary'>{loads.trip_status}</Badge> 
                        }
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
                          <View style={{...styles.iconArea, ...appPageStyle.primaryColor, height: 60, width: 60, borderRadius: 100, marginLeft: 0}}>
                            {loads.trip_packing_list
                              ? 
                              <Image style={{...styles.cardImage,  borderRadius: 100, height: 59, width:59}}
                                source={{
                                  uri: ApiConfig.BASE_URL_FOR_IMAGES+loads.trip_packing_list 
                                }}
                              />
                              :
                              <MaterialCommunityIcons name="notebook-check" size={30} color="#fff" />
                            }
                            
                          </View>
                          
                          <View style={{textAlign: 'justify'}}>
                              <TouchableOpacity onPress={()=>navigation.navigate('OfferDetail', {details: loads})}>
                                <Text style={{fontWeight: 'bold', ...appPageStyle.secondaryTextColor}}>Ref. No: {loads.trip_reference_no}</Text>
                              </TouchableOpacity>
                              <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>Company Name: {loads.trip_company_name}</Text>    
                              <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>Cargo Type: {loads.cargo_type}</Text>
                              <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>Estimated Arrival Date: {loads.estimated_arrival_date}</Text>
                              <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>Quantity: {loads.quantity} {loads.unit}</Text>
                              <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5, minWidth: 250, maxWidth:350}}>
                              From: {loads.trip_start_country +
                                  ", " +
                                  loads.trip_start_city}{" "}
                              </Text>
                              <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5, textAlign:'justify', minWidth: 250, maxWidth:350}}>
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
                              <Text style={{fontWeight: 'bold', backgroundColor:'#fff', minHeight:20, padding:5}}>Insurance: </Text>
                              <View style={{...styles.iconArea, ...appPageStyle.primaryColor, height: 60, width: 60, borderRadius: 5, marginLeft: 0}}>
                                {loads.trip_insurance
                                  ? 
                                  <Image style={{...styles.cardImage,  borderRadius: 5, height: 59, width:59}}
                                  source={{
                                    uri: ApiConfig.BASE_URL_FOR_IMAGES+loads.trip_insurance 
                                  }}
                                  />
                                  :
                                  <MaterialCommunityIcons name="notebook-check" size={30} color="#fff" />
                                }
                                
                              </View>
                              
                            </View>
                          </View>
                      </View>
                  </View>
          ) )}
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
      backgroundColor: "rgba(240, 138, 41, 0.3)",
      borderRadius: 30,
      width: '92%',
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
      right: 0,
      top:0,
      opacity: 0.9,
      height: 110,
      width: 110,
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