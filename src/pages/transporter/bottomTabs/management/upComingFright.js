import React, { useState, useEffect } from "react";

import {
  useNavigation,
  MaterialCommunityIcons,
  FontAwesome5,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  StyleSheet,
  appPageStyle,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
  ApiConfig,
  postWithAuthCallWithErrorResponse,
  postMultipartWithAuthCallWithErrorResponse,
  RefreshControl
} from './../../../../components/index';
export default function OnGoingFright() {
  
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
      to_date:'',
      noData: false
    });

    const [customer_id, setMyClientID]        = useState('');
    const [api_key, setAPI_KEY]               = useState('');
    const [user_id, setMyUserID]              = useState('');
    const [dashBoardData, setDashBoardData ]  = useState([]);
    const [user_details, setUserDetails]      = useState('');

    const getOngoingFright = async() => {
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
          ApiConfig.UPCOMMING_FRIGHT, JSON.stringify({ user_id, api_key, customer_id,  }),
        ).then((res) => {

        console.log(res+" upcoming");
    
        if (res.json.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
          setState({ ...state, isLoading: false});  
          console.log('Wrong Data here');
        }
        if(res.json.message === "Insufficient Parameters"){
          setState({ ...state, isLoading: false});
          console.log('no data here')
        }

        if(res.json.result === false){
          setState({ ...state, noData: true});
        }
    
        console.log(res.json);
        if (res.json.result)setDashBoardData(res.json);
        
        setState({ ...state, isLoading: false});
      });
      
    };
  
    useEffect(() => {
        
      // Anything in here is fired on component unmount.
      this.mounted = true;
      getOngoingFright();
  
      return () => {     
        setState({ ...state, isLoading: true, checkInternet:true,});
        this.mounted = false;   
      }
    }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getOngoingFright();
      setRefreshing(false);
    }, 2000);
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
          </View> 
        )}
      {!state.isLoading &&(
        <View style={{marginTop: 20, marginBottom: 20, width: '100%', alignItems: "center", justifyContent: "center",}}>
        {dashBoardData.load_list &&
          dashBoardData.load_list.length > 0 &&
          dashBoardData.load_list.map((fright, key) => (
            
            <View style={[styles.boxShadow, {minHeight: 150, width: '96%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
              <View
              style={[
                {
                  flexDirection: 'row',
                  width: '90%',
                  gap: 15,
                  
                },
              ]}>
                <View style={{...styles.iconArea, ...appPageStyle.primaryColor, height: 60, width: 60, borderRadius: 100, marginLeft: 0}}>
                  <FontAwesome5 name="box-open" size={24} color="#fff" />
                </View>
                <View >
                  <Text style={{fontWeight: 'bold'}}>Ref. No: {fright.trip_reference_no}</Text>
                  <Text style={{textAlign:'left', width: 250,}}>
                    {fright.trip_start_country +
                    ", " +
                    fright.trip_start_city}{" "}
                  -{" "}
                  {fright.trip_end_country +
                    " " +
                    fright.trip_end_city}
                  </Text>
                  <Text style={{textAlign:'left', width: 250,}}>
                    {'Start at: '+fright.trip_start_date +
                    " "}
                    </Text>
                  <Text style={{textAlign:'left', width: 250,}}>{"End at "}
                  {fright.trip_end_date +
                    " " }
                  </Text>
                  <Text style={{textAlign:'left', width: 250,}}>
                    {'Trip Status: '+fright.trip_status +
                    " "}
                    </Text>
                </View>
                <View style={{position: "absolute", top: 0, right:0}}>
                  <TouchableOpacity style={{backgroundColor: "rgba(25, 120, 142, 0.3)", height: 25, width: 25, borderRadius: 10}}>
                    <MaterialCommunityIcons name="dots-vertical" size={24} {...appPageStyle.secondaryTextColor} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          
          ))
        }
        </View>
      )}
      {!dashBoardData.load_list &&(
          <View style={{marginTop: 20, marginBottom: 20, width: '100%', alignItems: "center", justifyContent: "center",}}>
            <Text style={{fontWeight: 'bold'}}>No Data Found</Text>
            <Text style={{fontWeight: 'normal', fontSize: 9}}>Pull down to refresh.</Text>
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
      marginTop: 20,
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