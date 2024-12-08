import React, { useState, useEffect } from "react";

import {
  useNavigation,
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  MaterialCommunityIcons,
  appPageStyle,
  AsyncStorage,
  Toast,
  RefreshControl,
  LogBox,
  ApiConfig,
  postWithAuthCallWithErrorResponse,
  postMultipartWithAuthCallWithErrorResponse,
  ActivityIndicator,
  StatusBar,
  Image,
  fileIcon,
  Ionicons,
  placeholder,
  Platform
} from './../../../../components/index';
import { Badge } from 'react-native-paper';

import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';


export default function OfferDetail(props) {
  
    const navigation = useNavigation();
    const offer = props.route.params.details;
    const [ready, setReady] = useState(false);
    const [image, setImage] = useState(null);
    
    // return;
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

    const openShareDialogAsync = async (fileName) => {
      const fileUrl = ApiConfig.BASE_URL_FOR_IMAGES + fileName;
      console.log("Downloading file from:", fileUrl);

      try {
        // Check Permissions
        const hasPermission = await getPermissionAsync();
        if (!hasPermission) {
          toastWithDurationHandler("Permission Denied. Cannot proceed without storage access.");
          return;
        }

        // Android-specific Permissions
        if (Platform.OS === 'android') {
          const { status } = await MediaLibrary.requestPermissionsAsync();
          if (status !== 'granted') {
            toastWithDurationHandler("Permission Denied. Cannot proceed without storage access.");
            return;
          }
        }

        // Define Download Path
        const downloadsDirectory = FileSystem.documentDirectory;
        const filePath = `${downloadsDirectory}${fileName}`;

        // Ensure Directory Exists
        await ensureDirectoryExists(downloadsDirectory);

        // Start File Download
        // const newDownload= FileSystem.createDownloadResumable(fileUrl, filePath);
        // console.log("Download completed:", await newDownload.downloadAsync(newUri));
        
        const downloadResumable = FileSystem.createDownloadResumable(fileUrl, filePath);
        const { uri } = await downloadResumable.downloadAsync();

        if (Platform.OS === 'android') {
          // Save File to Android External Storage
          const asset = await MediaLibrary.createAssetAsync(uri);
          await MediaLibrary.createAlbumAsync('Downloads', asset, false);
          successWithDurationHandler(`Download Complete. File saved to Downloads folder.`);
        } else {
          successWithDurationHandler(`Download Complete. File saved to app directory.`);
        }
        
        console.log("Download completed:", uri);

        // Share File After Download
        const isShareAvailable = await Sharing.isAvailableAsync();
        if (isShareAvailable) {
          await Sharing.shareAsync(uri, {
            mimeType: 'application/pdf' || 'image/*',
            
          });
        } else {
          Alert.alert("Sharing Not Available", "Your device does not support file sharing.");
        }
      } catch (error) {
        console.error("Error downloading/sharing file:", error);
        toastWithDurationHandler("Download Error. There was an issue downloading the file.");
      }

    }

    
    // Download function
    const getPermissionAsync = async () => {
      if (Platform.OS === 'android') {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        return status === 'granted';
      }
      return true; // iOS doesn't require explicit permissions in the same way
    };

    // const ensureDirectoryExists = async (directory) => {
    //   const dirInfo = await FileSystem.getInfoAsync(directory);
    //   if (!dirInfo.exists) {
    //     console.log('Directory does not exist, creating...');
    //     await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
    //   }
    // };

    const successWithDurationHandler = (message) => {
      let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        backgroundColor: 'green',
        animation: true,
      });
    };

    const toastWithDurationHandler = (message) => {
      let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        backgroundColor: 'red',
        animation: true,
      });
    };
    const requestPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status !== 'granted') {
        alert('Permission to access media library is required!');
        return;
      }
    };

    const downloadFile = async (fileName) => {
      try {
        const fileUrl = ApiConfig.BASE_URL_FOR_IMAGES + fileName;
    
        // Fetch the file
        const response = await fetch(fileUrl);
        const blob = await response.blob(); 
    
        // Convert blob to base64
        const base64Data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
    
        // Define file path
        const fileUri = `${FileSystem.documentDirectory}${fileName}`;
        console.log("Saving file to:", fileUri);
    
        // Write file to the app's directory
        await FileSystem.writeAsStringAsync(fileUri, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });
    
        // Optionally share the file
        const isSharingAvailable = await Sharing.isAvailableAsync();
        if (isSharingAvailable) {
          await Sharing.shareAsync(fileUri, {
            mimeType: fileName.endsWith('.pdf') ? 'application/pdf' : 'image/*',
            dialogTitle: `Share ${fileName}`,
          });
        } else {
          console.log("File saved but sharing is not available.");
        }
    
        
      } catch (error) {
        console.error("Error downloading file:", error);
      }
      
      
    };

    const ensureDirectoryExists = async (directory) => {
      try {
        const dirInfo = await FileSystem.readDirectoryAsync(directory);
        if (!dirInfo.includes(directory)) {
          await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
        }
      } catch (error) {
        console.error('Error ensuring directory exists:', error);
      }
    };
    

    
    const [vehicleRequest, setVehicleRequest] = useState({ offer });
    const [dates, setDates] = useState({
        startDate: "",
        endDate: "",
      });
      const [customer_id, setMyClientID]        = useState('');
      const [api_key, setAPI_KEY]               = useState('');
      const [user_id, setMyUserID]              = useState('');
      const [offerLoadData, setOfferLoadData ]  = useState([]);
      const [user_details, setUserDetails]      = useState('');
      const File_DEFAULT_IMAGE = Image.resolveAssetSource(fileIcon).uri;
      const [fileImage, setFileImage] = useState(File_DEFAULT_IMAGE);
      
    
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
        
        postMultipartWithAuthCallWithErrorResponse(
            ApiConfig.GOODS_DETAILS,
            JSON.stringify({ user_id, api_key, customer_id, load_id: vehicleRequest.offer.trip_id ? vehicleRequest.offer.trip_id : vehicleRequest.offer.trip_vehicle_trip_id })
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
        
        if (res.json.result)setOfferLoadData(res.json.load_details);
            setState({ ...state, isLoading: false});
        })
        .catch((err) => console.log(err));

        return () => {};
        
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
        {state.isLoading &&(
          <View style={styles.container}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#fff" translucent = {true}/>
            <ActivityIndicator size="large" {...appPageStyle.secondaryTextColor} /> 
            <Text>Getting Offer Loads</Text>
          </View> 
        )}
      {!state.isLoading &&(
        <SafeAreaView style={styles.container}>
            <View style={[styles.boxShadow, {minHeight: 200, width: '94%', backgroundColor: '#fff', marginTop: 10, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
            <View style={{position: "absolute", right: 5, top: 5}}>
              {
                offerLoadData.trip_status === 'approved' ?
                  <Badge status='success' style={{backgroundColor: 'green'}}>{offerLoadData.trip_status}</Badge>
                : offerLoadData.trip_status === 'requested' ?
                  <Badge status='success' style={{backgroundColor: '#ED7014'}}>{offerLoadData.trip_status}</Badge> 
                : offerLoadData.trip_status === 'rejected' ? 
                  <Badge status='success' style={{backgroundColor: '#F91717'}}>{offerLoadData.trip_status}</Badge> 
                : offerLoadData.trip_status === 'confirmed' ? 
                  <Badge status='success' style={{backgroundColor: '#42AE21'}}>{offerLoadData.trip_status}</Badge> 
                :
                  <Badge status='primary'>{offerLoadData.trip_status}</Badge> 
              }
            </View>
                <View
                style={[
                    {
                    flexDirection: 'row',
                    width: '92%',
                    gap: 15,
                    paddingTop: 10
                    },
                ]}>
                    <View style={{marginTop:-18}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>From </Text>
                    </View>
                    <View style={{textAlign: 'justify', fontSize: 15, marginLeft: '-10%', marginTop:10}}>
                        <Text>Country: {offerLoadData.trip_start_country}</Text>  
                        <Text>City: {offerLoadData.trip_start_city}</Text>
                        <Text>Address: {offerLoadData.trip_start_address}</Text>
                        <Text>Estimated Start Date: {offerLoadData.trip_start_date}</Text>
                    </View>
                </View>
                
            </View>

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
                    <View style={{marginTop:-18}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>To </Text>
                    </View>
                    <View style={{textAlign: 'justify', fontSize: 15, marginLeft: '-10%', marginTop:10}}>
                        <Text>Country: {offerLoadData.trip_end_country}</Text>  
                        <Text>City: {offerLoadData.trip_end_city}</Text>
                        <Text>Address: {offerLoadData.trip_end_address}</Text>
                        <Text>Estimated End Date: {offerLoadData.trip_end_date}</Text>
                    </View>
                </View>
                
            </View>
            <View style={[styles.boxShadow, {minHeight: 150, width: '94%', backgroundColor: '#fff', marginTop: 5, borderRadius: 10, alignItems: "center", justifyContent: "center",} ]}>
            
                <View
                style={[
                    {
                    flexDirection: 'row',
                    width: '92%',
                    gap: 15,
                    paddingTop: 10
                    },
                ]}>
                    <View style={{marginTop:-18}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Good Detail </Text>
                    </View>
                    <View style={{textAlign: 'justify', fontSize: 15, marginLeft: '-10%', marginTop:10, width: '100%'}}>
                        <Text>Reference Number: {offerLoadData.trip_reference_no}</Text>
                        <Text>Company Name: {offerLoadData.trip_company_name}</Text>  
                        <Text>Cargo Type: {offerLoadData.cargo_type}</Text>
                        {offerLoadData.container_type && 
                          <Text>Container Type: {offerLoadData && offerLoadData.container_type ? offerLoadData.container_type : "No Container"}</Text>                                
                          }
                          {offerLoadData.container_type_name && 
                          <Text>Container Type: {offerLoadData && offerLoadData.container_type_name ? offerLoadData.container_type_name : "No Container"}</Text>                                
                          }
                        <Text>Quantity: {offerLoadData && offerLoadData.cargo_type === "Container" ? 
                              offerLoadData.trip_container_quantity + " Containers" : 
                              offerLoadData.cargo_type === "Vehicle" ? offerLoadData.quantity + " Vehicles" : 
                              (offerLoadData.cargo_type === "Bulk" || offerLoadData.cargo_type === "Break bulk") ?
                              offerLoadData.quantity + " Quintals" : " - "}
                        </Text>
                        <Text>Delivery Type: {offerLoadData.delivery_type}</Text> 
                    </View>
                </View>
                
            </View>

            <View style={[styles.boxShadow, styles.groupButton, {marginTop: 20, borderTopRightRadius:10, borderTopLeftRadius: 10}]}>
                <Text style={{...styles.cardText, fontSize:18, position: "absolute", left: 0, color: "#1b9be6" }}>Documents</Text>
            </View>
            <View
            style={[
              {
                flexDirection: 'row',
                width: '94%',
                gap: 5,
                backgroundColor:'#fff', 
                minHeight: 200,
                paddingTop: 15,
                paddingLeft: 50
              },
            ]}>
              {offerLoadData?.trip_packing_list !== "" && (
              <View style={{...styles.iconArea, height: 60, width: 90, marginLeft: 20}}>
                <Text style={{alignSelf: 'left', fontWeight: 500, fontSize: 14, marginTop: 15}}>Packing List</Text>
                <View style={{marginLeft: 0, marginTop: 10}}>
                  <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}} 
                    source={{
                            uri: offerLoadData.trip_packing_list
                            ? ApiConfig.BASE_URL_FOR_IMAGES+offerLoadData.trip_packing_list : fileImage 
                            
                          }}/>
                  <View style={{position: "absolute", top: 0, right:-35}}>
                    <TouchableOpacity style={{backgroundColor: "rgba(25, 120, 142, 0.3)", height: 25, width: 25, borderRadius: 10}} onPress={()=>offerLoadData.trip_packing_list.endsWith('.pdf')? downloadFile(offerLoadData.trip_packing_list): openShareDialogAsync(offerLoadData.trip_packing_list)}>
                      <MaterialCommunityIcons name="download" size={24} color="#19788e" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              )}

              <View style={{...styles.iconArea, height: 60, width: 140, marginLeft: 60}}>
                <Text style={{fontWeight: 500, fontSize: 14, marginTop: 15, }}>Insurance, Comprehensive & cargo</Text>
                <View style={{marginLeft: -30, marginTop: 10}}>
                  <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}} source={{
                        uri: offerLoadData.trip_insurance
                        ? ApiConfig.BASE_URL_FOR_IMAGES+offerLoadData.trip_insurance : fileImage 
                      }}/>
                  <View style={{position: "absolute", top: 0, right:-35}}>
                    <TouchableOpacity style={{backgroundColor: "rgba(25, 120, 142, 0.3)", height: 25, width: 25, borderRadius: 10}} onPress={()=> offerLoadData.trip_insurance.endsWith('.pdf')? downloadFile(offerLoadData.trip_insurance): openShareDialogAsync(offerLoadData.trip_insurance)}>
                      <MaterialCommunityIcons name="download" size={24} color="#19788e" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
            </View> 
            {offerLoadData?.trip_bill_of_landing !== "" && (       
            <View
            style={[
              {
                flexDirection: 'row',
                width: '94%',
                gap: 15,
                backgroundColor:'#fff', 
                minHeight: 200,
                paddingLeft: 40
              },
            ]}>
              <View style={{...styles.iconArea, height: 60, width: 120, marginLeft: 20}}>
                <Text style={{alignSelf: 'left', fontWeight: 500, fontSize: 14, marginTop: 15}}>Bill of Lading</Text>
                <View style={{marginLeft: 0, marginTop: 10}}>
                  <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}}
                    source={{
                      uri: offerLoadData.trip_bill_of_landing
                          ? ApiConfig.BASE_URL_FOR_IMAGES+offerLoadData.trip_bill_of_landing : fileImage 
                    }}
                  />
                  <View style={{position: "absolute", top: 0, right:-35}}>
                    <TouchableOpacity style={{backgroundColor: "rgba(25, 120, 142, 0.3)", height: 25, width: 25, borderRadius: 10}}>
                      <MaterialCommunityIcons name="download" size={24} color="#19788e" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View> 
            )}     
        
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
      marginTop: 10,
      marginRight: 0,
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
    uploadButton:{
      backgroundColor: "#f1f1f1",
      height: 35,
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
  });