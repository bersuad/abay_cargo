import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImagePicker,
  SafeAreaView,
  useNavigation,
  //image
  Logo,
  fileIcon,
  //Icons
  Ionicons,
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
  AsyncStorage
} from "./../../../../components/index.js";
import SelectDropdown from 'react-native-select-dropdown';
import * as DocumentPicker from 'expo-document-picker';
import SnackBar from 'react-native-snackbar-component';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { value } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes.js';


export default function AddNewDriver() {
  const navigation = useNavigation();

  
  const DEFAULT_IMAGE = Image.resolveAssetSource(Logo).uri;
  const [image, setImage] = useState(DEFAULT_IMAGE);
  const [companyTypes, setCompanyTyes] = useState([]);
  const SECOND_DEFAULT_IMAGE = Image.resolveAssetSource(placeholder).uri;
  const [placeholderImage, setPlaceholderImage] = useState(SECOND_DEFAULT_IMAGE);
  const [secondPlaceholderImage, setSecondPlaceholderImage] = useState(SECOND_DEFAULT_IMAGE);
  const [thirdPlaceholderImage, setThirdPlaceholderImage] = useState(SECOND_DEFAULT_IMAGE);
  const [fileName, setFileName] = useState('');

  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
  const [isIssueDatePickerVisible, setIssueDatePickerVisibility] = useState(false);
  const [isExpireDatePickerVisible, setExpireDatePickerVisibility] = useState(false);
  const [fromSelectedDate, setFromSelectedDate] = useState(null);
  const [issueSelectedDate, setIssueSelectedDate] = useState(null);
  const [expireSelectedDate, setExpireSelectedDate] = useState(null);
  const File_DEFAULT_IMAGE = Image.resolveAssetSource(fileIcon).uri;
  const [fileImage, setFileImage] = useState(File_DEFAULT_IMAGE);

  const fromHandleConfirm = (date) => {
    setDriverDetails({ ...driverDetails, driver_dob: FormatDate(date)})
    fromHideDatePicker();
    setFromSelectedDate(date);
  };

  const fromShowDatePicker = () => {
    setFromDatePickerVisibility(true);
  };

  const fromHideDatePicker = () => {
    setFromDatePickerVisibility(false);
  };

  const issueHandleConfirm = (date) => {
    setDriverDetails({ ...driverDetails, license_issue_date: FormatDate(date)})
    issueHideDatePicker();
    setIssueSelectedDate(date);
  };

  const issueShowDatePicker = () => {
    setIssueDatePickerVisibility(true);
  };

  const issueHideDatePicker = () => {
    setIssueDatePickerVisibility(false);
  };

  const expireHandleConfirm = (date) => {
    setDriverDetails({ ...driverDetails, license_expiry_date: FormatDate(date)})
    expireHideDatePicker();
    setExpireSelectedDate(date);
  };

  const expireShowDatePicker = () => {
    setExpireDatePickerVisibility(true);
  };

  const expireHideDatePicker = () => {
    setExpireDatePickerVisibility(false);
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

  const [state, setState] = useState({
    device_token: "",
    device_id: "",
    app_version: "",
    app_type: "transporter",
    device_os: "web",
    isLoading: false,
    inputFormat: true,
    checkInternet:true,
  });

  const getCompanyTypes = async () => {
    
    postWithAuthCallWithErrorResponse(
      ApiConfig.COMPANY_TYPE_DROPDOWN,
    )
      .then((res) => {
        if (res.json.message === 
          "Invalid user authentication,Please try to relogin with exact credentials.") {
            navigation.navigate('Registration')
        }
        if (res.json.result) {
          setCompanyTyes(res.json.company_type);
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };
  useEffect(() => {
    getCompanyTypes();

    return () => {};
  }, []);
  

  const pickImage = async () => {
    
  
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //All can be added for all type of media
      allowsEditing: true,
      aspect: [7, 6],
      quality: 1,
    });
    

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setDriverDetails({ ...driverDetails, profile_picture: result.assets[0].uri});
    }
  };
  
  const pickImage2 = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'],
    });
  
    if (result.assets[0].mimeType) {
      setDriverDetails({ ...driverDetails, license_file: result.assets[0].uri});
      if (!result.assets[0].canceled) {
        if (result.assets[0].mimeType === "application/pdf") {
          setFileName(result.assets[0].name);
          setPlaceholderImage(fileImage);
        } else {
          setPlaceholderImage(result.assets[0].uri);
        }
      } else {
        successWithDurationHandler('Please select PDFs or Images only.');
      }
    }
  };


    const companyType = [
        {title: 'Association',},
        {title: 'S.Co',},
        {title: 'PLC',},
    ];

    const genderList = [
      {title: 'Male', value: 'M'},
      {title: 'Female', value: 'F'},
    ];

    const regionList = [
        {title: 'Addis Ababa',},
        {title: 'Afar',},
        {title: 'Amhara',},
        {title: 'Benshangul Gumuz',},
        {title: 'Dire Dawa',},
        {title: 'Gambella',},
        {title: 'Harari',},
        {title: 'Oromia',},
        {title: 'Sidama',},
        {title: 'Somali',},
        {title: 'South West Ethiopian People',},
        {title: 'Southern Nation, Nationalities And People',},
        {title: 'Tigiray',},
    ];

    const toastWithDurationHandler = (message) => {
    
        let toast = Toast.show(message, {
            duration: Toast.durations.LONG,
            backgroundColor: 'red',
            animation: true,
        });

    };

    const [driverDetails, setDriverDetails] = useState({
      profile_picture: { uri:  image},
      driver_name: "",
      driver_email: "",
      driver_phone_no: "",
      driver_region: "",
      driver_zone: "",
      driver_woreda: "",
      driver_house_no: " ",
      driver_po_number: " ",
      driver_country: " ",
      driver_dob: "",
      driver_gender: "",
      license_file: "",
      license_grade: "",
      license_issue_date: "",
      license_no: "",
      license_expiry_date: "",
      owner_id: " ",
      driver_city: " ",
      // password: "",
    });

    const [errMsg, setErrMsg] = useState({
        profile_picture: { uri:  image},
        driver_name: "",
        driver_email: "",
        driver_phone_no: "",
        driver_region: "",
        driver_zone: "",
        driver_woreda: "",
        driver_house_no: " ",
        driver_po_number: "",
        driver_country: "",
        driver_dob: "",
        driver_gender: "",
        license_file: "",
        license_grade: "",
        license_issue_date: "",
        license_no: "",
        license_expiry_date: "",
        owner_id: "",
        driver_city: "",
    });

    const findEmptyFields = () => {
      setState({ ...state, isLoading: true });    
      for (const key in driverDetails) {
        const value = driverDetails[key];
        if (typeof value === 'object' && value?.uri !== undefined || value?.uri === null ) {
          if (!value.uri) {
            toastWithDurationHandler("Please Add Image!");
            setState({ ...state, isLoading: false }); 
            return;
          }
        }else if (key == "driver_house_no" || key == "driver_po_number"){
          continue;
        }else if(value === "" || value === null || value === undefined) {
          toastWithDurationHandler("Please check your "+key+" !");
          setState({ ...state, isLoading: false }); 
          return;
        }
        
      }
      _register();
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

  

  _register = async () =>{
    const formData = new FormData();
    
    const user_id = await AsyncStorage.getItem('user_id');
    const customer_id = await AsyncStorage.getItem('customer_id');
    const api_key = await AsyncStorage.getItem('api_key');
    
    const uri  = driverDetails.profile_picture ? driverDetails?.profile_picture : "";    
    
    const tn  = driverDetails.license_file;
    const tn_img = tn.split('/').pop();
    
    if(uri.uri){     
      formData.append("profile_picture", " ");
    }else{
      const filename = uri.split('/').pop();
      const profileImage = { uri: driverDetails.profile_picture, name: filename, type: 'image/jpeg'};
      formData.append("profile_picture", profileImage);
    } 

    const licenseFile = {
      uri: driverDetails.license_file, 
      name: tn_img, 
      type: driverDetails.license_file.endsWith('.pdf') 
        ? "application/pdf" 
        : driverDetails.license_file.endsWith('.png') || driverDetails.license_file.endsWith('.jpeg') || driverDetails.license_file.endsWith('.jpg')
        ? "image/png" 
        : "image/jpeg"
    };
    formData.append("api_key", api_key);
    formData.append("user_id", user_id);
    formData.append("customer_id", customer_id);
    formData.append("driver_name", driverDetails.driver_name);
    formData.append("driver_email", driverDetails.driver_email);
    formData.append("driver_phone_no", driverDetails.driver_phone_no);
    formData.append("driver_gender", driverDetails.driver_gender);
    formData.append("owner_id", user_id);
    formData.append("driver_city", driverDetails.driver_region);
    formData.append("driver_country", driverDetails.driver_country ? driverDetails.driver_country : "Ethiopia");
    formData.append("driver_dob", driverDetails.driver_dob);
    formData.append("license_no", driverDetails.license_no);
    formData.append("license_grade", driverDetails.license_grade);
    formData.append("license_issue_date", driverDetails.license_issue_date);
    formData.append("license_expiry_date", driverDetails.license_expiry_date);
    formData.append("driver_zone", driverDetails.driver_zone);
    formData.append("driver_region", driverDetails.driver_region);
    formData.append("driver_woreda", driverDetails.driver_woreda);
    formData.append("driver_house_no", driverDetails.driver_house_no);
    formData.append("driver_po_number", driverDetails.driver_po_number);
    
    
    formData.append("license_file", {
      uri: licenseFile.uri,
      name: licenseFile.name,
      type: licenseFile.type
    });

    // setState({ ...state, isLoading: true});    
    multipartPostCallWithErrorResponse(
      ApiConfig.ADD_DRIVER,
      formData
    ).then((res) => {
      if (res.json.message === "Invalid user authentication,Please try to relogin with exact credentials.") {
        navigation.navigate('TruckLogin');
        setState({ ...state, isLoading: false});  
        AsyncStorage.clear();
      }
      
      if (res.json.message === "Same email id or mobile number exists for another user") {
        setState({ ...state, isLoading: false});
        toastWithDurationHandler(res.json.message);
      }else if (res.json.result === false) {
        setState({ ...state, isLoading: false});
        toastWithDurationHandler(res.json.message);
      }

      if (res.json.result == true) {
        successWithDurationHandler('Registered Successfully, Driver updated successfully,Please wait for approval from Administration.');
        setTimeout(function () {
          navigation.navigate('transporterDriverSearch');
          setState({ ...state, isLoading: false});
        }, 1000);
      }
    }).catch((error) => {
      console.log(error+'error here');
    });
    

  }

  return (
    <ScrollView style={{backgroundColor: 'rgba(27, 155, 230, 0.1)'}}>
      <SafeAreaView style={styles.container}>
        <View style={{marginBottom:10}}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={{...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor}}> <Ionicons name="camera" size={18} color={appPageStyle.secondaryTextColor} /> Upload Profile Image</Text> 
          </TouchableOpacity> 
        </View>

        <Text style={styles.HeaderText}>Full Name</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Driver Name"
            placeholderTextColor="#19788e"
            value={driverDetails.driver_name}
            onChangeText={(text) =>{
              setErrMsg({ ...errMsg, driver_name: "" });
              setDriverDetails({ ...driverDetails, driver_name: text})
            }
          } 
          /> 
        </View> 
          {errMsg.driver_name && errMsg.driver_name.length > 0 && (
            <Text style={{color: '#FF5151'}}>{errMsg.driver_name}</Text>
          )}
        <Text style={styles.HeaderText}>Driver Info</Text>
        <View
        style={[
          {
            flexDirection: 'row',
            width: '95%',
            gap: 4,
          },
        ]}>
          <View style={{...styles.inputView, width: '50%',}}>
            <TextInput
              style={styles.TextInput}
              placeholder="Driver Phone"
              placeholderTextColor="#19788e"
              inputMode="numeric"
              maxLength={10}
              onChangeText={(text) =>{
                setErrMsg({ ...errMsg, driver_phone_no: "" });
                setDriverDetails({...driverDetails, driver_phone_no: text})
                }
              }
            /> 
          </View> 
          
          <View style={{...styles.inputView, width: '50%',}}>
            <TextInput
              style={styles.TextInput}
              placeholder="Driver Email"
              placeholderTextColor="#19788e"
              onChangeText={(text) =>{
                setErrMsg({ ...errMsg, driver_email: "" });
                setDriverDetails({...driverDetails, driver_email: text})
                }
              }
            /> 
          </View> 
        </View>
        <Text style={styles.HeaderText}>Region</Text>
        <SelectDropdown
          data={regionList}
          onSelect={(item, index) => {
            setErrMsg({ ...errMsg, driver_region: "" });
            setDriverDetails({ ...driverDetails, driver_region: item.title})
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                {selectedItem && (
                  <MaterialCommunityIcons name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                )}
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || 'Select Region'}
                </Text>
                <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                <MaterialCommunityIcons name={item.icon} style={styles.dropdownItemIconStyle} />
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />

        <Text style={styles.HeaderText}>Zone</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Zone"
            placeholderTextColor="#19788e"
            onChangeText={(text) =>{
              setErrMsg({ ...errMsg, driver_zone: "" });
              setDriverDetails({...driverDetails, driver_zone: text})
              }
            }
          /> 
        </View>
        <Text style={styles.HeaderText}>Woreda</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Woreda"
            placeholderTextColor="#19788e"
            onChangeText={(text) =>{
              setErrMsg({ ...errMsg, driver_woreda: "" });
              setDriverDetails({...driverDetails, driver_woreda: text})
              }
            }
          /> 
        </View>
        <Text style={styles.HeaderText}>House No.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="House No"
            placeholderTextColor="#19788e"
            onChangeText={(text) =>{
              setErrMsg({ ...errMsg, driver_house_no: "" });
              setDriverDetails({...driverDetails, driver_house_no: text})
              }
            }
          /> 
        </View>     
        <Text style={styles.HeaderText}>P.O Box</Text>   
        <View style={{...styles.inputView,}}>
            <TextInput
              style={styles.TextInput}
              placeholder="P.O Box"
              placeholderTextColor="#19788e"
              inputMode="numeric"
              maxLength={4}
              onChangeText={(text) =>{
                setErrMsg({ ...errMsg, driver_po_number: "" });
                setDriverDetails({...driverDetails, driver_po_number: text})
                }
              }
            /> 
        </View> 
        <Text style={styles.HeaderText}>Date of Birth</Text>
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
        <Text style={styles.HeaderText}>Gender</Text>
        <SelectDropdown
          data={genderList}
          onSelect={(item, index) => {
            setErrMsg({ ...errMsg, driver_gender: "" });
            setDriverDetails({ ...driverDetails, driver_gender: item.value})
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                {selectedItem && (
                  <MaterialCommunityIcons name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                )}
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || 'Select Your Gender'}
                </Text>
                <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                <MaterialCommunityIcons name={item.icon} style={styles.dropdownItemIconStyle} />
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        <Text style={styles.HeaderText}>License Grade</Text>   
        <View style={{...styles.inputView,}}>
            <TextInput
              style={styles.TextInput}
              placeholder="License Grade"
              placeholderTextColor="#19788e"
              inputMode="numeric"
              maxLength={10}
              onChangeText={(text) =>{
                setErrMsg({ ...errMsg, license_grade: "" });
                setDriverDetails({...driverDetails, license_grade: text})
                }
              }
            /> 
        </View> 
        <Text style={styles.HeaderText}>License Number</Text>   
        <View style={{...styles.inputView,}}>
            <TextInput
              style={styles.TextInput}
              placeholder="License Number"
              placeholderTextColor="#19788e"
              inputMode="numeric"
              maxLength={20}
              onChangeText={(text) =>{
                setErrMsg({ ...errMsg, license_no: "" });
                setDriverDetails({...driverDetails, license_no: text})
                }
              }
            /> 
        </View> 
        <Text style={styles.HeaderText}>License Issue Date</Text>
        <View style={styles.inputView}>
          
          <TouchableOpacity onPress={issueShowDatePicker} style={styles.TextInput}>
            {issueSelectedDate && (
              <Text>Selected Date: {issueSelectedDate.toDateString()}</Text>
            )}
            {!issueSelectedDate && (
              <Text>Select a date</Text>
            )}
          </TouchableOpacity> 
          <DateTimePickerModal
            isVisible={isIssueDatePickerVisible}
            mode="date"
            onConfirm={issueHandleConfirm}
            onCancel={issueHideDatePicker}
          />
        </View>
        <Text style={styles.HeaderText}>License Expire Date</Text>
        <View style={styles.inputView}>
          
          <TouchableOpacity onPress={expireShowDatePicker} style={styles.TextInput}>
            {expireSelectedDate && (
              <Text>Selected Date: {expireSelectedDate.toDateString()}</Text>
            )}
            {!expireSelectedDate && (
              <Text>Select a date</Text>
            )}
          </TouchableOpacity> 
          <DateTimePickerModal
            isVisible={isExpireDatePickerVisible}
            mode="date"
            onConfirm={expireHandleConfirm}
            onCancel={expireHideDatePicker}
          />
        </View>
        <View
        style={[
          {
            flexDirection: 'row',
            width: '94%',
            gap: 15,
            backgroundColor:'#fff', 
            minHeight: 200,
            borderRadius: 10
          },
        ]}>
          <View style={{...styles.iconArea, height: 60, width: 150, marginLeft: 20}}>
            <Text style={{alignSelf: 'left', fontWeight: 500, fontSize: 14, marginTop: 15}}>Upload License</Text>
            <View style={{marginLeft: -10, marginTop: 10}}>
            {placeholderImage && <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}} source={{ uri:placeholderImage}}/>}
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage2}>
                <Text style={{...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor}}> <Ionicons name="camera" size={18} color={appPageStyle.secondaryTextColor} /> {fileName ? <Text>{fileName}</Text> : "Upload <= 5MB"}</Text>
              </TouchableOpacity> 
            </View>
          </View>
          
        </View>

        <TouchableOpacity style={[styles.loginBtn, appPageStyle.primaryColor, appPageStyle.secondaryTextColor]} onPress={() => findEmptyFields()} 
        disabled={state.isLoading}
        >
          {!state.isLoading &&(
            <Text style={appPageStyle.primaryTextColor}><Ionicons name="person-add-outline" size={15} /> Add Driver</Text> 
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
    minHeight:'100%',
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
  HeaderText:{
    color: '#19788e',
    fontSize: 13,
    alignSelf:'flex-start',
    marginLeft: 10,
    padding: 15
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
});