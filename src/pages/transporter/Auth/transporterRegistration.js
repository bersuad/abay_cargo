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
  //image
  Logo,
  //Icons
  Ionicons,
  // main styling
  appPageStyle
} from "./../../../components/index";

export default function ImagePickerExample() {
  const DEFAULT_IMAGE = Image.resolveAssetSource(Logo).uri;
  const [image, setImage] = useState(DEFAULT_IMAGE);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //All can be added for all type of media
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={{marginBottom:10}}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={{...styles.buttonText, marginTop: 0, fontSize: 13, ...appPageStyle.secondaryTextColor}}> <Ionicons name="md-camera" size={18} color={appPageStyle.secondaryTextColor} /> Upload Logo</Text> 
          </TouchableOpacity> 
        </View>
        <Text style={styles.HeaderText}>Company Type</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Company Type"
            placeholderTextColor="#19788e"
          /> 
        </View> 
        <Text style={styles.HeaderText}>Company Name</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Company Name"
            placeholderTextColor="#19788e"
          /> 
        </View> 
        <Text style={styles.HeaderText}>Contact Person</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Contact Person"
            placeholderTextColor="#19788e"
          /> 
        </View> 
        <Text style={styles.HeaderText}>Contact Person Responsibility</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Contact Person Responsibility"
            placeholderTextColor="#19788e"
          /> 
        </View> 
        <Text style={styles.HeaderText}>Contact Person Phone</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Contact Person Phone"
            placeholderTextColor="#19788e"
          /> 
        </View> 
        
        <Text style={styles.HeaderText}>Company Person Email</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Company Person Email"
            placeholderTextColor="#19788e"
          /> 
        </View> 

        <Text style={styles.HeaderText}>Total Fleet Size</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Total Fleet Size"
            placeholderTextColor="#19788e"
          /> 
        </View>

        <Text style={styles.HeaderText}>Login Password</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#19788e"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          /> 
        </View> 

        <Text style={styles.HeaderText}>Confirm Password</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Confirm Password"
            placeholderTextColor="#19788e"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          /> 
        </View>  

        <TouchableOpacity style={[styles.loginBtn, appPageStyle.primaryColor, appPageStyle.secondaryTextColor]}>
          <Text style={appPageStyle.primaryTextColor}>Next <Ionicons name="md-arrow-forward" size={15} /></Text> 
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
  }
});