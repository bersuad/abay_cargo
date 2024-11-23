
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
      style={{backgroundColor: 'rgba(240, 138, 41, 0.03)'}}
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
            <TouchableOpacity onPress={()=>navigation.navigate('transporterDriverSearch')} style={styles.headerButton}>
              <Text style={{...styles.cardText, fontSize: 15, ...appPageStyle.primaryTextColor}}>+ Send Offer Load</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('transporterVehiclesSearch')} style={styles.headerButton}>
              <Text style={{...styles.cardText, fontSize: 15, ...appPageStyle.primaryTextColor}}>X Reject Offer </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('transporterVehiclesSearch')} style={styles.headerButton}>
              <Text style={{...styles.cardText, fontSize: 15, ...appPageStyle.primaryTextColor}}>+ Order Confermation </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('OfferLoad')}>
              <Text style={{...styles.cardText, fontSize: 15, marginTop: 20, ...appPageStyle.secondaryTextColor}}>Get Started With Offer Goods </Text>
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
            <Text style={{...styles.cardText, fontSize:13, }}>Vehicle Offers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.listCard, styles.boxShadow]} onPress={()=>navigation.navigate('transporterDriverSearch')}>
            <View style={{...styles.badge, backgroundColor: "#700033", marginTop: 0, position: 'absolute', right:28, top: 1,  }}>
              <Text style={{fontSize:12, fontWeight:600, color:'#fff'}}>{dashBoardData.drivers}</Text>
            </View>
            <View style={{...styles.iconArea, backgroundColor: "#700070"}}>
              <FontAwesome5 name="id-badge" size={24} color="#fff" />
            </View>
            <Text style={{...styles.cardText, fontSize:13, }}>Drivers</Text>
          </TouchableOpacity>
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
            <View style={{...styles.badge, backgroundColor: "#700033", marginTop: 0, position: 'absolute', right:28, top: 1,  }}>
              <Text style={{fontSize:12, fontWeight:600, color:'#fff'}}>{dashBoardData.vehicles}</Text>
            </View>
            <View style={{...styles.iconArea, backgroundColor: "#700033"}}>
              <MaterialCommunityIcons name="truck-cargo-container" size={24} color="white" />
            </View>
            <Text style={{...styles.cardText, fontSize:13, }}>Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.listCard, styles.boxShadow]} onPress={()=>navigation.navigate('transporterDriverSearch')}>
            <View style={{...styles.badge, backgroundColor: "#1b9be6", marginTop: 0, position: 'absolute', right:28, top: 1,  }}>
              <Text style={{fontSize:12, fontWeight:600, color:'#fff'}}>{dashBoardData.drivers}</Text>
            </View>
            <View style={{...styles.iconArea, backgroundColor: "#1b9be6"}}>
              <FontAwesome5 name="id-badge" size={24} color="#fff" />
            </View>
            <Text style={{...styles.cardText, fontSize:13, }}>Payment Methods</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            {
              flex: 1,
              flexDirection: 'column',
              width: '90%',
              marginTop: 35,
            },
          ]}>
          <View style={{alignItems: 'flex-start' }}>
            <TouchableOpacity style={{alignItems: 'flex-start', marginTop: 5 }}>
              <Text style={{fontSize:15, color:'#1b9be6', fontWeight:"bold"}}>ABAY PLC PORT AND TERMINAL HANDLING RATE CHART</Text>
            </TouchableOpacity>
            
            <Text style={{fontSize:15, color:'#1f1f1f', fontWeight:"bold"}}>Import / Export</Text>
          </View>
        </View>

        <View style={{marginTop: 20, marginBottom: 20, width: '100%', alignItems: "center", justifyContent: "center",}}>
          <View style={[styles.boxShadow, {minHeight: 150, maxHeight: 'auto', width: '96%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center", marginBottom:10} ]}>
            <View style={{...styles.iconArea, ...appPageStyle.secondaryBackgroundColor, borderColor:'#b76b29', borderWidth:1, height: 50, width: '100%', borderRadius: 10, margin: 10, marginTop: 0, borderBottomLeftRadius:0, borderBottomRightRadius:0}}>
              <Text style={{...appPageStyle.secondaryTextColor, fontWeight: 'bold'}}>Terminal Handling</Text>
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
              <Text style={{fontWeight: 'bold', padding:5}}>Terminal Handling</Text>
              <View style={{width:'100%'}}>
                <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>Currency: USD</Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>20 ft(teu): </Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>40 ft(feu): 12</Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>Break bulk(freight tone): 12</Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>Bulk (tone): 12</Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>RORO(Unit): 12</Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>Other: 12</Text>
              </View>
            </View>
          </View>

          <View style={[styles.boxShadow, {minHeight: 150, maxHeight: 'auto', width: '96%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center", marginBottom:10} ]}>
            <View style={{...styles.iconArea, ...appPageStyle.secondaryBackgroundColor, borderColor:'#b76b29', borderWidth:1, height: 50, width: '100%', borderRadius: 10, margin: 10, marginTop: 0, borderBottomLeftRadius:0, borderBottomRightRadius:0}}>
              <Text style={{...appPageStyle.secondaryTextColor, fontWeight: 'bold'}}>Transit fee at sea port</Text>
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
              <Text style={{fontWeight: 'bold', padding:5}}>Transit fee at sea port</Text>
              <View style={{width:'100%'}}>
                <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>Currency: USD</Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>20 ft(teu): </Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>40 ft(feu): 12</Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>Break bulk(freight tone): 12</Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>Bulk (tone): 12</Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>RORO(Unit): 12</Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>Other: 12</Text>
              </View>
            </View>
          </View>

          <View style={[styles.boxShadow, {minHeight: 150, maxHeight: 'auto', width: '96%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center", marginBottom:10} ]}>
            <View style={{...styles.iconArea, ...appPageStyle.secondaryBackgroundColor, borderColor:'#b76b29', borderWidth:1, height: 50, width: '100%', borderRadius: 10, margin: 10, marginTop: 0, borderBottomLeftRadius:0, borderBottomRightRadius:0}}>
              <Text style={{...appPageStyle.secondaryTextColor, fontWeight: 'bold'}}>Local Transit fee</Text>
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
              <Text style={{fontWeight: 'bold', padding:5}}>Local Transit fee</Text>
              <View style={{width:'100%'}}>
                <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>Currency: USD</Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>20 ft(teu): </Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>40 ft(feu): 12</Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>Break bulk(freight tone): 12</Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>Bulk (tone): 12</Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#f9f9f9', minHeight:20, padding:5}}>RORO(Unit): 12</Text>
                <Text style={{fontWeight: 'bold', backgroundColor:'#ffffff', minHeight:20, padding:5}}>Other: 12</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View
          style={[
            {
              flex: 1,
              flexDirection: 'column',
              width: '90%',
              marginTop: 35,
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
    textAlign: 'left',
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
    height: 210,
    width: 210,
    marginTop: 10,
    marginRight: 1,
    objectFit:'contain'
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
  },
  headerButton:{
    ...appPageStyle.primaryColor, 
    height: 25, 
    minWidth: 130, 
    padding: 4, 
    borderRadius:10, 
    marginTop:10
  }
});