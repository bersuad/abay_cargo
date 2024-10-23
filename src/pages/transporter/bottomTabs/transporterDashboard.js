
import React, { useState, useEffect } from "react";

import{
  Ionicons,
  MaterialCommunityIcons, 
  FontAwesome5, 
  MaterialIcons, 
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  useNavigation,
  ScrollView,
  StatusBar,
  //Images
  cardBackground,
  headerImage,
  //main styling
  appPageStyle,
  AsyncStorage,
  RefreshControl,
  LogBox,
  ApiConfig,
  postWithAuthCallWithErrorResponse,
  ActivityIndicator
} from './../../../components/index';


export default function App() {
  
  const navigation = useNavigation();
  const [state, setState] = useState({
    isLoading: true,
    checkInternet:true,
  });

  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });
  const [customer_id, setMyClientID]        = useState('');
  const [api_key, setAPI_KEY]               = useState('');
  const [user_id, setMyUserID]              = useState('');
  const [dashBoardData, setDashBoardData ]  = useState([]);
  const [tariffImprotList, setTariffImprotList ]  = useState([]);
  const [tariffExprotList, setTariffExprotList ]  = useState([]);
  const [user_details, setUserDetails]      = useState('');
  

  // componentWillMount();
  

  // refresh page
  
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      _getDashboardDetails();
      setRefreshing(false);
    }, 2000);
  }, []);
  
  useEffect(() => {
    
  }, [dashBoardData]);

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
        navigation.navigate('TruckLogin');
        setState({ ...state, isLoading: false});  
        AsyncStorage.clear();
      }
      if(res.json.message === "Insufficient Parameters"){
        setState({ ...state, isLoading: false});
      }
      
      if (res.json.result)setDashBoardData(res.json);
      setState({ ...state, isLoading: false});
      AsyncStorage.getItem('userDetails').then(value =>{
        setMyUserID(value);
      });
    });
    

    postWithAuthCallWithErrorResponse(
      ApiConfig.TARRIF_IMPORT_LIST,
      JSON.stringify({customer_id, user_id, api_key }),
    ).then((res) => {

      if (res.json.result)setTariffImprotList(res.json);
      setState({ ...state, isLoading: false});
      
    });

    postWithAuthCallWithErrorResponse(
      ApiConfig.TARRIF_EXPORT_LIST,
      JSON.stringify({customer_id, user_id, api_key }),
    ).then((res) => {
      
      if (res.json.result)setTariffExprotList(res.json.tariff_export_list);
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
    <ScrollView 
      style={{backgroundColor: 'rgba(27, 155, 230, 0.1)'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar barStyle = "white-content" hidden = {false} {...appPageStyle.primaryColor} translucent = {true}/>
      {state.isLoading &&(
          <View style={styles.container}>
            <ActivityIndicator size="large" {...appPageStyle.secondaryTextColor} /> 
          </View> 
        )}
      {!state.isLoading &&(
      <View style={styles.container}>
        <View>
          <ImageBackground imageStyle={{ borderRadius: 10}} source={cardBackground} resizeMode="cover" style={[styles.welcomeCard, styles.boxShadow]}>
            <Text style={styles.cardText}>WELCOME.., </Text>
            <Text style={{...styles.cardText, fontSize:18, }}>{dashBoardData.user_name}</Text>
            <Image style={styles.cardImage} source={headerImage}/>
            <TouchableOpacity onPress={()=>navigation.navigate('transporterDriverSearch')}>
              <Text style={{...styles.cardText, fontSize: 15, marginTop: 15, color: "#1b9be6"}}>+ Add Driver</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('transporterVehiclesSearch')}>
              <Text style={{...styles.cardText, fontSize: 15, marginTop: 15, color: "#1b9be6"}}>+ Add Vehicles </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('OfferLoad')}>
              <Text style={{...styles.cardText, fontSize: 15, marginTop: 20, color: "#1b9be6"}}>Get Started With Offer Goods </Text>
            </TouchableOpacity>
          </ImageBackground>

        </View>

        <View
          style={[
            {
              flexDirection: 'row',
              width: '90%',
              gap: 15,
              shadowColor: '#1f1f1f',
              shadowOffset: {width: -2, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 1,
              marginTop: 20,
            },
          ]}>
          <TouchableOpacity style={[styles.listCard, styles.boxShadow]} onPress={()=>navigation.navigate('transporterVehiclesSearch')}>
            <View style={{...styles.badge, backgroundColor: "rgba(1, 138, 40, 0.88)", marginTop: 0, position: 'absolute', right:28, top: 1,  }}>
              <Text style={{fontSize:12, fontWeight:600, color:'#fff'}}>{dashBoardData.vehicles}</Text>
            </View>
            <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.88)"}}>
              <MaterialCommunityIcons name="truck-cargo-container" size={24} color="white" />
            </View>
            <Text style={{...styles.cardText, fontSize:13, }}>Vehicles</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.listCard, styles.boxShadow]} onPress={()=>navigation.navigate('transporterDriverSearch')}>
            <View style={{...styles.badge, backgroundColor: "#1b9be6", marginTop: 0, position: 'absolute', right:28, top: 1,  }}>
              <Text style={{fontSize:12, fontWeight:600, color:'#fff'}}>{dashBoardData.drivers}</Text>
            </View>
            <View style={{...styles.iconArea, backgroundColor: "#1b9be6"}}>
              <FontAwesome5 name="id-badge" size={24} color="#fff" />
            </View>
            <Text style={{...styles.cardText, fontSize:13, }}>Drivers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.listCard, styles.boxShadow]} onPress={()=>navigation.navigate('transporterFreights')}>
            <View style={[styles.iconArea, appPageStyle.primaryColor]}>
              <Ionicons name="swap-horizontal" size={24} color="#fff" />
            </View>
            <Text style={{...styles.cardText, fontSize:13, }}>Frights</Text>
          </TouchableOpacity>

        </View>

        <View
          style={[
            {
              flexDirection: 'row',
              width: '95%',
              gap: 5,
              shadowColor: '#1f1f1f',
              shadowOffset: {width: -2, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 1,
              marginTop: 0,
            },
          ]}>
            <TouchableOpacity style={[styles.boxShadow, styles.offers]} onPress={()=>navigation.navigate('OfferLoad')}>
              <View style={{...styles.badge, backgroundColor: "#1b9be6", marginTop: 0, position: 'absolute', left:35, top: 1,  }}>
                <Text style={{fontSize:12, fontWeight:600, color:'#fff'}}>{dashBoardData.offer_goods_direct}</Text>
              </View>
              <View style={{...styles.iconArea, backgroundColor: "#1b9be6", position: "absolute", left: 5}}>
                <MaterialCommunityIcons name="notebook-check" size={24} color="#fff" />
              </View>
              <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 3, marginLeft: 50 }}>Direct Offer Loads </Text>
              <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10,}}/>
              
            </TouchableOpacity>
            <TouchableOpacity style={[styles.boxShadow, styles.offers]} onPress={()=>navigation.navigate('OnlineOfferLoad')}>
              <View style={{...styles.badge, backgroundColor: "#1b9be6", marginTop: 0, position: 'absolute', left:35, top: 1,  }}>
                <Text style={{fontSize:12, fontWeight:600, color:'#fff'}}>{dashBoardData.offer_goods_online}</Text>
              </View>
              <View style={{...styles.iconArea, backgroundColor: "#1b9be6", position: "absolute", left: 5}}>
                <MaterialCommunityIcons name="notebook-check" size={24} color="#fff" />
              </View>
              <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 1, marginLeft: 50 }}>Online Offer Loads  
              </Text>
              <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10,}}/>
              
            </TouchableOpacity>

          </View>
          <View
          style={[
            {
              flexDirection: 'row',
              width: '95%',
              gap: 5,
              shadowColor: '#1f1f1f',
              shadowOffset: {width: -2, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 1,
              marginTop: 10,
            },
          ]}>
            <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]} onPress={()=>navigation.navigate('OfferVehicle')}>
              <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.88)", position: "absolute", left: 5}}>
                <MaterialCommunityIcons name="truck-cargo-container" size={24} color="white" />
              </View>
              <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 1, marginLeft: 50 }}>Direct Offered Vehicles  
              </Text>
              <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10,}}/>
              
            </TouchableOpacity>
            <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]} onPress={()=>navigation.navigate('OfferVehicle')}>
              
              <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.88)", position: "absolute", left: 5}}>
                <MaterialCommunityIcons name="truck-cargo-container" size={24} color="white" />
              </View>
              <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 1, marginLeft: 50 }}>Online Offered Vehicles
              </Text>
              <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10,}}/>
            </TouchableOpacity>

          </View>
        
        <View
          style={[
            {
              flex: 1,
              flexDirection: 'column',
              width: '90%',
              marginTop: 10,
            },
          ]}>
          <View style={{alignItems: 'flex-start' }}>
            <Text style={{fontSize:15, color:'#1f1f1f', fontWeight:"bold"}}>Import / Export Tariff</Text>
          </View>
          <TouchableOpacity style={{alignItems: 'flex-start', marginTop: 5 }}>
            <Text style={{fontSize:15, color:'#1b9be6', fontWeight:"bold"}}>DEPARTURE--DJIBOUTI</Text>
          </TouchableOpacity>
        </View>

        {/* on going Frights area */}
        <View style={{marginTop: 20, marginBottom: 20, width: '100%', alignItems: "center", justifyContent: "center",}}>
            
            {tariffImprotList.tariff_import_list  &&
              tariffImprotList.tariff_import_list.length &&
              tariffImprotList.tariff_import_list.map((tariff, key) => (
                
          <View style={[styles.boxShadow, {minHeight: 150, maxHeight: 'auto', width: '96%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center", marginBottom:10} ]}>
              <View style={{...styles.iconArea, ...appPageStyle.primaryColor, height: 50, width: '100%', borderRadius: 10, margin: 10, marginTop: 0, borderBottomLeftRadius:0, borderBottomRightRadius:0}}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>{tariff.tariff_import_destination}</Text>
              </View>
            <View
            style={[
              {
                flexDirection: 'row',
                width: '90%',
                gap: 15,
                marginBottom: 5
              },
            ]}>
              <View style={{width:'50%'}}>
                <Text style={{fontStyle:'italic'}}>IMPORT TARIFF</Text>
                <Text style={{fontWeight: 'bold'}}>Price: {tariff.tariff_import_tariff}</Text>
                <Text style={{fontWeight: 'bold'}}>Currency: {tariff.currency_code}</Text>
                <Text style={{fontWeight: 'bold'}}>UM: {tariff.unit_name}</Text>
                <Text style={{fontWeight: 'bold'}}>Km: {tariff.tariff_import_km}</Text>
              </View>
              
                { tariffExprotList && 
                  tariffExprotList[key]?.tariff_export_tariff != null &&
                  tariffExprotList[key]?.tariff_export_tariff != undefined &&
                <View style={{width:'50%'}}>
                    <Text style={{fontStyle:'italic'}}>EXPORT TARIFF</Text>
                    <Text style={{fontWeight: 'bold'}}>Price: {tariffExprotList[key]?.tariff_export_tariff}</Text>
                    <Text style={{fontWeight: 'bold'}}>Currency: {tariffExprotList[key]?.currency_code}</Text>
                    <Text style={{fontWeight: 'bold'}}>UM: {tariffExprotList[key]?.unit_name}</Text>
                    <Text style={{fontWeight: 'bold'}}>Km: {tariffExprotList[key]?.tariff_export_km}</Text>
                </View>
                }
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
    minHeight: 150,
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
    width: '50%',
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