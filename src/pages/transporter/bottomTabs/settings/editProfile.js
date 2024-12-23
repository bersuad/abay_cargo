import React, { useState, useEffect } from "react";

import  {
  View,
  Text,
  TouchableOpacity,
  Ionicons,
  useNavigation,
  ApiConfig,
  postWithAuthCallWithErrorResponse,
  AsyncStorage,
  FontAwesome5
} from './../../../../components/index';


export default function EditUser() {
  
  const navigation = useNavigation();
  

  return (
    <TouchableOpacity style={{flexDirection: 'row', height: "100%", marginTop: 10}} onPress={()=>navigation.navigate('UpdateShipper')}>
        <FontAwesome5 name="edit" size={24} color="#b76b29" style={{marginRight: 25, marginTop: 6}}/>
    </TouchableOpacity>
  );
};
