import React from 'react';

import {View, Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NotificationBar = () => {
  return (
    <TouchableOpacity style={{flexDirection: 'row', height: "100%", marginTop: 20}}>
      <Ionicons name="md-notifications" size={22} color="#19788e" style={{marginRight: 25, marginTop: 6}}/>
      <View style={{width: 20, height: 20, backgroundColor: '#19788e', alignItems: "center", justifyContent: "center", borderRadius: 100, position: 'absolute', marginLeft: 12, marginTop: 3}}>
        <Text style={{ fontWeight: 600, color: '#fff', fontSize: 12 }}>10</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationBar;