import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useNavigation,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  LogBox,
  AsyncStorage,
  postWithAuthCallWithErrorResponse,
  ApiConfig,
  ActivityIndicator,
  StatusBar,
  appPageStyle,
  Keyboard
} from './../../../../components/index';
import { Badge } from 'react-native-paper';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [state, setState] = useState({
    isLoading: true,
    checkInternet:true,
  });
  const navigation = useNavigation();
  const [driverList, setDriverList]         = useState([]);
  const [customer_id, setMyClientID]        = useState('');
  const [api_key, setAPI_KEY]               = useState('');
  const [user_id, setMyUserID]              = useState('');
  const [vehicleList, setVehicleList ]  = useState([]);
  const [user_details, setUserDetails]      = useState('');

  const componentWillMount = () => {
        
    useEffect( () => {
      
        LogBox.ignoreLogs(['componentWillReceiveProps', 'componentWillMount']);
        this.mounted = true;
        setPage(0);
        _getVehicle();

        return () => {
            // Anything in here is fired on component unmount.
            setState({ ...state, isLoading: false, checkInternet:true,});
            this.mounted = false;
        }
    }, []);
}

componentWillMount();

const _getTheExcel = async () =>{
  var data = vehicleList;
  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Vehicles List");
  const wbout = XLSX.write(wb, {
    type: 'base64',
    bookType: "xlsx"
  });
  const uri = FileSystem.cacheDirectory + 'VehiclesList.xlsx';
  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64
  });

  await Sharing.shareAsync(uri, {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    dialogTitle: 'MyWater data',
    UTI: 'com.microsoft.excel.xlsx'
  });
}

const _getVehicle = async() => {

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
    ApiConfig.VEHICLE_LIST,
    JSON.stringify({ user_id, api_key, customer_id })
  )
    .then((res) => {
      if (res.json.message === 
        "Invalid user authentication,Please try to relogin with exact credentials.") {
          navigation.navigate('Registration')
      }
      
      if (res.json.result) {
        setVehicleList(res.json.vehicle_list);
        // this.makeTable();
      }
      setState({ ...state, isLoading: false});
    })
    .catch((err) => console.log(err));

};

const getList=(text)=>{
  if(text === ''){
   _getVehicle();
    setState({  ...state, searchData: false });
  }else{
    const newData = vehicleList.filter(
      function (item) {
        const itemData = item.plate_number
          ? item.plate_number.toUpperCase()
          : ''.toUpperCase();
        const status = item.vehicle_status
          ? item.vehicle_status.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        
        return itemData.indexOf(textData) > -1 ?
        itemData.indexOf(textData) > -1
        :
        status.indexOf(textData) > -1
    });
    
    if(newData.length === 0){
      setState({  ...state, searchData: true });
      setVehicleList(newData);
    }else{
      setVehicleList(newData);
      setState({  ...state, searchData: false });
    }
  }
}


const [page, setPage] = React.useState(0);
const [numberOfItemsPerPageList] = React.useState([2, 3, 4 ]);
const [itemsPerPage, onItemsPerPageChange] = React.useState(
  numberOfItemsPerPageList[0]
);


const from = page * itemsPerPage;
const to = Math.min((page + 1) * itemsPerPage, vehicleList.length);
React.useEffect(() => {
  setPage(0);
}, [itemsPerPage]);

  return (
    <ScrollView style={{backgroundColor: 'rgba(27, 155, 230, 0.1)'}}>
      {state.isLoading &&(
          <View style={styles.container}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#fff" translucent = {true}/>
            <ActivityIndicator size="large" {...appPageStyle.secondaryTextColor} /> 
            <Text>Getting Vehicles List</Text>
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
          <View style={{flex: 1, alignSelf: "flex-start", position: "absolute", top: 68, left: 10, marginBottom:15}}>
            <TouchableOpacity onPress={()=>_getTheExcel()} style={{backgroundColor: 'rgba(1, 138, 40, 0.88)', height: 40, width: "auto", borderRadius: 100, alignContent: "center", alignItems: "center", justifyContent: "center", paddingLeft: 10, paddingRight: 10}}>
              <Text style={{color: '#fff', fontSize: 15}}><MaterialCommunityIcons name="microsoft-excel" size={20} color="white" /> Download Excel</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignSelf: "flex-end", position: "relative", bottom:0, right: 25, marginBottom:10}}>
            <TouchableOpacity onPress={()=>navigation.navigate('AddNewVehicle')} style={{backgroundColor: '#19788e', height: 40, width: "auto", borderRadius: 100, alignContent: "center", alignItems: "center", justifyContent: "center", paddingLeft: 10, paddingRight: 10}}>
              <Text style={{color: '#fff'}}><AntDesign name="plus" size={15} color="white" />Add Vehicle</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 5, marginBottom: 20, width: '100%', alignItems: "center", justifyContent: "center",}}>
            {vehicleList.map((vehicle, key) => (
              <View style={[styles.boxShadow, {minHeight: 150, width: '94%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
                <View
                style={[
                    {
                    flexDirection: 'row',
                    width: '94%',
                    gap: 15,
                    paddingTop: 10
                    },
                ]}>
                    <View style={{...styles.iconArea, backgroundColor: "rgba(1, 138, 40, 0.88)"}}>
                      <MaterialCommunityIcons name="truck-cargo-container" size={24} color="white" />
                    </View>
                    <View style={{textAlign: 'justify'}}>
                        <Text style={{fontWeight: 'bold'}}>Plate No: {vehicle.plate_number}</Text>
                        <View style={{position: "absolute", left: 100, marginTop: -20}}>
                          {
                            vehicle.vehicle_status === 'active' ?
                              <Badge status='success' style={{backgroundColor: 'green'}}>{vehicle.vehicle_status}</Badge>
                            : vehicle.vehicle_status === 'vehicle_added' ?
                              <Badge status='success' style={{backgroundColor: '#ED7014'}}>{vehicle.vehicle_status}</Badge> 
                            : vehicle.vehicle_status === 'removed' ? 
                              <Badge status='success' style={{backgroundColor: '#F91717'}}>{vehicle.vehicle_status}</Badge> 
                            :
                              <Badge status='primary'>{vehicle.vehicle_status}</Badge> 
                          }
                        </View>
                        <Text style={{textAlign: 'justify'}}>Model: {vehicle.vehicle_model_no}</Text>    
                        <Text style={{textAlign:'justify'}}>Type: {vehicle.vehicle_type}</Text>
                        <TouchableOpacity style={{marginTop: 8, marginBottom:8}} onPress={()=>navigation.navigate('VehicleDescription', {details: vehicle.vehicle_id})}>
                            <Text style={{...appPageStyle.secondaryTextColor, fontWeight: 'bold'}}>View More....</Text>
                        </TouchableOpacity>
                    </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '95%',
    height: 45,
    marginBottom: 20,
    
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    // marginLeft: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
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