import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  MaterialIcons,
  TextInput,
  useNavigation,
  AsyncStorage,
  RefreshControl,
  ScrollView,
  MaterialCommunityIcons,
  postMultipartWithAuthCallWithErrorResponse,
  postWithAuthCallWithErrorResponse,
  ApiConfig,
  SafeAreaView,
  Toast,
  ActivityIndicator,
  StatusBar,
  appPageStyle
} from './../../../../components/index';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";



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
  const [user_details, setUserDetails]      = useState('');
  const [report_types, setReportType]        = useState('');
  const [reportList, setReportDetails]      = useState('');

  
  const [getReport, setGetReport] = useState({
    customer_id: AsyncStorage.getItem('customer_id'),
    api_key: AsyncStorage.getItem('api_key'),
    user_id: AsyncStorage.getItem('user_id'),
    report_type: "",
    email: "",
    title: "",
    from_date:  "",
    to_date  :  "",
  }); 

  const [errMsg, setErrMsg] = useState({ report_type: "", email: "", title:"", from_date: "", to_date:"" });

  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
  const [fromSelectedDate, setFromSelectedDate] = useState(null);
  const [toSelectedDate, setToSelectedDate] = useState(null);

  const fromShowDatePicker = () => {
    setFromDatePickerVisibility(true);
  };

  const fromHideDatePicker = () => {
    setFromDatePickerVisibility(false);
  };
  const toShowDatePicker = () => {
    setToDatePickerVisibility(true);
  };

  const toHideDatePicker = () => {
    setToDatePickerVisibility(false);
  };

  const toHandleConfirm = (date) => {
    setGetReport({ ...getReport, to_date: FormatDate(date)})
    toHideDatePicker();
    setToSelectedDate(date);
  };

  const fromHandleConfirm = (date) => {
    setGetReport({ ...getReport, from_date: FormatDate(date)})
    fromHideDatePicker();
    setFromSelectedDate(date);
  };

  const FormatDate = (data) => {
    let dateTimeString =
    (
      data.getMonth() + 1) +
      '/' +
      data.getDate() +
      '/' +
      data.getFullYear()
  
    return dateTimeString; // It will look something like this 3-5-2021 16:23
  };



  const toastWithDurationHandler = (message) => {
    // To make Toast with duration
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      backgroundColor: 'red',
      animation: true,
    });
  };

  const successWithDurationHandler = (message) => {
    // To make Toast with duration
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      backgroundColor: 'green',
      animation: true,
    });
  };

  const getReportType= async()=>{
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
      ApiConfig.REPORT_TYPES, JSON.stringify({ user_id, api_key, customer_id }),
    ).then((res) => {
      setState({ ...state, isLoading: false});
      if (res.json.message === 
        "Invalid user authentication,Please try to relogin with exact credentials.") {
          AsyncStorage.clear();
          navigation.navigate('TruckLogin');
      }
      console.log(res.json);
      if (res.json.result) {
        setReportType(res.json.report_types
          .filter(e=> e.report_type_id !== 4 && e.report_type_id !== 5));
      }
    });
  }
  
  

  const reportGenerate = async () =>{
    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');
    // setState({ ...state, isLoading: true});

    let details = JSON.stringify({
      customer_id: customer_id,
      api_key: api_key,
      user_id: user_id,
      report_type: getReport.report_type
        ? getReport.report_type
        : 6,
      email: getReport.email,
      title: getReport.title,
      from_date: getReport.from_date,
      to_date: getReport.to_date,
    });    
    console.log(details);
    setState({ ...state, isLoading: true});
    postMultipartWithAuthCallWithErrorResponse(ApiConfig.REPORT_ADD, details)
      .then((data) => {
        
        // return;
        setState({ ...state, isLoading: false});
        if (data.json.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
          toastWithDurationHandler('Sorry, Something went wrong.');
          AsyncStorage.clear();
          navigation.navigate('TruckLogin');
        }
        
        if (data.error == false) {
          successWithDurationHandler('Report Sent successfully to "'+getReport.email+'", Please check your email.');
        }

        if (data.error == true) {
          toastWithDurationHandler('Sorry, Something went wrong.');
        }
        
      })
    .catch((err) => {
      setState({ ...state, isLoading: false});
      toastWithDurationHandler('Sorry, Something went wrong.');
    })
  }



  useEffect(() => {
    
    // Anything in here is fired on component unmount.
    this.mounted = true;
    getReportType();
    

    return () => {     
      setState({ ...state, isLoading: true, checkInternet:true,});
      this.mounted = false;   
    }
  }, []);

  return (
    <ScrollView style={{backgroundColor: 'rgba(27, 155, 230, 0.1)'}}>
      <StatusBar barStyle = "white-content" hidden = {false} {...appPageStyle.primaryColor} translucent = {true}/>
        {state.isLoading &&(
          <View style={styles.container}>
            <ActivityIndicator size="large" {...appPageStyle.secondaryTextColor} /> 
          </View> 
        )}
        {!state.isLoading &&(
          <SafeAreaView style={styles.container}>

              <View style={[styles.boxShadow, styles.offers, {marginTop: 0, height: 55}]}>
                  <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 10, marginLeft: 1, marginTop: 20, top: 1 }}>Configure Reports</Text>
              </View>

              <View style={[styles.boxShadow, styles.offers, {marginTop: 0, height: 'auto'}]}>
                  <Text style={{position: "relative", left: 0, top: 20, fontSize:13, textAlign:'left', paddingBottom: 0, fontWeight: 'bold' }}>Select Report Type</Text>
                  <SelectDropdown
                    data={report_types}
                    onSelect={(report_type, index) => {
                        setGetReport({ ...getReport, report_type: report_type.report_type_id})
                        setErrMsg({ ...errMsg, report_type: "" });
                      }
                    }
                    value={reportList.report_type_name}
                    renderButton={(report_types, isOpened) => {
                      return (
                        <View style={styles.dropdownButtonStyle}>
                          <Text style={styles.dropdownButtonTxtStyle}>
                            {(report_types && report_types.report_type_name) || 'Select Report Type'}
                          </Text>
                          <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                        </View>
                      );
                    }}
                    renderItem={(report_type, index, isSelected) => {
                      return (
                        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                          <MaterialCommunityIcons name={report_type.icon} style={styles.dropdownItemIconStyle} />
                          <Text style={styles.dropdownItemTxtStyle}>{report_type.report_type_name}</Text>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                  />
                  {errMsg.report_type.length > 0 && (
                    <Text style={{color: '#FF5151', marginTop: 0, position: "relative"}}>{errMsg.report_type}</Text>
                  )}

                  <Text style={{position: "relative", left: 0, top: 20, fontSize:13, textAlign:'left', paddingBottom: 0, fontWeight: 'bold' }}>Enter Email</Text>
                  <View style={styles.inputView}>
                      <TextInput
                          style={styles.TextInput}
                          placeholder="Your Email Here"
                          placeholderTextColor="#003f5c"
                          onChangeText={(email) =>{
                            setGetReport({ ...getReport, email: email})
                            setErrMsg({ ...errMsg, email: "" });
                          }
                        } 
                      /> 
                  </View>
                  {errMsg.email.length > 0 && (
                    <Text style={{color: '#FF5151', marginTop: 0, position: "relative"}}>{errMsg.email}</Text>
                  )}

                  <Text style={{position: "relative", left: 0, top: 20, fontSize:13, textAlign:'left', paddingBottom: 0, fontWeight: 'bold' }}>Report Title</Text>
                  <View style={styles.inputView}>
                      <TextInput
                        style={styles.TextInput}
                        placeholder="Your Report Title"
                        placeholderTextColor="#003f5c"
                        onChangeText={(title) =>{
                          setGetReport({ ...getReport, title: title})
                          setErrMsg({ ...errMsg, title: "" });
                        }}
                      /> 
                  </View>
                  {errMsg.title.length > 0 && (
                    <Text style={{color: '#FF5151', marginTop: 0, position: "relative"}}>{errMsg.title}</Text>
                  )}

                  <Text style={{position: "relative", left: 0, top: 20, fontSize:13, textAlign:'left', paddingBottom: 0, fontWeight: 'bold' }}>From Date</Text>
                  <View style={styles.inputView}>
                    
                    <TouchableOpacity onPress={fromShowDatePicker} style={styles.TextInput}>
                      {fromSelectedDate && (
                        <Text>Selected Date: {fromSelectedDate.toDateString()}</Text>
                      )}
                      {!fromSelectedDate && (
                        <Text>Select a date</Text>
                      )}
                    </TouchableOpacity> 
                    <DateTimePickerModal
                      isVisible={isFromDatePickerVisible}
                      mode="date"
                      onConfirm={fromHandleConfirm}
                      onCancel={fromHideDatePicker}
                    />
                  </View>
                  {errMsg.from_date.length > 0 && (
                    <Text style={{color: '#FF5151', marginTop: 0, position: "relative"}}>{errMsg.from_date}</Text>
                  )}

                  <Text style={{position: "relative", left: 0, top: 20, fontSize:13, textAlign:'left', paddingBottom: 0, fontWeight: 'bold' }}>To Date</Text>
                  <View style={styles.inputView}>
                    
                    <TouchableOpacity onPress={toShowDatePicker} style={styles.TextInput}>
                      {toSelectedDate && (
                        <Text>Selected Date: {toSelectedDate.toDateString()}</Text>
                      )}
                      {!toSelectedDate && (
                        <Text>Select a date</Text>
                      )}
                    </TouchableOpacity> 
                    <DateTimePickerModal
                      isVisible={isToDatePickerVisible}
                      mode="date"
                      onConfirm={toHandleConfirm}
                      onCancel={toHideDatePicker}
                    />
                  </View>
                  {errMsg.to_date.length > 0 && (
                    <Text style={{color: '#FF5151', marginTop: 0, position: "relative"}}>{errMsg.to_date}</Text>
                  )}
                  
                  <TouchableOpacity style={styles.loginBtn} onPress={()=>reportGenerate() }>
                      <Text style={styles.loginText}>Generate</Text> 
                  </TouchableOpacity> 
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
    borderRadius: 8,
    width: '90%',
    height: 45,
    marginBottom: 20,
    marginTop: 30,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "90%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#19788e",
    color: '#fff',
    marginBottom: 10
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
    TextInput: {
        height: 50,
        padding: 10,
    },
    dropdownButtonStyle: {
      width: 200,
      height: 50,
      backgroundColor: '#E9ECEF',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
      backgroundColor: "rgba(25, 120, 142, 0.2)",
      borderRadius: 10,
      width: '95%',
      height: 45,
      marginBottom: 10,
      marginTop: 40
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontWeight: '500',
      color: '#19788e',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
      color: '#19788e',
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
      color: '#19788e',
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#19788e',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
});
