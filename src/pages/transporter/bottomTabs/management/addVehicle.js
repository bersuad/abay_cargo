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



export default function NewVehicle() {
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
    setVehicleDetails({ ...vehiclesDetails, insurance_issue_date: FormatDate(date) })
    toHideDatePicker();
    setToSelectedDate(date);
  };

  const fromHandleConfirm = (date) => {
    setVehicleDetails({ ...vehiclesDetails, insurance_expiry_date: FormatDate(date) })
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

  const [vehiclesDetails, setVehicleDetails] = useState({
    vehicle_images: [],
    owner_id: "",
    plate_no: "",
    vehicle_name: "",
    vehicle_axle: "",
    vehicle_type: "",
    vehicle_container_type: "",
    chassis_no: "",
    gross_weight: "",
    initial_km: "",
    model: "",
    insurance_no: "",
    year_manufacture: "",
    motor_no: "",
    vehicle_capacity: "",
    vendor_name: "",
    vendor_contact: "",
    vendor_platform: "",
    vendor_address: "",
    insurance_file: null,
    insurance_issue_date: null,
    insurance_expiry_date: "",
    insurance_company: "",
    insurance_type: "",
    sum_insured: "",
    container_type:"",
    vehicle_axle:"",
  });

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


  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: true,
    });

    if (!result.assets[0].canceled) {

      setSelectedImages((prevImages) => [...prevImages, ...result.assets]);

      setVehicleDetails({ ...vehiclesDetails, vehicle_images: selectedImages });

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
      setVehicleDetails({ ...vehiclesDetails, insurance_file: result.assets[0].uri });
      if (result.assets[0].mimeType) {
        setFileName(result.assets[0].name);

        if (result.assets[0].mimeType === "application/pdf") {
          setPlaceholderImage(PDFIcon.uri);
        } else {
          setPlaceholderImage(result.assets[0].uri);
        }


      } else {
        successWithDurationHandler('Please select PDFs or Images only.');
      }
    }
  };




  _register = async () => {

    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');

    const tn = vehiclesDetails.insurance_file;
    const tn_img = tn.split('/').pop();

    const insurance_file = {
      uri: vehiclesDetails.insurance_file,
      name: tn_img,
      type: vehiclesDetails.insurance_file.endsWith('.pdf')
        ? "application/pdf"
        : vehiclesDetails.insurance_file.endsWith('.png') || vehiclesDetails.insurance_file.endsWith('.jpeg') || vehiclesDetails.insurance_file.endsWith('.jpg')
          ? "image/png"
          : "image/jpeg"
    };
    
    
    
    console.log(vehiclesDetails);

    setState({ ...state, isLoading: true });
    const formData = new FormData();
    formData.append("api_key", api_key);
    formData.append("user_id", user_id);
    formData.append("customer_id", customer_id);
    formData.append("plate_no", vehiclesDetails.plate_no);
    formData.append("chassis_no", vehiclesDetails.chassis_no);
    formData.append("model", vehiclesDetails.model);
    formData.append("year_manufacture", vehiclesDetails.year_manufacture);
    formData.append("motor_no", vehiclesDetails.motor_no);
    formData.append("gross_weight", vehiclesDetails.gross_weight);
    formData.append("initial_km", vehiclesDetails.initial_km);
    formData.append("insurance_no", vehiclesDetails.insurance_no);
    formData.append("capacity", vehiclesDetails.vehicle_capacity);
    formData.append("vehicle_name", vehiclesDetails.vehicle_name);
    formData.append("vehicle_axle", vehiclesDetails.vehicle_axle);
    formData.append("vehicle_container_type", JSON.stringify(containerList));
    formData.append("vehicle_bulk", isBulkChecked);
    formData.append("vehicle_breakBulk", isBreakBulkChecked);
    formData.append("vehicle_type", vehiclesDetails.vehicle_type);
    formData.append("insurance_issue_date", vehiclesDetails.insurance_issue_date);
    formData.append("insurance_expiry_date", vehiclesDetails.insurance_expiry_date);
    formData.append("insurance_company", vehiclesDetails.insurance_company);
    formData.append("insurance_type", vehiclesDetails.insurance_type);
    formData.append("sum_insured", vehiclesDetails.sum_insured);
    formData.append("vendor_name", vehiclesDetails.vendor_name);
    formData.append("vendor_address", vehiclesDetails.vendor_address);
    formData.append("vendor_contact", vehiclesDetails.vendor_contact);
    formData.append("vendor_platform", vehiclesDetails.vendor_platform);
    formData.append("owner_id", user_id);


    formData.append("insurance_file", {
      uri: insurance_file.uri,
      name: insurance_file.name,
      type: insurance_file.type
    });

    // vehiclesDetails.vehicle_images?.map((img) => {
    //   const vProfile = img.uri;
    //   const v_img = vProfile.split('/').pop();

    //   const vechicle_file = {
    //     uri: img.uri,
    //     name: v_img,
    //     type: img.mimeType.endsWith('.pdf')
    //       ? "application/pdf"
    //       : img.mimeType.endsWith('.png') || img.mimeType.endsWith('.jpeg') || img.mimeType.endsWith('.jpg')
    //         ? "image/png"
    //         : "image/jpeg"
    //   };


    // });

    formData.append("vehicle_images[]", {
      uri: insurance_file.uri,
      name: insurance_file.name,
      type: insurance_file.type
    });

    console.log(formData);
    multipartPostCallWithErrorResponse(
      ApiConfig.AddVehicle, formData
    ).then((res) => {
      console.log(res);
      if (res.json.message === "An internal server error occurred.") {
        setState({ ...state, isLoading: false });
        toastWithDurationHandler("An internal server error occurred. Please Try again!");
      }

      if (res.json.result == true) {
        setTimeout(function () {
          successWithDurationHandler('Registered Successfully, Abay Logistics Will Contact you soon! Thank you.');
          navigation.navigate('transporterVehiclesSearch');
        }, 5000);
      }

      if (res.json.message === "Transporter details added successfully") {
        setState({ ...state, isLoading: false });
        successWithDurationHandler("Registered Successfully, Abay Logistics Will Contact you soon! Thank you.");
        navigation.navigate('');
      } else {
        toastWithDurationHandler("An internal server error occurred. Please Try again!");
      }

    }).catch((error) => {
      console.log(error);
    });


  }

  return (
    <ScrollView style={{ backgroundColor: 'rgba(27, 155, 230, 0.1)' }}>
      <StatusBar barStyle="white-content" hidden={false} {...appPageStyle.primaryColor} translucent={true} />
      <SafeAreaView style={styles.container}>
        {!state.checkInternet && (
          <SnackBar visible={true} textMessage="No Internet Connection!" actionHandler={() => { this._checkConnection() }} actionText="Try Again" />
        )}
        <ScrollView horizontal style={{ marginTop: 20 }}>
          {selectedImages.length === 0 ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            selectedImages.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage(image.uri)}
                >
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
                <Image
                  source={{ uri: image.uri }}
                  style={styles.image}
                />
              </View>
            ))
          )}
        </ScrollView>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={{ ...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor }}> <Ionicons name="camera" size={18} color={appPageStyle.secondaryTextColor} /> Upload Vehicle Images</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, padding: 20 }}>
          {/* <Button title="Select Images" onPress={pickImage} /> */}

        </View>
        <Text style={styles.HeaderText}>Plate Number </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Plate Number"
            placeholderTextColor="#19788e"
            value={vehiclesDetails.plate_no}
            onChangeText={(text) => {
              setErrMsg({ ...errMsg, plate_no: "" });
              setVehicleDetails({ ...vehiclesDetails, plate_no: text })
            }
            }
          />
          {errMsg.company_type && errMsg.company_type.length > 0 && (
            <Text style={{ color: '#FF5151' }}>{errMsg.company_type}</Text>
          )}
        </View>

        <Text style={styles.HeaderText}>Vehicle Type</Text>
        <SelectDropdown
          data={vehicleType}
          onSelect={(vehicleType, index) => {
            setErrMsg({ ...errMsg, vehicle_name: "" });
            setVehicleDetails({ ...vehiclesDetails, vehicle_name: vehicleType.vehicle_name_id })
          }}
          value={vehiclesDetails.vehicle_name}
          renderButton={(vehicleType, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(vehicleType && vehicleType.vehicle_name_value) || 'Select Vehicle Type'}
                </Text>
                <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(vehicleType, index, isSelected) => {
            return (
              <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                <Text style={styles.dropdownItemTxtStyle}>{vehicleType.vehicle_name_value}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        {errMsg.company_name && errMsg.company_name.length > 0 && (
          <Text style={{ color: '#FF5151' }}>{errMsg.company_name}</Text>
        )}

        {vehiclesDetails.vehicle_name && 
        (vehiclesDetails.vehicle_name===4) ?
          <>
            <Text style={styles.HeaderText}>Trailer Vehicle Type</Text>
            <SelectDropdown
              data={vehicleType}
              onSelect={(vehicleType, index) => {
                setErrMsg({ ...errMsg, vehicle_type: "" });
                setVehicleDetails({ ...vehiclesDetails, vehicle_type: vehicleType.vehicle_name_id })
              }}
              value={vehiclesDetails.vehicle_type}
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


{vehiclesDetails.vehicle_name && 
        (vehiclesDetails.vehicle_name===5 ||
        (vehiclesDetails.vehicle_name===4 &&
        vehiclesDetails.vehicle_type===5)) ?
        <>
          <Text style={styles.HeaderText}>Vehicle Axle</Text>
          <SelectDropdown
            data={vehicleAxle}
            onSelect={(vehicleAxle, index) => {
              setErrMsg({ ...errMsg, vehicle_axle: "" });
              setVehicleDetails({ ...vehiclesDetails, vehicle_axle: vehicleAxle.vehicle_axle_id })
            }}
            value={vehiclesDetails.vehicleAxle}
            renderButton={(vehicleAxle, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(vehicleAxle && vehicleAxle.vehicle_axle_type) || 'Select Vehicle Axle'}
                  </Text>
                  <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(vehicleAxle, index, isSelected) => {

              return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                  <Text style={styles.dropdownItemTxtStyle}>
                    {vehicleAxle.vehicle_axle_type} {' '}
                  </Text>
                </View>
              );

            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </>
      :""}


        <Text style={styles.HeaderText}>Chassis Number</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Chassis Number"
            placeholderTextColor="#19788e"
            onChangeText={(text) => {
              setErrMsg({ ...errMsg, contact_person: "" });
              setVehicleDetails({ ...vehiclesDetails, chassis_no: text })
            }
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
              setVehicleDetails({ ...vehiclesDetails, gross_weight: text })
            }
            }
          />
        </View>

        <Text style={styles.HeaderText}>Vehicle Info</Text>
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
              onChangeText={(text) => {
                setErrMsg({ ...errMsg, contact_person_phone: "" });
                setVehicleDetails({ ...vehiclesDetails, model: text })
              }
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
                setVehicleDetails({ ...vehiclesDetails, year_manufacture: year_manufacture })
              }
              }
            />
          </View>
        </View>
        <View
          style={[
            {
              flexDirection: 'row',
              width: '95%',
              gap: 4,
              backgroundColor: '#fff',
            },
          ]}>
        {vehiclesDetails && vehiclesDetails.vehicle_name != 4 && (
          <>
          <View style={{ ...styles.inputView, width: '50%', }}>
            <TextInput
              style={styles.TextInput}
              placeholder="Initial Km"
              placeholderTextColor="#19788e"
              onChangeText={(initial_km) => {
                setErrMsg({ ...errMsg, initial_km: "" });
                setVehicleDetails({ ...vehiclesDetails, initial_km: initial_km })
              }
              }
            />
            
          </View>
          <View style={{ ...styles.inputView, width: '50%', }}>
            <TextInput
              style={styles.TextInput}
              placeholder="Motor Number"
              placeholderTextColor="#19788e"
              onChangeText={(motor_no) => {
                setErrMsg({ ...errMsg, motor_no: "" });
                setVehicleDetails({ ...vehiclesDetails, motor_no: motor_no })
              }
              }
            />
          </View>
          </>
          
        )}
        </View>

        {vehiclesDetails.vehicle_name && 
          vehiclesDetails.vehicle_name ===3 ||
          ((vehiclesDetails.vehicle_name ===1 ||
          vehiclesDetails.vehicle_name ===3 || 
          vehiclesDetails.vehicle_name === 4) &&
          vehiclesDetails.vehicle_type !== 6) ? 
          <> 

            <Text style={styles.HeaderText}>Vehicle Load Capacity in Quintal</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Vehicle Load Capacity in Quintal"
                placeholderTextColor="#19788e"
                onChangeText={(text) => {
                  setErrMsg({ ...errMsg, vehicle_capacity: "" });
                  setVehicleDetails({ ...vehiclesDetails, vehicle_capacity: text })
                }
                }
              />
            </View>
          </>
          :
        ""}

        {vehiclesDetails && (vehiclesDetails.vehicle_name === 4 &&
        (vehiclesDetails.vehicle_type=== 2)
        )
        ?
        <>
          <Text style={styles.HeaderText}>Container</Text>
          <Text style={{...styles.HeaderText, paddingTop: 0}}>
            {console.log(containerList)}
            {
            containerList.map((name, index) => (
              <View key={index} style={styles.selectedContainer}>
                <TouchableOpacity
                  style={styles.removeContainer}
                  onPress={() => removeContainer(name.value)}
                >
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
                <Text>{name.label}</Text>
              </View>
            ))
          }</Text>
          <SelectDropdown
            data={vehicleContainer}
            onSelect={(vehicleContainer, index) => {
              setErrMsg({ ...errMsg, container_type: "" });
              const newContainerType = [
                { label: vehicleContainer.container_type_name, value: vehicleContainer.container_type_id },
              ];
          
              setSelectedContainers((containerList) => [...containerList, ...newContainerType]);
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
          :""
        }
        {vehiclesDetails && vehiclesDetails.vehicle_name === 1 ||
                      (vehiclesDetails.vehicle_type=== 1 &&
                          vehiclesDetails.vehicle_name===4) ||
                      (vehiclesDetails.vehicle_type===3 &&
                          vehiclesDetails.vehicle_name===4) ||
                          ((vehiclesDetails.vehicle_name===3) ||
                      (vehiclesDetails.vehicle_name === 4 &&
                          ((vehiclesDetails.vehicle_type===5 
                          && vehiclesDetails.vehicle_axle===2) ||
                          (vehiclesDetails.vehicle_type===5 
                          && vehiclesDetails.vehicle_axle===1) ||
                          (vehiclesDetails.vehicle_type===2))
                          )) ?
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={isBreakBulkChecked}
            onValueChange={setBreakBulkChecked}
            color={isBreakBulkChecked ? '#19788e' : undefined}
          />
          <Text style={styles.paragraph}>Break Bulk</Text>
        </View>
        :""
        }
        
        {vehiclesDetails.vehicle_name===1 || (vehiclesDetails.vehicle_type===1 && vehiclesDetails.vehicle_name===4) ||
            (vehiclesDetails.vehicle_type===3 && vehiclesDetails.vehicle_name===4) || 
            (vehiclesDetails.vehicle_name===3) || (vehiclesDetails.vehicle_name ===4 && 
              (vehiclesDetails.vehicle_type===5 && vehiclesDetails.vehicle_axle===2)) 
          ?
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isBulkChecked}
              onValueChange={setBulkChecked}
              color={isBulkChecked ? '#19788e' : undefined}
            />
            <Text style={styles.paragraph}>Bulk</Text>
          </View>
          : ""
        }

        <Text style={styles.HeaderText}>GPS Availability</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Vendor Name"
            placeholderTextColor="#19788e"
            onChangeText={(text) => {
              setErrMsg({ ...errMsg, vendor_name: "" });
              setVehicleDetails({ ...vehiclesDetails, vendor_name: text })
            }
            }
          />
        </View>
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
              placeholder="Vendor Contact"
              placeholderTextColor="#19788e"
              onChangeText={(vendor_contact) => {
                setErrMsg({ ...errMsg, vendor_contact: "" });
                setVehicleDetails({ ...vehiclesDetails, vendor_contact: vendor_contact })
              }
              }
            />
          </View>
          <View style={{ ...styles.inputView, width: '50%', }}>
            <TextInput
              style={styles.TextInput}
              placeholder="Vendor Platform"
              placeholderTextColor="#19788e"
              onChangeText={(vendor_platform) => {
                setErrMsg({ ...errMsg, vendor_platform: "" });
                setVehicleDetails({ ...vehiclesDetails, vendor_platform: vendor_platform })
              }
              }
            />
          </View>
        </View>

        <Text style={styles.HeaderText}>Vendor Address</Text>
        <View style={{ ...styles.inputView, height: 120, marginTop: 10 }}>
          <TextInput
            style={{ ...styles.TextInput, height: 120, textAlignVertical: 'top' }}
            multiline={true}
            numberOfLines={10}
            placeholder="Vendor Address "
            placeholderTextColor="#19788e"
            onChangeText={(vendor_address) => {
              setErrMsg({ ...errMsg, vendor_address: "" });
              setVehicleDetails({ ...vehiclesDetails, vendor_address: vendor_address })
            }
            }
          />
        </View>

        {/* add conditional inputs here */}

        <Text style={styles.HeaderText}>Vehicles Documents</Text>
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
              placeholder="Insurance No"
              placeholderTextColor="#19788e"
              inputMode="numeric"
              onChangeText={(insurance_no) => {
                setErrMsg({ ...errMsg, insurance_no: "" });
                setVehicleDetails({ ...vehiclesDetails, insurance_no: insurance_no })
              }
              }
            />
          </View>

          <View style={{ ...styles.inputView, width: '50%', }}>
            <TextInput
              style={styles.TextInput}
              placeholder="Insurance Company"
              placeholderTextColor="#19788e"
              maxLength={4}
              onChangeText={(insurance_company) => {
                setErrMsg({ ...errMsg, insurance_company: "" });
                setVehicleDetails({ ...vehiclesDetails, insurance_company: insurance_company })
              }
              }
            />
          </View>
        </View>
        <Text style={styles.HeaderText}>Insurance Issue Date</Text>
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
        <Text style={styles.HeaderText}>Insurance Expiry Date</Text>
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

        <Text style={styles.HeaderText}>Type of Insurance</Text>
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
              setVehicleDetails({ ...vehiclesDetails, insurance_type: insuranceType.vehicle_insurance_type_value })
            }}
            value={vehiclesDetails.insurance_type}
            renderButton={(insuranceType, isOpened) => {
              return (
                <View style={{ ...styles.dropdownButtonStyle, width: '50%', }}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(insuranceType && insuranceType.vehicle_insurance_type_value) || 'Select Insurance Type'}
                  </Text>
                  <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(insuranceType, index, isSelected) => {
              return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                  <Text style={styles.dropdownItemTxtStyle}>{insuranceType.vehicle_insurance_type_value}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />


          <View style={{ ...styles.inputView, width: '50%', }}>
            <TextInput
              style={styles.TextInput}
              placeholder="Sum Insured"
              placeholderTextColor="#19788e"
              onChangeText={(text) => {
                setErrMsg({ ...errMsg, sum_insured: "" });
                setVehicleDetails({ ...vehiclesDetails, sum_insured: text })
              }
              }
            />
          </View>
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
          <View style={{ ...styles.iconArea, height: 60, width: "50%", marginLeft: 20 }}>
            <Text style={{ alignSelf: 'left', fontWeight: 500, fontSize: 14, marginTop: 15 }}>Upload Insurance</Text>
            <View style={{ marginLeft: -10, marginTop: 10 }}>
              {placeholderImage && <Image style={{ ...styles.cardImage, borderRadius: 10, height: 100, width: 100 }} source={{ uri: placeholderImage }} />}
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage2}>
                <Text style={{ ...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor }}> <Ionicons name="camera" size={18} color={appPageStyle.secondaryTextColor} /> {fileName ? <Text>{fileName}</Text> : "Upload"}</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>


        <TouchableOpacity style={[styles.loginBtn, appPageStyle.primaryColor, appPageStyle.secondaryTextColor]} onPress={() => this._register()}>
          {!state.isLoading && (
            <Text style={appPageStyle.primaryTextColor}> Continue <Ionicons name="add-outline" size={15} /></Text>
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