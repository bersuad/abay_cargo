import React from 'react';

import {View, Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const NotificationBar = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Ionicons name="md-notifications" size={20} color="#19788e" style={{marginRight: 25}}/>
      <View style={{width: 25, height: 25, backgroundColor: 'rgba(25, 120, 142, 0.3)', alignItems: "center", justifyContent: "center", borderRadius: 100, position: 'absolute', marginLeft: 10, marginTop: -5}}>
        <Text>10</Text>
      </View>
    </View>
  );
};

export default NotificationBar;