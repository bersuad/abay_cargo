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
  Toast,
  postWithAuthCallWithErrorResponse,
  postMultipartWithAuthCallWithErrorResponse,
  PostCallWithErrorResponse,
  ActivityIndicator,
  StatusBar,
  Modal,
  TextInput,
} from './../../../../components/index';


export default function OnlineOfferLoad() {
  
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
      const [offerLoadData, setOfferLoadData ]  = useState([]);
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
      const customerData = {
        customer_id: customer_id,
        user_id: user_id,
        api_key: api_key
      }
      PostCallWithErrorResponse(ApiConfig.ONLINE_AUCTION_OFFER_GOODS, customerData)
      
      .then((res) => {
      if (res.json.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
          setState({ ...state, isLoading: false});
      }
      if(res.json.message === "Insufficient Parameters"){
          setState({ ...state, isLoading: false});
      }

      if (res.json.result)setOfferLoadData(res.json);
          setState({ ...state, isLoading: false});
      });
        
    };


    const [errMsg, setErrMsg] = useState({ bidAmount: ""});

    const sendTheBid = async (trip_id) => {
      if(modalState.modalBidAmount === undefined || modalState.modalBidAmount === ''){
        setErrMsg({ ...errMsg, bidAmount: "** Please Enter Your Bid **" });
        return;
      }
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
      
      let details = JSON.stringify({
        customer_id: customer_id,
        api_key: api_key,
        user_id: user_id,
        load_id: trip_id ,
        amount: modalState.modalBidAmount,
      });
  
      await postMultipartWithAuthCallWithErrorResponse(ApiConfig.MAKEBID, details)
        .then((res) => {
          setModalVisible(!modalVisible);
          // console.log(res.json.bid_id);
          navigation.navigate('OfferNewVehicle', {...modalState, bid_id: res.json.bid_id, trip_id: trip_id, amount:modalState.modalBidAmount });
        })
        .catch((err) => console.log(err));
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [modalState, setModalState] = useState({
      modalRf: '',
      modalCompany:'',
      modalCargo:'',
      modalQuantity:'',
      modalExpectedDate:'',
      modalAuctionName:'',
      modalAuctionDuration:'',
      modalAuctionType: '',
      modalStartDate:'',
      modalExpireDate:'',
      modalBidAmount:''
    });


    const makeBid = async (loads) =>{   
      console.log(loads);
      setModalVisible(!modalVisible);
        setModalState({ ...modalState, 
          modalRf: loads.load_reference_no,
          modalCompany: loads.trip_company_name,
          modalCargo:loads.cargo_type,
          modalQuantity: loads.quantity,
          modalExpectedDate:loads.trip_end_date,
          modalAuctionName: loads.auction_details.auction_name,
          modalAuctionDuration: loads.auction_details.duration,
          modalAuctionType: loads.auction_details.auction_type,
          modalStartDate: loads.auction_details.auction_start_date,
          modalExpireDate: loads.auction_details.auction_end_date,
          modalContainer: loads.container_type,
          modalBidAmount:'',
          modalLoadId:loads.trip_id,
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
    <ScrollView style={{backgroundColor: 'rgba(27, 155, 230, 0.1)'}}>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={false}
            backgroundColor={'rgba(0,0,0,0.2)'}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Ref No: {modalState.modalRf}</Text>
                <Text style={styles.modalText}>Company Name: {modalState.modalCompany}</Text>
                <Text style={styles.modalText}>Cargo Type: {modalState.modalCargo}</Text>
                <Text style={styles.modalText}>Quantity: {modalState.modalQuantity}</Text>
                <Text style={styles.modalText}>Expected Arrival Time: {modalState.modalExpireDate}</Text>
                <Text style={styles.modalText}>Auction Name: {modalState.modalAuctionName}</Text>
                <Text style={styles.modalText}>Auction Duration: {modalState.modalAuctionDuration}</Text>
                <Text style={styles.modalText}>Auction Type: {modalState.modalAuctionType}</Text>
                <Text style={styles.modalText}>Start Date: {modalState.modalStartDate}</Text>
                <Text style={styles.modalText}>Expiry Date: {modalState.modalExpireDate}</Text>

                <Text style={styles.HeaderText}>Enter Bid Amount </Text>
                <View style={styles.inputView}>
                  
                  <TextInput
                    style={styles.TextInput}
                    placeholder="Bid Amount"
                    placeholderTextColor="#19788e"
                    inputMode="numeric"
                    returnKeyType="done"
                    onChangeText={(text) => {
                      setErrMsg({ ...errMsg, bidAmount: "" });
                      setModalState({ ...modalState,  modalBidAmount: text })
                    }
                    }
                    clearButtonMode="while-editing"
                  />
                  {errMsg.bidAmount.length > 0 && (
                    <Text style={{color: '#FF5151', marginTop: 0, position: "relative"}}>{errMsg.bidAmount}</Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => sendTheBid(modalState.modalLoadId)}
                  style={[styles.button, appPageStyle.primaryColor]}>
                  <Text style={[styles.textStyle, appPageStyle.primaryTextColor]}>Make a Bid</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        {state.isLoading &&(
          <View style={styles.container}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#fff" translucent = {true}/>
            <ActivityIndicator size="large" {...appPageStyle.secondaryTextColor} /> 
            <Text>Getting Offer Loads</Text>
          </View> 
        )}
      {!state.isLoading &&(
        <View style={{marginTop: 5, marginBottom: 20, width: '100%', alignItems: "center", justifyContent: "center",}}>
        {offerLoadData.load_list &&
              offerLoadData.load_list.length &&
              offerLoadData.load_list.map((loads, key) => (
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
                      <View style={{...styles.iconArea, ...appPageStyle.primaryColor, height: 50, width: 50, borderRadius: 100, marginLeft: 0}}>
                          <MaterialCommunityIcons name="notebook-check" size={30} color="#fff" />
                      </View>
                      <View style={{textAlign: 'justify',}}>
                          <TouchableOpacity onPress={()=>navigation.navigate('OfferDetail', {details: loads})}>
                            <Text style={{fontWeight: 'bold', ...appPageStyle.secondaryTextColor}}>Ref. No: {loads.load_reference_no}</Text>
                          </TouchableOpacity>
                          <Text style={{textAlign: 'justify',...appPageStyle.secondaryTextColor, fontSize:11}}>{loads.trip_end_date}</Text>    
                          <Text style={{textAlign:'justify'}}>Cargo Type: {loads.cargo_type}</Text>
                          <Text style={{textAlign:'justify'}}>Container Type: {loads.container_type}</Text>
                          <Text style={{textAlign:'justify'}}>Rem Quantity: {loads.trip_container_quantity} {loads.unit}</Text>
                          <Text style={{textAlign:'justify', minWidth: 250, maxWidth:350}}>
                          From: {loads.trip_start_country +
                              ", " +
                              loads.trip_start_city}{" "}
                          </Text>
                          <Text style={{textAlign:'justify', minWidth: 250, maxWidth:350}}>
                              To: {loads.trip_end_country +
                              " " +
                              loads.trip_end_city
                          }
                          </Text>
                          <TouchableOpacity onPress={()=>makeBid (loads)} style={{...appPageStyle.primaryColor, marginBottom: 8, height: 35, width: "100%", borderRadius: 10, alignItems: "center", justifyContent: "center", marginTop: 5}}>
                              <Text style={{...appPageStyle.primaryTextColor}}>Bid</Text>
                          </TouchableOpacity>
                      </View>
                    </View>
                </View>
        ) )}
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
      minWidth: '100%',
      height: 45,
      marginBottom: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    TextInput: {
      height: 50,
      marginTop: 5,
    },
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
    loginBtn: {
      minWidth: '100%',
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
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'left',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'left',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      minWidth: '100%',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      marginTop:20,
      backgroundColor: '#fff',
    },
    textStyle: {
      color: '#777',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'left',
    },
  });