import React, { useState, useEffect } from "react";

import{
  Ionicons,
  StyleSheet,
  Text,
  View,
  ScrollView,
  appPageStyle,
  AsyncStorage,
  RefreshControl,
  useNavigation,
  LogBox,
  ApiConfig,
  postWithAuthCallWithErrorResponse,
  ActivityIndicator,
} from './../../components/index';

export default  function App(){

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
  const [dashBoardData, setDashBoardData ]  = useState([]);
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
      ApiConfig.DASHBOARD, JSON.stringify({ user_id, api_key, customer_id }),
    ).then((res) => {
  
      if (res.json.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
        setState({ ...state, isLoading: false});  
        console.log('Wrong Data here');
      }
      if(res.json.message === "Insufficient Parameters"){
        setState({ ...state, isLoading: false});
        console.log('no data here')
      }
  
      
      if (res.json.result)setDashBoardData(res.json);
      setState({ ...state, isLoading: false});
      console.log(dashBoardData);
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
    
    return(
        <ScrollView style={{backgroundColor: 'rgba(27, 155, 230, 0.1)'}}>
            <View style={{marginTop: 20, marginBottom: 20, width: '100%', alignItems: "center", justifyContent: "center",}}>
            {dashBoardData.notifications &&
              dashBoardData.notifications.length &&
              dashBoardData.notifications.map((notification, key) => (
                <View style={[styles.boxShadow, {height: 99, width: '94%', backgroundColor: '#fff', marginTop: 20, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
                    <View
                    style={[
                    {
                        flexDirection: 'row',
                        width: '90%',
                        gap: 15,
                        
                    },
                    ]}>
                    <View style={{...styles.iconArea, ...appPageStyle.primaryColor, height: 30, width: 30, borderRadius: 99, marginLeft: 0}}>
                      <Ionicons name="md-notifications" size={15} color="#fff"/>
                    </View>
                    <View style={{width: '85%'}}>
                        <Text style={{textAlign:'justify'}}>
                        {notification.notification_text}
                        </Text>
                    </View>
                    </View>
                    <View style={{position: "absolute", bottom: 6, right:20}}>
                      <Text>{notification.notification_date} {notification.notification_time}</Text>
                    </View>
                </View>
              )
              )
            }
            </View>
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