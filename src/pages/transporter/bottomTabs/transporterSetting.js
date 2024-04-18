import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SimpleLineIcons,
  MaterialIcons,
  AntDesign,
  Fontisto,
  Entypo,
  useNavigation,
  ScrollView,
  headerImage,
  AsyncStorage,
  postWithAuthCallWithErrorResponse,
  ApiConfig,
  Logo,
  StatusBar,
  ActivityIndicator,
  appPageStyle
} from './../../../components/index';

export default function App() {
  
  const navigation = useNavigation();
  const [userData, setUserData]        = useState([]);
  
  const [dashBoardData, setDashBoardData ]  = useState([]);
  const [state, setState] = useState({
    isLoading: true,
    checkInternet:true,
  });
  
  const gettingUser = async ()=>{
    setState({ ...state, isLoading: true});  
    const user_id = await AsyncStorage.getItem('user_id');
    const api_key = await AsyncStorage.getItem('api_key');
    const customer_id = await AsyncStorage.getItem('customer_id');

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
      AsyncStorage.getItem('userDetails').then(value =>{
        setUserData(JSON.parse(value, true));
      });

    });


  }
  
  logout=()=>{
    AsyncStorage.clear();
    navigation.navigate('TruckLogin');
  }

  useEffect(() => {
    // Anything in here is fired on component unmount.
    this.mounted = true;
    gettingUser();

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
          </View> 
        )}
      {!state.isLoading &&(
        <View style={styles.container}>
        <Text style={styles.HeaderText}>Settings</Text>
        
        <TouchableOpacity onPress={()=>navigation.navigate('ProfileSetting')} style={[styles.boxShadow, styles.offers, {marginTop: 0, height: 110, backgroundColor:'rgba(25, 120, 142, 1)'}]}>
          <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.01)", position: "absolute", left: 20}}>
            <Image style={styles.cardImage} 
              source={{
                uri: ApiConfig.BASE_URL_FOR_IMAGES+userData.user_profile_pic,
              }}/>
          </View>
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60, color: '#fff', marginTop:40, top: 1 }}>{userData.user_name}</Text>
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60, color: '#cfcfcf', marginTop: 60, top: 1 }}>{userData.user_email}</Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#fff" style={{position: "absolute", right: 10}}/>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]} onPress={()=>navigation.navigate('Report')}>
          <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.01)", position: "absolute", left: 20}}>
            <AntDesign name="piechart" size={24} color="rgba(25, 120, 142, 0.9)" />
          </View>
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60 }}>Reports
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10}}/>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]}>
          <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.01)", position: "absolute", left: 20}}>
            <Fontisto name="wallet" size={24} color="rgba(25, 120, 142, 0.9)" />
          </View>
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60 }}>Payments
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10}}/>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]}>
          <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.01)", position: "absolute", left: 20}}>
            <AntDesign name="questioncircle" size={24} color="rgba(25, 120, 142, 0.9)" />
          </View>
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60 }}>How it works?
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10}}/>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]} onPress={()=>navigation.navigate('FAQView')}>
          <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.01)", position: "absolute", left: 20}}>
            <Entypo name="chat" size={24} color="rgba(25, 120, 142, 0.9)" />
          </View>
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60 }}>FAQ
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10}}/>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]} onPress={()=>navigation.navigate('ContactUs')}>
          <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.01)", position: "absolute", left: 20}}>
            <SimpleLineIcons name="call-out" size={24} color="rgba(25, 120, 142, 0.9)"  />
          </View>
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60 }}>Contact Us
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10}}/>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]} onPress={()=>navigation.navigate('AboutUs')}>
          <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.01)", position: "absolute", left: 20}}>
          <AntDesign name="infocirlce" size={24} color="rgba(25, 120, 142, 0.9)"  />
          </View>
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60 }}>About Us
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10}}/>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]} onPress={()=>navigation.navigate('Terms')}>
          <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.01)", position: "absolute", left: 20}}>
            <MaterialIcons name="menu-book" size={24} color="rgba(25, 120, 142, 0.9)"  />
          </View>
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60 }}>Terms And Conditions
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10}}/>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]} onPress={()=>navigation.navigate('Privacy')}>
          <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.01)", position: "absolute", left: 20}}>
            <MaterialIcons name="privacy-tip" size={24} color="rgba(25, 120, 142, 0.9)"  />
          </View>
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60 }}>Privacy Policy
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10}}/>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boxShadow, styles.offers, {marginTop: 0}]} onPress={()=>this.logout()}>
          <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.01)", position: "absolute", left: 20}}>
            <AntDesign name="logout" size={24} color="rgba(25, 120, 142, 0.9)"  />
          </View>
          <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 20, marginLeft: 60 }}>Logout
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#4f4f4f" style={{position: "absolute", right: 10}}/>
        </TouchableOpacity>
        
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
    opacity: 0.9,
    height: 50,
    width: 50,
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 1
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
    borderRadius: 12,
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
  HeaderText:{
    flex:1,
    color: '#4F4F4F',
    fontWeight:"bold",
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
});