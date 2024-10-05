import React, { useState, useEffect } from "react";

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
  LogBox
} from "./../../../../components/index";
import SelectDropdown from 'react-native-select-dropdown';
import * as DocumentPicker from 'expo-document-picker';
import SnackBar from 'react-native-snackbar-component';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Checkbox from 'expo-checkbox';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';



export default function NewVehicle(props) {
    const navigation = useNavigation();
    const offerInfo = props.route.params;
    const [state, setState] = useState({
    device_token: "",
    device_id: "",
    app_version: "",
    app_type: "transporter",
    device_os: "web",
    isLoading: false,
    inputFormat: true,
    checkInternet: true,
  });

  const [dropDownList, setDropDownList] = useState({
    vehicle_name: [],
    vehicle_axle: [],
    vehicle_insurance_type: []
  });


  const [customer_id, setMyClientID] = useState('');
  const [api_key, setAPI_KEY] = useState('');
  const [user_id, setMyUserID] = useState('');
  const [isBreakBulkChecked, setBreakBulkChecked] = useState(false);
  const [isBulkChecked, setBulkChecked] = useState(false);
  const [vehicleList, setVehicleList] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const [addedVehicleList, setAddedVehicleList] = useState([]);
  const [plateNoList, setPlateNoList] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState([]);
  const [axleType, setAxleType] = useState("");
  const [vehicleNameValue, setVehicleNameValue] = useState("");
  const [trailerList, setTrailerList] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedtrailer, setSelectedtrailer] = useState({
    vehicle_images: [],
  });
  const [checkTrailer, setCheckTrailer] = useState([]);
  const [trailerContainer, setTrailerContainer] = useState([]);


  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
  const [fromSelectedDate, setFromSelectedDate] = useState(null);
  const [toSelectedDate, setToSelectedDate] = useState(null);
  const [selectVehicle, setSelectVehicle] = useState({ vehicle_images: [] });

  const [vehicleDetails, setVehicleDetails] = useState({
    truck_id: "",
    trailer_id: "",
    driver_id: "",
    bid_id: (offerInfo?.bid_id),
    trip_id: offerInfo?.trip_id,
  });

  

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
    setVehicleDetails({ ...vehicleList, insurance_issue_date: FormatDate(date) })
    toHideDatePicker();
    setToSelectedDate(date);
  };

  const fromHandleConfirm = (date) => {
    setVehicleDetails({ ...vehicleList, insurance_expiry_date: FormatDate(date) })
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


  const getAddVehicleList = async()=>{
    
    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');
    
    postWithAuthCallWithErrorResponse(
      ApiConfig.ONLINE_LISTVEHICLEOFFER,
      JSON.stringify({
        user_id, customer_id, api_key, reference_no: offerInfo.modalRf, bid_id: offerInfo.bid_id
      })
    )
      .then((res) => {
        if (res.json.message === 
          "Invalid user authentication,Please try to relogin with exact credentials.") {
          AsyncStorage.clear();
          navigation.navigate('TruckLogin');
        }
        // setLoading(false);
        if (res.json.result) {
          setAddedVehicleList(res.json.vehicle_list);
          setLoadCategoryType(res.json.load_category);
        }
      })
      .catch((err) => {
        console.log("Ex :: ", err);
      });
  }

  const getTrucks = async() =>{
    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');
    
    
    let vehicle_list = [];
    postMultipartWithAuthCallWithErrorResponse(
      ApiConfig.TRUCK_LIST,
      JSON.stringify({ user_id, customer_id, api_key })
    ).then((res) => {
      const data = res?.json?.vehicle_types;
      
      const filteredTruckList = data.filter((truck) => {
        return !addedVehicleList.some(
          (vehicle) => {if (vehicle.vehicle_id == truck.vehicle_name_id) {
              vehicle_list.push(truck.vehicle_name);
              return true;
          }}
        );
      });
      setVehicleList(filteredTruckList);
    })
    getAddVehicleList();
  }


  
  const getTrailerList = async() =>{
    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');
    
    

    postMultipartWithAuthCallWithErrorResponse(
      ApiConfig.TRAILER_LIST,
      JSON.stringify({ 
        user_id, 
        customer_id, 
        api_key, 
        vehicle_type: selectedVehicleType,
        cargo_type: offerInfo?.modalCargo, 
        container_type: offerInfo?.modalContainer, 
        container_quantity: offerInfo?.modalQuantity, 
        axle_type: axleType 
      })
    )
      .then((res) => {
        if (res.json.message === 
          "Invalid user authentication,Please try to relogin with exact credentials.") {
            AsyncStorage.clear();
            navigation.navigate('TruckLogin');
          }
          const data = res?.json?.vehicle_list;
          
          const filteredTrailerList = data.filter((trailer) => {
            return !addedVehicleList.some(
              (vehicle) => vehicle.trailer_id == trailer.vehicle_id,
          );
        });
        
        setTrailerList(filteredTrailerList);
      })
      .catch((err) => console.log(err));
  }

  const getDriverList = async() => {
    
    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');
    
    postWithAuthCallWithErrorResponse(
      ApiConfig.ACTIVE_DRIVER_LIST,
      JSON.stringify({ user_id, customer_id,api_key })
    )
      .then((res) => {
        if (res.json.message === 
          "Invalid user authentication,Please try to relogin with exact credentials.") {
            AsyncStorage.clear();
            navigation.navigate('TruckLogin');
        }
        if (res.json.result) {
          const data = res?.json?.driver_list;
          const filteredDriverList = data.filter((driver) => {
            return !addedVehicleList.some(
              (vehicle) => vehicle.driver_id === driver.driver_id
            );
          });
          
          setDriverList(filteredDriverList);
        }
      })
      .catch((err) => {
        console.log("Ex :: ", err);
      });
  };

  const componentWillMount = () => {
    useEffect(() => {
      this._checkConnection();
      LogBox.ignoreLogs(['componentWillReceiveProps', 'componentWillMount']);
      this.mounted = true;
      this.index = 0;
      getTrucks();
      getDriverList();
      getTrailerList();
      
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
  const [container, setContainer] = useState([]);


  const getDropDownList = async () => {

    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');

    postWithAuthCallWithErrorResponse(
      ApiConfig.VEHICLE_DROPDOWNLIST,
      JSON.stringify({ user_id, api_key, customer_id })
    ).then((res) => {

      if (res.json.message ===
        "Invalid user authentication,Please try to relogin with exact credentials.") {
          AsyncStorage.clear();
          navigation.navigate('TruckLogin');
      }
      if (res.json.result) {
        setInsuranceType(res.json.vehicle_insurance_type);
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



  const toastWithDurationHandler = (message) => {
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      backgroundColor: 'red',
      animation: true,
    });
  };

  

  const [errMsg, setErrMsg] = useState({
    // vehicle_images: "",
    // owner_id: "",
    plate_no: "",
    vehicle_name: "",
    vehicle_axle: "",
    vehicle_type: "",
    vehicle_container_type: "",
    chassis_no: "",
    gross_weight: "",
    // initial_km: "",
    // model: "",
    // year_manufacture: "",
    // motor_no: "",
    //capacity: "",
    // vendor_name: "",
    // vendor_contact: "",
    // vendor_platform: "",
    // vendor_address: "",
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


  const getPowerPlateNoList = async (vehicle_id) => {
    
    setSelectVehicle({});
    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');
    postWithAuthCallWithErrorResponse(
      ApiConfig.POWER_PLATE_NO,
      JSON.stringify({ user_id, customer_id, api_key, vehicle_name_id: vehicle_id, 
          cargo_type: offerInfo?.modalCargo, container_type: offerInfo?.modalContainer, 
          container_quantity: offerInfo?.modalQuantity})
    )
      .then((res) => {
        if (res.json.message === 
          "Invalid user authentication,Please try to relogin with exact credentials.") {
            AsyncStorage.clear();
            navigation.navigate('TruckLogin');
        }
        if (res.json.result) {
          
          const data = res?.json?.vehicle_list;
          const filteredPlateNumberList = data.filter((plate) => {
            
            return !addedVehicleList.some(
              (vehicle) => vehicle.vehicle_id == plate.vehicle_id
            );
          });
          // const filteredArray = dataArray.filter((item) => item.plate_number !== plateNumberToRemove);
          setPlateNoList(filteredPlateNumberList);
          setVehicleDetails({
            ...vehicleDetails,
            truck_id: filteredPlateNumberList[0]?.vehicle_id,
          });
          filteredPlateNumberList?.map(e=>           
            {e?.vehicle_container_id.split(",")[3].replace("{", "").replace("}", "")}
          )
          
          
        }
      })
      .catch((err) => {
        console.log("Ex :: ", err);
      });
  };

  const setCurrenttrailer = (trailer_id) => {
    setSelectedtrailer({});
    setCheckTrailer([]);
    
    let trailer_id_val = trailer_id;
    
    let trailer = trailerList.filter(
      (vehicle) => { 
        if (vehicle.vehicle_id == trailer_id) {  
          return true;
      }}
    )[0];
    setCheckTrailer([{ ...trailer }]);
    setSelectedtrailer({
      ...trailer,
      load_reference_no: offerInfo && offerInfo.modalRf,
    });
    let cont_array = [];
    if (offerInfo?.modalCargo === "Container"){
      cont_array.push(trailer?.container_type_value_id[0]);
    }
    
    if (offerInfo?.modalCargo === "Container" && trailer?.container_type_value_id[1]) {
      cont_array.push(trailer?.container_type_value_id[1]);
    }
    
    
    setTrailerContainer(cont_array);
    setVehicleDetails({
      ...vehicleDetails,
      // truck_id: vehicle?.vehicle_id,
      trailer_id: trailer_id_val,
    });
  };

  const setCurrentPlateNo = (v_id) => {
    
    let vehicle = plateNoList.filter(
      (vehicle) => vehicle.vehicle_id == v_id
    )[0];
    
    setSelectVehicle({
      ...vehicle,
      load_reference_no: offerInfo && offerInfo.modalRf,
    });
    let cont_array = [];
    cont_array.push(vehicle?.container_type_value_id);
    setContainer(cont_array)
    setVehicleDetails({
      ...vehicleDetails,
      truck_id: vehicle?.vehicle_id,
    });
    if (selectVehicle?.vehicle_type === "Truck Trailer") {
      setVehicleDetails({ ...vehicleDetails, trailer_id: null });
    }
    setAxleType(vehicle.vehicle_axle_type);
  };


  addVehicleOffer = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');
    setState({ ...state, isLoading: true });
    let online_details = JSON.stringify({
      customer_id: customer_id,
      api_key: api_key,
        user_id: user_id,
        truck_id: vehicleDetails?.truck_id,
        trailer_id: Number(vehicleDetails?.trailer_id)
          ? Number(vehicleDetails?.trailer_id)
          : "",
          driver_id: vehicleDetails?.driver_id,
          reference_no: offerInfo?.modalRf,
          bid_id: offerInfo?.bid_id,
          vehicle_container_id: container,
          trailer_vehicle_container_id: trailerContainer,
          cargo_type: offerInfo?.modalCargo,        
        });
        
        console.log(online_details);
      postMultipartWithAuthCallWithErrorResponse(
        ApiConfig.ADD_ONLINE_VEHICLEOFFER,
        online_details
      )
        .then((res) => {
          if (res.json.message === 
            "Invalid user authentication,Please try to relogin with exact credentials.") {
              setState({ ...state, isLoading: false });
          }
          if (res.json.message === "An internal server error occurred.") {
            setState({ ...state, isLoading: false });
            toastWithDurationHandler("An internal server error occurred. Please Try again!");
          }
          if (res.json.message === "Vehicle offer added") {
            setState({ ...state, isLoading: false });
            successWithDurationHandler("Vehicle offer added Successfully, Abay Logistics Will Contact you soon. Thank you!");
            navigation.navigate('OnlineOfferLoad');
          } else {
            setState({ ...state, isLoading: false });
            toastWithDurationHandler("Please Try again!");
          }
          console.log(res);
        })
        .catch((err) => console.log(err));
    
  };


  

  return (
    <ScrollView style={{ backgroundColor: 'rgba(27, 155, 230, 0.1)' }}>
      <StatusBar barStyle="white-content" hidden={false} {...appPageStyle.primaryColor} translucent={true} />
      <SafeAreaView style={styles.container}>
        {!state.checkInternet && (
          <SnackBar visible={true} textMessage="No Internet Connection!" actionHandler={() => { this._checkConnection() }} actionText="Try Again" />
        )}
        <Text style={styles.HeaderText}>Reference Number - Cargo Type</Text>
        <View
          style={[
            {
              flexDirection: 'row',
              width: '95%',
              gap: 4,
              backgroundColor: '#fff',
            },
          ]}>
          <View style={{ ...styles.inputView, width: '50%', }}>
            <TextInput
              style={styles.TextInput}
              placeholder="Reference Number"
              placeholderTextColor="#19788e"
              value={offerInfo.modalRf}
              editable={false} 
              selectTextOnFocus={false}
            />
          </View>
          <View style={{ ...styles.inputView, width: '50%', }}>
            <TextInput
              style={styles.TextInput}
              placeholder="Model"
              placeholderTextColor="#19788e"
              value={offerInfo.modalCargo}
              editable={false} 
              selectTextOnFocus={false}
            />
          </View>
        </View>

        <Text style={styles.HeaderText}>Vehicle Type</Text>
        
        <SelectDropdown
          data={vehicleList}
          onSelect={(vehicleList, index) => {
            setVehicleNameValue(vehicleList.vehicle_name_value);
            setSelectedVehicleType(vehicleList.vehicle_name_value);
            setVehicleDetails({ ...vehicleList, vehicle_name: vehicleList.vehicle_name_id });
            getPowerPlateNoList(vehicleList.vehicle_name_id);
          }}
          value={vehicleList.vehicle_name}
          renderButton={(vehicleList, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(vehicleList && vehicleList.vehicle_name_value) || 'Select Vehicle Type'}
                </Text>
                <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(vehicleList, index, isSelected) => {
            return (
              <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                <Text style={styles.dropdownItemTxtStyle}>{vehicleList.vehicle_name_value}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        {errMsg.company_name && errMsg.company_name.length > 0 && (
          <Text style={{ color: '#FF5151' }}>{errMsg.company_name}</Text>
        )}
        
        <Text style={styles.HeaderText}>Plate Number</Text>
        
        <SelectDropdown
          data={plateNoList}
          onSelect={(plateNoList, index) => {
            setErrMsg({ ...errMsg, plate_number: "" });
            setCurrentPlateNo(plateNoList.vehicle_id);
          }}
          
          value={plateNoList.plate_number}
          renderButton={(plateNoList, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(plateNoList && plateNoList.plate_number) || 'Select Vehicle Plate'}
                </Text>
                <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(plateNoList, index, isSelected) => {
            return (
              <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                <Text style={styles.dropdownItemTxtStyle}>{plateNoList.plate_number}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />

        
        {vehicleList.vehicle_name && 
        (vehicleList.vehicle_name===4) ?
          <>
            <Text style={styles.HeaderText}>Trailer Vehicle Type</Text>
            <SelectDropdown
              data={vehicleType}
              onSelect={(vehicleType, index) => {
                setErrMsg({ ...errMsg, vehicle_type: "" });
                setVehicleDetails({ ...vehicleList, vehicle_type: vehicleType.vehicle_name_id })
              }}
              value={vehicleList.vehicle_type}
              renderButton={(vehicleType, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(vehicleType && vehicleType.vehicle_name_value) || 'Select Trailer Vehicle Type'}
                    </Text>
                    <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                  </View>
                );
              }}
              renderItem={(vehicleType, index, isSelected) => {

                return (
                  <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                    <Text style={styles.dropdownItemTxtStyle}>
                      {vehicleType.vehicle_name_value} {' '}
                      {(
                        vehicleType.vehicle_name_value !== "Trailer"
                        && vehicleType.vehicle_name_value !== "Power"
                        && vehicleType.vehicle_name_id !== 6) ?
                        " Power" : ""}
                    </Text>
                  </View>
                );

              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          </>
        :
          ""
        }


{selectedVehicleType && ( selectedVehicleType !== "High Bed" ? (
                    <></>
                  ) : 
        <>
          <Text style={styles.HeaderText}>Vehicle Axle</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Chassis Number"
              placeholderTextColor="#19788e"
              onChangeText={(text) => {
                setErrMsg({ ...errMsg, contact_person: "" });
                setVehicleDetails({ ...vehicleList, chassis_no: text })
              }
              }
              value={
                selectVehicle.vehicle_axle_type
                  ? selectVehicle.vehicle_axle_type
                  : ""
              }
            />
          </View>
        </>
)}


        <Text style={styles.HeaderText}>Chassis Number</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Chassis Number"
            placeholderTextColor="#19788e"
            onChangeText={(text) => {
              setErrMsg({ ...errMsg, contact_person: "" });
              setVehicleDetails({ ...vehicleList, chassis_no: text })
            }
            }
            value={
              selectVehicle.vehicle_chassis_no
                ? selectVehicle.vehicle_chassis_no
                : ""
            }
          />
        </View>
        {errMsg.contact_person && errMsg.contact_person.length > 0 && (
          <Text style={{ color: '#FF5151' }}>{errMsg.contact_person}</Text>
        )}
        <Text style={styles.HeaderText}>Gross Weight</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Gross Weight"
            placeholderTextColor="#19788e"
            onChangeText={(text) => {
              setErrMsg({ ...errMsg, contact_person_responsibility: "" });
              setVehicleDetails({ ...vehicleList, gross_weight: text })
            }
            }
            value={
              selectVehicle.vehicle_gross_weight
                ? selectVehicle.vehicle_gross_weight
                : ""
            }
          />
        </View>
        
        <Text style={styles.HeaderText}>Current km</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Current km"
            placeholderTextColor="#19788e"
            onChangeText={(text) => {
              setErrMsg({ ...errMsg, contact_person_responsibility: "" });
              setVehicleDetails({ ...vehicleList, gross_weight: text })
            }
            }
            value={
              selectVehicle.vehicle_initial_km
                ? selectVehicle.vehicle_initial_km
                : ""
            }
          />
        </View>

        <Text style={styles.HeaderText}>Model - Year of Manufacture</Text>
        <View
          style={[
            {
              flexDirection: 'row',
              width: '95%',
              gap: 4,
              backgroundColor: '#fff',
            },
          ]}>
          <View style={{ ...styles.inputView, width: '50%', }}>
            <TextInput
              style={styles.TextInput}
              placeholder="Model"
              placeholderTextColor="#19788e"
              inputMode="numeric"
              maxLength={10}
              
              value={
                selectVehicle.vehicle_model_no
                  ? selectVehicle.vehicle_model_no
                  : ""
              }
            />
          </View>

          <View style={{ ...styles.inputView, width: '50%', }}>
            <TextInput
              style={styles.TextInput}
              placeholder="Year of Manufacture"
              placeholderTextColor="#19788e"
              onChangeText={(year_manufacture) => {
                setErrMsg({ ...errMsg, contact_person_email: "" });
                setVehicleDetails({ ...vehicleList, year_manufacture: year_manufacture })
              }
              }
              value={
                selectVehicle.year_manufacture
                  ? selectVehicle.year_manufacture
                  : ""
              }
            />
          </View>
        </View>
        <View
          style={[
            {

              width: '95%',
              gap: 4,
              backgroundColor: '#fff',
            },
          ]}>
        {vehicleList && vehicleList.vehicle_name != 4 && (
          <>
          <Text style={styles.HeaderText}>Motor Number</Text>
          <View style={{ ...styles.inputView, width: '100%', }}>
            <TextInput
              style={styles.TextInput}
              placeholder="Motor Number"
              placeholderTextColor="#19788e"
              onChangeText={(motor_no) => {
                setErrMsg({ ...errMsg, motor_no: "" });
                setVehicleDetails({ ...vehicleList, motor_no: motor_no })
              }
              }
              value={
                selectVehicle.vehicle_motor_no
                  ? selectVehicle.vehicle_motor_no
                  : ""
              }
            />
          </View>
          </>
          
        )}
        </View>

        {selectedVehicleType && vehicleNameValue !== "Power" ? (
          <>
          <Text style={styles.HeaderText}>Trailer Plate Number</Text>
        
          <SelectDropdown
            data={trailerList}
            onSelect={(trailerList, index) => {
              setErrMsg({ ...errMsg, plate_number: "" });
              setCurrenttrailer(trailerList.vehicle_id);
            }}
            
            value={trailerList.plate_number}
            renderButton={(trailerList, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(trailerList && trailerList.plate_number) || 'Select Vehicle Plate'}
                  </Text>
                  <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(trailerList, index, isSelected) => {
              return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                  <Text style={styles.dropdownItemTxtStyle}>{trailerList.plate_number}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />

          <Text style={styles.HeaderText}>Required Cargo Type</Text>
          <View style={{ ...styles.inputView }}>
            <TextInput
                  style={styles.TextInput}
                  placeholder="Vehicle Type"
                  placeholderTextColor="#19788e"
                  value={offerInfo.modalCargo}
                  editable={false} 
                  selectTextOnFocus={false}
                />
          </View>
          <Text style={styles.HeaderText}>Container</Text>
          <View style={{ ...styles.inputView }}>
            <TextInput
                  style={styles.TextInput}
                  placeholder="Vehicle Type"
                  placeholderTextColor="#19788e"
                  value={selectVehicle?.container_type_value
                    ? selectVehicle?.container_type_value
                    : ""}
                  editable={false} 
                  selectTextOnFocus={false}
                />
          </View>
          
          <Text style={styles.HeaderText}>Vehicle Type       /        Chassis Number</Text>
          
          <View
            style={[
              {
                flexDirection: 'row',
                width: '95%',
                gap: 4,
                backgroundColor: '#fff',
              },
            ]}>
            <View style={{ ...styles.inputView, width: '50%', }}>
              <TextInput
                style={styles.TextInput}
                placeholder="Vehicle Type"
                placeholderTextColor="#19788e"
                value={selectedtrailer?.vehicle_type
                  ? selectedtrailer?.vehicle_type
                  : ""}
                editable={false} 
                selectTextOnFocus={false}
              />
            </View>
            <View style={{ ...styles.inputView, width: '50%', }}>
              <TextInput
                style={styles.TextInput}
                placeholder="Chassis Number"
                placeholderTextColor="#19788e"
                value={selectedtrailer?.vehicle_chassis_no
                  ? selectedtrailer?.vehicle_chassis_no
                  : ""}
                editable={false} 
                selectTextOnFocus={false}
              />
            </View>
          </View>

          <Text style={styles.HeaderText}>Gross Weight       /       Vehicle Load Capacity Quintals</Text>
          <View
            style={[
              {
                flexDirection: 'row',
                width: '95%',
                gap: 4,
                backgroundColor: '#fff',
              },
            ]}>
            <View style={{ ...styles.inputView, width: '50%', }}>
              <TextInput
                style={styles.TextInput}
                placeholder="Vehicle Type"
                placeholderTextColor="#19788e"
                value={selectedtrailer?.vehicle_gross_weight
                  ? selectedtrailer?.vehicle_gross_weight
                  : ""}
                editable={false} 
                selectTextOnFocus={false}
              />
            </View>
            <View style={{ ...styles.inputView, width: '50%', }}>
              <Text style={styles.TextInput}>
                {selectedtrailer?.vehicle_capacity
                  ? selectedtrailer?.vehicle_capacity
                  : ""}
              </Text>
              
            </View>
          </View>
          </>
        )
        :
        ""
      }

        {vehicleList.vehicle_name && 
          vehicleList.vehicle_name ===3 ||
          ((vehicleList.vehicle_name ===1 ||
          vehicleList.vehicle_name ===3 || 
          vehicleList.vehicle_name === 4) &&
          vehicleList.vehicle_type !== 6) ? 
          <> 

            <Text style={styles.HeaderText}>Vehicle Load Capacity in Quintal</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Vehicle Load Capacity in Quintal"
                placeholderTextColor="#19788e"
                onChangeText={(text) => {
                  setErrMsg({ ...errMsg, vehicle_capacity: "" });
                  setVehicleDetails({ ...vehicleList, vehicle_capacity: text })
                }
                }
              />
            </View>
          </>
          :
        ""}     
        

        
        <Text style={styles.HeaderText}>Select Driver</Text>
        
        <SelectDropdown
          data={driverList}
          onSelect={(driverList, index) => {
            setSelectedDriver(driverList.licence_number);
            setVehicleDetails({ ...vehicleList, driver_id: driverList.driver_id })
          }}
          value={driverList.driver_name}
          renderButton={(driverList, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(driverList && driverList.driver_name) || 'Select Driver'}
                </Text>
                <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(driverList, index, isSelected) => {
            return (
              <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                <Text style={styles.dropdownItemTxtStyle}>{driverList.driver_name}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        <Text style={styles.HeaderText}>Driver's License Number</Text>
        <View style={{ ...styles.inputView }}>
            <TextInput
              style={styles.TextInput}
              placeholder="Driver and Licence Number"
              placeholderTextColor="#19788e"
              editable={false} 
              selectTextOnFocus={false}
              value={selectedDriver}
            />
          </View>


        <TouchableOpacity style={[styles.loginBtn, appPageStyle.primaryColor, appPageStyle.secondaryTextColor]} onPress={() => this.addVehicleOffer()}>
          {!state.isLoading && (
            <Text style={appPageStyle.primaryTextColor}>  Add Offer</Text>
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
    backgroundColor: "rgba(25, 120, 142, 0.2)",
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
    color: '#555'
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
    color: '#19788e',
    fontSize: 13,
    alignSelf: 'flex-start',
    marginLeft: 10,
    padding: 15
  },
  uploadButton: {
    backgroundColor: "#f1f1f1",
    height: 30,
    width: 'auto',
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
    backgroundColor: "rgba(25, 120, 142, 0.2)",
    borderRadius: 10,
    width: '95%',
    height: 45,
    marginBottom: 10,
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
  }
});