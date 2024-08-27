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
  //Icons
  Ionicons,
  // main styling
  appPageStyle,
  placeholder,
  MaterialCommunityIcons,
  Toast,
  postWithAuthCallWithErrorResponse,
  postMultipartWithAuthCallWithErrorResponse,
  ApiConfig,
  ActivityIndicator
} from "./../../../../components/index.js";
import SelectDropdown from 'react-native-select-dropdown';


export default function AddNewDriver() {
  const navigation = useNavigation();


  const DEFAULT_IMAGE = Image.resolveAssetSource(Logo).uri;
  const [image, setImage] = useState(DEFAULT_IMAGE);
  const [companyTypes, setCompanyTyes] = useState([]);
  const SECOND_DEFAULT_IMAGE = Image.resolveAssetSource(placeholder).uri;
  const [placeholderImage, setPlaceholderImage] = useState(SECOND_DEFAULT_IMAGE);
  const [secondPlaceholderImage, setSecondPlaceholderImage] = useState(SECOND_DEFAULT_IMAGE);
  const [thirdPlaceholderImage, setThirdPlaceholderImage] = useState(SECOND_DEFAULT_IMAGE);

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
        navigation.navigate('Registration')
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
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //All can be added for all type of media
      allowsEditing: true,
      aspect: [7, 6],
      quality: 1,
    });

    if (!result.canceled) {
      setPlaceholderImage(result.assets[0].uri);
      setDriverDetails({ ...driverDetails, tn_document: result.assets[0].uri});
    }
  };

  const pickImage3 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //All can be added for all type of media
      allowsEditing: true,
      aspect: [7, 6],
      quality: 1,
    });

    if (!result.canceled) {
      setSecondPlaceholderImage(result.assets[0].uri);
      setDriverDetails({ ...driverDetails, grade_certificate: result.assets[0].uri});
    }
  };

  const pickImage4 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //All can be added for all type of media
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setThirdPlaceholderImage(result.assets[0].uri);
      setDriverDetails({ ...driverDetails, business_license: result.assets[0].uri});
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
        driver_house_no: "",
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

    const [errMsg, setErrMsg] = useState({
        profile_picture: { uri:  image},
        driver_name: "",
        driver_email: "",
        driver_phone_no: "",
        driver_region: "",
        driver_zone: "",
        driver_woreda: "",
        driver_house_no: "",
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
    
    const uri  = driverDetails.profile_picture;
    const filename = uri.split('/').pop();
    
    const bizz  = driverDetails.profile_picture;
    const buss = bizz.split('/').pop();

    const tn  = driverDetails.tn_document;
    const tn_img = tn.split('/').pop();

    const gc  = driverDetails.grade_certificate;
    const gc_img = gc.split('/').pop();
    
    const profileImage = { uri: driverDetails.profile_picture, name: filename, type: 'image/jpeg'};
    const businessImage = { uri: driverDetails.business_license, name: buss, type: 'image/jpeg'};
    const tnImage = { uri: driverDetails.tn_document, name: tn_img, type: 'image/jpeg'};
    const gradeImage = { uri: driverDetails.grade_certificate, name: gc_img, type: 'image/jpeg'};
    
    setState({ ...state, isLoading: true});    
    const formData = new FormData();
    formData.append("company_name", driverDetails.company_name);
    formData.append("email", driverDetails.email);
    driverDetails.password && formData.append("password", driverDetails.password);
    formData.append("phone_no", driverDetails.phone_no);
    formData.append("city", driverDetails.city);
    formData.append("region", driverDetails.region);
    formData.append("country", driverDetails.country ? driverDetails.country : "Ethiopia");
    formData.append("po_number", driverDetails.po_number);
    formData.append("contact_person", driverDetails.contact_person);
    formData.append(
      "contact_person_responsibility",
      driverDetails.contact_person_responsibility
    );
    formData.append("contact_person_phone", driverDetails.contact_person_phone);
    formData.append("contact_person_email", driverDetails.contact_person_email);
    formData.append("total_fleet_size", driverDetails.total_fleet_size);
    formData.append("alternate_phone", driverDetails.alternate_phone);
    formData.append("company_type", driverDetails.company_type);
    
      formData.append(
        "profile_picture", profileImage 
      );
    
    
      formData.append(
        "business_license", businessImage
      );
    
      formData.append(
        "grade_certificate", gradeImage
      );
    
      formData.append(
        "tn_document", tnImage
      );
    formData.append(
      "user_role",
      driverDetails.user_role ? driverDetails.user_role : "transporter"
    );
    
    console.log(formData);
    // return;
    postMultipartWithAuthCallWithErrorResponse(
      ApiConfig.ADD_TRANSPORTER,
      formData
    ).then((res) => {
      console.log(res);
      if (res.json.result === false) {
        setState({ ...state, isLoading: false});
        toastWithDurationHandler('Wrong inputs');
        AsyncStorage.clear();
      }

      if (res.json.result === false) {
        setState({ ...state, isLoading: false});
        toastWithDurationHandler('Wrong inputs');
        AsyncStorage.clear();
      }

      if (res.json.result === false) {
        setState({ ...state, isLoading: false});
        toastWithDurationHandler('Wrong inputs');
        AsyncStorage.clear();
      }

      if (res.json.result == true) {
        setTimeout(function () {
          successWithDurationHandler('Registered Successfully, Please contact Abay Logistics! Thank you.');
          navigation.navigate('TruckLogin');
        }, 10000);
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
            <Text style={{...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor}}> <Ionicons name="camera" size={18} color={appPageStyle.secondaryTextColor} /> Upload Logo</Text> 
          </TouchableOpacity> 
        </View>
        <Text style={styles.HeaderText}>Company Type</Text>
        <SelectDropdown
          data={companyTypes}
          onSelect={(companyTypes, index) => {
            setErrMsg({ ...errMsg, company_type: "" });
            setDriverDetails({ ...driverDetails, company_type: companyTypes.company_type_id})
          }}
          value={driverDetails.company_type}
          renderButton={(companyTypes, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(companyTypes && companyTypes.company_type_name) || 'Select Company Type'}
                </Text>
                <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(companyTypes, index, isSelected) => {
            return (
              <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                <Text style={styles.dropdownItemTxtStyle}>{companyTypes.company_type_name}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
          {errMsg.company_type && errMsg.company_type.length > 0 && (
              <Text style={{color: '#FF5151'}}>{errMsg.company_type}</Text>
          )}

        <Text style={styles.HeaderText}>Company Name</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Company Name"
            placeholderTextColor="#19788e"
            value={driverDetails.company_name}
            onChangeText={(text) =>{
              setErrMsg({ ...errMsg, company_name: "" });
              setDriverDetails({ ...driverDetails, company_name: text})
            }
          } 
          /> 
        </View> 
          {errMsg.company_name && errMsg.company_name.length > 0 && (
            <Text style={{color: '#FF5151'}}>{errMsg.company_name}</Text>
          )}

        <Text style={styles.HeaderText}>Contact Person</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Contact Person"
            placeholderTextColor="#19788e"
            onChangeText={(text) =>{
              setErrMsg({ ...errMsg, contact_person: "" });
              setDriverDetails({ ...driverDetails, contact_person: text})
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
            placeholderTextColor="#19788e"
            onChangeText={(text) =>{
              setErrMsg({ ...errMsg, contact_person_responsibility: "" });
              setDriverDetails({...driverDetails, contact_person_responsibility: text})
              }
            } 
          /> 
        </View> 
        <Text style={styles.HeaderText}>Contact Info</Text>
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
              placeholder="Contact Person Phone"
              placeholderTextColor="#19788e"
              onChangeText={(text) =>{
                setErrMsg({ ...errMsg, contact_person_phone: "" });
                setDriverDetails({...driverDetails, contact_person_phone: text})
                }
              }
            /> 
          </View> 
          
          <View style={{...styles.inputView, width: '50%',}}>
            <TextInput
              style={styles.TextInput}
              placeholder="Company Person Email"
              placeholderTextColor="#19788e"
              onChangeText={(contact_person_email) =>{
                setErrMsg({ ...errMsg, contact_person_email: "" });
                setDriverDetails({...driverDetails, contact_person_email: contact_person_email})
                }
              }
            /> 
          </View> 
        </View>

        <Text style={styles.HeaderText}>Total Fleet Size</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Total Fleet Size"
            placeholderTextColor="#19788e"
            onChangeText={(text) =>{
              setErrMsg({ ...errMsg, total_fleet_size: "" });
              setDriverDetails({...driverDetails, total_fleet_size: text})
              }
            }
          /> 
        </View>

        <Text style={styles.HeaderText}>Password</Text>
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
              placeholder="Password"
              placeholderTextColor="#19788e"
              secureTextEntry={true}
              onChangeText={(password) =>{
                setErrMsg({ ...errMsg, password: "" });
                setDriverDetails({...driverDetails, password: password})
                }
              }
            /> 
          </View> 

          <View style={{...styles.inputView, width: '50%',}}>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#19788e"
              secureTextEntry={true}
              onChangeText={(confirmPassword) =>{
                setErrMsg({ ...errMsg, confirmPassword: "" });
                setDriverDetails({...driverDetails, confirmPassword: confirmPassword})
                }
              }
            /> 
          </View>  
        </View>


        <Text style={styles.HeaderText}>Region</Text>
        <SelectDropdown
          data={regionList}
          onSelect={(item, index) => {
            setErrMsg({ ...errMsg, region: "" });
            setDriverDetails({ ...driverDetails, region: item.title})
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

        <Text style={styles.HeaderText}>City</Text>
        <SelectDropdown
          data={regionList}
          onSelect={(item, index) => {
            setErrMsg({ ...errMsg, region: "" });
            setDriverDetails({ ...driverDetails, region: item.title})
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                {selectedItem && (
                  <MaterialCommunityIcons name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                )}
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || 'Select City'}
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
          },
        ]}>
          <View style={{...styles.inputView, width: '50%',}}>
            <TextInput
              style={styles.TextInput}
              placeholder="Phone"
              placeholderTextColor="#19788e"
              onChangeText={(phone_no) =>{
                setErrMsg({ ...errMsg, phone_no: "" });
                setDriverDetails({...driverDetails, phone_no: phone_no})
                }
              }
            /> 
          </View> 
          
          <View style={{...styles.inputView, width: '50%',}}>
            <TextInput
              style={styles.TextInput}
              placeholder="Alternate Phone"
              placeholderTextColor="#19788e"
              onChangeText={(alternate_phone) =>{
                setErrMsg({ ...errMsg, alternate_phone: "" });
                setDriverDetails({...driverDetails, alternate_phone: alternate_phone})
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
          },
        ]}>
          <View style={{...styles.inputView, width: '50%',}}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#19788e"
              onChangeText={(email) =>{
                setErrMsg({ ...errMsg, email: "" });
                setDriverDetails({...driverDetails, email: email})
                }
              }
            /> 
          </View> 
          
          <View style={{...styles.inputView, width: '50%',}}>
            <TextInput
              style={styles.TextInput}
              placeholder="P.O Box"
              placeholderTextColor="#19788e"
              onChangeText={(po_number) =>{
                setErrMsg({ ...errMsg, po_number: "" });
                setDriverDetails({...driverDetails, po_number: po_number})
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
            borderRadius: 10
          },
        ]}>
          <View style={{...styles.iconArea, height: 60, width: 80, marginLeft: 20}}>
            <Text style={{alignSelf: 'left', fontWeight: 500, fontSize: 14, marginTop: 15}}>Tin</Text>
            <View style={{marginLeft: -10, marginTop: 10}}>
            {placeholderImage && <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}} source={{ uri:placeholderImage}}/>}
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage2}>
                <Text style={{...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor}}> <Ionicons name="camera" size={18} color={appPageStyle.secondaryTextColor} /> Upload</Text> 
              </TouchableOpacity> 
            </View>
          </View>

          <View style={{...styles.iconArea, height: 60, width: 120, marginLeft: 90}}>
            <Text style={{fontWeight: 500, fontSize: 14, marginTop: 15, }}>Grade Certificate</Text>
            <View style={{marginLeft: 0, marginTop: 10}}>
            {secondPlaceholderImage && <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}} source={{ uri:secondPlaceholderImage}}/>}
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage3}>
                <Text style={{...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor}}> <Ionicons name="camera" size={18} color={appPageStyle.secondaryTextColor} /> Upload</Text> 
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
              {thirdPlaceholderImage && <Image style={{...styles.cardImage,  borderRadius: 10, height: 100, width:100}} source={{ uri:thirdPlaceholderImage}}/>}
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage4}>
                <Text style={{...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor}}> <Ionicons name="camera" size={18} color={appPageStyle.secondaryTextColor} /> Upload</Text> 
              </TouchableOpacity> 
            </View>
          </View>
        </View>  

        <TouchableOpacity style={[styles.loginBtn, appPageStyle.primaryColor, appPageStyle.secondaryTextColor]} onPress={()=>this._register()}>
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