import React, { useState, useEffect } from 'react';

import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  MaterialCommunityIcons,
  SafeAreaView,
  userImage,
  AsyncStorage,
  useNavigation,
  placeholder,
  postWithAuthCallWithErrorResponse,
  ApiConfig,
  ActivityIndicator,
  StatusBar,
  appPageStyle
} from './../../../../components/index';


export default function ProfilePage() {
  const navigation = useNavigation();
  const [profile, setProfile] = useState([]);
  const [state, setState] = useState({
    isLoading: true,
    checkInternet:true,
  });

  // const userImage = Image.resolveAssetSource(userImage).uri;
  
  const gettingUser = async ()=>{
    
    const user_id = await AsyncStorage.getItem('user_id');
    const api_key = await AsyncStorage.getItem('api_key');
    const customer_id = await AsyncStorage.getItem('customer_id');
    console.log(user_id );
    
    postWithAuthCallWithErrorResponse(
      ApiConfig.PROFILE, JSON.stringify({ user_id, api_key, customer_id }),  
    ).then((res) => {
      
      if (res.json.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
        setState({ ...state, isLoading: false});  
        AsyncStorage.clear();
        navigation.navigate('TruckLogin');
        return;
      }
      if(res.json.message === "Insufficient Parameters"){
        setState({ ...state, isLoading: false});
      }
  
      if (res.json.result) {
        setProfile(res.json.profile);
        setState({ ...state, isLoading: false});
      }
      console.log(profile+" here ");
  
    }).catch((error) => {
      console.log(error);
    });

    console.log("from her");
  
  
  }

  useEffect(() => {
    gettingUser();
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
        <SafeAreaView style={styles.container}>
          <View style={{...styles.iconArea}}>
            <Image style={{...styles.cardImage,  borderRadius: 100, height: 100, width:100}}
              source={{
                uri: profile.basic_info.profile_pic
                    ? ApiConfig.BASE_URL_FOR_IMAGES+profile.basic_info.profile_pic : userImage 
              }}
            />
          </View>
          
          <View style={[styles.boxShadow, styles.groupButton, {marginTop: 20, borderTopLeftRadius:10, borderTopRightRadius:10}]}>
              <Text style={{...styles.cardText, fontSize:18, position: "absolute", left: 20, color: "#1b9be6" }}>Basic Info</Text>
          </View>
          <View style={[styles.boxShadow, styles.groupButton]}>
              <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Company Name: {profile.basic_info.company_name} </Text>
          </View>
          <View style={[styles.boxShadow, styles.groupButton]}>
              <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Company Type: {profile.basic_info.company_type}</Text>
          </View>
          <View style={[styles.boxShadow, styles.groupButton, {borderBottomLeftRadius: 10,borderBottomRightRadius: 10,}]}>
              <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Total Fleet Size: {profile.basic_info.total_fleet_size} </Text>
          </View>
          

          {/* Online */}

          <View style={[styles.boxShadow, styles.groupButton, {marginTop: 20, borderTopLeftRadius:10, borderTopRightRadius:10}]}>
              <Text style={{...styles.cardText, fontSize:18, position: "absolute", left: 20, color: "#1b9be6" }}>Contact Person</Text>
          </View>
          <View style={[styles.boxShadow, styles.groupButton]}>
              <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Name: {profile.contact_person.name} </Text>
          </View>
          <View style={[styles.boxShadow, styles.groupButton]}>
              <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Responsibility: {profile.contact_person.responsibility}</Text>
          </View>
          <View style={[styles.boxShadow, styles.groupButton]}>
              <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Phone No: {profile.contact_person.phone} </Text>
          </View>
          <View style={[styles.boxShadow, styles.groupButton, {borderBottomLeftRadius: 10,borderBottomRightRadius: 10,}]}>
              <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Email: {profile.contact_person.email} </Text>
          </View>

          <View style={[styles.boxShadow, styles.groupButton, {marginTop: 20, borderTopLeftRadius:10, borderTopRightRadius:10}]}>
              <Text style={{...styles.cardText, fontSize:18, position: "absolute", left: 20, color: "#1b9be6" }}>Address</Text>
          </View>
          <View style={[styles.boxShadow, styles.groupButton]}>
              <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Country: {profile.address.country} </Text>
          </View>
          <View style={[styles.boxShadow, styles.groupButton]}>
              <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Region: {profile.address.region} </Text>
          </View>
          <View style={[styles.boxShadow, styles.groupButton]}>
              <Text style={{...styles.cardText, position: "absolute", left: 20 }}>City: {profile.address.city}</Text>
          </View>
          <View style={[styles.boxShadow, styles.groupButton]}>
              <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Phone: {profile.address.phone} </Text>
          </View>
          <View style={[styles.boxShadow, styles.groupButton]}>
              <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Alternative Phone: {profile.address.alternative_phone} </Text>
          </View>
          <View style={[styles.boxShadow, styles.groupButton]}>
              <Text style={{...styles.cardText, position: "absolute", left: 20 }}>Email: {profile.address.email}</Text>
          </View>
          <View style={[styles.boxShadow, styles.groupButton, {borderBottomLeftRadius: 10,borderBottomRightRadius: 10,}]}>
              <Text style={{...styles.cardText, position: "absolute", left: 20 }}>P.O Box: {profile.address.po_box} </Text>
          </View>

          <View style={[styles.boxShadow, styles.groupButton, {marginTop: 20, borderTopRightRadius:10, borderTopLeftRadius: 10}]}>
              <Text style={{...styles.cardText, fontSize:18, position: "absolute", left: 20, color: "#1b9be6" }}>Documents</Text>
          </View>
          <View
          style={[
            {
              flexDirection: 'row',
              width: '94%',
              gap: 15,
              backgroundColor:'#fff', 
              minHeight: 200,
              paddingTop: 15
            },
          ]}>
            <View style={{...styles.iconArea, height: 60, width: 80, marginLeft: 20}}>
              <Text style={{alignSelf: 'left', fontWeight: 500, fontSize: 14, marginTop: 15}}>Tin</Text>
              <View style={{marginLeft: 0, marginTop: 10}}>
                <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}}
                  source={
                    profile.documents.tin_document ?
                    {uri: ApiConfig.BASE_URL_FOR_IMAGES+profile.documents.tin_document }
                  : placeholder 
                }
                />
                <View style={{position: "absolute", top: 0, right:-35}}>
                  <TouchableOpacity style={{backgroundColor: "rgba(25, 120, 142, 0.3)", height: 25, width: 25, borderRadius: 10}}>
                    <MaterialCommunityIcons name="download" size={24} color="#19788e" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{...styles.iconArea, height: 60, width: 120, marginLeft: 90}}>
              <Text style={{fontWeight: 500, fontSize: 14, marginTop: 15, }}>Grade Certificate</Text>
              <View style={{marginLeft: -30, marginTop: 10}}>
                <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}}
                  source={
                    profile.documents.grade_certificate ?
                      {uri: ApiConfig.BASE_URL_FOR_IMAGES+profile.documents.grade_certificate }
                    : placeholder 
                  }
                />
                <View style={{position: "absolute", top: 0, right:-35}}>
                  <TouchableOpacity style={{backgroundColor: "rgba(25, 120, 142, 0.3)", height: 25, width: 25, borderRadius: 10}}>
                    <MaterialCommunityIcons name="download" size={24} color="#19788e" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
          </View>        
          <View
          style={[
            {
              flexDirection: 'row',
              width: '94%',
              gap: 15,
              backgroundColor:'#fff', 
              minHeight: 200,
            },
          ]}>
            <View style={{...styles.iconArea, height: 60, width: 120, marginLeft: 20}}>
              <Text style={{alignSelf: 'left', fontWeight: 500, fontSize: 14, marginTop: 15}}>Business License</Text>
              <View style={{marginLeft: -30, marginTop: 10}}>
                <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}}
                  source={
                    profile.documents.business_license ?
                      {uri: ApiConfig.BASE_URL_FOR_IMAGES+profile.documents.business_license }
                    : placeholder 
                  }
                />
                <View style={{position: "absolute", top: 0, right:-35}}>
                  <TouchableOpacity style={{backgroundColor: "rgba(25, 120, 142, 0.3)", height: 25, width: 25, borderRadius: 10}}>
                    <MaterialCommunityIcons name="download" size={24} color="#19788e" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>        

          
        </SafeAreaView>
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
    marginBottom: 20,
    marginTop: 10
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
  logoArea:{
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "rgba(25, 120, 142, 0.2)",
    borderRadius: 10,
    width: '90%',
    height: 45,
    marginBottom: 10,
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
    width: "95%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#19788e",
    color: '#fff',
  },
  loginText: {
    color: '#fff',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    color: '#19788e',
    fontWeight: 'bold'
  },
  HeaderText:{
    flex:1,
    color: '#4F4F4F',
    fontWeight:"bold",
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton:{
    backgroundColor: "#f1f1f1",
    height: 30,
    width: 'auto',
    shadowColor: '#1f1f1f',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 5
  },

  groupButton:{
    width: '94%',
    height: 50,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
  boxShadow:{
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,
  },
  iconArea:{
    height: 90,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
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
    buttonsList:{
        width: '100',
        height: 70,
        marginTop: 30,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    cardText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        color: '#111',
        // fontWeight: "400",
        
    },
});