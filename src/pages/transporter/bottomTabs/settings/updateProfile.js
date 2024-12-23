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
  //image
  Logo,
  //Icons
  Ionicons,
  // main styling
  appPageStyle,
  placeholder,
  fileIcon,
  MaterialCommunityIcons,
  Toast,
  postWithAuthCallWithErrorResponse,
  postMultipartWithAuthCallWithErrorResponse,
  multipartPostCall,
  ApiConfig,
  ActivityIndicator,
  AsyncStorage,
  NetInfo,
  LogBox,
} from "./../../../../components/index";
import SelectDropdown from 'react-native-select-dropdown';
import * as DocumentPicker from 'expo-document-picker';
import SnackBar from 'react-native-snackbar-component';
// import CountryStateCitySelector from './CountryState';
import CountryPicker from 'react-native-country-picker-modal';
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from 'react-country-region-selector';



export default function UpdateShipper() {
  const navigation = useNavigation();
  const [state, setState] = useState({
    device_token: "",
    device_id: "",
    app_version: "",
    app_type: "shipper",
    device_os: "web",
    isLoading: true,
    inputFormat: true,
    checkInternet:true,
  });
  const [
    shipperDetail, setShipperDetails,
  ] = useState({
    profile_picture: "",
    company_type: "",
    company_name: "",
    contact_person: "",
    alternate_phone: "",
    country: "",
    contact_person_responsibility: "",
    contact_person_phone: "",
    contact_person_email: "",
    password: "",
    confirmPassword: "",
    country: "",
    region: "",
    city: "",
    phone_no: "",
    email: "",
    po_number: "",
    tn_document: "",
    grade_certificate: "",
    business_license: "",
  });

  const componentWillMount = () => {
    useEffect( () => {
      // Anything in here is fired on component unmount.
      LogBox.ignoreLogs(['componentWillReceiveProps', 'componentWillMount']);
      this.mounted = true;
      this._checkConnection();
      this.index = 0;
      
      return () => {
        // Anything in here is fired on component unmount.
        setState({ ...state, isLoading: false, checkInternet:true,});
        this.mounted = false;
      }
    }, []);
  }

  _checkConnection = async()=>{
    NetInfo.addEventListener(networkState => {
      if(networkState.isConnected){
        setState({...state, checkInternet: true });
      }else{
        setState({...state, checkInternet: false });
      }
    });
  }
  componentWillMount();
  const [fileName, setFileName] = useState('');
  const [fileName2, setFileName2] = useState('');
  const [fileName3, setFileName3] = useState('');
  const [country, setCountry] = useState(null); 
  const onSelectCountry = (country) => { 
    setCountry(country); 
    
}; 
const [isVisible, setIsVisible] = useState(false); 

  const [region, setRegion] = useState('');

  
  const DEFAULT_IMAGE = Image.resolveAssetSource(Logo).uri;
  const [image, setImage] = useState(DEFAULT_IMAGE);
  const [companyTypes, setCompanyTyes] = useState([]);
  const SECOND_DEFAULT_IMAGE = Image.resolveAssetSource(placeholder).uri;
  const File_DEFAULT_IMAGE = Image.resolveAssetSource(fileIcon).uri;
  const [fileImage, setFileImage] = useState(File_DEFAULT_IMAGE);
  const [placeholderImage, setPlaceholderImage] = useState(SECOND_DEFAULT_IMAGE);
  const [secondPlaceholderImage, setSecondPlaceholderImage] = useState(SECOND_DEFAULT_IMAGE);
  const [thirdPlaceholderImage, setThirdPlaceholderImage] = useState(SECOND_DEFAULT_IMAGE);



  const [driverDetails, setDriverDetails] = useState({
    profile_picture: { uri:  image},
    company_name: "",
    business_area: "",
    contact_person: "",
    alternate_phone:"",
    country: "",
    contact_person_responsibility: "",
    contact_person_phone: "",
    contact_person_email: "",
    password: "",
    confirmPassword: "",
    country: "Ethiopia",
    region: "",
    city: "",
    phone_no: " ",
    email: " ",
    po_number: "",
    tn_document: {uri: placeholderImage},
    grade_certificate: {uri: secondPlaceholderImage},
    business_license: {uri: thirdPlaceholderImage},
  });


  

  

  const getCompanyTypes = async () => {
    setState({ ...state, isLoading: true });   

    const user_id = await AsyncStorage.getItem('user_id');
    const api_key = await AsyncStorage.getItem('api_key');
    const customer_id = await AsyncStorage.getItem('customer_id');
    
    postWithAuthCallWithErrorResponse(
        ApiConfig.PROFILE,
        JSON.stringify({ user_id, api_key, customer_id , shipper_id: user_id })
      )
        .then((res) => {

          if (res.json.message === 
            "Invalid user authentication,Please try to relogin with exact credentials.") {
                AsyncStorage.clear();
                navigation.navigate('TruckLogin');
                return;
          }

          if (res.json.result) {
            let shipper = res.json.profile;
            
            setShipperDetails({
                id: shipper.user_id,
                company_name: shipper?.basic_info?.company_name,
                email: shipper?.contact_person?.email,
                phone_no: shipper?.address?.phone,
                city: shipper?.address?.city,
                region: shipper?.address?.region,
                country: shipper?.address?.country,
                po_number: shipper?.address?.po_box,
                contact_person: shipper?.contact_person?.name,
                contact_person_responsibility:
                shipper?.contact_person?.responsibility,
                contact_person_phone: shipper?.basic_info?.contact_person_phone,
                //contact_person_email: shipper?.contact_person?.email,
                total_fleet_size: shipper.user_fleet_size,
                alternate_phone: shipper?.address?.alternative_phone,
                business_area: shipper?.basic_info?.business_area,
                charge_type: shipper.charge_type,
                currency: shipper.currency,
                remarks: shipper.shipper_remarks,
                rateper_20gp: shipper.shipper_rateper_20gp,
                rateper_40gp: shipper.shipper_rateper_40gp,
                rateper_quintal: shipper.shipper_rateper_quintal,
                profile_picture: shipper?.basic_info?.profile_pic,
                contract: shipper.shipper_contract,
                business_license: shipper?.documents?.business_license,
                tn_document: shipper?.documents?.tin_document,
                grade_certificate: shipper?.documents?.vat_document,
            });
            setDriverDetails({
                profile_picture: shipper?.basic_info?.profile_pic,
                business_license: shipper?.documents?.business_license,
                tn_document: shipper?.documents?.tin_document,
                grade_certificate: shipper?.documents?.vat_document,
            })
            setImage(ApiConfig.BASE_URL_FOR_IMAGES+shipper?.basic_info?.profile_pic);
            setPlaceholderImage(ApiConfig.BASE_URL_FOR_IMAGES+shipper?.basic_info?.tn_document);
            setSecondPlaceholderImage(ApiConfig.BASE_URL_FOR_IMAGES+shipper?.basic_info?.grade_certificate);
            setThirdPlaceholderImage(ApiConfig.BASE_URL_FOR_IMAGES+shipper?.basic_info?.business_license);
            
          }

          setState({ ...state, isLoading: false });   
        })
    .catch((err) => console.log(err));
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
      setShipperDetails({ ...shipperDetail, profile_picture: result.assets[0].uri});
    }
  };

  const pickImage2 = async () => {
      
      let result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'],
    });
    
    if (result.assets[0].mimeType) {
        setFileName(result.assets[0].name);
    } else {
        successWithDurationHandler('Please select PDFs or Images only.');
    }
    
    if (!result.canceled) {
        setShipperDetails({ ...shipperDetail, tn_document: result.assets[0].uri });
      if (result.assets[0].mimeType === "application/pdf") {
        setFileName(result.assets[0].name);
        setPlaceholderImage(fileImage);
      } else {
        setPlaceholderImage(result.assets[0].uri);
      }
    }
  };

  const pickImage3 = async () => {

    let result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'],
    });

    if (result.assets[0].mimeType) {
      setFileName2(result.assets[0].name);
    } else {
      successWithDurationHandler('Please select PDFs or Images only.');
    }
    
    if (!result.canceled) {
        setShipperDetails({ ...shipperDetail, grade_certificate: result.assets[0].uri});
      if(result.assets[0].mimeType == "application/pdf"){
        setFileName2(result.assets[0].name);
        setSecondPlaceholderImage(fileImage);
      }else{
        setSecondPlaceholderImage(result.assets[0].uri);
      }
    }

    
  };

  const pickImage4 = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'],
    });

    if (result.assets[0].mimeType) {
      setFileName3(result.assets[0].name);
    } else {
      successWithDurationHandler('Please select PDFs or Images only.');
    }
    

    if (!result.assets[0].canceled) {
        setShipperDetails({ ...shipperDetail, business_license: result.assets[0].uri});
      if(result.assets[0].mimeType == "application/pdf"){
        setFileName3(result.assets[0].name);
        setThirdPlaceholderImage(fileImage);
      }else{
        setThirdPlaceholderImage(result.assets[0].uri);
      }
    }

    
  };

  const companyType = [
    {title: 'Association',},
    {title: 'S.Co',},
    {title: 'PLC',},
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
  ];

  const toastWithDurationHandler = (message) => {
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      backgroundColor: 'red',
      animation: true,
    });
  };

  const findEmptyFields = () => {
    setState({ ...state, isLoading: true });   
    for (const key in shipperDetail) {
      const value = shipperDetail[key];
      
      if (key !== "alternate_phone" || key !== "po_number"){
        continue;
      }else if(value === "" || value === null || value === undefined) {
        toastWithDurationHandler("Please check your "+key+" !");
        setState({ ...state, isLoading: false }); 
        return;
      } else if (typeof value === 'object' && value.uri !== undefined) {
        if (!value.uri) {
          toastWithDurationHandler("Please Add Image!");
          setState({ ...state, isLoading: false }); 
          return;
        }
      }
      
    }
    _register();
  };
  
  

  const [errMsg, setErrMsg] = useState({
    profile_picture: "",
    company_type: "",
    company_name: "",
    contact_person: "",
    alternate_phone: "",
    country: "",
    contact_person_responsibility: "",
    contact_person_phone: "",
    contact_person_email: "",
    password: "",
    confirmPassword: "",
    country: "",
    region: "",
    city: "",
    phone_no: "",
    email: "",
    po_number: "",
    tn_document: "",
    grade_certificate: "",
    business_license: "",
  });

  
  const successWithDurationHandler = (message) => {
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      backgroundColor: 'green',
      animation: true,
    });
  };

  

  _register = async () =>{
    
    const formData = new FormData();
    const tn  = shipperDetail?.tn_document;
    const bizz  = shipperDetail?.business_license;
    const pro_uri  = shipperDetail.profile_picture ? shipperDetail.profile_picture : "";    
    const gc  = shipperDetail.grade_certificate;
    
    if (tn.uri || bizz.uri || gc.uri) {
        if(tn.uri){
            toastWithDurationHandler("Please Add TIN Image");
        }else if(bizz.uri){
            toastWithDurationHandler("Please Add Business License");
        }else{
            toastWithDurationHandler("Please Add VAT Registration!");
        }
        setState({ ...state, isLoading: false }); 
        return;
    }
    
    
    
    const tn_img = tn.split('/').pop();
    const buss = bizz.split('/').pop();
    const gc_img = gc.split('/').pop();
    const businessImage = {
        uri: shipperDetail.business_license, 
        name: buss, 
        type: shipperDetail.business_license.endsWith('.pdf') 
        ? "application/pdf" 
        : shipperDetail.business_license.endsWith('.png') || shipperDetail.business_license.endsWith('.jpeg') || shipperDetail.business_license.endsWith('.jpg')
        ? "image/png" 
        : "image/jpeg"
    };
    
    const tnImage = {
        uri: shipperDetail.tn_document, 
        name: tn_img, 
        type: shipperDetail.tn_document.endsWith('.pdf') 
        ? "application/pdf" 
        : shipperDetail.tn_document.endsWith('.png') || shipperDetail.tn_document.endsWith('.jpeg') || shipperDetail.tn_document.endsWith('.jpg')
        ? "image/png" 
        : "image/jpeg"
    };
    
    const gradeImage = {
        uri: shipperDetail.grade_certificate, 
        name: gc_img, 
        type: shipperDetail.grade_certificate.endsWith('.pdf') 
        ? "application/pdf" 
        : shipperDetail.grade_certificate.endsWith('.png') || shipperDetail.grade_certificate.endsWith('.jpeg') || shipperDetail.grade_certificate.endsWith('.jpg')
        ? "image/png" 
        : "image/jpeg"
    };

    const user_id = await AsyncStorage.getItem('user_id');
    const api_key = await AsyncStorage.getItem('api_key');
    const customer_id = await AsyncStorage.getItem('customer_id');
    
    
    setState({ ...state, isLoading: true });    
    formData.append("api_key", api_key);
formData.append("user_id", user_id);
formData.append("customer_id", customer_id);
formData.append("company_name", shipperDetail.company_name);
formData.append("email", shipperDetail.email);
formData.append("phone_no", shipperDetail.phone_no);
formData.append("city", shipperDetail.city);
formData.append("region", shipperDetail.region);
formData.append("country", shipperDetail.country ? shipperDetail.country : "Ethiopia");
formData.append("po_number", shipperDetail?.po_number);
formData.append("contact_person", shipperDetail.contact_person);
formData.append("contact_person_responsibility", shipperDetail.contact_person_responsibility);
formData.append("contact_person_phone", shipperDetail.contact_person_phone);

formData.append("total_fleet_size", shipperDetail.total_fleet_size ? shipperDetail.total_fleet_size : '');
formData.append("alternate_phone", shipperDetail?.alternate_phone);
formData.append("business_area", shipperDetail?.business_area);
formData.append("contact_person_email", shipperDetail?.contact_person_email);

// Profile picture handling (base64 check)
if (driverDetails.profile_picture ) {
    formData.append("profile_picture", driverDetails.profile_picture);
} else if (shipperDetail.profile_picture) {
    const filename = shipperDetail.profile_picture.split('/').pop();
    const profileImage = { uri: shipperDetail.profile_picture, name: filename, type: 'image/jpeg' };
    formData.append("profile_picture", {
        uri: profileImage?.uri,
        name: profileImage?.name,
        type: profileImage?.type
    });
} else {
    formData.append("profile_picture", " ");
}

// Business license handling (base64 check)
if (driverDetails.business_license) {
    formData.append("business_license", driverDetails.business_license);
} else if (shipperDetail.business_license) {
    formData.append("business_license", {
        uri: shipperDetail.business_license,
        name: "business_license",
        type: "image/jpeg" // Adjust type if necessary
    });
}

// Grade certificate handling (base64 check)
if (driverDetails.grade_certificate) {
    formData.append("grade_certificate", driverDetails.grade_certificate);
} else if (shipperDetail.grade_certificate) {
    formData.append("grade_certificate", {
        uri: shipperDetail.grade_certificate,
        name: "grade_certificate",
        type: "image/jpeg" // Adjust type if necessary
    });
}

// TN document handling (base64 check)
if (driverDetails.tn_document) {
    formData.append("tn_document", driverDetails.tn_document);
} else if (shipperDetail.tn_document) {
    formData.append("tn_document", {
        uri: shipperDetail.tn_document,
        name: "tn_document",
        type: "image/jpeg" // Adjust type if necessary
    });
}

  
  multipartPostCall(ApiConfig.EDITSHIPPER, formData)
    .then((res) => {
      setState({ ...state, isLoading: false });    
      if (res.message === "Insufficient Parameters") {
        setState({ ...state, isLoading: false});
        successWithDurationHandler("Please Check all the form inputs.");
        AsyncStorage.clear();
      }

      
      
      if (res.result == true) {
        setTimeout(function () {
          AsyncStorage.clear();
          successWithDurationHandler('Shipper updated successfully , Abay Logistics Will Contact you soon! Thank you.');
          navigation.navigate('TruckLogin');
        }, 5000);
      }
      if (res.message === "Shipper updated successfully") {
        setState({ ...state, isLoading: false});
        AsyncStorage.clear();
        successWithDurationHandler("Shipper updated successfully, Abay Logistics Will Contact you soon! Thank you.");
        navigation.navigate('TruckLogin');
      }else{
        setState({ ...state, isLoading: false});
        toastWithDurationHandler("Please check your Email, Password and Phone Number carefully!");
      }

    }).catch((error) => {
      setState({ ...state, isLoading: false });    
    });
    

  }
  

  return (
    <ScrollView>
    
    
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle = "white-content" hidden = {false} {...appPageStyle.primaryColor} translucent = {true}/>
        {!state.checkInternet &&(
          <SnackBar visible={true} textMessage="No Internet Connection!" actionHandler={()=>{this._checkConnection()}} actionText="Try Again"/>
        )}
        <View style={{marginBottom:10}}>
            {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={{...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor}}> <Ionicons name="camera" size={18} color={appPageStyle.secondaryTextColor} /> Upload Image</Text> 
          </TouchableOpacity> 
        </View>

        <Text style={styles.HeaderText}>Company Name</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Company Name"
            placeholderTextColor="#090909"
            value={shipperDetail.company_name}
            onChangeText={(text) =>{
              setShipperDetails({...shipperDetail, company_name : text})
            }
          } 
          /> 
        </View> 
          {errMsg.company_name && errMsg.company_name.length > 0 && (
            <Text style={{color: '#FF5151'}}>{errMsg.company_name}</Text>
          )}

        <Text style={styles.HeaderText}>Business Area</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Business Area"
            placeholderTextColor="#090909"
            value={shipperDetail.business_area}
            onChangeText={(text) =>{
              setShipperDetails({...shipperDetail, business_area : text})
            }
          }
          />
        </View> 

        <Text style={styles.HeaderText}>Contact Person</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Contact Person"
            placeholderTextColor="#090909"
            value={shipperDetail.contact_person}
            onChangeText={(text) =>{
              setShipperDetails({...shipperDetail, contact_person : text})
            }
          }
          />
        </View> 
          {errMsg.contact_person && errMsg.contact_person.length > 0 && (
            <Text style={{color: '#FF5151'}}>{errMsg.contact_person}</Text>
          )} 
        <Text style={styles.HeaderText}>Contact Person Responsibility</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Contact Person Responsibility"
            placeholderTextColor="#090909"
            value={shipperDetail.contact_person_responsibility}
            onChangeText={(text) =>{
              setShipperDetails({...shipperDetail, contact_person_responsibility : text})
              }
            } 
          /> 
        </View> 
        <Text style={styles.HeaderText}>Contact Person Phone</Text>
        
        <View style={{...styles.inputView, }}>
          <TextInput
            style={styles.TextInput}
            placeholder="Contact Person Phone"
            placeholderTextColor="#090909"
            inputMode="numeric"
            maxLength={10}
            value={shipperDetail.contact_person_phone}
            onChangeText={(text) =>{
              setShipperDetails({...shipperDetail, contact_person_phone : text})
              }
            }
          /> 
        </View> 
          
        <Text style={styles.HeaderText}>Contact Person Email</Text>
        <View style={{...styles.inputView}}>
          <TextInput
            style={styles.TextInput}
            placeholder="Company Person Email"
            placeholderTextColor="#090909"
            value={shipperDetail.contact_person_email}
            onChangeText={(contact_person_email) =>{
              setShipperDetails({...shipperDetail, contact_person_email : contact_person_email})
              }
            }
          /> 
        </View> 
        
        <Text style={styles.HeaderText}>
          <CountryPicker visible={isVisible} onSelect={onSelectCountry} onClose={() => setIsVisible(false)} withFilter={true} withFlag={true} withCountryNameButton={true} style={styles.dropdownButtonTxtStyle}/>
        </Text>
       
        <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.dropdownButtonStyle}> 
            <Text style={styles.dropdownButtonTxtStyle}>{country ? country.name : shipperDetail.country && shipperDetail.country}</Text> 
        </TouchableOpacity> 
        <Text style={styles.HeaderText}>Region</Text>
        <SelectDropdown
          data={regionList}
          onSelect={(item, index) => {
            setShipperDetails({...shipperDetail,region: item.title})
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                {selectedItem && (
                  <MaterialCommunityIcons name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                )}
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || shipperDetail.region}
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

        <Text style={styles.HeaderText}>City</Text>
        <SelectDropdown
          data={regionList}
          onSelect={(item, index) => {
            setShipperDetails({...shipperDetail, city: item.title})
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                {selectedItem && (
                  <MaterialCommunityIcons name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                )}
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || shipperDetail.city}
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

        <Text style={styles.HeaderText}>Address Phone</Text>
        <View
        style={[
          {
            flexDirection: 'row',
            width: '95%',
            gap: 4,
            backgroundColor:'#fff',
          },
        ]}>
          <View style={{...styles.inputView, width: '50%',}}>
            <TextInput
              style={styles.TextInput}
              placeholder="Phone"
              placeholderTextColor="#090909"
              inputMode="numeric"
              maxLength={10}
              value={shipperDetail.phone}
              onChangeText={(phone_no) =>{
                setShipperDetails({...shipperDetail, phone_no: phone_no})
                }
              }
            /> 
          </View> 
          
          <View style={{...styles.inputView, width: '50%',}}>
            <TextInput
              style={styles.TextInput}
              placeholder="Alternate Phone"
              placeholderTextColor="#090909"
              inputMode="numeric"
              maxLength={10}
              value={shipperDetail.alternative_phone}
              onChangeText={(alternate_phone) =>{
                setShipperDetails({...shipperDetail, alternate_phone: alternate_phone})
                }
              }
            /> 
          </View> 
        </View>
        <Text style={styles.HeaderText}>Address List</Text>
        <View
        style={[
          {
            flexDirection: 'row',
            width: '95%',
            gap: 4,
            backgroundColor:'#fff',
          },
        ]}>
          <View style={{...styles.inputView, width: '50%',}}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#090909"
              value={shipperDetail.email}
              onChangeText={(email) =>{
                setShipperDetails({...shipperDetail, email: email})
                }
              }
            /> 
          </View> 
          
          <View style={{...styles.inputView, width: '50%',}}>
            <TextInput
              style={styles.TextInput}
              placeholder="P.O Box"
              placeholderTextColor="#090909"
              maxLength={4}
              value={shipperDetail.po_box}
              onChangeText={(po_number) =>{
                setShipperDetails({...shipperDetail, po_number: po_number})
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
            backgroundColor:'#fff', 
            minHeight: 200,
          },
        ]}>
          <View style={{...styles.iconArea, height: 60, width: 80, marginLeft: 20}}>
            <Text style={{alignSelf: 'left', fontWeight: 500, fontSize: 14, marginTop: 15}}>TIN (Tax Identification Number)</Text>
            <View style={{marginLeft: -10, marginTop: 10}}>
            {placeholderImage && 
            <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}} 
                source={{
                    uri:  placeholderImage 
                }}
            />}
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage2}>
                <Text style={{...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor}}> <Ionicons name="camera" size={18} color={appPageStyle.secondaryTextColor} /> {fileName ? <Text>{fileName}</Text> : "Upload"}</Text>
              </TouchableOpacity> 
            </View>
          </View>

          <View style={{...styles.iconArea, height: 60, width: 120, marginLeft: 90}}>
            <Text style={{fontWeight: 500, fontSize: 14, marginTop: 15, }}>VAT Registration</Text>
            <View style={{marginLeft: 0, marginTop: 10}}>
            {secondPlaceholderImage && <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}} 
                source={{
                    uri:  secondPlaceholderImage 
                }}
            />}
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage3}>
                <Text style={{...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor}}> <Ionicons name="camera" size={18} color={appPageStyle.secondaryTextColor} /> {fileName2 ? <Text>{fileName2}</Text> : "Upload"}</Text> 
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
            <Text style={{alignSelf: 'left', fontWeight: 500, fontSize: 14, marginTop: 0}}>Business License</Text>
            <View style={{marginLeft: 0, marginTop: 10}}>
              {thirdPlaceholderImage && <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}} 
                source={{
                    uri:  thirdPlaceholderImage 
                }}
              />}
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage4}>
                <Text style={{...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor}}> <Ionicons name="camera" size={18} color={appPageStyle.secondaryTextColor} /> {fileName3 ? <Text>{fileName3}</Text> : "Upload"}</Text> 
              </TouchableOpacity> 
            </View>
          </View>
        </View>  

        <TouchableOpacity style={[styles.loginBtn, appPageStyle.primaryColor, appPageStyle.secondaryTextColor]} onPress={()=>findEmptyFields()} disabled={state.isLoading}>
          {!state.isLoading &&(
            <Text style={appPageStyle.primaryTextColor}><Ionicons name="person-add-outline" size={15} /> Update</Text> 
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
    alignSelf:'center',
  },
  logoArea:{
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
  HeaderText:{
    color: '#090909',
    fontSize: 13,
    alignSelf:'flex-start',
    marginLeft: 10,
    padding: 15
  },
  uploadButton:{
    backgroundColor: "#f1f1f1",
    height: 30,
    minWidth: 150,
    maxWidth: 'auto',
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
    backgroundColor: "rgba(240,138,41, 0.3)",
    borderRadius: 10,
    width: '95%',
    height: 45,
    marginBottom: 10,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontWeight: '500',
    color: '#090909',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
    color: '#090909',
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
    color: '#090909',
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
    color: '#090909',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  label: {
    color: '#090909',
    fontSize: 13,
    alignSelf:'flex-start',
    marginLeft: 10,
    padding: 15,
    paddingBottom:5
  },
  picker: {
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
    marginBottom: 0,
  },
});