import React, { useState, useEffect } from "react";

import  {
  View,
  Text,
  TouchableOpacity,
  Ionicons,
  useNavigation,
  ApiConfig,
  postWithAuthCallWithErrorResponse,
  AsyncStorage
} from './../../components/index';
import appPageStyle from '../../styles/common';

export default function NotificationBar() {
  
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

  const [customer_id, setMyClientID]        = useState('');
  const [api_key, setAPI_KEY]               = useState('');
  const [user_id, setMyUserID]              = useState('');
  const [dashBoardData, setDashBoardData ]  = useState([]);
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

    postWithAuthCallWithErrorResponse(
      ApiConfig.NOTIFICATION, JSON.stringify({ user_id, api_key, customer_id }),
    ).then((res) => {
      console.log(res.json);
      if (res.json.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
        setState({ ...state, isLoading: false});  
        console.log('Wrong Data here');
      }
      if(res.json.message === "Insufficient Parameters"){
        setState({ ...state, isLoading: false});
        console.log('no data here')
      }
  
      
      if (res.json.result)setDashBoardData(res.json.notifications);
      
      
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
    <TouchableOpacity style={{flexDirection: 'row', height: "100%", marginTop: 18}} onPress={()=>navigation.navigate('NotificationList')}>
      <Ionicons name="notifications" size={22} {...appPageStyle.primaryTextColor} style={{marginRight: 32, marginTop: 8}}/>
      <View style={{minWidth: 20, height: 20, ...appPageStyle.secondaryBackgroundColor, alignItems: "center", justifyContent: "center", borderRadius: 100, position: 'absolute', marginLeft: 8, marginTop: 3, paddingLeft: 5, paddingRight: 5}}>
        <Text style={{ fontWeight: 600,...appPageStyle.secondaryTextColor , fontSize: 15, fontWeight:'bold' }}>{dashBoardData.length > 0 ? dashBoardData.length : 0 }</Text>
      </View>
    </TouchableOpacity>
  );
};

// export default NotificationBar;