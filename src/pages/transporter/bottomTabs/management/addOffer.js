import "react-native-get-random-values";
import React, { useState, useEffect, useRef } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImagePicker,
  SafeAreaView,
  useNavigation,
  Button,
  //image
  Logo,
  fileIcon,
  //Icons
  Ionicons,
  MaterialIcons as Icon,
  // main styling
  appPageStyle,
  placeholder,
  MaterialCommunityIcons,
  Toast,
  postWithAuthCallWithErrorResponse,
  postMultipartWithAuthCallWithErrorResponse,
  multipartPostCallWithErrorResponse,
  ApiConfig,
  ActivityIndicator,
  AsyncStorage,
  NetInfo,
  LogBox,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from "./../../../../components/index";
import SelectDropdown from 'react-native-select-dropdown';
import * as DocumentPicker from 'expo-document-picker';
import SnackBar from 'react-native-snackbar-component';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Checkbox from 'expo-checkbox';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';




export default function AddOffer() {
  const navigation = useNavigation();
  const [state, setState] = useState({
    device_token: "",
    device_id: "",
    app_version: "",
    app_type: "transporter",
    device_os: "web",
    isLoading: false,
    inputFormat: true,
    checkInternet: true,
    delivery_type:''
  });

  const [dropDownList, setDropDownList] = useState({
    vehicle_name: [],
    vehicle_axle: [],
    vehicle_insurance_type: []
  });

  const googlePlacesRef = useRef();

   
  const [customer_id, setMyClientID] = useState('');
  const [api_key, setAPI_KEY] = useState('');
  const [user_id, setMyUserID] = useState('');
  const [isBreakBulkChecked, setBreakBulkChecked] = useState(false);
  const [isBulkChecked, setBulkChecked] = useState(false);
  

  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
  const [fromSelectedDate, setFromSelectedDate] = useState(null);
  const [toSelectedDate, setToSelectedDate] = useState(null);
  const File_DEFAULT_IMAGE = Image.resolveAssetSource(fileIcon).uri;
  const [fileImage, setFileImage] = useState(File_DEFAULT_IMAGE);
  const [cargoType, setCargoType] = useState([]);
  const [units, setUnits] = useState([]);

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

  const getCargoTypes = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');

    postWithAuthCallWithErrorResponse(
      ApiConfig.DROP_DOWNS_API,
      JSON.stringify({ user_id, api_key, customer_id })
    )
      .then((res) => {
        if (res.json.message === 
          "Invalid user authentication,Please try to relogin with exact credentials.") {
            navigation.navigate('TruckLogin');
            setState({ ...state, isLoading: false});  
            AsyncStorage.clear();
        }
        if (res.json.result) {
          setCargoType(res.json.cargo_types);
        }
      })
      .catch((err) => console.log(err));
  };

  const toHandleConfirm = (date) => {
    setVehicleDetails({ ...vehiclesDetails, end_date: FormatDate(date) })
    toHideDatePicker();
    setToSelectedDate(date);
  };

  const fromHandleConfirm = (date) => {
    setVehicleDetails({ ...vehiclesDetails, start_date: FormatDate(date) })
    fromHideDatePicker();
    setFromSelectedDate(date);
  };

  const [selectedItems, setSelectedItems] = useState([]);

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

  const componentWillMount = () => {
    useEffect(() => {
      this._checkConnection();
      LogBox.ignoreLogs(['componentWillReceiveProps', 'componentWillMount']);
      this.mounted = true;
      this.index = 0;

      getDropDownList();
      getProfileDetails();
      getCargoTypes();
      getContainerTypes();
      return () => {
        setState({ ...state, isLoading: false, checkInternet: true, });
        this.mounted = false;
      }
    }, []);
  }

  componentWillMount();



  _checkConnection = async () => {
    NetInfo.addEventListener(networkState => {
      if (networkState.isConnected) {
        setState({ ...state, checkInternet: true });
      } else {
        setState({ ...state, checkInternet: false });
      }
    });
  }

  const [fileName, setFileName] = useState('');
  const [fileName2, setFileName2] = useState('');
  const [fileName3, setFileName3] = useState('');


  const DEFAULT_IMAGE = Image.resolveAssetSource(Logo).uri;
  const [image, setImage] = useState(DEFAULT_IMAGE);
  const [vehicleType, setVehicleType] = useState([]);
  const [vehicleAxle, setVehicleAxle] = useState([]);
  const [vehicleContainer, setVehicleContainer] = useState([]);
  const [insuranceType, setInsuranceType] = useState([]);
  const SECOND_DEFAULT_IMAGE = Image.resolveAssetSource(placeholder).uri;
  const [placeholderImage, setPlaceholderImage] = useState(SECOND_DEFAULT_IMAGE);
  const [secondPlaceholderImage, setSecondPlaceholderImage] = useState(SECOND_DEFAULT_IMAGE);
  const [thirdPlaceholderImage, setThirdPlaceholderImage] = useState(SECOND_DEFAULT_IMAGE);
  const [containerTypes, setContainerTypes] = useState([]);
  const [container, setContainer] = useState([]);


  const getDropDownList = async () => {

    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');

    postWithAuthCallWithErrorResponse(
        ApiConfig.DROP_DOWNS_API,
      JSON.stringify({ user_id, api_key, customer_id })
    ).then((res) => {
      if (res.json.message ===
        "Invalid user authentication,Please try to relogin with exact credentials.") {
        navigation.navigate('TruckLogin');
        setState({ ...state, isLoading: false});  
        AsyncStorage.clear();
      }
      if (res.json.result) {
        setInsuranceType(res.json.delivery_types);
        setUnits(res.json.quantity_units);
        setVehicleType(res.json.vehicle_name);
        setVehicleAxle(res.json.vehicle_axle);
        setVehicleContainer(res.json.vehicle_container);
        let containers = [];
        res.json.vehicle_name.map(e => {
          containers.push({ label: e.vehicle_name_id, value: e.vehicle_name_value });
        })
      }
    });
  };

  const getContainerTypes = async() => {
    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');

    postWithAuthCallWithErrorResponse(
      ApiConfig.CONTAINER_TYPES,
      JSON.stringify({ user_id, api_key, customer_id })
    )
      .then((res) => {
        if (res.json.message === 
          "Invalid user authentication,Please try to relogin with exact credentials.") {
            navigation.navigate('TruckLogin');
            setState({ ...state, isLoading: false});  
            AsyncStorage.clear();
        }
        if (res.json.result) {
          setContainerTypes(res.json.company_type);
        }
      })
      .catch((err) => console.log(err));
  };



  const toastWithDurationHandler = (message) => {
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      backgroundColor: 'red',
      animation: true,
    });
  };

  const [vehiclesDetails, setVehicleDetails] = useState({
    start_date: "",
    // start_time: "",
    from_lat: "",
    from_lon: "",
    from_address: "",
    to_address: "",
    end_date: "",
    // end_time: "",
    to_lat: "",
    to_lon: "",
    images: "",
    company_name: profileDetails?.company_name,
    cargo_type: "",
    quantity: "",
    units: "",
    delivery_types: "",
    packing_list: "",
    bill_of_landing: " ",
    insurance: "",
    load_commercial_invoice: "",
    agreement_abay: "",
    tax_id_no: "",
    container_type: "",
    unit_measurment: "",
  });

  const [errMsg, setErrMsg] = useState({
    plate_no: "",
    vehicle_name: "",
    vehicle_axle: "",
    vehicle_type: "",
    vehicle_container_type: "",
    chassis_no: "",
    gross_weight: "",
    insurance_file: "",
    insurance_issue_date: "",
    insurance_expiry_date: "",
    insurance_company: "",
    insurance_type: "",
    sum_insured: "",
  });


  const successWithDurationHandler = (message) => {
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      backgroundColor: 'green',
      animation: true,
    });
  };

  
  
  const [selectedImages, setSelectedImages] = useState([]);

  const [containerList, setSelectedContainers] = useState([]);


  const pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });
  
      if (result.assets[0].mimeType) {
        setVehicleDetails({ ...vehiclesDetails, images: result.assets[0].uri });
        if (result.assets[0].mimeType) {
          setFileName(result.assets[0].name);
  
          if (result.assets[0].mimeType === "application/pdf") {
            setPlaceholderImage(fileImage);
          } else {
            setPlaceholderImage(result.assets[0].uri);
          }
  
  
        } else {
          successWithDurationHandler('Please select PDFs or Images only.');
        }
      }

  };



  const removeImage = (uri) => {
    setSelectedImages((prevImages) => prevImages.filter((image) => image.uri !== uri));
    setVehicleDetails({ ...vehiclesDetails, vehicle_images: selectedImages });
  };

  const removeContainer = (name) => {
    setSelectedContainers((containerList) => containerList.filter((containerList) => containerList.value !== name));
  };


  const pickImage2 = async () => {

    let result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'],
    });

    if (result.assets[0].mimeType) {
      setVehicleDetails({ ...vehiclesDetails, packing_list: result.assets[0].uri });
      if (result.assets[0].mimeType) {
        setFileName2(result.assets[0].name);

        if (result.assets[0].mimeType === "application/pdf") {
            setSecondPlaceholderImage(fileImage);
        } else {
            setSecondPlaceholderImage(result.assets[0].uri);
        }


      } else {
        successWithDurationHandler('Please select PDFs or Images only.');
      }
    }
  };

  const pickImage3 = async () => {

    let result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'],
    });

    if (result.assets[0].mimeType) {
      setVehicleDetails({ ...vehiclesDetails, insurance: result.assets[0].uri });
      if (result.assets[0].mimeType) {
        setFileName3(result.assets[0].name);

        if (result.assets[0].mimeType === "application/pdf") {
            setThirdPlaceholderImage(fileImage);
        } else {
            setThirdPlaceholderImage(result.assets[0].uri);
        }


      } else {
        successWithDurationHandler('Please select PDFs or Images only.');
      }
    }
  };

  const findEmptyFields = () => {
    
    setState({ ...state, isLoading: true });    
    for (const key in vehiclesDetails) {
      const value = vehiclesDetails[key];
      if (typeof value === 'object' && value?.uri !== undefined || value?.uri === null ) {
        if (!value.uri) {
          toastWithDurationHandler("Please Add Insurance Image!");
          setState({ ...state, isLoading: false }); 
          return;
        }
      }else if (key == "load_commercial_invoice" 
      || key == "trade_license" 
      || key == "company_name" 
      || key == "container_type" 
      || key == "from_lat" 
      || key == "from_lon" 
      || key == "to_lat" 
      || key == "to_lon" 
      || key == "images" 
      || key == "unit_measurment" 
      || key == "packing_list" 
      || key == "bill_of_landing" 
      || key == "insurance" 
      || key == "agreement_abay" 
      || key == "tax_id_no"){
        continue;
      } else if(value === "" || value === null || value === undefined) {
        toastWithDurationHandler("Please check your "+key+" !");
        setState({ ...state, isLoading: false }); 
        return;
      }
      
    }
    _register();
  };
  const [profileDetails, setProfileDetails] = useState({});
  const getProfileDetails = async() => {
    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');

    postWithAuthCallWithErrorResponse(
      ApiConfig.PROFILE,
      JSON.stringify({ user_id, api_key, customer_id })
    ).then((res) => {
      if (res.json.message === 
        "Invalid user authentication,Please try to relogin with exact credentials.") {
            navigation.navigate('TruckLogin');
            setState({ ...state, isLoading: false});  
            AsyncStorage.clear();
      }
      if (res.json.result) setProfileDetails(res.json.profile.basic_info);
      
      setLoading(false);
    });
  };


  const filtered = units.filter((unit) => {
    if (vehiclesDetails?.cargo_type == 2) {
      return unit.unit_name === "quintal";
    } else if (vehiclesDetails?.cargo_type == 3) {
      return unit.unit_name === "quintal";
    } else if (vehiclesDetails?.cargo_type == 4) {
      return unit.unit_name === "number";
    } else if (vehiclesDetails?.cargo_type == 1) {
      return unit.unit_name === "number";
    }
  });



  _register = async () => {
    console.log(vehiclesDetails);

    setState({ ...state, isLoading: true });
    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');
    
    const tn = vehiclesDetails.insurance;
    const tn_img = tn.split('/').pop();

    const insurance_file = {
      uri: vehiclesDetails.insurance,
      name: tn_img,
      type: vehiclesDetails.insurance.endsWith('.pdf')
        ? "application/pdf"
        : vehiclesDetails.insurance.endsWith('.png') || vehiclesDetails.insurance.endsWith('.jpeg') || vehiclesDetails.insurance.endsWith('.jpg')
          ? "image/png"
          : "image/jpeg"
    };
    
    const pack = vehiclesDetails.packing_list;
    const pack_img = pack.split('/').pop();

    const packing_file = {
      uri: vehiclesDetails.packing_list,
      name: pack_img,
      type: vehiclesDetails.packing_list.endsWith('.pdf')
        ? "application/pdf"
        : vehiclesDetails.packing_list.endsWith('.png') || vehiclesDetails.packing_list.endsWith('.jpeg') || vehiclesDetails.packing_list.endsWith('.jpg')
          ? "image/png"
          : "image/jpeg"
    };
    
    const f_images = vehiclesDetails.images;
    const fr_img = f_images.split('/').pop();

    const fright_images = {
      uri: vehiclesDetails.images,
      name: fr_img,
      type: vehiclesDetails.images.endsWith('.pdf')
        ? "application/pdf"
        : vehiclesDetails.images.endsWith('.png') || vehiclesDetails.images.endsWith('.jpeg') || vehiclesDetails.images.endsWith('.jpg')
          ? "image/png"
          : "image/jpeg"
    };
    
    const formData = new FormData();
    formData.append("api_key", api_key);
    formData.append("user_id", user_id);
    formData.append("customer_id", customer_id);
    formData.append("start_date", vehiclesDetails.start_date);
    formData.append("from_address", vehiclesDetails.from_address);
    formData.append("to_address", vehiclesDetails.to_address);
    formData.append("end_date", vehiclesDetails.end_date);
    formData.append("company_name", profileDetails?.company_name);
    formData.append("cargo_type", vehiclesDetails.cargo_type);
    formData.append("quantity", vehiclesDetails.quantity);
    formData.append("unit", vehiclesDetails.units);
    formData.append("bill_of_landing", vehiclesDetails.bill_of_landing);
    formData.append("delivery_type", vehiclesDetails.delivery_types);
    if (vehiclesDetails.cargo_type === "1") {
        formData.append("container_type", vehiclesDetails?.container_type);
    }else {
        formData.append("container_type", "");
    }
    formData.append("from_lat", vehiclesDetails.from_lat);
    formData.append("from_lon", vehiclesDetails.from_lon);
    formData.append("to_lon", vehiclesDetails.to_lon);
    formData.append("to_lat", vehiclesDetails.to_lat);
    


    formData.append("bill_of_landing", {
      uri: fright_images.uri,
      name: fright_images.name,
      type: fright_images.type
    });

    formData.append("packing_list", {
        uri: packing_file.uri,
        name: packing_file.name,
        type: packing_file.type
      });
      formData.append("insurance", {
        uri: insurance_file.uri,
        name: insurance_file.name,
        type: insurance_file.type
      });
    console.log(formData);
    
    postWithAuthCallWithErrorResponse(
        ApiConfig.ADD_LOAD_API, formData
    ).then((res) => {
      setState({ ...state, isLoading: false });
      console.log(res);
      if (res.json.message === "An internal server error occurred.") {
        setState({ ...state, isLoading: false });
        toastWithDurationHandler("An internal server error occurred. Please Try again!");
      }

      if (res.json.result == true || res.json.message === "Load added successfully, Please wait for approval from Administration") {
        successWithDurationHandler('Load added successfully, Please wait for approval from Administration.');
        setState({ ...state, isLoading: false });
        setTimeout(function () {
          navigation.navigate('OfferLoad');
        }, 3000);
        return;
      }

      if (res.json.message === "Load added successfully, Please wait for approval from Administration") {
        setState({ ...state, isLoading: false });
        successWithDurationHandler("Load added successfully, Please wait for approval from Administration.");
        setTimeout(function () {
          navigation.navigate('OfferLoad');
        }, 3000);
      } else {
        setState({ ...state, isLoading: false });
        toastWithDurationHandler(res.json.message);
      }

    }).catch((error) => {
      console.log(error);
    });


  }

  const [selectedFromLocation, setSelectedFromLocation] = useState(null);
  const [from_Coordinates, setSelectedFromCorrdination] = useState(null);
  const [selectedToLocation, setSelectedToLocation] = useState(null);
  const [to_Coordinates, setSelectedToCorrdination] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleFromLocationSelect = (data, details) => {
    setState({ ...state, isLoading: false });
    setSelectedFromLocation({
      address: data.description
    });

    setSelectedFromCorrdination({
      address: details.geometry.location
    });
    setInputValue(data.description);

    setVehicleDetails({ ...vehiclesDetails, from_address: data.description, from_lat: details.geometry.location.lat, from_lon: details.geometry.location.lng });

  };

  const handleToLocationSelect = (data, details) => {
    setSelectedToLocation({
      address: data.description
    });

    setSelectedToCorrdination({
      address: details.geometry.location
    });
    
    setVehicleDetails({ ...vehiclesDetails, to_address: data.description, to_lat: details.geometry.location.lat, to_lon: details.geometry.location.lng })
  };
  
  return (
    <ScrollView style={{ backgroundColor: 'rgba(27, 155, 230, 0.1)' }}>
      <StatusBar barStyle="white-content" hidden={false} {...appPageStyle.primaryColor} translucent={true} />
      <SafeAreaView style={styles.container}>
        {!state.checkInternet && (
          <SnackBar visible={true} textMessage="No Internet Connection!" actionHandler={() => { this._checkConnection() }} actionText="Try Again" />
        )}
        
        <Text style={styles.HeaderText}>Expected Arrival Date</Text>
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
        <Text style={styles.HeaderText}>Estimated End Date</Text>
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
        <Text style={styles.HeaderText}>Inital Location</Text>
        
        <ScrollView nestedScrollEnabled={true} style={{ width: "95%", flex: 1, backgroundColor: '#fff', }} keyboardShouldPersistTaps="handled">
          <GooglePlacesAutocomplete
              placeholder={vehiclesDetails.from_address? vehiclesDetails.from_address:'Inital Location'}
              onPress={handleFromLocationSelect}
              keepResultsAfterBlur={false}
              // textInputProps={{ onBlur: () => { console.log("Blur") } }}
              query={{
                key: "AIzaSyCmTKHfje5c63U_hjhn10MiSGsHEVZbKoE", 
                language: 'en', 
              }}
              fetchDetails={true} 
              keyboardShouldPersistTaps={"always"}
              enablePoweredByContainer={false}
              styles={{
                textInput: styles.textInput,
                listView: styles.listView,
              }}
              PlacesAPI='places'
              debounce={200}
              textInputProps={{
                value: inputValue,
                onChangeText: (text) => setInputValue(text),
                onBlur: () => {
                  console.log("Blur");
                },
              }}
            />
        </ScrollView>

        <Text style={styles.HeaderText}>Destination Location</Text>
        <ScrollView nestedScrollEnabled={true} style={{ width: "95%", flex: 1, backgroundColor: '#fff', }} keyboardShouldPersistTaps="handled">
          <GooglePlacesAutocomplete
              placeholder='Destination Location'
              onPress={handleToLocationSelect}
              keepResultsAfterBlur={true}
              textInputProps={{ onBlur: () => { console.log("Blur") } }}
              query={{
                key: "AIzaSyCmTKHfje5c63U_hjhn10MiSGsHEVZbKoE",
                language: 'en', 
              }}
              fetchDetails={true} 
              keyboardShouldPersistTaps={"always"}
              enablePoweredByContainer={false}
              styles={{
                textInput: styles.textInput,
                listView: styles.listView,
              }}
              PlacesAPI='places'
              debounce={200}
            />
        </ScrollView>

        <Text style={styles.HeaderText}>Company Name</Text>        
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder={profileDetails.company_name}
            value={profileDetails.company_name}
            editable={false}
            placeholderTextColor="#000000"
            
          />
        </View>
        <Text style={styles.HeaderText}>Cargo Type</Text>
        <View
          style={[
            {
              flexDirection: 'row',
              width: '95%',
              gap: 4,
              backgroundColor: '#fff',
            },
          ]}>
        
          <SelectDropdown
            data={cargoType}
            onSelect={(cargoType, index) => {
              setErrMsg({ ...errMsg, cargo_type: "" });
              setVehicleDetails({ ...vehiclesDetails, cargo_type: cargoType.cargo_id })
            }}
            value={vehiclesDetails.cargo_type}
            renderButton={(cargoType, isOpened) => {
              return (
                <View style={{ ...styles.dropdownButtonStyle, width: '100%', }}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(cargoType && cargoType.cargo_name) || 'Select Cargo Type'}
                  </Text>
                  <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(cargoType, index, isSelected) => {
              return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                  <Text style={styles.dropdownItemTxtStyle}>{cargoType.cargo_name}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>  

        {vehiclesDetails && (vehiclesDetails.cargo_type === 1)
        ?
        <>
          <Text style={styles.HeaderText}>Type of Containers</Text>
          <SelectDropdown
            data={
                containerTypes
            }
            onSelect={(vehicleContainer, index) => {
              setErrMsg({ ...errMsg, container_type: "" });
              setVehicleDetails({ ...vehiclesDetails, container_type: vehicleContainer.container_type_id })
            }}
            
            value={vehiclesDetails.container_type}
            renderButton={(vehicleContainer, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(vehicleContainer && vehicleContainer.container_type_name) || 'Select Container Type'}
                  </Text>
                  <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(vehicleContainer, index, isSelected) => {

              return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                  <Text style={styles.dropdownItemTxtStyle}>
                    {vehicleContainer.container_type_name} {' '}
                  </Text>
                </View>
              );

            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </>
        : <></>}

        <Text style={styles.HeaderText}>Unit Of Measurement</Text>
        <View
          style={[
            {
              flexDirection: 'row',
              width: '95%',
              gap: 4,
              backgroundColor: '#fff',
            },
          ]}>
        
          <SelectDropdown
            data={filtered}
            onSelect={(filtered, index) => {
              setErrMsg({ ...errMsg, cargo_type: "" });
              setVehicleDetails({ ...vehiclesDetails, units: filtered.unit_id })
            }}
            value={vehiclesDetails.units}
            renderButton={(filtered, isOpened) => {
              return (
                <View style={{ ...styles.dropdownButtonStyle, width: '100%', }}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(filtered && filtered.unit_name) || 'Select Measurement'}
                  </Text>
                  <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(filtered, index, isSelected) => {
              return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                  <Text style={styles.dropdownItemTxtStyle}>{filtered.unit_name}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>    

        <Text style={styles.HeaderText}>Quantity (Total Volume)</Text>        
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            value={vehiclesDetails.quantity}
            placeholder="Quantity"
            placeholderTextColor="#0f0f0f"
            inputMode="numeric"
            onChangeText={(text) => {
              setErrMsg({ ...errMsg, vendor_name: "" });
              setVehicleDetails({ ...vehiclesDetails, quantity: text })
            }
            }
          />
        </View>   

        <Text style={styles.HeaderText}>Delivery Type</Text>
        <View
          style={[
            {
              flexDirection: 'row',
              width: '95%',
              gap: 4,
              backgroundColor: '#fff',
            },
          ]}>

          <SelectDropdown
            data={insuranceType}
            onSelect={(insuranceType, index) => {
              setErrMsg({ ...errMsg, insurance_type: "" });
              setVehicleDetails({ ...vehiclesDetails, delivery_types: insuranceType.delivery_type_id })
              setState({
                ...state,
                delivery_types: insuranceType.delivery_type_id,
              });
            }}
            value={vehiclesDetails.delivery_types}
            renderButton={(insuranceType, isOpened) => {
              return (
                <View style={{ ...styles.dropdownButtonStyle, width: '100%', }}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(insuranceType && insuranceType.delivery_type_name) || 'Select Delivery Type'}
                  </Text>
                  <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(insuranceType, index, isSelected) => {
              return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                  <Text style={styles.dropdownItemTxtStyle}>{insuranceType.delivery_type_name}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>

        <View
          style={[
            {
              flexDirection: 'row',
              width: '94%',
              gap: 15,
              backgroundColor: '#fff',
              minHeight: 200,
            },
          ]}>
          {state.delivery_types == 2 && (
          <View style={{ ...styles.iconArea, height: 60, width: "50%", marginLeft: 20 }}>
            <Text style={{ alignSelf: 'left', fontWeight: 500, fontSize: 14, marginTop: 15 }}>Bill of Lading</Text>
            <View style={{ marginLeft: -10, marginTop: 10 }}>
              {placeholderImage && <Image style={{ ...styles.cardImage, borderRadius: 10, height: 100, width: 100 }} source={{ uri: placeholderImage }} />}
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Text style={{ ...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor }}> <Ionicons name="camera" size={18} color={appPageStyle.secondaryTextColor} /> {fileName ? <Text>{fileName}</Text> : "Upload"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          )}
          <View style={{ ...styles.iconArea, height: 60, width: "50%", marginLeft: 20 }}>
            <Text style={{ alignSelf: 'left', fontWeight: 500, fontSize: 14, marginTop: 15 }}>Packing List</Text>
            <View style={{ marginLeft: -10, marginTop: 10 }}>
              {placeholderImage && <Image style={{ ...styles.cardImage, borderRadius: 10, height: 100, width: 100 }} source={{ uri: secondPlaceholderImage }} />}
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage2}>
                <Text style={{ ...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor }}> <Ionicons name="camera" size={18} color={appPageStyle.secondaryTextColor} /> {fileName2 ? <Text>{fileName2}</Text> : "Upload"}</Text>
              </TouchableOpacity>
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
                <Text style={{alignSelf: 'left', fontWeight: 500, fontSize: 14, marginTop: 0}}>Insurance, Comprehensive & Cargo</Text>
                <View style={{marginLeft: 0, marginTop: 10}}>
                {thirdPlaceholderImage && <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}} source={{ uri:thirdPlaceholderImage}}/>}
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage3}>
                    <Text style={{...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor}}> <Ionicons name="camera" size={18} color={appPageStyle.secondaryTextColor} /> {fileName3 ? <Text>{fileName3}</Text> : "Upload"}</Text> 
                </TouchableOpacity> 
                </View>
            </View>
        </View>  


        <TouchableOpacity style={[styles.loginBtn, appPageStyle.primaryColor, appPageStyle.secondaryTextColor]} onPress={() => findEmptyFields()} disabled={state.isLoading}>
          {!state.isLoading && (
            <Text style={appPageStyle.primaryTextColor}> Send Offer <Ionicons name="add-outline" size={15} /></Text>
          )}
          {state.isLoading && (
            <ActivityIndicator size="small" {...appPageStyle.primaryTextColor} />
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 0,
    height: 100,
    width: 100,
    objectFit: "cover",
    borderRadius: 100,
    marginTop: 15,
    alignSelf: 'center',
  },
  logoArea: {
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "rgba(240,138,41, 0.3)",
    borderRadius: 10,
    width: '95%',
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
  },

  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold'
  },
  HeaderText: {
    color: '#0f0f0f',
    fontSize: 13,
    alignSelf: 'flex-start',
    marginLeft: 10,
    padding: 15
  },
  uploadButton: {
    backgroundColor: "#f1f1f1",
    height: 30,
    width: '70%',
    shadowColor: '#1f1f1f',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 5
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
    backgroundColor: "rgba(240,138,41, 0.3)",
    borderRadius: 10,
    width: '95%',
    height: 45,
    marginBottom: 10,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontWeight: '500',
    color: '#0f0f0f',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
    color: '#0f0f0f',
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
    color: '#0f0f0f',
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
    color: '#0f0f0f',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  removeContainer:{
    position: 'absolute',
    top: 0,
    right: -12,
    backgroundColor: "rgba(25, 120, 142, 0.99)",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1000
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  selectedContainer:{
    minWidth: "100%",
    backgroundColor: "rgba(25, 120, 142, 0.2)",
    borderRadius: 10,
    paddingLeft:10,
    minHeight:20,
  },
  dropContainer:{
    
      paddingTop: 50,
      paddingHorizontal: 10,
    
  },
  textInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "rgba(240,138,41, 0.3)",
    borderRadius: 10,
    width: '95%',
    height: 45,
  },
  listView: {
    backgroundColor: '#fff',
  },
  infoBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 4,
  },
});